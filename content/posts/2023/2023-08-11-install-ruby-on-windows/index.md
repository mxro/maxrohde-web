---
title: 'Install Ruby on Windows'
publish: true
coverImage: 'diamond-3185447_1920.jpg'
id: 'install-ruby-on-windows'
blog: 'maxrohde.com'
date: 2023-08-11
authors:
  - max
tags:
  - 'ruby'
  - 'windows'
  - 'programming'
  - 'howto'
categories:
  - 'code'
---

In order to try out the [Fastlane](https://fastlane.tools/) tool, I needed to install Ruby on my Windows development machine today. The process took me a few attempts, so I thought I share here some of the mistakes to avoid and how to get everything running.

## How to Install Ruby

The easiest way to install Ruby is to use the excellent RubyInstaller that can be downloaded from:

[RubyInstaller](https://rubyinstaller.org/)

![Ruby Installer](images/Pasted%20image%2020230811074458.png)

Then click *Download* and next select the latest version of *Ruby+DevKit*:

![Ruby+DevKit](images/Pasted%20image%2020230811074611.png)

**Mistake to Avoid**: Download the version without *DevKit*

After downloading the installer, run it.

When asked to select components, be sure to select *MSYS2 development toolchain*.

![Select Toolchain](images/Pasted%20image%2020230811074854.png)

**Mistake to avoid**: Not installing the MSYS2 toolchain. Note even if you already have [MSYS2](https://www.msys2.org/) installed, select this option.

When asked to *Run 'rdik install'*, select the option.

![rdik install](images/Pasted%20image%2020230811075224.png)

**Mistake to avoid**: Not running 'rdik install'. Though you can do [this manually later](https://github.com/oneclick/rubyinstaller2#the-ridk-command).

When prompted which components to install, select *3 - MSYS2 and MINGW development toolchain*:

![MSYS2 toolchain](images/Pasted%20image%2020230811075430.png)

**Mistake to avoid**: Running the update or the base installation only.

After this installation is complete you are good to go. To test if your Ruby installation is working well, try running:

```
$ ruby --version
ruby 3.2.2 (2023-03-30 revision e51014f9c0) [x64-mingw-ucrt]

$ bundle --version
Bundler version 2.4.18
```