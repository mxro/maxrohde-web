---
authors:
- max
blog: maxrohde.com
date: "2021-10-05"
tags:
- aws
title: Amazon Transcribe for Dictation
---

I have been doing some research on how to do speech to text conversion. Initially, I thought there may be a good iOS app that I could simply use on my iPhone. But while there were a number of apps available to support dictation most of these seem to be focused on allowing you to upload your files to a page transcription service rather than using the AI transcription services that are available nowadays.

I have also had to look at the major cloud providers and found that [Amazon Transcribe](https://aws.amazon.com/transcribe/) [seems to offer the best accuracy in dictation](https://autome.me/speech-to-text-google-speech-vs-amazon-transcribe/). It is actually pretty easy to try out Amazon Transcribe. For this one can simply go to the [AWS management console](https://aws.amazon.com/console/) (an [AWS account is needed](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)). On the console, simply click a button to start streaming your audio input and Amazon Transcribe will then transcribe your spoken text for you.

[![UI of Amazon Transcribe Web Interface](https://nexnet.files.wordpress.com/2021/10/amazon_transcribe.png?w=1024)](https://nexnet.files.wordpress.com/2021/10/amazon_transcribe.png)

Amazon Transcribe Web Interface

That seems to be pretty accurate. But I am puzzled why there is no simple iOS app or even a Web app available to let one make use of this service. I think this would be particularly powerful if you could run it as a mobile app that then gives you the output of your spoken words as text.

The AWS interface even seems to miss an option to upload an audio file. That would make it easy to just record an audio file on your iOS device and then upload it AWS to generate the transcript. The text transcribed through the console also misses a lot of contextual information such as time stamps back into your audio files (there is an option to download a JSON file that contains all this information but this is not very easy to work with).

I will have a bit of a further look around for other services to do speech-to-text conversion. If I do not find anything, I think I will consider implementing a small little open source app that acts as a minimal wrapper around Amazon Transcribe to allow for low-fidelity dictation. But of course I would much prefer to just use an already built service, so would be happy to hear about any options in the comments.
