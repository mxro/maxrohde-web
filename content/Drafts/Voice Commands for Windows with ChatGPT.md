
We can speak a lot faster than we can type. A lot.When typing, we rarely type more than 40 words per minute and this we can only achieve after considerable practice.However, it is very easy to speak around 150 words per minute.That's more than three times faster. Source: https://en.wikipedia.org/wiki/Words_per_minuteOf 

However, there have been two big impediments to instructing our computer with our voice. First of all, computers were terrible at transcribing our voice to text.The leading voice transcription program in 2006, Dragon NaturalSpeaking for instance featured about an 80% accuracy. Source: https://www.cnet.com/reviews/dragon-naturallyspeaking-review/ I've tried this back in the day and found that fixing up all the small mistakes was way more time consuming than just typing it out directly.  

The second impediment was that computers were very bad at understanding the way we naturally communicate.Computers required precision and our spoken word is anything but.

Thankfully, as of late last year, both these problems are more or less solved.The excellent OpenAI Whisper model has extremely high accuracy for transcribing voice to text.It even understands my German accent! The OpenAI GPT-3 model is able to understand the way we naturally use language and translate it into something a computer can understand.This is evidenced by its impressive ability to write source code, for instance.

I thought, given these two technologies, OpenAI Whisper and GPT, am I able to develop a Windows automation that is better than Cortana Voice?

In the remainder of this article, I will describe how I used the OpenAI API, AutoHotKey, and a simple Go program to allow me control Windows with my voice.

Anything I've developed I have made available on [GitHub](https://github.com/mxro/autohotkey-chatgpt-voice#autohotkey-chatgpt).

## tldr;

If you want to see what I developed in action, please just have a look at the YouTube video below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/k-MRkMN-AMk?si=ptvOfZObIBqgnJLw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

The automation allows you to trigger actions such as the following, but actions are not limited to this.

Open a program "open ..."
Make a web search "search for ..."
Open Wikipedia "Open Wikipedia page on ..."
Ask a question to ChatGPT. "tell me ..."
Search for images. "search for images of ..."

## How can I use it?

Simply download the latest release from: 

https://github.com/mxro/autohotkey-chatgpt-voice/releases

