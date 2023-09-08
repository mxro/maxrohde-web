
We can speak a lot faster than we can type. A lot.When typing, we rarely type more than 40 words per minute and this we can only achieve after considerable practice.However, it is very easy to speak around 150 words per minute.That's more than three times faster. Source: https://en.wikipedia.org/wiki/Words_per_minuteOf 

However, there have been two big impediments to instructing our computer with our voice. First of all, computers were terrible at transcribing our voice to text.The leading voice transcription program in 2006, Dragon NaturalSpeaking for instance featured about an 80% accuracy. Source: https://www.cnet.com/reviews/dragon-naturallyspeaking-review/ I've tried this back in the day and found that fixing up all the small mistakes was way more time consuming than just typing it out directly.  

The second impediment was that computers were very bad at understanding the way we naturally communicate.Computers required precision and our spoken word is anything but.

Thankfully, as of late last year, both these problems are more or less solved.The excellent OpenAI Whisper model has extremely high accuracy for transcribing voice to text.It even understands my German accent! The OpenAI GPT-3 model is able to understand the way we naturally use language and translate it into something a computer can understand.This is evidenced by its impressive ability to write source code, for instance.

I thought, given these two technologies, OpenAI Whisper and GPT, am I able to develop a Windows automation that is better than Cortana Voice?

In the remainder of this article, I will describe how I used the OpenAI API, AutoHotKey, and a simple Go program to allow me control Windows with my voice.

Anything I've developed I have made available for free download over GitHub.

## tldr;

If you want to see what I developed in action, please just have a look at the YouTube video below.


The automation allows you to trigger actions such as the following, but actions are not limited to this.

Make a web search "search for ..."
Open a program "open ..."
Ask a question to ChatGPT. "tell me ..."
Search for images. "search for images of ..."

## How it all works

There are three main technologies used in the solution.

 - [AutoHotKey](https://www.autohotkey.com/), which is an open source program that allows developing Windows automations.
 - [fmedia](https://stsaz.github.io/fmedia/), which is a tool to manipulate and record sound for Windows. 
 - `whisper-autohotkey.exe`, a custom application I wrote in Go to communicate with the OpenAI API

This is how they work together.

Step one, we are launching an auto hotkey script and let it run in the background.The script watches for key presses to the F8 and F9 keys.
Step 2. When the F8 key is pressed we use F media to start recording sound.
Step 3. When the F9 key is pressed, we tell Fmedia to stop recording.
Step four, we use the custom Go application Whisper AutoHotKey I have developed to upload the recording FMedia has created to the OpenAI Whisper API and have it transcribe it to text.
Step four, we take the transcribed text and send it to the OpenAPI chat GPT API to have it compose an AutoHeadKey script for us.
Step five, we run the AutoHotKey executable and provide the generated script as input.This will result in the action we have required being executed.

In the following, I now provide some more details how the individual components and steps work.

## watch.ahk - AutoHotKey Watch Script



### fmedia.exe - Recording Audio


## whisper-autohotkey.exe - Transcribe


## whisper-autohotkey.exe - Generate Script

## Conclusion

It is safe to assume that controlling windows using Cortana Voice was not the most popular feature.given it has been switched off. Source: https://support.microsoft.com/en-gb/topic/end-of-support-for-cortana-in-windows-and-teams-d025b39f-ee5b-4836-a954-0ab646ee1efa

I have used the automation described in this post quite extensively and overall found it quite useful.I especially like to use it to trigger web searches.Since this allows me to compress a number of individual actions into a simple voice command. I think this is especially useful since then I do not need to type out search queries.

The biggest disadvantage I found in my personal use is that the Whisper API doesn't seem to be very fast.Thus, after issuing a command, there is some latency until the command is transcribed, sent to GPT, and then the script executed.

I also found that GPT does not always compose correct Autohotkey scripts. Let's say it is correct in about 90% of the time. And I think probably with further improving the prompt, it should become more accurate.

This is all published as an open source project. So please be welcome to step by there. Let me know your thoughts or leave a comment on this post.






