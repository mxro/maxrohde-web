---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2011-09-12"
title: 'Java 8: Key Features (I would love to see)'
---

There has been not little critizim of the slow progress made in the core of Java. Java 6 has been released on the 11th of December **2006** (!). Java 7 saw the light of the day almost five years later this July.

Competing languages, most notably C# in Microsofts .NET environment have doubtlessly benefitted from Java's inability to catch up with new developments in IT. Yet, according to the famous [TIOBE community index](http://www.tiobe.com 'TIOBE'), the **most popular language in both 2006 and 2011 is: Java**. Most notably, challenged only by C, a language not necessarily known to be at the forefront of language innovation.

In the general discussion of the standstill of Java, the possible advantages of the absence of change in the core of Java are seldom mentioned. Maybe Java is so popular today not despite of but because of the few changes, which have been made to the core language. Of course, when compared to C# such advantages appear to be few. Indeed, many programming tasks can be accomplished much easier in C# or many other languages. However, it must be noted that C# (and many other languages) live in an ecosystem, which is fundamentally different to the Java ecosystem.

C#, for instance, is heavily dominated by Microsoft. This centralized ecosystem has significant advantages to implement change quicker. The entire toolchain can be centrally adjusted to any planned changes. But Java? The language has long outgrown the bosom of its inventors. Take Android, take Spring, take the Google Web Toolkit: the breadth and depth of commercial and open source projects in the Java space outscales any of its competitors easily.

To give just a few examples of the breadth of the ecosystem: Google web toolkit, for instance, has a lot and yet very little to do with Java. While the Google Web Toolkit builds on the Java syntax, it deploys applications for JavaScript engines rather the Java Virtual Machine. On the other hand, a number of languages such as Groovy and Scala, use a Syntax completly different from Javas, yet run on the Java Virtual Machine.

It is this diversity, which makes drives the success of the Java ecosystem. There have been a number of research studies investigating innovation in various context. One common finding is that **more diverse systems provide more significant innovations in the long run** than better integrated ones ([Lazer and Friedman, 2007](http://www.citeulike.org/user/mxro/article/9321108)).

However, it can be argued that such diversity could only emerge as a result of the relatively few changes to the core foundations of Java. Therefore, of all the possible features, we could envision for Java 8, it is especially one I would like to see: that it **devises from its predecessor as little as possible**.

However, it is not that I wouldn't believe there are a number of things 'wrong' with the Java language, or at least outdated. I would like to see the following problems mitigated

**Too Many Blocking Calls**

I believe that most expierenced programmers will reach a point at which they will begin to strive for simplicitly or 'beauty' in their code ([Case and Piñeiro, 2006](http://www.citeulike.org/user/mxro/article/8257659)). Callbacks in Java are ugly. Very ugly. Which in itself is not such a big deal. But programmers avoiding callbacks is a big deal. Many applications written in Java are cluttered with blocking calls to the file system or external servers, possibly as a result of programmers striving for simplicitly avoiding them.

Often, the introduction of lambdas as first order constructs in Java is proposed as one of the key features for Java 8. However, I strongly oppose anything increasing complexity at the core of a language. Adding another first order construct is an example for a measure dramatically incresing complexity. However, I do believe that the syntax for callbacks could be significantly simplified, encouraging developers to write code in a more 'functional' style.

Java 6:

```Java

component.writeData(s).andThen(new WriteCallback() {
public void onWriteComplete() {
System.out.println("I/O operation complete ");
}
});
```

Java 8 (I hope):

```Java

component.writeData(s).andThen(
{System.out.println("I/O operation complete "); }
);
```

(adapted from Groovy, of course)

**Over-Specification of Types**

Writing code an untyped language can be a quite revealing expiernce: I can create working programs, wihtout having to tell the compiler in every step, what are the types of my objects. Java generics (as seen in Java 6) are problably one of the most gruesome examples of type overspecification. But lets consider a simpler example:

```Java

String s = "my string";
int i = s;
```

In this example the Java compiler would sensibly warn us that the second statement is invalid. A possibly very important information to avoid bugs in the programm. But, more importantly, modern integrated development environment such as eclipse will issue a warning pointing to the second statement in the moment it is typed in the source code editor. Moreover, there is often tooling available, which will propose an automatic correction for the problem. This is not possible in an untyped language.

However, the given code is also an example for type overspecification. When we define the variable s, it is a very easy excerise for the compiler to infer the type of the variable without need to specify the type of the variable. I would love to have a special build in type, by which I could tell the compiler: please take your best guess at specifiying the type of the variable and warn of any problems, which may arise when using this type. The following code, for instance, should issue the same warning on the second line as the code snippet given above.

```


object s = "my string";
int i = s;

```

(type inference is popular in Scala, of course)