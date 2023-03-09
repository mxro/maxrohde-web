---
authors:
- max
blog: maxrohde.com
categories:
- javascript
coverImage: js.jpg
date: "2018-12-19"
tags:
- programming
title: Everything new in JavaScript since ES6
---

It is no secret that things in the tech world change rather rapidly. It's difficult to keep track of everything at the same time. For instance I have been working with JavaScript quite extensively some years ago but recently have been more involved with other tech stacks. Thus I have only followed the developments in the JavaScript world sporadically and was quite surprised by how many things have changed since the days of [JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do).

Since before ES6 things have not changed much for a long time, I imagine I am not the only one who could benefit from a little refresher of all the things that have changed since ES6. Thus I have compiled some of the changes I think are most important for ordinary development work. The idea is to provide a quick overview rather than explain every feature in detail - assuming that more information on any of the changes is readily available on the web.

This is not a complete list of everything that has changed. For instance, I included promises but omitted changes made to the way regular expressions work in ECMAScript 2018; since we are likely to come across promises many times per day whereas the changes to regular expressions only affect us in particular edge cases.

## ECMAScript 6 / ECMAScript 2015

### Variable Scoping

- `let x = 1;`: To define block scoped variables

### Arrow Functions

- `x => x + 1`: Concise closure syntax
- `x => { return x + 1; }`: Concise closure syntax
- `this`: within lambdas refers to enclosing object (rather than to lambda function itself)

### Promises

Promises for wrapping asynchronous code.

```javascript
let p = new Promise((resolve, reject) => {
  resolve('hello');
});

p.then((msg) => console.log(msg));
```

Executing asynchronous operations in parallel

```javascript
let parallelOperation = Promise.all([p1, p2]);
parallelOperation.then((data) => {
  let [res1, res2] = data;
});
```

### Default Parameters and Spread Operator

- `function (x = 1, y = 2)`: Default values for function parameters
- `function (x, y, ...arr) {}`: Capturing all remaining arguments in array for variadic functions
- `var newarr = [ 1, 2, ...oldarr]`: 'Spreading' of elements from an array as literal elements
- `multiply(1, 2, ...arr)`: Spreading of elements from an array as individual function parameters

### Multiline Strings and Templates

- `` `My String⏎NewLine` ``: Multi-line string literals
- `` `Hello ${person.name}` ``: Intuitive string interpolation
- `` const proc = sh`kill -9 ${pid}`; ``: Tagged template literals for parsing custom languages. The example would result in calling the function `sh` with the parameters `(['kill -9 '], pid)`

### Object Properties

- `let obj = { x, y }`: Property shorthand for defining `let object = { x: x, y: y }`
- `obj = { func1 (x, y) { } }`: Methods allowed as object properties

### Deconstructor Assignment

- `var [ x, y, z ] = list`: Deconstructing arrays into individual variables by assignment.
- `var [ x=0, y=0 ]`: Default values for deconstructing arrays.
- `function( [ x, y ] )`: Deconstructing arrays in function calls.
- `var { x, y, z } = getPoint()`: Deconstructing objects into individual variables by assignment.
- `var { name: name, address: { street: street }, age: age} = getData()`: Deconstructing objects into individual variables by assignment, including nested properties.
- `var p = { x=0, y=0 }`: Default values for deconstructing objects.
- `function( { x, y } )`: Deconstructing objects in function calls.

### Modularity

- `export function add(x,y) { return x + y; }`: Exporting functions
- `export var universe = 42;`: Exporting variables
- `import { add, universe } from 'lib/module';`: Importing functions and variables
- `import * from 'lib/module'`: Wildcard import
- `export default (x, y) => x + y;`: Defining default export
- `import add from 'lib/add'`: Importing default export
- `import add, { universe } from 'lib/add'`: Importing default export and additional exports
- `export * from 'lib/module';`: Reexporting from other modules

### Classes

`class` keyword for constructing simple classes.

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(deltax, deltay) {
    new Point(this.x + deltax, this.y + deltay);
  }
}
```

`extends` keyword for extending classes:

```javascript


class Car extends Vehicle {

  constructor (name) {
     super(name);
  }

```

`static` keyword for static methods

```javascript
class Math {
  static add(x, y) {
    return x + y;
  }
}
```

`get` and `set` keywords for decorated property access.

```javascript


class Rectangle {

  get area() { return this.x * this.y }

}

...

new Rectangle(2, 2).area === 4;

```

### Iteration Through Object Values

- `for (let value of arr) { }`: for ... of loop for going iterating through values of objects.
- Also note that objects can define their own [iterators and generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)

### Data Structures

- `new Set()`: For sets
- `new Map()`: For maps
- `new WeakSet()`: For sets whose items will be garbage collected when required
- `new WeakMap()`: For sets whose items will be garbage collected when required

### Symbols

- `Symbol()`: For creating an object with a unique identity.
- `Symbol("note")`: For creating a unique object with a descriptor.
- Note: `Symbol("node") !== Symbol("node")`

## ECMAScript 2016

- `**`: Exponentiation operator
- `Array.prototypes.includes`: Like indexOf but with true/false result and support for NaN

## ECMAScript 2017

async/await for more expressive asynchronous operations

```javascript
async function add1(x) {
  return x + 1;
}

async function add2(x) {
  let y = await add1(x);
  return await add1(y);
}

add2(5).then(console.log);
```

## ECMAScript 2018

### Rest/Spread Operators for Object Properties

Collect all not deconstructed properties from an object in another object:

```javascript
var person = { firstName: 'Paul', lastName: 'Hendricks', password: 'secret' };
var { password, ...sanitisedPerson } = person;
// sanitisedPerson = {firstName: "Paul", lastName: "Hendricks"}
```

Spread object properties

```javascript
let details = { firstName: 'Paul', lastName: 'Hendricks' };

let user = { ...details, password: 'secret' };
```

### Finally for Promises

`finally` callback is guaranteed to be executed if promise succeeds or fails.

```javascript


async function sayHello() {
console.log("hello");
}
sayHello().then(() => console.log("success") )
.catch((e) => console.log(e))
.finally(() => console.log("runs always")

```

### for await Loop

Special for loops that resolve promises before every iteration.

```javascript
const promises = [
  new Promise((resolve) => resolve(1)),
  new Promise((resolve) => resolve(2)),
];

async function runAll() {
  for await (p of promises) {
    console.log(p);
  }
}

runAll();
```

## References

- [ECMAScript 6 New Feature](http://es6-features.org/)s
- [Exploringjs.com: Tagged template literals](http://exploringjs.com/es6/ch_template-literals.html)
- [Here are examples of everything new in ECMAScript 2016, 2017, and 2018](https://medium.freecodecamp.org/here-are-examples-of-everything-new-in-ecmascript-2016-2017-and-2018-d52fa3b5a70e)
- [Metaprogramming in ES6: Symbols and why they're awesome](https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols/)

Image credits: [Flickr](https://www.flickr.com/photos/qubodup/16258492451)