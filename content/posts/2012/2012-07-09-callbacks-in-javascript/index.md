---
title: "Callbacks in JavaScript"
date: "2012-07-09"
categories: 
  - "javascript"
---

From many a Java programmer's perspective, JavaScript has one serious limitation: within the browser applications written in JavaScript limited to only a single thread (with the exception of [web workers](http://greenido.wordpress.com/2012/05/20/web-workers-and-big-data-a-real-world-example/) as part of 'HTML5').

As with many other 'limitations' any programming environment provides, also the 'single-threadedness' of JavaScript comes both with advantages and disadvantages.

Since every line of a JavaScript program should be executed without noticeable latency to the end user, it is not advisable to execute long running operations within the unit of a single statement. Examples for such 'long running' operations would be a call to the server (AJAX) or the opening of a file (in the context of node.js).

In order to allow the developer to execute such operations, JavaScript frameworks use the concept of callbacks: The statement initiating the operation will be executed with very low latency and 'call back' a function specified as one of its parameters when the operation has been completed.

I believe that such callbacks, although they complicate the program flow, are a more natural way to model/program distributed applications; that is applications which in some way or another depend on resources distributed within a network or the Internet. Therefore, I have heavily based the [onedb](http://maxrohde.com/2012/05/06/introducing-onedb/) API on callbacks.

However, I have also done so in order to allow the onedb API to be ported into a JavaScript API naturally and easily.

In developing this JavaScript API now, I learned that there are multiple (accepted?) ways in JavaScript to model such callbacks.

## Node.js Style

No specific function has to be defined for the 'error' case. If an error occurs, the first variable of the called back function ('err') will be defined. Hence, the developer must check within every callback function whether the 'err' variable is defined.

\[sourcecode language="javascript"\]…load(filename, function(err, res) { if (err) … else { } });\[/sourcecode\]

### Advantages

- Very good for showing crisp code examples (which conveniently ignore the error case).

### Disadvantages

- A user of the API is not 'forced' to handle the error case, which can lead to more instable applications in the long term.
- The callback function's body will look more untidy and the control flow might be less clear because of the additional required 'if' function.

## jQuery Style

The jQuery library in its largest part deals with local operations, which can hardly fail (e.g. fading out an element) or, more accurate, for which the handling of the failure case is insensible in most circumstances.

However, a few methods in jQuery do require the consideration of a potential 'error' occurring. This is particularly relevant for calls to a backend server (Ajax). For this case, jQuery allows the specification of multiple callback functions. These functions are only called if the case they represent becomes reality.

\[sourcecode language="javascript"\].ajax({…, success: function() {…}, error: function() {…}});\[/sourcecode\]

Variations of this approach include:

- Pass as arguments to functions only one JavaScript object. Its key-value pairs represent the parameters for the function. In this case, adding the error case requires only to specify one more (optional) attribute in specifying the 'argument' object (this is the example given above).
- Pass every callback function as parameter. In this case, the adding/removal of a callback function would require changing the method signatures.
- Have one parameter designated to hold a map of the possible callback functions.

### Advantages

- Allows to easily specify global defaults for error functions (e.g., one function, which will always be called by default, if an error case occurs) (Variants 1,3)
- Allows to keep the API more evolvable (what is, for instance, if we would like to distinguish between a 'recoverable' error and an 'unrecoverable' error (Variants 1,3)
- Allows to avoid an additional if statement into the application flow (Variants 1,2,3)

### Disadvantages

- Might be a bit more verbose than the Node.js style (depending on which variant is used) (Variants 1 and 3 the most verbose, since they require to specify a 'key' for each parameter passed).
- In Variants 1 and 3 the developer is not 'forced' to handle the failure case.

## So What's the Best Way to do Callbacks in JS?

My main reasons **for recommending the jQuery style of JS callbacks** (in particular variants 1 and 3) are:

- Apart from the most trivial/standard APIs, I believe that evolveability should be a key concern in the development of APIs. The jQuery style approach allows for greater evolveability and flexibility since the different occurring case are not 'hard wired' into the application flow (as if statements).
- In general, I think it is a good idea to use as little 'if' statements as possible (to make the application flow more 'functional')

## Resources

[jQuery .Ajax Error Handling Function](http://www.unseenrevolution.com/jquery-ajax-error-handling-function/)

[NodeJS Callback Conventions and Your App](http://wekeroad.com/2012/02/25/nodejs-callback-conventions-and-your-app/)

[A consistent naming scheme proposal for Javascript callbacks](http://architect-things.blogspot.co.nz/2011/03/consistent-naming-scheme-proposal-for.html)
