
Using the OpenAI Whisper model can at times feel sluggish especially when using it through the API. I've recently created a little program that allows controlling windows through your voice. I noticed there that it can take a long time before getting a response from open AI, even for short commands.

I initially put this down to just general limitations of the model and a function of the amount of data that needs to be sent to the server, specifically here the rather large audio files.

However, when experimenting a bit, I found out that I could improve response rates by more than 50%.

The biggest factor contributing to an increased latency was the size of the file I had to send to the API, e.g. the voice recordings that needed to be transcribed.

I found that I could significantly reduce the size of the file by changing the sampling rate and quality of what I'm sending to the OpenAI API.

## tldr;

It appears to significantly reduce latency to reduce quality while not impacting transcription accuracy. I recommend the following settings:

- **Format**: MP3
- **Bit Rate**: 16 kbps
- **Sample Rate**: 12 kHz
- **Channels**: mono

## Experiment!

I ran a couple of experiments, recording the same command 'Open Firefox' multiple times. Below the resulting file sizes when adjusting MP3 quality from 16 all the way up to 128 and changing sampling rate from 12k to 24k.

![Recording Sizes](Pasted%20image%2020230917084039.png)

(Note that many microphones sample at 16 kHz)

I created these recordings using [fmedia](https://stsaz.github.io/fmedia/) with a command as follows:

```
./bin/fmedia-1.31-windows-x64/fmedia/fmedia.exe --record --overwrite --mpeg-q-mpeg-quality=16 --rate=24000 --out=rec_16_24k.mp3
```

Here the results for how long it takes to transcribe the file and call GPT4 to parse it:

| File | Size | Time |
|-|-|-|
| rec_16_12k.mp3 | 5KB | 1.8 s |
| rec_32_12k.mp3 | 9KB | 1.8 s |
| rec_128_24k.mp3 | 33KB | 2.6 s |

These measurements were obtained with the following command:

```
time ./bin/whisper-autohotkey/whisper-autohotkey.exe rec_16_24k.mp3
```

I did not see any noticeable difference in transcription accuracy between the different qualities.

## Conclusion

While these experiments are not the most scientific - especially since the Whisper and ChatGPT APIs are notoriously unpredictable - they indicate that reducing the quality of audio recordings send to the Whisper API can significantly reduce latency while not impacting transcription accuracy.

There appear to be negligible benefits reducing the quality below 32 kbs and 12 kHz. This is most likely due to the nature of MP3 compression.

