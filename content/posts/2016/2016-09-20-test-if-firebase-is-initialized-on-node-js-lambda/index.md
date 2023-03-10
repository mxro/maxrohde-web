---
authors:
- max
blog: maxrohde.com
categories:
- javascript
date: "2016-09-20"
tags:
- firebase
- node-js
title: Test if Firebase is Initialized on Node.JS / Lambda
---

[Firebase](https://firebase.google.com/) is build on the assumption that it will only be initialized once.

This can be a problem in Node.JS applications sometimes, especially if they are run as part of an [Amazon Lambda](https://aws.amazon.com/lambda/details/) function.

This can lead to errors as the following:

```
Firebase App named '[DEFAULT]' already exists.
```

Thankfully, there is an easy way to check if Firebase has already been initialized (firebase.initializeApp). Just wrap your call to initializeApp in the following:

```
if (firebase.apps.length === 0) {
    firebase.initializeApp({
        serviceAccount: {
            ...
        },
        databaseURL: ...
    });
}
```

### Sources

- Stackoverflow: [Firebase App named '\[DEFAULT\]' already exists & google firebase reference does not work on the server](http://stackoverflow.com/questions/37557491/firebase-app-named-default-already-exists-google-firebase-reference-does-n)
- Firebase Google Group: [Keep getting "Firebase App named '\[DEFAULT\]' already exists." with copy & paste code from new console](https://groups.google.com/forum/#!topic/firebase-talk/7brZ2WqVcsc)
- [Firebase Node.JS API](https://firebase.google.com/docs/reference/node/firebase)
