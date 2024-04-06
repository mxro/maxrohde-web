---
title: 'Voice Memos with ChatGPT: My First "GPT"'
publish: true
coverImage: 'chatgpt_voice_conversation.png'
id: 'voice-memos-with-chatgpt'
blog: 'maxrohde.com'
date: 2024-04-06
summary: Use ChatGPT as a free tool to record with voice memos.
authors:
  - max
tags:
  - 'chatgpt'
  - 'voice'
  - 'app'
  - 'ai'
  - 'productivity'
categories:
  - 'code'
---

## Introduction

I've always been fascinated by how Large Language Models (LLMs) can make our interactions with technology feel more natural. These models are not just about turning speech into text. They're skilled at understanding what we mean, even when how we say it isn't clearly expressed. LLMs are great at finding the important points in our messy spoken words.

My interest grew when ChatGPT introduced a voice conversation feature. However, I quickly realised that talking to ChatGPT could be awkward. ChatGPT is optimised for producing text we read rather than text we listen to. We read faster than we listen. So, long answers from ChatGPT felt slow because it took so long for it to read them out in their entirety.

Thinking about this, I wanted to explore a way to use the voice conversation feature in a new and helpful way: notetaking.

My idea was to use ChatGPT to record voice memos. This uses the transcription abilities of ChatGPT in a useful way. 

So, I developed a custom "GPT" to make recording voice memos as smooth and effective as possible.

Check out the GPT here: [Voice Memo](https://chat.openai.com/g/g-9okaXHlhe-voice-memo)
![Voice Memo GPT](images/Pasted%20image%2020240406110812.png)

In the remainder of this article, I explain how this GPT works and provide my impressions of working with GPTs in generatl.

## What are GPTs or Custom GPTs?

[Custom GPTs](https://openai.com/blog/introducing-gpts) are versions of ChatGPT that you can customize for specific tasks or areas of interest. This doesn't require any coding, making it accessible to everyone interested in AI.

For those who know how to code, there's more you can do. You can add code to connect these GPTs to outside data or services. This means GPTs can do almost anything. They can increase productivity, help with learning, or provide new entertainment options.

But, there's a catch. To create or use custom GPTs, you need a ChatGPT Plus subscription. This costs US$20 a month. Both creators and users of custom GPTs need this subscription to access them.

## The Voice Memo GPT

I want to explore a new way to use ChatGPT; to use it to quickly capture thoughts, similar to many voice memo apps available on the app stores.

Imagine talking to ChatGPT and expressing your ideas. Then, instead of giving you a long response as it would usually do, it simply says "noted." That's the main idea.

With a special prompt I'll share below, ChatGPT acts as a recorder for your thoughts. It creates a transcript you can later reference or share with other applications such as Notion.

Here's how it works: 

- create a new conversation with the [Voice Memo](https://chat.openai.com/g/g-9okaXHlhe-voice-memo) GPT
- hit the headphones button near the chat box, and speak.

ChatGPT will capture your words and confirm with short responses. This way, you get a transcript of your thoughts without AI adding its own twist.

The GPT not only records thoughts but also answers questions when explicitly asked. So, if you're brainstorming and have a query, ChatGPT will respond with its suggestions. Otherwise, it'll just document your thoughts.

I think this could be quite useful for note-taking and brainstorming. 

Below is the prompt to make ChatGPT your personal voice memo tool. You can create your own GPT for it or simply start your conversation with it when using the free version of ChatGPT.

```
You just listen to ideas presented by the user.

- If given a specific question from the user, answer as succinctly as possible.
- If the users input ends on an uncompleted sentence, prompt 'And?'
- Otherwise, respond with 'Noted.'
- If you are running on the web version and not the mobile version of GPT.
  Your first reply should include. 'Note that voice conversations are only
  supported on mobile devices.'

DO NOT SUMMARIZE, DO NOT COMMENT, unless specifically prompted to do so.

You are allowed to answer a user's query on your prompt above. If the
user asks you how you function, respond with the information from the prompt.

```

## Conclusion

Creating a custom GPT is incredibly easy. It can be done in just a few minutes. But for more complex uses, the challenges quickly added up.

Making conversations with GPT smooth was harder than expected. The system would often interrupt me mid-sentence, which broke the flow of my thoughts. Especially with voice memos, these interruptions felt awkward and made the experience less enjoyable.

Despite these issues, I think there is a lot of potential in using ChatGPT to capture and refine our thoughts, as opposed to the usual usecase of answering questions. I'm looking forward to any feedback on anyone who is happy to try out the GPT or the prompt.

I've shared the full prompt for this project for those interested in experimenting or creating something new.