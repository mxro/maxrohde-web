
We can speak a lot faster than we can type. A lot.When typing, we rarely type more than 40 words per minute and this we can only achieve after considerable practice.However, it is very easy to speak around 150 words per minute.That's more than three times faster. Source: https://en.wikipedia.org/wiki/Words_per_minuteOf 

However, there have been two big impediments to instructing our computer with our voice. First of all, computers were terrible at transcribing our voice to text.The leading voice transcription program in 2006, Dragon NaturalSpeaking for instance featured about an 80% accuracy. Source: https://www.cnet.com/reviews/dragon-naturallyspeaking-review/ I've tried this back in the day and found that fixing up all the small mistakes was way more time consuming than just typing it out directly.  

The second impediment was that computers were very bad at understanding the way we naturally communicate.Computers required precision and our spoken word is anything but.

Thankfully, as of late last year, both these problems are more or less solved.The excellent OpenAI Whisper model has extremely high accuracy for transcribing voice to text.It even understands my German accent! The OpenAI GPT-3 model is able to understand the way we naturally use language and translate it into something a computer can understand.This is evidenced by its impressive ability to write source code, for instance.

I thought, given these two technologies, OpenAI Whisper and GPT, am I able to develop a Windows automation that is better than Cortana Voice?

In the remainder of this article, I will describe how I used the OpenAI API, AutoHotKey, and a simple Go program to help me control Windows with my voice.

Anything I've developed I have made available for free download over GitHub.

## tldr;




It is safe to assume that controlling windows using Cortana Voice was not the most popular feature.given it has been switched off. Source: https://support.microsoft.com/en-gb/topic/end-of-support-for-cortana-in-windows-and-teams-d025b39f-ee5b-4836-a954-0ab646ee1efa