Instructions for installation can be found [here](https://github.com/mxro/autohotkey-chatgpt-voice#install)

## How it all works?

The following diagram shows the different steps this solution executes: 

![](AHK%20ChatGPT%20V2.excalidraw)

There are three main technologies used in the solution.

 - [AutoHotKey](https://www.autohotkey.com/), which is an open source program that allows developing Windows automations.
 - [fmedia](https://stsaz.github.io/fmedia/), which is a tool to manipulate and record sound. 
 - `whisper-autohotkey.exe`, a custom application I wrote in Go to communicate with the OpenAI API

This is how they work together:

Step one, we are launching an auto hotkey script and let it run in the background.The script watches for key presses to the F8 key.
Step 2. When the F8 key is pressed we use F media to start recording sound.
Step 3. When the F8 key is pressed again, we tell Fmedia to stop recording.
Step four, we use the custom Go application Whisper AutoHotKey I have developed to upload the recording FMedia has created to the OpenAI Whisper API and have it transcribe it to text.
Step four, we take the transcribed text and send it to the OpenAPI chat GPT API to have it compose an AutoHeadKey script for us.
Step five, we run the AutoHotKey executable and provide the generated script as input.This will result in the action we have required being executed.

In the following, I now provide some more details how the individual components and steps work.

## AutoHotKey Watch Script

The watch script defines an action that happens whenever the user presses the F8 key.

```
F8::
  NotRecording := !NotRecording
  If NotRecording
  {
    Run %A_WorkingDir%\bin\fmedia-1.31-windows-x64\fmedia\fmedia.exe --record --overwrite --mpeg-quality=16 --rate=12000 --out=rec.mp3 --globcmd=listen,, Hide
  }
  Else
  {  
    Run %A_WorkingDir%\bin\fmedia-1.31-windows-x64\fmedia\fmedia.exe --globcmd=stop,, Hide
    Sleep, 100
    Run %A_WorkingDir%\bin\whisper-autohotkey\whisper-autohotkey.exe,, Hide
  }
  return
```

We first check whether we are currently recording or not.If we are not recording, we use fmedia to start the recording.

```
Run %A_WorkingDir%\bin\fmedia-1.31-windows-x64\fmedia\fmedia.exe --record --overwrite --mpeg-quality=16 --rate=12000 --out=rec.mp3 --globcmd=listen,, Hide
```

Notice here specifically the globalcmd=listen directive.This allows us to stop this recording through another invocation of fmedia.exe. 

Also note the specific quality and sampling rate provided here - I fine-tuned this using a [few experiments](https://maxrohde.com/2023/09/17/optimise-openai-whisper-api-sampling-rate-quality). 

When F8 is pressed and we are currently recording, we use `fmedia.exe` to send the command to stop recording.

```
Run %A_WorkingDir%\bin\fmedia-1.31-windows-x64\fmedia\fmedia.exe --globcmd=stop,, Hide 
```

We then give our operating system a little break to write out the recorded file and then run the custom executable `whisper-autohotkey.exe`.

```
Sleep, 100
    Run %A_WorkingDir%\bin\whisper-autohotkey\whisper-autohotkey.exe,, Hide
```

The next steps all happen in `whisper-autohotkey.exe` - a custom Go application I developed.

## Transcribe

Within our Go application, we read out the recorded MP3 file and send it to the [OpenAI Whisper API](https://platform.openai.com/docs/models/whisper), see [`whisper.go`](https://github.com/mxro/autohotkey-chatgpt-voice/blob/master/whisper-autohotkey/cmd/whisper-autohotkey/whisper.go#L14):

```go
func Transcribe(inputFileName string, config Config) (string, error) {
	c := openai.NewClient(config.OpenapiKey)
	ctx := context.Background()

	req := openai.AudioRequest{
		Model:    openai.Whisper1,
		Prompt:   "",
		FilePath: inputFileName,
	}
	response, err := c.CreateTranscription(ctx, req)
	if err != nil {
		return "", err
	}

	return response.Text, nil
}
```

We are using the [OpenAI API Go SDK](https://github.com/sashabaranov/go-openai) here.

## Generate Script

Once we have received the transcription, we are calling the OpenAI API chat completion endpoint to generate our AutoHotKey script, see [`gpt4.go`](https://github.com/mxro/autohotkey-chatgpt-voice/blob/master/whisper-autohotkey/cmd/whisper-autohotkey/gpt4.go#L25):

```go
func BuildCommand(config Config, prompt string) (string, error) {

	if strings.TrimSpace(prompt) == "" {
		return "MsgBox, 32,, No input detected! Is your microphone working correctly?", nil
	}

	systemContext, err := os.ReadFile("./prompt.txt")
	if err != nil {
		return "", err
	}

	c := openai.NewClient(config.OpenapiKey)

	response, err := c.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT4,
			// https://github.com/sashabaranov/go-openai#why-dont-we-get-the-same-answer-when-specifying-a-temperature-field-of-0-and-asking-the-same-question
			Temperature: math.SmallestNonzeroFloat32,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleSystem,
					Content: string(systemContext),
				},
				{
					Role:    openai.ChatMessageRoleUser,
					Content: "ACTION: " + prompt,
				},
			},
		},
	)

	if err != nil {
		return "", err
	}

	return response.Choices[0].Message.Content, nil
}
```

Note, we provide most of the guidance for the GPT model here in the system context, which is provided by the following custom prompt ([`prompt.txt`](https://github.com/mxro/autohotkey-chatgpt-voice/blob/master/prompt.txt#L1)):

---

You are a Windows automation engineer that is very familiar with AutoHotKey. 
You create AutoHotKey V1 scripts. I ask you to conduct a certain ACTION. 
You then write a script to perform this action. 

Unless otherwise specified, assume:
- the default browser is Firefox
- the default search engine is DuckDuckGo
- if looking for pictures, open the pexels website
- when I ask you to 'tell me X', output a script that shows a GUI window using MsgBox that provides the answer to X.
- if no specific action is specified, assume a web search for the prompt needs to be conducted
- Your answer must ALWAYS ONLY be a correct AutoHotKey Script, nothing else

Avoid all logical and syntactical errors. To help you avoid making errors, ALWAYS keep in mind ALL of the following rules:
1. The action should be executed when the AHK script is run, not define a keyboard shortcut to trigger the action. 
2. You only respond with the script, don't include any comments, keep it as short as possible but ensure there are no syntax errors in the script and it is a correct AutoHotKey V1 script. 
3. Tray tips are provided as follows 'TrayTip , Title, Text, Timeout, Options'.
4. When constructing URLs, ensure to escape the escape sequence for space (%20) as '\`%20'. 
5. Apply all AutoHotKey Escape sequences as required.
6. Replace all '%' characters in URLs with the correct escape sequence '\`%'. E.g. '%20' with '`%20`
7. NEVER provide any other output than the script. Always complete the action with a 'return'. 
8. If you are not sure what action needs to be taken or how to create a script to perform the action,
create a script with the following content:
> MsgBox, 32,,[Your comment]
Replace [Your comment] with your comment. Also include the prompt as you have received it in the comment.
9. If I ask you to Paste something, use the SendInput, {Raw} function.

Now I will provide the ACTION. Please remember, NEVER respond with ANYTHING ELSE but a valid AutoHotKeyScript.

---

Note, you can easily customize this prompt after downloading this tool by editing the `prompt.txt` file in the tool folder. For instance, you may want to change the default browser to something else, for instance, for Chrome.

## Execute Script

After we have generated the script, we then execute it using AutoHotKey, see [`ahk.go`](https://github.com/mxro/autohotkey-chatgpt-voice/blob/b248a42c566b5784d6e74878854e5f921d644269/whisper-autohotkey/cmd/whisper-autohotkey/ahk.go#L8):

```go
func RunCommand(config Config, script string) (string, error) {

	if err := os.WriteFile("script.ahk", []byte(script), 0666); err != nil {
		return "", err
	}

	autoHotKeyPath := config.AutoHotKeyExec
	if autoHotKeyPath == "" {
		autoHotKeyPath = ".\\bin\\autohotkey-1.1.37.01\\AutoHotkeyU64.exe"
	}
	data, err := exec.Command(autoHotKeyPath, "script.ahk").Output()
	if err != nil {
		return "", err
	}

	output := string(data)

	return output, nil
}
```

The generated script will, for example, look like follows:

```
Run, firefox.exe "https://duckduckgo.com/?q=Whisper`%20OpenAI`%20API`%20Go`%20SDK"
return
```

## Limitations and Learnings

- Open AI Whisper API often feels a bit sluggish - due to need to upload quite a bit of data and the processing of that taking a bit of time
- Open AI API latency diverges quite a lot, with often API requests taking 10x longer than usual - at least on my consumer-grade basic account
- GPT4 is not very great at writing AutoHotKey scripts. It often makes basic logic or syntactical errors. I tried to avoid some of the most common ones by including additional guidiance for it in the prompt. It especially struggled with escaping of characters, which admittedly is a bit weird in AutoHotKey - for instance '%' need to be escapted as '`%'

## Conclusion

It is safe to assume that controlling windows using Cortana Voice was not the most popular feature given it has been switched off. Source: https://support.microsoft.com/en-gb/topic/end-of-support-for-cortana-in-windows-and-teams-d025b39f-ee5b-4836-a954-0ab646ee1efa

I have used the automation described in this post quite extensively and overall found it quite useful.I especially like to use it to trigger web searches.Since this allows me to compress a number of individual actions into a simple voice command. I think this is especially useful since then I do not need to type out search queries.

The biggest disadvantage I found in my personal use is that the Whisper API doesn't seem to be very fast.Thus, after issuing a command, there is some latency until the command is transcribed, sent to GPT, and then the script executed.

I also found that GPT does not always compose correct Autohotkey scripts. Let's say it is correct in about 90% of the time. And I think probably with further improving the prompt, it should become more accurate.

This is all published as an open source project. So please be welcome to step by there. Let me know your thoughts or leave a comment on this post.






