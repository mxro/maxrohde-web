---
date: "2011-04-08"
blog: maxrohde.com
title: Models Driven Development and Domain Specific Languages
---

The question of the right programming language is one that has always spurned much controversy. Likewise, the idea that one day we could develop software by simply 'drawing' expressive models has as many advocators as opponents.

The idea of domain specific languages could be one which helps us to advance both of these controversies. Both programming languages and traditional models (think UML) are ultimately both just abstractions, models to use another word. More specifically, most visual modelling techniques as well as programming languages follow well-defined (more or less) grammars. In a domain specific language we utilize the power of these grammars to solve problems in one domain.

A very good introduction as well as guide to domain specific languages (DSL) has just been released by Markus Völter:

[MD\*/DSL Best Practices V 2.0](http://voelter.de/data/pub/DSLBestPractices-2011Update.pdf)

Below a number of citations from this document on a number of matters:

## General Purpose Programming Language vs. DSL

"\[T\]he ability to extend existing languages (such as it is possible with MPS, Spoofax, and to some extent with Xtext2), makes it possible to build domain specific languages as extensions of general-purpose languages. So instead of generating a skeleton from the DSL and then embedding 3GL code into it, one could instead develop a language extension, that inherits for example expressions and/or statements from the general-purpose base language. This makes a lot of sense: imagine the development of a language for asynchronous, reactive programming. In this case it is very useful to be able to inherit expressions from a general-purpose base language."

## Graphical vs. Textual Notation

"Things that are described graphically are easier to comprehend than textual descriptions, right? Not really. What is most important regarding comprehensibility is the alignment of the concepts that need to be conveyed with the abstractions in the language. A well-designed textual notation can go a long way. Of course, for certain kinds of information, a graphical notation is better: relationships between entities, the timing/sequence of events or some kind of signal/data flow."

## Tooling Matters

"Defining languages and notations is not enough per se – you have to provide good tool support for them, too. \[…\]To increase usability, DSL editors need to be able to cope with wrong or incomplete models as they are entered by the users. Ideally, it should even be possible to persist them. Of course, as long as models are wrong or incomplete they cannot be processed any further. In the context of textual languages, this might mean that you design a somewhat "looser", more tolerant grammar, and enforce correctness via constraints."

## Critique

I personally see especially great value in building DSLs around general purpose languages, such as Java, JavaScript, Groovy, Scala, etc. Some frameworks have already gone in long way in embedding DSLs in Java Syntax. See here for instance the [Mirror Project](http://projetos.vidageek.net/mirror/mirror/). This project aspires to make it easier to interact with the Java Reflection API. The resulting calls come close to expressions in natural language.

new Mirror().on(target).set().field(fieldName).withValue(value);

Another example is the mocking framework [Mockito](http://mockito.org/). This framework utilizes a DSL to specify the behaviour of 'mocked' objects. For instance:

when(mockedList.get(anyInt())).thenReturn("element");

Another premier example is the [hamcrest library](http://code.google.com/p/hamcrest), which is also mainly used to support unit tests.

assertThat(theBiscuit, is(equalTo(myBiscuit)));

Further 'DSLs' implemented in Java based on the hamcrest library are listed in the project, which [use the hamcrest library](http://code.google.com/p/hamcrest/wiki/UsesOfHamcrest).

Many APIs are also implemented in an DSL-like fashion. For instance, the API for the NextReports framework ([Dinca-panaitescu, 2011](http://www.citeulike.org/user/mxro/article/9165944)):

FileOutputStream stream = new FileOutputStream("test.html");

FluentReportRunner.report(report).connectTo(connection).withQueryTimeout(60).withParameterValues(createParameterValues()).formatAs(ReportRunner.HTML_FORMAT).run(stream);

Of course, there is still some way to go to improve those DSLs. Especially end users are likely to struggle with some intricacies of general programming languages. That said, I still believe that it would be easier to build powerful tools around the limitations of general purpose languages than to develop these 'from scratch' for other languages.

## References

[MD\*/DSL Best Practices V 2.0](http://voelter.de/data/pub/DSLBestPractices-2011Update.pdf) ([Völter, 2011](http://www.citeulike.org/user/mxro/article/9118240))

"Model Driven Development and Domain Specific Language Best Practices", Jean-Jacques Dubray on Mar 28 2011 [on infoq.com](http://www.infoq.com/news/2011/03/mdd-dsl-best-practices)

Presentation "Real Software Engineering" by Glenn Vanderburg presented [at Lone Star Ruby Conference 2010](http://confreaks.net/videos/282-lsrc2010-real-software-engineering). (Advances that the code is the model)

"Is modelling about to overtake coding? I'm a happy SAP business consultant :)", Thierry Crifasi [on SAP Community Network](http://www.sdn.sap.com/irj/scn/weblogs?blog=/pub/wlg/22606) posted on Dec. 13, 2010 (Advances that models should take over coding)