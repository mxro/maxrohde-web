---
categories:
- productivity
date: "2019-04-27"
blog: maxrohde.com
tags:
- linux
- productivity
- tools
title: A gentle introduction to vim
---

vim is a great tool for editing any form of text, be it a blog post, text or programming code. Unfortunately there is a bit of a learning curve when first getting started with vim. In this article I want to provide an overview of some of the key features of vim and how to get started using this editor.

If you are using Linux, it is very easy to use vim. Just type `vi` in the terminal and vim will be open. In windows, I find the easiest way to use is to install [cmder](https://cmder.net/). Once it is installed, just start cmder and type `vi` just as one would in a Linux system.

Initially when you start up vim you will be in a new empty file and what is called normal mode. In normal mode, it is not possible to enter new text. To do so, we need to switch to insert mode, which is easily done by typing _i_. You can now write text to your heart's content. Finally pressing _Esc_ will get us back into normal mode.

To save our work, we must go into command mode, which is achieved from normal mode by prefixing commands with _:_. _:w test.txt_ followed by enter will save the text we have entered and _:q_ will quit the vim editor.

Switching between these modes may seem a bit cumbersome at the start but splitting up the task of working with text into these different modes allows for very efficient and effective workflows.

In the following I will first describe how each of the individual modes works and then show how we can use operators and text objects to unlock the full potential of vim.

# Modes

## Normal Mode

Normal mode is the default mode that vim will be in once its started and can usually be enabled by hitting the _Esc_ key. It is the mode in which it is easiest to enable the other modes and also to navigate within a document. Some of the most useful commands for normal mode are the following:

- _j_, _k_: Go one line up or down
- _h_, _l_: Move one character left or right
- _i_: Enable insert mode
- _v_: Enable visual mode for selecting by character
- _V_: Enable visual mode for selecting lines
- _:_: Enable command line mode

## Insert Mode

Insert mode is closest to how a normal editor works. It is possible to add and delete text. This also renders most keys on the keyboard unavailable for composing commands. So most importantly, we will need to remember the keyboard shortcut of only _Esc_ to get back to normal mode.

## Visual Mode

Visual mode is used for selecting text. The most important commands are:

- _j_, _k_: Select line above or below
- _h_, _l_: Select character to the right or left
- _d_: Delete selected characters
- _y_: Cut selected lines and place in register (press _p_ in normal mode for pasting)
- _\>_, _<_: Indent lines to the left or right

## Command Line Mode

Command line mode is for system level tasks such as saving or loading files and, importantly, for closing vim. Some important commands (as entered when in normal mode).

- _:wq_: Save currently open file and quit
- _:q!_: Quit vim and discard any unsaved changes

# Operators and Text Objects

Since keys on the keyboard are only used for writing text in insert mode, the keys of the keyboard become available for other operations in the remaining modes. That is great for making complex operations quickly accessible using the keys that are the easiest to type. Since it is not required to use function keys such as _Ctrl_ and _Alt_, it also becomes very easy to string different commands together. For instance, the following command will delete a word:

_daw_

Such more complex commands in vim are composed of _operators_, _text objects_ and _motions_. In the example above _d_ is an operator for _deleting_ whereas _aw_ denotes the text object of a word including its trailing space. So given that _c_ is the operator for _changing_ we could also write:

_caw_

This would enable us to change the word at our current cursor position rather than deleting it. Given that _p_ references a paragraph text object, we could also write:

_dap_

This would delete a whole paragraph; with a paragraph being any block of text proceeded by an empty line.

Here a quick reference of some operators:

- _d_: Delete
- _c_: Change
- _y_: Copy/yank into register

And some [text objects](http://vimdoc.sourceforge.net/htmldoc/motion.html#text-objects):

- _aw_: A complete word
- _as_: A complete sentence
- _ap_: A paragraph
- _i{_: Everything within curly braces
- _i"_: Everything within quotation marks
- _a"_: The content of the quotation marks plus the quotation marks themselves.
- /word: Everything up until and including 'word'

There are usually two flavours of text objects. Those prefixed with _a_ and those with _i_. The _a_ prefix denotes that we are including whitespace, for instance the training whitespace after a word, whereas the _i_ prefix does not include the whitespace. Therefore, when deleting a superfluous word, we would usually use _daw_ whereas when we want to replace the word (and preserve the whitespace around the word), we would use _ciw_.

# Motions

[Motions](http://vimdoc.sourceforge.net/htmldoc/motion.html) can be used for two purposes. Without a proceeding operator, a motion can be used to navigate within the text when in normal mode. with a proceeding operator, the operator will be applied by whatever is captured by the motion.

For instance, entering _$_ in normal mode will get us to the end of a line. If we enter _d$_, we will delete all text until the end of the line.

Here a list of a few of the motions available in vim:

- _0_, _$_: Go to the beginning or end of a line
- _j_, _k_: Go one line up or down
- _h_, _l_: Move one character left or right
- _fc_: Find the next occurrence of character c
- _Fc_: Find the previous occurrence of character c
- _w_, _b_: Go to the next/previous word
- _G_: Go to the last line of the document
- _gg_: Go to the first line of the document
- _(_, _)_: Sentence backward / forward
- _{_, _}_: Paragraph backward / forward

# References and Further Resources

- [vim Main Help file](http://vimdoc.sourceforge.net/htmldoc/help.html)
- [Talk on going mouseless with Vim, Tmux, and Hotkeys](https://www.youtube.com/watch?v=E-ZbrtoSuzw): Great presentation for more advanced vim usage
- [Mastering the Vim Language - youtube](https://youtu.be/wlR5gYd6um0)