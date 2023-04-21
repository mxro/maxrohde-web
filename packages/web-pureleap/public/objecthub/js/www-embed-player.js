(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var n;function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}
var ba="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
function ca(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}
var da=ca(this);function r(a,b){if(b)a:{for(var c=da,d=a.split("."),e=0;e<d.length-1;e++){var f=d[e];if(!(f in c))break a;c=c[f]}d=d[d.length-1];e=c[d];f=b(e);f!=e&&null!=f&&ba(c,d,{configurable:!0,writable:!0,value:f})}}
r("Symbol",function(a){function b(e){if(this instanceof b)throw new TypeError("Symbol is not a constructor");return new c("jscomp_symbol_"+(e||"")+"_"+d++,e)}
function c(e,f){this.f=e;ba(this,"description",{configurable:!0,writable:!0,value:f})}
if(a)return a;c.prototype.toString=function(){return this.f};
var d=0;return b});
r("Symbol.iterator",function(a){if(a)return a;a=Symbol("Symbol.iterator");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=da[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&ba(d.prototype,a,{configurable:!0,writable:!0,value:function(){return ea(aa(this))}})}return a});
function ea(a){a={next:a};a[Symbol.iterator]=function(){return this};
return a}
function u(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}
function fa(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}
var ha="function"==typeof Object.create?Object.create:function(a){function b(){}
b.prototype=a;return new b},ia=function(){function a(){function c(){}
new c;Reflect.construct(c,[],function(){});
return new c instanceof c}
if("undefined"!=typeof Reflect&&Reflect.construct){if(a())return Reflect.construct;var b=Reflect.construct;return function(c,d,e){c=b(c,d);e&&Reflect.setPrototypeOf(c,e.prototype);return c}}return function(c,d,e){void 0===e&&(e=c);
e=ha(e.prototype||Object.prototype);return Function.prototype.apply.call(c,e,d)||e}}(),ja;
if("function"==typeof Object.setPrototypeOf)ja=Object.setPrototypeOf;else{var ka;a:{var la={a:!0},ma={};try{ma.__proto__=la;ka=ma.a;break a}catch(a){}ka=!1}ja=ka?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var na=ja;
function v(a,b){a.prototype=ha(b.prototype);a.prototype.constructor=a;if(na)na(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.N=b.prototype}
function oa(){this.m=!1;this.i=null;this.g=void 0;this.f=1;this.j=this.l=0;this.u=this.h=null}
function qa(a){if(a.m)throw new TypeError("Generator is already running");a.m=!0}
oa.prototype.B=function(a){this.g=a};
function ra(a,b){a.h={Ea:b,ra:!0};a.f=a.l||a.j}
oa.prototype["return"]=function(a){this.h={"return":a};this.f=this.j};
function w(a,b,c){a.f=c;return{value:b}}
oa.prototype.F=function(a){this.f=a};
function sa(a){a.l=2;a.j=3}
function ta(a){a.l=0;a.h=null}
function ua(a){a.u=[a.h];a.l=0;a.j=0}
function va(a){var b=a.u.splice(0)[0];(b=a.h=a.h||b)?b.ra?a.f=a.l||a.j:void 0!=b.F&&a.j<b.F?(a.f=b.F,a.h=null):a.f=a.j:a.f=0}
function wa(a){this.f=new oa;this.g=a}
function xa(a,b){qa(a.f);var c=a.f.i;if(c)return ya(a,"return"in c?c["return"]:function(d){return{value:d,done:!0}},b,a.f["return"]);
a.f["return"](b);return za(a)}
function ya(a,b,c,d){try{var e=b.call(a.f.i,c);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.f.m=!1,e;var f=e.value}catch(g){return a.f.i=null,ra(a.f,g),za(a)}a.f.i=null;d.call(a.f,f);return za(a)}
function za(a){for(;a.f.f;)try{var b=a.g(a.f);if(b)return a.f.m=!1,{value:b.value,done:!1}}catch(c){a.f.g=void 0,ra(a.f,c)}a.f.m=!1;if(a.f.h){b=a.f.h;a.f.h=null;if(b.ra)throw b.Ea;return{value:b["return"],done:!0}}return{value:void 0,done:!0}}
function Aa(a){this.next=function(b){qa(a.f);a.f.i?b=ya(a,a.f.i.next,b,a.f.B):(a.f.B(b),b=za(a));return b};
this["throw"]=function(b){qa(a.f);a.f.i?b=ya(a,a.f.i["throw"],b,a.f.B):(ra(a.f,b),b=za(a));return b};
this["return"]=function(b){return xa(a,b)};
this[Symbol.iterator]=function(){return this}}
function x(a,b){var c=new Aa(new wa(b));na&&a.prototype&&na(c,a.prototype);return c}
r("Reflect",function(a){return a?a:{}});
r("Reflect.construct",function(){return ia});
function Ba(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""}
r("String.prototype.endsWith",function(a){return a?a:function(b,c){var d=Ba(this,b,"endsWith");b+="";void 0===c&&(c=d.length);for(var e=Math.max(0,Math.min(c|0,d.length)),f=b.length;0<f&&0<e;)if(d[--e]!=b[--f])return!1;return 0>=f}});
r("String.prototype.startsWith",function(a){return a?a:function(b,c){var d=Ba(this,b,"startsWith");b+="";for(var e=d.length,f=b.length,g=Math.max(0,Math.min(c|0,d.length)),h=0;h<f&&g<e;)if(d[g++]!=b[h++])return!1;return h>=f}});
function Ca(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
var Da="function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)Ca(d,e)&&(a[e]=d[e])}return a};
r("Object.assign",function(a){return a||Da});
r("Promise",function(a){function b(g){this.g=0;this.h=void 0;this.f=[];var h=this.i();try{g(h.resolve,h.reject)}catch(k){h.reject(k)}}
function c(){this.f=null}
function d(g){return g instanceof b?g:new b(function(h){h(g)})}
if(a)return a;c.prototype.g=function(g){if(null==this.f){this.f=[];var h=this;this.h(function(){h.j()})}this.f.push(g)};
var e=da.setTimeout;c.prototype.h=function(g){e(g,0)};
c.prototype.j=function(){for(;this.f&&this.f.length;){var g=this.f;this.f=[];for(var h=0;h<g.length;++h){var k=g[h];g[h]=null;try{k()}catch(l){this.i(l)}}}this.f=null};
c.prototype.i=function(g){this.h(function(){throw g;})};
b.prototype.i=function(){function g(l){return function(m){k||(k=!0,l.call(h,m))}}
var h=this,k=!1;return{resolve:g(this.C),reject:g(this.j)}};
b.prototype.C=function(g){if(g===this)this.j(new TypeError("A Promise cannot resolve to itself"));else if(g instanceof b)this.G(g);else{a:switch(typeof g){case "object":var h=null!=g;break a;case "function":h=!0;break a;default:h=!1}h?this.u(g):this.l(g)}};
b.prototype.u=function(g){var h=void 0;try{h=g.then}catch(k){this.j(k);return}"function"==typeof h?this.H(h,g):this.l(g)};
b.prototype.j=function(g){this.m(2,g)};
b.prototype.l=function(g){this.m(1,g)};
b.prototype.m=function(g,h){if(0!=this.g)throw Error("Cannot settle("+g+", "+h+"): Promise already settled in state"+this.g);this.g=g;this.h=h;this.B()};
b.prototype.B=function(){if(null!=this.f){for(var g=0;g<this.f.length;++g)f.g(this.f[g]);this.f=null}};
var f=new c;b.prototype.G=function(g){var h=this.i();g.ca(h.resolve,h.reject)};
b.prototype.H=function(g,h){var k=this.i();try{g.call(h,k.resolve,k.reject)}catch(l){k.reject(l)}};
b.prototype.then=function(g,h){function k(t,p){return"function"==typeof t?function(D){try{l(t(D))}catch(N){m(N)}}:p}
var l,m,q=new b(function(t,p){l=t;m=p});
this.ca(k(g,l),k(h,m));return q};
b.prototype["catch"]=function(g){return this.then(void 0,g)};
b.prototype.ca=function(g,h){function k(){switch(l.g){case 1:g(l.h);break;case 2:h(l.h);break;default:throw Error("Unexpected state: "+l.g);}}
var l=this;null==this.f?f.g(k):this.f.push(k)};
b.resolve=d;b.reject=function(g){return new b(function(h,k){k(g)})};
b.race=function(g){return new b(function(h,k){for(var l=u(g),m=l.next();!m.done;m=l.next())d(m.value).ca(h,k)})};
b.all=function(g){var h=u(g),k=h.next();return k.done?d([]):new b(function(l,m){function q(D){return function(N){t[D]=N;p--;0==p&&l(t)}}
var t=[],p=0;do t.push(void 0),p++,d(k.value).ca(q(t.length-1),m),k=h.next();while(!k.done)})};
return b});
r("Object.setPrototypeOf",function(a){return a||na});
r("WeakMap",function(a){function b(k){this.f=(h+=Math.random()+1).toString();if(k){k=u(k);for(var l;!(l=k.next()).done;)l=l.value,this.set(l[0],l[1])}}
function c(){}
function d(k){var l=typeof k;return"object"===l&&null!==k||"function"===l}
function e(k){if(!Ca(k,g)){var l=new c;ba(k,g,{value:l})}}
function f(k){var l=Object[k];l&&(Object[k]=function(m){if(m instanceof c)return m;Object.isExtensible(m)&&e(m);return l(m)})}
if(function(){if(!a||!Object.seal)return!1;try{var k=Object.seal({}),l=Object.seal({}),m=new a([[k,2],[l,3]]);if(2!=m.get(k)||3!=m.get(l))return!1;m["delete"](k);m.set(l,4);return!m.has(k)&&4==m.get(l)}catch(q){return!1}}())return a;
var g="$jscomp_hidden_"+Math.random();f("freeze");f("preventExtensions");f("seal");var h=0;b.prototype.set=function(k,l){if(!d(k))throw Error("Invalid WeakMap key");e(k);if(!Ca(k,g))throw Error("WeakMap key fail: "+k);k[g][this.f]=l;return this};
b.prototype.get=function(k){return d(k)&&Ca(k,g)?k[g][this.f]:void 0};
b.prototype.has=function(k){return d(k)&&Ca(k,g)&&Ca(k[g],this.f)};
b.prototype["delete"]=function(k){return d(k)&&Ca(k,g)&&Ca(k[g],this.f)?delete k[g][this.f]:!1};
return b});
r("Map",function(a){function b(){var h={};return h.previous=h.next=h.head=h}
function c(h,k){var l=h.f;return ea(function(){if(l){for(;l.head!=h.f;)l=l.previous;for(;l.next!=l.head;)return l=l.next,{done:!1,value:k(l)};l=null}return{done:!0,value:void 0}})}
function d(h,k){var l=k&&typeof k;"object"==l||"function"==l?f.has(k)?l=f.get(k):(l=""+ ++g,f.set(k,l)):l="p_"+k;var m=h.g[l];if(m&&Ca(h.g,l))for(var q=0;q<m.length;q++){var t=m[q];if(k!==k&&t.key!==t.key||k===t.key)return{id:l,list:m,index:q,A:t}}return{id:l,list:m,index:-1,A:void 0}}
function e(h){this.g={};this.f=b();this.size=0;if(h){h=u(h);for(var k;!(k=h.next()).done;)k=k.value,this.set(k[0],k[1])}}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var h=Object.seal({x:4}),k=new a(u([[h,"s"]]));if("s"!=k.get(h)||1!=k.size||k.get({x:4})||k.set({x:4},"t")!=k||2!=k.size)return!1;var l=k.entries(),m=l.next();if(m.done||m.value[0]!=h||"s"!=m.value[1])return!1;m=l.next();return m.done||4!=m.value[0].x||"t"!=m.value[1]||!l.next().done?!1:!0}catch(q){return!1}}())return a;
var f=new WeakMap;e.prototype.set=function(h,k){h=0===h?0:h;var l=d(this,h);l.list||(l.list=this.g[l.id]=[]);l.A?l.A.value=k:(l.A={next:this.f,previous:this.f.previous,head:this.f,key:h,value:k},l.list.push(l.A),this.f.previous.next=l.A,this.f.previous=l.A,this.size++);return this};
e.prototype["delete"]=function(h){h=d(this,h);return h.A&&h.list?(h.list.splice(h.index,1),h.list.length||delete this.g[h.id],h.A.previous.next=h.A.next,h.A.next.previous=h.A.previous,h.A.head=null,this.size--,!0):!1};
e.prototype.clear=function(){this.g={};this.f=this.f.previous=b();this.size=0};
e.prototype.has=function(h){return!!d(this,h).A};
e.prototype.get=function(h){return(h=d(this,h).A)&&h.value};
e.prototype.entries=function(){return c(this,function(h){return[h.key,h.value]})};
e.prototype.keys=function(){return c(this,function(h){return h.key})};
e.prototype.values=function(){return c(this,function(h){return h.value})};
e.prototype.forEach=function(h,k){for(var l=this.entries(),m;!(m=l.next()).done;)m=m.value,h.call(k,m[1],m[0],this)};
e.prototype[Symbol.iterator]=e.prototype.entries;var g=0;return e});
r("Object.entries",function(a){return a?a:function(b){var c=[],d;for(d in b)Ca(b,d)&&c.push([d,b[d]]);return c}});
r("String.prototype.includes",function(a){return a?a:function(b,c){return-1!==Ba(this,b,"includes").indexOf(b,c||0)}});
r("Set",function(a){function b(c){this.f=new Map;if(c){c=u(c);for(var d;!(d=c.next()).done;)this.add(d.value)}this.size=this.f.size}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var c=Object.seal({x:4}),d=new a(u([c]));if(!d.has(c)||1!=d.size||d.add(c)!=d||1!=d.size||d.add({x:4})!=d||2!=d.size)return!1;var e=d.entries(),f=e.next();if(f.done||f.value[0]!=c||f.value[1]!=c)return!1;f=e.next();return f.done||f.value[0]==c||4!=f.value[0].x||f.value[1]!=f.value[0]?!1:e.next().done}catch(g){return!1}}())return a;
b.prototype.add=function(c){c=0===c?0:c;this.f.set(c,c);this.size=this.f.size;return this};
b.prototype["delete"]=function(c){c=this.f["delete"](c);this.size=this.f.size;return c};
b.prototype.clear=function(){this.f.clear();this.size=0};
b.prototype.has=function(c){return this.f.has(c)};
b.prototype.entries=function(){return this.f.entries()};
b.prototype.values=function(){return this.f.values()};
b.prototype.keys=b.prototype.values;b.prototype[Symbol.iterator]=b.prototype.values;b.prototype.forEach=function(c,d){var e=this;this.f.forEach(function(f){return c.call(d,f,f,e)})};
return b});
var y=this||self;function z(a,b,c){a=a.split(".");c=c||y;a[0]in c||"undefined"==typeof c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b}
var Ea=/^[\w+/_-]+[=]{0,2}$/,Fa=null;function Ga(a){return(a=a.querySelector&&a.querySelector("script[nonce]"))&&(a=a.nonce||a.getAttribute("nonce"))&&Ea.test(a)?a:""}
function A(a,b){for(var c=a.split("."),d=b||y,e=0;e<c.length;e++)if(d=d[c[e]],null==d)return null;return d}
function Ha(){}
function Ia(a){a.ka=void 0;a.getInstance=function(){return a.ka?a.ka:a.ka=new a}}
function Ja(a){var b=typeof a;return"object"!=b?b:a?Array.isArray(a)?"array":b:"null"}
function Ka(a){var b=Ja(a);return"array"==b||"object"==b&&"number"==typeof a.length}
function La(a){return"function"==Ja(a)}
function Ma(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
function Na(a){return Object.prototype.hasOwnProperty.call(a,Pa)&&a[Pa]||(a[Pa]=++Qa)}
var Pa="closure_uid_"+(1E9*Math.random()>>>0),Qa=0;function Ra(a,b,c){return a.call.apply(a.bind,arguments)}
function Sa(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}}
function B(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?B=Ra:B=Sa;return B.apply(null,arguments)}
function Ta(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();d.push.apply(d,arguments);return a.apply(this,d)}}
var C=Date.now;function Ua(a,b){z(a,b,void 0)}
function E(a,b){function c(){}
c.prototype=b.prototype;a.N=b.prototype;a.prototype=new c;a.prototype.constructor=a}
function Va(a){return a}
;function F(a){if(Error.captureStackTrace)Error.captureStackTrace(this,F);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}
E(F,Error);F.prototype.name="CustomError";function Wa(a){a=a.url;var b=/[?&]dsh=1(&|$)/.test(a);this.h=!b&&/[?&]ae=1(&|$)/.test(a);this.i=!b&&/[?&]ae=2(&|$)/.test(a);if((this.f=/[?&]adurl=([^&]*)/.exec(a))&&this.f[1]){try{var c=decodeURIComponent(this.f[1])}catch(d){c=null}this.g=c}}
;function Xa(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}
;var Ya=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if("string"===typeof a)return"string"!==typeof b||1!=b.length?-1:a.indexOf(b,0);
for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},G=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e="string"===typeof a?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Za=Array.prototype.filter?function(a,b){return Array.prototype.filter.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=[],e=0,f="string"===typeof a?a.split(""):a,g=0;g<c;g++)if(g in f){var h=f[g];
b.call(void 0,h,g,a)&&(d[e++]=h)}return d},$a=Array.prototype.map?function(a,b){return Array.prototype.map.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=Array(c),e="string"===typeof a?a.split(""):a,f=0;f<c;f++)f in e&&(d[f]=b.call(void 0,e[f],f,a));
return d},ab=Array.prototype.reduce?function(a,b,c){return Array.prototype.reduce.call(a,b,c)}:function(a,b,c){var d=c;
G(a,function(e,f){d=b.call(void 0,d,e,f,a)});
return d};
function bb(a,b){a:{var c=a.length;for(var d="string"===typeof a?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){c=e;break a}c=-1}return 0>c?null:"string"===typeof a?a.charAt(c):a[c]}
function cb(a,b){var c=Ya(a,b);0<=c&&Array.prototype.splice.call(a,c,1)}
function db(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}
function eb(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(Ka(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}}
;function fb(a,b){for(var c in a)b.call(void 0,a[c],c,a)}
function gb(a,b){var c=Ka(b),d=c?b:arguments;for(c=c?0:1;c<d.length;c++){if(null==a)return;a=a[d[c]]}return a}
function hb(a){var b=ib,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
function jb(a){for(var b in a)return!1;return!0}
function kb(a,b){if(null!==a&&b in a)throw Error('The object already contains the key "'+b+'"');a[b]=!0}
function lb(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(var d in b)if(!(d in a))return!1;return!0}
function mb(a){var b={},c;for(c in a)b[c]=a[c];return b}
function nb(a){var b=Ja(a);if("object"==b||"array"==b){if(La(a.clone))return a.clone();b="array"==b?[]:{};for(var c in a)b[c]=nb(a[c]);return b}return a}
var ob="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function pb(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<ob.length;f++)c=ob[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;var qb;function rb(){if(void 0===qb){var a=null,b=y.trustedTypes;if(b&&b.createPolicy){try{a=b.createPolicy("goog#html",{createHTML:Va,createScript:Va,createScriptURL:Va})}catch(c){y.console&&y.console.error(c.message)}qb=a}else qb=a}return qb}
;function sb(a,b){this.f=a===tb&&b||"";this.g=ub}
sb.prototype.L=!0;sb.prototype.K=function(){return this.f};
function vb(a){return a instanceof sb&&a.constructor===sb&&a.g===ub?a.f:"type_error:Const"}
var ub={},tb={};function wb(a,b){this.f=a===xb&&b||"";this.g=yb}
wb.prototype.L=!0;wb.prototype.K=function(){return this.f.toString()};
wb.prototype.ja=!0;wb.prototype.ga=function(){return 1};
function zb(a){if(a instanceof wb&&a.constructor===wb&&a.g===yb)return a.f;Ja(a);return"type_error:TrustedResourceUrl"}
var yb={};function Ab(a){var b=rb();a=b?b.createScriptURL(a):a;return new wb(xb,a)}
var xb={};var Bb=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};
function Cb(a,b){if(b)a=a.replace(Db,"&amp;").replace(Eb,"&lt;").replace(Fb,"&gt;").replace(Gb,"&quot;").replace(Hb,"&#39;").replace(Ib,"&#0;");else{if(!Jb.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(Db,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(Eb,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(Fb,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(Gb,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(Hb,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(Ib,"&#0;"))}return a}
var Db=/&/g,Eb=/</g,Fb=/>/g,Gb=/"/g,Hb=/'/g,Ib=/\x00/g,Jb=/[\x00&<>"']/;function H(a,b){this.f=a===Kb&&b||"";this.g=Lb}
H.prototype.L=!0;H.prototype.K=function(){return this.f.toString()};
H.prototype.ja=!0;H.prototype.ga=function(){return 1};
function Mb(a){if(a instanceof H&&a.constructor===H&&a.g===Lb)return a.f;Ja(a);return"type_error:SafeUrl"}
var Nb=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;function Ob(a){if(a instanceof H)return a;a="object"==typeof a&&a.L?a.K():String(a);Nb.test(a)||(a="about:invalid#zClosurez");return new H(Kb,a)}
var Lb={},Pb=new H(Kb,"about:invalid#zClosurez"),Kb={};var Qb;a:{var Rb=y.navigator;if(Rb){var Sb=Rb.userAgent;if(Sb){Qb=Sb;break a}}Qb=""}function I(a){return-1!=Qb.indexOf(a)}
;function Tb(){this.f="";this.h=Vb;this.g=null}
Tb.prototype.ja=!0;Tb.prototype.ga=function(){return this.g};
Tb.prototype.L=!0;Tb.prototype.K=function(){return this.f.toString()};
var Vb={};function Wb(a,b){var c=new Tb,d=rb();c.f=d?d.createHTML(a):a;c.g=b;return c}
;function Xb(a,b){var c=b instanceof H?b:Ob(b);a.href=Mb(c)}
function Yb(a,b){a.src=zb(b);var c;(c=a.ownerDocument&&a.ownerDocument.defaultView)&&c!=y?c=Ga(c.document):(null===Fa&&(Fa=Ga(y.document)),c=Fa);c&&a.setAttribute("nonce",c)}
;function Zb(a){return a=Cb(a,void 0)}
function $b(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b}
;var ac=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function J(a){return a?decodeURI(a):a}
function K(a,b){return b.match(ac)[a]||null}
function bc(a,b,c){if(Array.isArray(b))for(var d=0;d<b.length;d++)bc(a,String(b[d]),c);else null!=b&&c.push(a+(""===b?"":"="+encodeURIComponent(String(b))))}
function cc(a){var b=[],c;for(c in a)bc(c,a[c],b);return b.join("&")}
function dc(a,b){var c=cc(b);if(c){var d=a.indexOf("#");0>d&&(d=a.length);var e=a.indexOf("?");if(0>e||e>d){e=d;var f=""}else f=a.substring(e+1,d);d=[a.substr(0,e),f,a.substr(d)];e=d[1];d[1]=c?e?e+"&"+c:c:e;c=d[0]+(d[1]?"?"+d[1]:"")+d[2]}else c=a;return c}
var ec=/#|$/;function fc(a,b){var c=a.search(ec);a:{var d=0;for(var e=b.length;0<=(d=a.indexOf(b,d))&&d<c;){var f=a.charCodeAt(d-1);if(38==f||63==f)if(f=a.charCodeAt(d+e),!f||61==f||38==f||35==f)break a;d+=e+1}d=-1}if(0>d)return null;e=a.indexOf("&",d);if(0>e||e>c)e=c;d+=b.length+1;return decodeURIComponent(a.substr(d,e-d).replace(/\+/g," "))}
;var gc=I("Opera"),hc=I("Trident")||I("MSIE"),ic=I("Edge"),jc=I("Gecko")&&!(-1!=Qb.toLowerCase().indexOf("webkit")&&!I("Edge"))&&!(I("Trident")||I("MSIE"))&&!I("Edge"),kc=-1!=Qb.toLowerCase().indexOf("webkit")&&!I("Edge");function lc(){var a=y.document;return a?a.documentMode:void 0}
var mc;a:{var nc="",oc=function(){var a=Qb;if(jc)return/rv:([^\);]+)(\)|;)/.exec(a);if(ic)return/Edge\/([\d\.]+)/.exec(a);if(hc)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(kc)return/WebKit\/(\S+)/.exec(a);if(gc)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
oc&&(nc=oc?oc[1]:"");if(hc){var pc=lc();if(null!=pc&&pc>parseFloat(nc)){mc=String(pc);break a}}mc=nc}var qc=mc,rc;if(y.document&&hc){var sc=lc();rc=sc?sc:parseInt(qc,10)||void 0}else rc=void 0;var tc=rc;var uc={},vc=null;var L=window;function wc(a){var b=A("window.location.href");null==a&&(a='Unknown Error of type "null/undefined"');if("string"===typeof a)return{message:a,name:"Unknown error",lineNumber:"Not available",fileName:b,stack:"Not available"};var c=!1;try{var d=a.lineNumber||a.line||"Not available"}catch(f){d="Not available",c=!0}try{var e=a.fileName||a.filename||a.sourceURL||y.$googDebugFname||b}catch(f){e="Not available",c=!0}return!c&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name?a:(b=a.message,null==b&&(a.constructor&&
a.constructor instanceof Function?(a.constructor.name?b=a.constructor.name:(b=a.constructor,xc[b]?b=xc[b]:(b=String(b),xc[b]||(c=/function\s+([^\(]+)/m.exec(b),xc[b]=c?c[1]:"[Anonymous]"),b=xc[b])),b='Unknown Error of type "'+b+'"'):b="Unknown Error of unknown type"),{message:b,name:a.name||"UnknownError",lineNumber:d,fileName:e,stack:a.stack||"Not available"})}
var xc={};function yc(a){this.f=a||{cookie:""}}
n=yc.prototype;n.isEnabled=function(){return navigator.cookieEnabled};
n.set=function(a,b,c){var d=!1;if("object"===typeof c){var e=c.Bb;d=c.secure||!1;var f=c.domain||void 0;var g=c.path||void 0;var h=c.sa}if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');void 0===h&&(h=-1);c=f?";domain="+f:"";g=g?";path="+g:"";d=d?";secure":"";h=0>h?"":0==h?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(C()+1E3*h)).toUTCString();this.f.cookie=a+"="+b+c+g+h+d+(null!=e?";samesite="+e:
"")};
n.get=function(a,b){for(var c=a+"=",d=(this.f.cookie||"").split(";"),e=0,f;e<d.length;e++){f=Bb(d[e]);if(0==f.lastIndexOf(c,0))return f.substr(c.length);if(f==a)return""}return b};
n.remove=function(a,b,c){var d=void 0!==this.get(a);this.set(a,"",{sa:0,path:b,domain:c});return d};
n.isEmpty=function(){return!this.f.cookie};
n.clear=function(){for(var a=(this.f.cookie||"").split(";"),b=[],c=[],d,e,f=0;f<a.length;f++)e=Bb(a[f]),d=e.indexOf("="),-1==d?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));for(a=b.length-1;0<=a;a--)this.remove(b[a])};
var zc=new yc("undefined"==typeof document?null:document);var Ac=!hc||9<=Number(tc);function Bc(a,b){this.x=void 0!==a?a:0;this.y=void 0!==b?b:0}
n=Bc.prototype;n.clone=function(){return new Bc(this.x,this.y)};
n.equals=function(a){return a instanceof Bc&&(this==a?!0:this&&a?this.x==a.x&&this.y==a.y:!1)};
n.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};
n.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};
n.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};function Cc(a,b){this.width=a;this.height=b}
n=Cc.prototype;n.clone=function(){return new Cc(this.width,this.height)};
n.aspectRatio=function(){return this.width/this.height};
n.isEmpty=function(){return!(this.width*this.height)};
n.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
n.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
n.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function Dc(a){var b=document;return"string"===typeof a?b.getElementById(a):a}
function Ec(a,b){fb(b,function(c,d){c&&"object"==typeof c&&c.L&&(c=c.K());"style"==d?a.style.cssText=c:"class"==d?a.className=c:"for"==d?a.htmlFor=c:Fc.hasOwnProperty(d)?a.setAttribute(Fc[d],c):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,c):a[d]=c})}
var Fc={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};
function Gc(a,b,c){var d=arguments,e=document,f=String(d[0]),g=d[1];if(!Ac&&g&&(g.name||g.type)){f=["<",f];g.name&&f.push(' name="',Zb(g.name),'"');if(g.type){f.push(' type="',Zb(g.type),'"');var h={};pb(h,g);delete h.type;g=h}f.push(">");f=f.join("")}f=Hc(e,f);g&&("string"===typeof g?f.className=g:Array.isArray(g)?f.className=g.join(" "):Ec(f,g));2<d.length&&Ic(e,f,d);return f}
function Ic(a,b,c){function d(g){g&&b.appendChild("string"===typeof g?a.createTextNode(g):g)}
for(var e=2;e<c.length;e++){var f=c[e];!Ka(f)||Ma(f)&&0<f.nodeType?d(f):G(Jc(f)?db(f):f,d)}}
function Hc(a,b){b=String(b);"application/xhtml+xml"===a.contentType&&(b=b.toLowerCase());return a.createElement(b)}
function Jc(a){if(a&&"number"==typeof a.length){if(Ma(a))return"function"==typeof a.item||"string"==typeof a.item;if(La(a))return"function"==typeof a.item}return!1}
function Kc(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null}
;function Lc(a){Mc();return Ab(a)}
var Mc=Ha;function Nc(a){var b=Oc;if(b)for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&a.call(void 0,b[c],c,b)}
function Pc(){var a=[];Nc(function(b){a.push(b)});
return a}
var Oc={hb:"allow-forms",ib:"allow-modals",jb:"allow-orientation-lock",kb:"allow-pointer-lock",lb:"allow-popups",mb:"allow-popups-to-escape-sandbox",nb:"allow-presentation",ob:"allow-same-origin",pb:"allow-scripts",qb:"allow-top-navigation",rb:"allow-top-navigation-by-user-activation"},Qc=Xa(function(){return Pc()});
function Rc(){var a=Hc(document,"IFRAME"),b={};G(Qc(),function(c){a.sandbox&&a.sandbox.supports&&a.sandbox.supports(c)&&(b[c]=!0)});
return b}
;function M(){this.g=this.g;this.B=this.B}
M.prototype.g=!1;M.prototype.dispose=function(){this.g||(this.g=!0,this.o())};
function Sc(a,b){a.g?b():(a.B||(a.B=[]),a.B.push(b))}
M.prototype.o=function(){if(this.B)for(;this.B.length;)this.B.shift()()};
function Tc(a){a&&"function"==typeof a.dispose&&a.dispose()}
function Uc(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];Ka(d)?Uc.apply(null,d):Tc(d)}}
;function O(a,b){var c=void 0;return new (c||(c=Promise))(function(d,e){function f(k){try{h(b.next(k))}catch(l){e(l)}}
function g(k){try{h(b["throw"](k))}catch(l){e(l)}}
function h(k){k.done?d(k.value):(new c(function(l){l(k.value)})).then(f,g)}
h((b=b.apply(a,void 0)).next())})}
;function Vc(a){"number"==typeof a&&(a=Math.round(a)+"px");return a}
;Ab(vb(new sb(tb,"//fonts.googleapis.com/css")));var Wc=(new Date).getTime();function Xc(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));a=a.substring(0,a.indexOf("://"));if("http"!==a&&"https"!==a&&"chrome-extension"!==a&&"file"!==a&&"android-app"!==a&&"chrome-search"!==a&&"chrome-untrusted"!==a&&"chrome"!==a&&"app"!==a)throw Error("Invalid URI scheme in origin: "+a);c="";
var d=b.indexOf(":");if(-1!=d){var e=b.substring(d+1);b=b.substring(0,d);if("http"===a&&"80"!==e||"https"===a&&"443"!==e)c=":"+e}return a+"://"+b+c}
;function Yc(){function a(){e[0]=1732584193;e[1]=4023233417;e[2]=2562383102;e[3]=271733878;e[4]=3285377520;m=l=0}
function b(q){for(var t=g,p=0;64>p;p+=4)t[p/4]=q[p]<<24|q[p+1]<<16|q[p+2]<<8|q[p+3];for(p=16;80>p;p++)q=t[p-3]^t[p-8]^t[p-14]^t[p-16],t[p]=(q<<1|q>>>31)&4294967295;q=e[0];var D=e[1],N=e[2],pa=e[3],ed=e[4];for(p=0;80>p;p++){if(40>p)if(20>p){var Oa=pa^D&(N^pa);var Ub=1518500249}else Oa=D^N^pa,Ub=1859775393;else 60>p?(Oa=D&N|pa&(D|N),Ub=2400959708):(Oa=D^N^pa,Ub=3395469782);Oa=((q<<5|q>>>27)&4294967295)+Oa+ed+Ub+t[p]&4294967295;ed=pa;pa=N;N=(D<<30|D>>>2)&4294967295;D=q;q=Oa}e[0]=e[0]+q&4294967295;e[1]=
e[1]+D&4294967295;e[2]=e[2]+N&4294967295;e[3]=e[3]+pa&4294967295;e[4]=e[4]+ed&4294967295}
function c(q,t){if("string"===typeof q){q=unescape(encodeURIComponent(q));for(var p=[],D=0,N=q.length;D<N;++D)p.push(q.charCodeAt(D));q=p}t||(t=q.length);p=0;if(0==l)for(;p+64<t;)b(q.slice(p,p+64)),p+=64,m+=64;for(;p<t;)if(f[l++]=q[p++],m++,64==l)for(l=0,b(f);p+64<t;)b(q.slice(p,p+64)),p+=64,m+=64}
function d(){var q=[],t=8*m;56>l?c(h,56-l):c(h,64-(l-56));for(var p=63;56<=p;p--)f[p]=t&255,t>>>=8;b(f);for(p=t=0;5>p;p++)for(var D=24;0<=D;D-=8)q[t++]=e[p]>>D&255;return q}
for(var e=[],f=[],g=[],h=[128],k=1;64>k;++k)h[k]=0;var l,m;a();return{reset:a,update:c,digest:d,Da:function(){for(var q=d(),t="",p=0;p<q.length;p++)t+="0123456789ABCDEF".charAt(Math.floor(q[p]/16))+"0123456789ABCDEF".charAt(q[p]%16);return t}}}
;function Zc(a,b,c){var d=[],e=[];if(1==(Array.isArray(c)?2:1))return e=[b,a],G(d,function(h){e.push(h)}),$c(e.join(" "));
var f=[],g=[];G(c,function(h){g.push(h.key);f.push(h.value)});
c=Math.floor((new Date).getTime()/1E3);e=0==f.length?[c,b,a]:[f.join(":"),c,b,a];G(d,function(h){e.push(h)});
a=$c(e.join(" "));a=[c,a];0==g.length||a.push(g.join(""));return a.join("_")}
function $c(a){var b=Yc();b.update(a);return b.Da().toLowerCase()}
;function ad(a){var b=Xc(String(y.location.href)),c;(c=y.__SAPISID||y.__APISID||y.__OVERRIDE_SID)?c=!0:(c=new yc(document),c=c.get("SAPISID")||c.get("APISID")||c.get("__Secure-3PAPISID")||c.get("SID"),c=!!c);if(c&&(c=(b=0==b.indexOf("https:")||0==b.indexOf("chrome-extension:"))?y.__SAPISID:y.__APISID,c||(c=new yc(document),c=c.get(b?"SAPISID":"APISID")||c.get("__Secure-3PAPISID")),c)){b=b?"SAPISIDHASH":"APISIDHASH";var d=String(y.location.href);return d&&c&&b?[b,Zc(Xc(d),c,a||null)].join(" "):null}return null}
;function bd(){this.g=[];this.f=-1}
bd.prototype.set=function(a,b){b=void 0===b?!0:b;0<=a&&52>a&&0===a%1&&this.g[a]!=b&&(this.g[a]=b,this.f=-1)};
bd.prototype.get=function(a){return!!this.g[a]};
function cd(a){-1==a.f&&(a.f=ab(a.g,function(b,c,d){return c?b+Math.pow(2,d):b},0));
return a.f}
;function dd(a,b){this.h=a;this.i=b;this.g=0;this.f=null}
dd.prototype.get=function(){if(0<this.g){this.g--;var a=this.f;this.f=a.next;a.next=null}else a=this.h();return a};
function fd(a,b){a.i(b);100>a.g&&(a.g++,b.next=a.f,a.f=b)}
;function gd(a){y.setTimeout(function(){throw a;},0)}
var hd;
function id(){var a=y.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!I("Presto")&&(a=function(){var e=Hc(document,"IFRAME");e.style.display="none";document.documentElement.appendChild(e);var f=e.contentWindow;e=f.document;e.open();e.close();var g="callImmediate"+Math.random(),h="file:"==f.location.protocol?"*":f.location.protocol+"//"+f.location.host;e=B(function(k){if(("*"==h||k.origin==h)&&k.data==g)this.port1.onmessage()},this);
f.addEventListener("message",e,!1);this.port1={};this.port2={postMessage:function(){f.postMessage(g,h)}}});
if("undefined"!==typeof a&&!I("Trident")&&!I("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var e=c.qa;c.qa=null;e()}};
return function(e){d.next={qa:e};d=d.next;b.port2.postMessage(0)}}return function(e){y.setTimeout(e,0)}}
;function jd(){this.g=this.f=null}
var ld=new dd(function(){return new kd},function(a){a.reset()});
jd.prototype.add=function(a,b){var c=ld.get();c.set(a,b);this.g?this.g.next=c:this.f=c;this.g=c};
jd.prototype.remove=function(){var a=null;this.f&&(a=this.f,this.f=this.f.next,this.f||(this.g=null),a.next=null);return a};
function kd(){this.next=this.scope=this.f=null}
kd.prototype.set=function(a,b){this.f=a;this.scope=b;this.next=null};
kd.prototype.reset=function(){this.next=this.scope=this.f=null};function md(a,b){nd||od();pd||(nd(),pd=!0);qd.add(a,b)}
var nd;function od(){if(y.Promise&&y.Promise.resolve){var a=y.Promise.resolve(void 0);nd=function(){a.then(rd)}}else nd=function(){var b=rd;
!La(y.setImmediate)||y.Window&&y.Window.prototype&&!I("Edge")&&y.Window.prototype.setImmediate==y.setImmediate?(hd||(hd=id()),hd(b)):y.setImmediate(b)}}
var pd=!1,qd=new jd;function rd(){for(var a;a=qd.remove();){try{a.f.call(a.scope)}catch(b){gd(b)}fd(ld,a)}pd=!1}
;function sd(){this.g=-1}
;function td(){this.g=64;this.f=[];this.l=[];this.m=[];this.i=[];this.i[0]=128;for(var a=1;a<this.g;++a)this.i[a]=0;this.j=this.h=0;this.reset()}
E(td,sd);td.prototype.reset=function(){this.f[0]=1732584193;this.f[1]=4023233417;this.f[2]=2562383102;this.f[3]=271733878;this.f[4]=3285377520;this.j=this.h=0};
function ud(a,b,c){c||(c=0);var d=a.m;if("string"===typeof b)for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.f[0];c=a.f[1];var g=a.f[2],h=a.f[3],k=a.f[4];for(e=0;80>e;e++){if(40>e)if(20>e){f=h^c&(g^h);var l=1518500249}else f=c^g^h,l=1859775393;else 60>e?(f=c&g|h&(c|g),l=2400959708):
(f=c^g^h,l=3395469782);f=(b<<5|b>>>27)+f+k+l+d[e]&4294967295;k=h;h=g;g=(c<<30|c>>>2)&4294967295;c=b;b=f}a.f[0]=a.f[0]+b&4294967295;a.f[1]=a.f[1]+c&4294967295;a.f[2]=a.f[2]+g&4294967295;a.f[3]=a.f[3]+h&4294967295;a.f[4]=a.f[4]+k&4294967295}
td.prototype.update=function(a,b){if(null!=a){void 0===b&&(b=a.length);for(var c=b-this.g,d=0,e=this.l,f=this.h;d<b;){if(0==f)for(;d<=c;)ud(this,a,d),d+=this.g;if("string"===typeof a)for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.g){ud(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.g){ud(this,e);f=0;break}}this.h=f;this.j+=b}};
td.prototype.digest=function(){var a=[],b=8*this.j;56>this.h?this.update(this.i,56-this.h):this.update(this.i,this.g-(this.h-56));for(var c=this.g-1;56<=c;c--)this.l[c]=b&255,b/=256;ud(this,this.l);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.f[c]>>d&255,++b;return a};function vd(a){return"string"==typeof a.className?a.className:a.getAttribute&&a.getAttribute("class")||""}
function wd(a,b){"string"==typeof a.className?a.className=b:a.setAttribute&&a.setAttribute("class",b)}
function xd(a,b){if(a.classList)var c=a.classList.contains(b);else c=a.classList?a.classList:vd(a).match(/\S+/g)||[],c=0<=Ya(c,b);return c}
function yd(){var a=document.body;a.classList?a.classList.remove("inverted-hdpi"):xd(a,"inverted-hdpi")&&wd(a,Za(a.classList?a.classList:vd(a).match(/\S+/g)||[],function(b){return"inverted-hdpi"!=b}).join(" "))}
;var zd="StopIteration"in y?y.StopIteration:{message:"StopIteration",stack:""};function Ad(){}
Ad.prototype.next=function(){throw zd;};
Ad.prototype.I=function(){return this};
function Bd(a){if(a instanceof Ad)return a;if("function"==typeof a.I)return a.I(!1);if(Ka(a)){var b=0,c=new Ad;c.next=function(){for(;;){if(b>=a.length)throw zd;if(b in a)return a[b++];b++}};
return c}throw Error("Not implemented");}
function Cd(a,b){if(Ka(a))try{G(a,b,void 0)}catch(c){if(c!==zd)throw c;}else{a=Bd(a);try{for(;;)b.call(void 0,a.next(),void 0,a)}catch(c){if(c!==zd)throw c;}}}
function Dd(a){if(Ka(a))return db(a);a=Bd(a);var b=[];Cd(a,function(c){b.push(c)});
return b}
;function Ed(a,b){this.h={};this.f=[];this.J=this.g=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a)if(a instanceof Ed)for(c=Fd(a),d=0;d<c.length;d++)this.set(c[d],a.get(c[d]));else for(d in a)this.set(d,a[d])}
function Fd(a){Gd(a);return a.f.concat()}
n=Ed.prototype;n.equals=function(a,b){if(this===a)return!0;if(this.g!=a.g)return!1;var c=b||Hd;Gd(this);for(var d,e=0;d=this.f[e];e++)if(!c(this.get(d),a.get(d)))return!1;return!0};
function Hd(a,b){return a===b}
n.isEmpty=function(){return 0==this.g};
n.clear=function(){this.h={};this.J=this.g=this.f.length=0};
n.remove=function(a){return Object.prototype.hasOwnProperty.call(this.h,a)?(delete this.h[a],this.g--,this.J++,this.f.length>2*this.g&&Gd(this),!0):!1};
function Gd(a){if(a.g!=a.f.length){for(var b=0,c=0;b<a.f.length;){var d=a.f[b];Object.prototype.hasOwnProperty.call(a.h,d)&&(a.f[c++]=d);b++}a.f.length=c}if(a.g!=a.f.length){var e={};for(c=b=0;b<a.f.length;)d=a.f[b],Object.prototype.hasOwnProperty.call(e,d)||(a.f[c++]=d,e[d]=1),b++;a.f.length=c}}
n.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.h,a)?this.h[a]:b};
n.set=function(a,b){Object.prototype.hasOwnProperty.call(this.h,a)||(this.g++,this.f.push(a),this.J++);this.h[a]=b};
n.forEach=function(a,b){for(var c=Fd(this),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};
n.clone=function(){return new Ed(this)};
n.I=function(a){Gd(this);var b=0,c=this.J,d=this,e=new Ad;e.next=function(){if(c!=d.J)throw Error("The map has changed since the iterator was created");if(b>=d.f.length)throw zd;var f=d.f[b++];return a?f:d.h[f]};
return e};function Id(a){var b=[];Jd(new Kd,a,b);return b.join("")}
function Kd(){}
function Jd(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(Array.isArray(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),Jd(a,d[f],c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");e="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(f=b[d],"function"!=typeof f&&(c.push(e),Ld(d,c),c.push(":"),Jd(a,f,c),e=","));c.push("}");return}}switch(typeof b){case "string":Ld(b,c);break;case "number":c.push(isFinite(b)&&
!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}
var Md={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Nd=/\uffff/.test("\uffff")?/[\\"\x00-\x1f\x7f-\uffff]/g:/[\\"\x00-\x1f\x7f-\xff]/g;function Ld(a,b){b.push('"',a.replace(Nd,function(c){var d=Md[c];d||(d="\\u"+(c.charCodeAt(0)|65536).toString(16).substr(1),Md[c]=d);return d}),'"')}
;function Od(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}}
;function P(a){this.f=0;this.m=void 0;this.i=this.g=this.h=null;this.j=this.l=!1;if(a!=Ha)try{var b=this;a.call(void 0,function(c){Pd(b,2,c)},function(c){Pd(b,3,c)})}catch(c){Pd(this,3,c)}}
function Qd(){this.next=this.context=this.onRejected=this.g=this.f=null;this.h=!1}
Qd.prototype.reset=function(){this.context=this.onRejected=this.g=this.f=null;this.h=!1};
var Rd=new dd(function(){return new Qd},function(a){a.reset()});
function Sd(a,b,c){var d=Rd.get();d.g=a;d.onRejected=b;d.context=c;return d}
function Td(){var a=Ud;if(a instanceof P)return a;var b=new P(Ha);Pd(b,2,a);return b}
function Vd(a){return new P(function(b,c){c(a)})}
P.prototype.then=function(a,b,c){return Wd(this,La(a)?a:null,La(b)?b:null,c)};
P.prototype.$goog_Thenable=!0;function Xd(a,b){return Wd(a,null,b,void 0)}
P.prototype.cancel=function(a){if(0==this.f){var b=new Yd(a);md(function(){Zd(this,b)},this)}};
function Zd(a,b){if(0==a.f)if(a.h){var c=a.h;if(c.g){for(var d=0,e=null,f=null,g=c.g;g&&(g.h||(d++,g.f==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.f&&1==d?Zd(c,b):(f?(d=f,d.next==c.i&&(c.i=d),d.next=d.next.next):$d(c),ae(c,e,3,b)))}a.h=null}else Pd(a,3,b)}
function be(a,b){a.g||2!=a.f&&3!=a.f||ce(a);a.i?a.i.next=b:a.g=b;a.i=b}
function Wd(a,b,c,d){var e=Sd(null,null,null);e.f=new P(function(f,g){e.g=b?function(h){try{var k=b.call(d,h);f(k)}catch(l){g(l)}}:f;
e.onRejected=c?function(h){try{var k=c.call(d,h);void 0===k&&h instanceof Yd?g(h):f(k)}catch(l){g(l)}}:g});
e.f.h=a;be(a,e);return e.f}
P.prototype.u=function(a){this.f=0;Pd(this,2,a)};
P.prototype.C=function(a){this.f=0;Pd(this,3,a)};
function Pd(a,b,c){if(0==a.f){a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.f=1;a:{var d=c,e=a.u,f=a.C;if(d instanceof P){be(d,Sd(e||Ha,f||null,a));var g=!0}else if(Od(d))d.then(e,f,a),g=!0;else{if(Ma(d))try{var h=d.then;if(La(h)){de(d,h,e,f,a);g=!0;break a}}catch(k){f.call(a,k);g=!0;break a}g=!1}}g||(a.m=c,a.f=b,a.h=null,ce(a),3!=b||c instanceof Yd||ee(a,c))}}
function de(a,b,c,d,e){function f(k){h||(h=!0,d.call(e,k))}
function g(k){h||(h=!0,c.call(e,k))}
var h=!1;try{b.call(a,g,f)}catch(k){f(k)}}
function ce(a){a.l||(a.l=!0,md(a.B,a))}
function $d(a){var b=null;a.g&&(b=a.g,a.g=b.next,b.next=null);a.g||(a.i=null);return b}
P.prototype.B=function(){for(var a;a=$d(this);)ae(this,a,this.f,this.m);this.l=!1};
function ae(a,b,c,d){if(3==c&&b.onRejected&&!b.h)for(;a&&a.j;a=a.h)a.j=!1;if(b.f)b.f.h=null,fe(b,c,d);else try{b.h?b.g.call(b.context):fe(b,c,d)}catch(e){ge.call(null,e)}fd(Rd,b)}
function fe(a,b,c){2==b?a.g.call(a.context,c):a.onRejected&&a.onRejected.call(a.context,c)}
function ee(a,b){a.j=!0;md(function(){a.j&&ge.call(null,b)})}
var ge=gd;function Yd(a){F.call(this,a)}
E(Yd,F);Yd.prototype.name="cancel";function Q(a){M.call(this);this.l=1;this.i=[];this.j=0;this.f=[];this.h={};this.m=!!a}
E(Q,M);n=Q.prototype;n.subscribe=function(a,b,c){var d=this.h[a];d||(d=this.h[a]=[]);var e=this.l;this.f[e]=a;this.f[e+1]=b;this.f[e+2]=c;this.l=e+3;d.push(e);return e};
function he(a,b,c,d){if(b=a.h[b]){var e=a.f;(b=bb(b,function(f){return e[f+1]==c&&e[f+2]==d}))&&a.P(b)}}
n.P=function(a){var b=this.f[a];if(b){var c=this.h[b];0!=this.j?(this.i.push(a),this.f[a+1]=Ha):(c&&cb(c,a),delete this.f[a],delete this.f[a+1],delete this.f[a+2])}return!!b};
n.O=function(a,b){var c=this.h[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.m)for(e=0;e<c.length;e++){var g=c[e];ie(this.f[g+1],this.f[g+2],d)}else{this.j++;try{for(e=0,f=c.length;e<f;e++)g=c[e],this.f[g+1].apply(this.f[g+2],d)}finally{if(this.j--,0<this.i.length&&0==this.j)for(;c=this.i.pop();)this.P(c)}}return 0!=e}return!1};
function ie(a,b,c){md(function(){a.apply(b,c)})}
n.clear=function(a){if(a){var b=this.h[a];b&&(G(b,this.P,this),delete this.h[a])}else this.f.length=0,this.h={}};
n.o=function(){Q.N.o.call(this);this.clear();this.i.length=0};function je(a){this.f=a}
je.prototype.set=function(a,b){void 0===b?this.f.remove(a):this.f.set(a,Id(b))};
je.prototype.get=function(a){try{var b=this.f.get(a)}catch(c){return}if(null!==b)try{return JSON.parse(b)}catch(c){throw"Storage: Invalid value was encountered";}};
je.prototype.remove=function(a){this.f.remove(a)};function ke(a){this.f=a}
E(ke,je);function le(a){this.data=a}
function me(a){return void 0===a||a instanceof le?a:new le(a)}
ke.prototype.set=function(a,b){ke.N.set.call(this,a,me(b))};
ke.prototype.g=function(a){a=ke.N.get.call(this,a);if(void 0===a||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
ke.prototype.get=function(a){if(a=this.g(a)){if(a=a.data,void 0===a)throw"Storage: Invalid value was encountered";}else a=void 0;return a};function ne(a){this.f=a}
E(ne,ke);ne.prototype.set=function(a,b,c){if(b=me(b)){if(c){if(c<C()){ne.prototype.remove.call(this,a);return}b.expiration=c}b.creation=C()}ne.N.set.call(this,a,b)};
ne.prototype.g=function(a){var b=ne.N.g.call(this,a);if(b){var c=b.creation,d=b.expiration;if(d&&d<C()||c&&c>C())ne.prototype.remove.call(this,a);else return b}};function oe(){}
;function pe(){}
E(pe,oe);pe.prototype.clear=function(){var a=Dd(this.I(!0)),b=this;G(a,function(c){b.remove(c)})};function qe(a){this.f=a}
E(qe,pe);n=qe.prototype;n.isAvailable=function(){if(!this.f)return!1;try{return this.f.setItem("__sak","1"),this.f.removeItem("__sak"),!0}catch(a){return!1}};
n.set=function(a,b){try{this.f.setItem(a,b)}catch(c){if(0==this.f.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
n.get=function(a){a=this.f.getItem(a);if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
n.remove=function(a){this.f.removeItem(a)};
n.I=function(a){var b=0,c=this.f,d=new Ad;d.next=function(){if(b>=c.length)throw zd;var e=c.key(b++);if(a)return e;e=c.getItem(e);if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return e};
return d};
n.clear=function(){this.f.clear()};
n.key=function(a){return this.f.key(a)};function re(){var a=null;try{a=window.localStorage||null}catch(b){}this.f=a}
E(re,qe);function se(a,b){this.g=a;this.f=null;if(hc&&!(9<=Number(tc))){te||(te=new Ed);this.f=te.get(a);this.f||(b?this.f=document.getElementById(b):(this.f=document.createElement("userdata"),this.f.addBehavior("#default#userData"),document.body.appendChild(this.f)),te.set(a,this.f));try{this.f.load(this.g)}catch(c){this.f=null}}}
E(se,pe);var ue={".":".2E","!":".21","~":".7E","*":".2A","'":".27","(":".28",")":".29","%":"."},te=null;function ve(a){return"_"+encodeURIComponent(a).replace(/[.!~*'()%]/g,function(b){return ue[b]})}
n=se.prototype;n.isAvailable=function(){return!!this.f};
n.set=function(a,b){this.f.setAttribute(ve(a),b);we(this)};
n.get=function(a){a=this.f.getAttribute(ve(a));if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
n.remove=function(a){this.f.removeAttribute(ve(a));we(this)};
n.I=function(a){var b=0,c=this.f.XMLDocument.documentElement.attributes,d=new Ad;d.next=function(){if(b>=c.length)throw zd;var e=c[b++];if(a)return decodeURIComponent(e.nodeName.replace(/\./g,"%")).substr(1);e=e.nodeValue;if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return e};
return d};
n.clear=function(){for(var a=this.f.XMLDocument.documentElement,b=a.attributes.length;0<b;b--)a.removeAttribute(a.attributes[b-1].nodeName);we(this)};
function we(a){try{a.f.save(a.g)}catch(b){throw"Storage mechanism: Quota exceeded";}}
;function xe(a,b){this.g=a;this.f=b+"::"}
E(xe,pe);xe.prototype.set=function(a,b){this.g.set(this.f+a,b)};
xe.prototype.get=function(a){return this.g.get(this.f+a)};
xe.prototype.remove=function(a){this.g.remove(this.f+a)};
xe.prototype.I=function(a){var b=this.g.I(!0),c=this,d=new Ad;d.next=function(){for(var e=b.next();e.substr(0,c.f.length)!=c.f;)e=b.next();return a?e.substr(c.f.length):c.g.get(e)};
return d};function ye(a,b){1<b.length?a[b[0]]=b[1]:1===b.length&&Object.assign(a,b[0])}
;var ze=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};z("yt.config_",ze,void 0);function R(a){ye(ze,arguments)}
function S(a,b){return a in ze?ze[a]:b}
function Ae(){return S("PLAYER_CONFIG",{})}
function Be(a){var b=ze.EXPERIMENT_FLAGS;return b?b[a]:void 0}
;function Ce(){var a=De;A("yt.ads.biscotti.getId_")||z("yt.ads.biscotti.getId_",a,void 0)}
function Ee(a){z("yt.ads.biscotti.lastId_",a,void 0)}
;var Fe=[];function Ge(a){Fe.forEach(function(b){return b(a)})}
function He(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){T(b),Ge(b)}}:a}
function T(a){var b=A("yt.logging.errors.log");b?b(a,"ERROR",void 0,void 0,void 0):(b=S("ERRORS",[]),b.push([a,"ERROR",void 0,void 0,void 0]),R("ERRORS",b))}
function Ie(a){var b=A("yt.logging.errors.log");b?b(a,"WARNING",void 0,void 0,void 0):(b=S("ERRORS",[]),b.push([a,"WARNING",void 0,void 0,void 0]),R("ERRORS",b))}
;function Je(a){a=a.split("&");for(var b={},c=0,d=a.length;c<d;c++){var e=a[c].split("=");if(1==e.length&&e[0]||2==e.length)try{var f=decodeURIComponent((e[0]||"").replace(/\+/g," ")),g=decodeURIComponent((e[1]||"").replace(/\+/g," "));f in b?Array.isArray(b[f])?eb(b[f],g):b[f]=[b[f],g]:b[f]=g}catch(k){if("q"!=e[0]){var h=Error("Error decoding URL component");h.params={key:e[0],value:e[1]};T(h)}}}return b}
function Ke(a){var b=[];fb(a,function(c,d){var e=encodeURIComponent(String(d)),f;Array.isArray(c)?f=c:f=[c];G(f,function(g){""==g?b.push(e):b.push(e+"="+encodeURIComponent(String(g)))})});
return b.join("&")}
function Le(a){"?"==a.charAt(0)&&(a=a.substr(1));return Je(a)}
function Me(a,b){return Ne(a,b||{},!0)}
function Ne(a,b,c){var d=a.split("#",2);a=d[0];d=1<d.length?"#"+d[1]:"";var e=a.split("?",2);a=e[0];e=Le(e[1]||"");for(var f in b)!c&&null!==e&&f in e||(e[f]=b[f]);return dc(a,e)+d}
;function Oe(a){var b=Pe;a=void 0===a?A("yt.ads.biscotti.lastId_")||"":a;b=Object.assign(Qe(b),Re(b));b.ca_type="image";a&&(b.bid=a);return b}
function Qe(a){var b={};b.dt=Wc;b.flash="0";a:{try{var c=a.f.top.location.href}catch(f){a=2;break a}a=c?c===a.g.location.href?0:1:2}b=(b.frm=a,b);b.u_tz=-(new Date).getTimezoneOffset();var d=void 0===d?L:d;try{var e=d.history.length}catch(f){e=0}b.u_his=e;b.u_java=!!L.navigator&&"unknown"!==typeof L.navigator.javaEnabled&&!!L.navigator.javaEnabled&&L.navigator.javaEnabled();L.screen&&(b.u_h=L.screen.height,b.u_w=L.screen.width,b.u_ah=L.screen.availHeight,b.u_aw=L.screen.availWidth,b.u_cd=L.screen.colorDepth);
L.navigator&&L.navigator.plugins&&(b.u_nplug=L.navigator.plugins.length);L.navigator&&L.navigator.mimeTypes&&(b.u_nmime=L.navigator.mimeTypes.length);return b}
function Re(a){var b=a.f;try{var c=b.screenX;var d=b.screenY}catch(q){}try{var e=b.outerWidth;var f=b.outerHeight}catch(q){}try{var g=b.innerWidth;var h=b.innerHeight}catch(q){}b=[b.screenLeft,b.screenTop,c,d,b.screen?b.screen.availWidth:void 0,b.screen?b.screen.availTop:void 0,e,f,g,h];c=a.f.top;try{var k=(c||window).document,l="CSS1Compat"==k.compatMode?k.documentElement:k.body;var m=(new Cc(l.clientWidth,l.clientHeight)).round()}catch(q){m=new Cc(-12245933,-12245933)}k=m;m={};l=new bd;y.SVGElement&&
y.document.createElementNS&&l.set(0);c=Rc();c["allow-top-navigation-by-user-activation"]&&l.set(1);c["allow-popups-to-escape-sandbox"]&&l.set(2);y.crypto&&y.crypto.subtle&&l.set(3);y.TextDecoder&&y.TextEncoder&&l.set(4);l=cd(l);m.bc=l;m.bih=k.height;m.biw=k.width;m.brdim=b.join();a=a.g;return m.vis={visible:1,hidden:2,prerender:3,preview:4,unloaded:5}[a.visibilityState||a.webkitVisibilityState||a.mozVisibilityState||""]||0,m.wgl=!!L.WebGLRenderingContext,m}
var Pe=new function(){var a=window.document;this.f=window;this.g=a};
z("yt.ads_.signals_.getAdSignalsString",function(a){return Ke(Oe(a))},void 0);C();function U(a){a=Se(a);return"string"===typeof a&&"false"===a?!1:!!a}
function Te(a,b){var c=Se(a);return void 0===c&&void 0!==b?b:Number(c||0)}
function Se(a){var b=S("EXPERIMENTS_FORCED_FLAGS",{});return void 0!==b[a]?b[a]:S("EXPERIMENT_FLAGS",{})[a]}
;var Ue=void 0!==XMLHttpRequest?function(){return new XMLHttpRequest}:void 0!==ActiveXObject?function(){return new ActiveXObject("Microsoft.XMLHTTP")}:null;
function Ve(){if(!Ue)return null;var a=Ue();return"open"in a?a:null}
function We(a){switch(a&&"status"in a?a.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:return!0;default:return!1}}
;function V(a,b){La(a)&&(a=He(a));return window.setTimeout(a,b)}
function Xe(a){window.clearTimeout(a)}
;var Ye={Authorization:"AUTHORIZATION","X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-YouTube-Device":"DEVICE","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"},Ze="app debugcss debugjs expflag force_ad_params force_viral_ad_response_params forced_experiments innertube_snapshots innertube_goldens internalcountrycode internalipoverride absolute_experiments conditional_experiments sbb sr_bns_address".split(" "),
$e=!1;
function af(a,b){b=void 0===b?{}:b;if(!c)var c=window.location.href;var d=K(1,a),e=J(K(3,a));d&&e?(d=c,c=a.match(ac),d=d.match(ac),c=c[3]==d[3]&&c[1]==d[1]&&c[4]==d[4]):c=e?J(K(3,c))==e&&(Number(K(4,c))||null)==(Number(K(4,a))||null):!0;d=U("web_ajax_ignore_global_headers_if_set");for(var f in Ye)e=S(Ye[f]),!e||!c&&!bf(a,f)||d&&void 0!==b[f]||(b[f]=e);if(c||bf(a,"X-YouTube-Utc-Offset"))b["X-YouTube-Utc-Offset"]=String(-(new Date).getTimezoneOffset());(c||bf(a,"X-YouTube-Time-Zone"))&&(f="undefined"!=typeof Intl?
(new Intl.DateTimeFormat).resolvedOptions().timeZone:null)&&(b["X-YouTube-Time-Zone"]=f);if(c||bf(a,"X-YouTube-Ad-Signals"))b["X-YouTube-Ad-Signals"]=Ke(Oe(void 0));return b}
function cf(a){var b=window.location.search,c=J(K(3,a)),d=J(K(5,a));d=(c=c&&(c.endsWith("youtube.com")||c.endsWith("youtube-nocookie.com")))&&d&&d.startsWith("/api/");if(!c||d)return a;var e=Le(b),f={};G(Ze,function(g){e[g]&&(f[g]=e[g])});
return Ne(a,f||{},!1)}
function bf(a,b){var c=S("CORS_HEADER_WHITELIST")||{},d=J(K(3,a));return d?(c=c[d])?0<=Ya(c,b):!1:!0}
function df(a,b){if(window.fetch&&"XML"!=b.format){var c={method:b.method||"GET",credentials:"same-origin"};b.headers&&(c.headers=b.headers);a=ef(a,b);var d=ff(a,b);d&&(c.body=d);b.withCredentials&&(c.credentials="include");var e=!1,f;fetch(a,c).then(function(g){if(!e){e=!0;f&&Xe(f);var h=g.ok,k=function(l){l=l||{};var m=b.context||y;h?b.onSuccess&&b.onSuccess.call(m,l,g):b.onError&&b.onError.call(m,l,g);b.la&&b.la.call(m,l,g)};
"JSON"==(b.format||"JSON")&&(h||400<=g.status&&500>g.status)?g.json().then(k,function(){k(null)}):k(null)}});
b.wa&&0<b.timeout&&(f=V(function(){e||(e=!0,Xe(f),b.wa.call(b.context||y))},b.timeout))}else gf(a,b)}
function gf(a,b){var c=b.format||"JSON";a=ef(a,b);var d=ff(a,b),e=!1,f=hf(a,function(k){if(!e){e=!0;h&&Xe(h);var l=We(k),m=null,q=400<=k.status&&500>k.status,t=500<=k.status&&600>k.status;if(l||q||t)m=jf(a,c,k,b.wb);if(l)a:if(k&&204==k.status)l=!0;else{switch(c){case "XML":l=0==parseInt(m&&m.return_code,10);break a;case "RAW":l=!0;break a}l=!!m}m=m||{};q=b.context||y;l?b.onSuccess&&b.onSuccess.call(q,k,m):b.onError&&b.onError.call(q,k,m);b.la&&b.la.call(q,k,m)}},b.method,d,b.headers,b.responseType,
b.withCredentials);
if(b.R&&0<b.timeout){var g=b.R;var h=V(function(){e||(e=!0,f.abort(),Xe(h),g.call(b.context||y,f))},b.timeout)}return f}
function ef(a,b){b.zb&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var c=S("XSRF_FIELD_NAME",void 0),d=b.gb;d&&(d[c]&&delete d[c],a=Me(a,d));return a}
function ff(a,b){var c=S("XSRF_FIELD_NAME",void 0),d=S("XSRF_TOKEN",void 0),e=b.postBody||"",f=b.D,g=S("XSRF_FIELD_NAME",void 0),h;b.headers&&(h=b.headers["Content-Type"]);b.yb||J(K(3,a))&&!b.withCredentials&&J(K(3,a))!=document.location.hostname||"POST"!=b.method||h&&"application/x-www-form-urlencoded"!=h||b.D&&b.D[g]||(f||(f={}),f[c]=d);f&&"string"===typeof e&&(e=Le(e),pb(e,f),e=b.xa&&"JSON"==b.xa?JSON.stringify(e):cc(e));f=e||f&&!jb(f);!$e&&f&&"POST"!=b.method&&($e=!0,T(Error("AJAX request with postData should use POST")));
return e}
function jf(a,b,c,d){var e=null;switch(b){case "JSON":try{var f=c.responseText}catch(g){throw d=Error("Error reading responseText"),d.params=a,Ie(d),g;}a=c.getResponseHeader("Content-Type")||"";f&&0<=a.indexOf("json")&&(e=JSON.parse(f));break;case "XML":if(a=(a=c.responseXML)?kf(a):null)e={},G(a.getElementsByTagName("*"),function(g){e[g.tagName]=lf(g)})}d&&mf(e);
return e}
function mf(a){if(Ma(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);if(c){c=b;var d=a[b];var e=new sb(tb,"HTML that is escaped and sanitized server-side and passed through yt.net.ajax");vb(e);vb(e);d=Wb(d,null);a[c]=d}else mf(a[b])}}
function kf(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function lf(a){var b="";G(a.childNodes,function(c){b+=c.nodeValue});
return b}
function hf(a,b,c,d,e,f,g){function h(){4==(k&&"readyState"in k?k.readyState:0)&&b&&He(b)(k)}
c=void 0===c?"GET":c;d=void 0===d?"":d;var k=Ve();if(!k)return null;"onloadend"in k?k.addEventListener("loadend",h,!1):k.onreadystatechange=h;U("debug_forward_web_query_parameters")&&(a=cf(a));k.open(c,a,!0);f&&(k.responseType=f);g&&(k.withCredentials=!0);c="POST"==c&&(void 0===window.FormData||!(d instanceof FormData));if(e=af(a,e))for(var l in e)k.setRequestHeader(l,e[l]),"content-type"==l.toLowerCase()&&(c=!1);c&&k.setRequestHeader("Content-Type","application/x-www-form-urlencoded");k.send(d);
return k}
;var nf={},of=0;
function pf(a,b,c,d,e){e=void 0===e?"":e;a&&(c&&(c=Qb,c=!(c&&0<=c.toLowerCase().indexOf("cobalt"))),c?a&&(a instanceof H||(a="object"==typeof a&&a.L?a.K():String(a),a=Nb.test(a)?new H(Kb,a):null),b=Mb(a||Pb),"about:invalid#zClosurez"===b?a="":(b instanceof Tb?a=b:(d="object"==typeof b,a=null,d&&b.ja&&(a=b.ga()),b=Cb(d&&b.L?b.K():String(b)),a=Wb(b,a)),a instanceof Tb&&a.constructor===Tb&&a.h===Vb?a=a.f:(Ja(a),a="type_error:SafeHtml"),a=encodeURIComponent(String(Id(a.toString())))),/^[\s\xa0]*$/.test(a)||(a=
Gc("IFRAME",{src:'javascript:"<body><img src=\\""+'+a+'+"\\"></body>"',style:"display:none"}),(9==a.nodeType?a:a.ownerDocument||a.document).body.appendChild(a))):e?hf(a,b,"POST",e,d):S("USE_NET_AJAX_FOR_PING_TRANSPORT",!1)||d?hf(a,b,"GET","",d):qf(a,b)||rf(a,b))}
function qf(a,b){if(!Be("web_use_beacon_api_for_ad_click_server_pings"))return!1;if(Be("use_sonic_js_library_for_v4_support")){a:{try{var c=new Wa({url:a});if(c.h&&c.g||c.i){var d=J(K(5,a));var e=!(!d||!d.endsWith("/aclk")||"1"!==fc(a,"ri"));break a}}catch(f){}e=!1}if(!e)return!1}else if(e=J(K(5,a)),!e||-1==e.indexOf("/aclk")||"1"!==fc(a,"ae")||"1"!==fc(a,"act"))return!1;return sf(a)?(b&&b(),!0):!1}
function sf(a,b){try{if(window.navigator&&window.navigator.sendBeacon&&window.navigator.sendBeacon(a,void 0===b?"":b))return!0}catch(c){}return!1}
function rf(a,b){var c=new Image,d=""+of++;nf[d]=c;c.onload=c.onerror=function(){b&&nf[d]&&b();delete nf[d]};
c.src=a}
;var tf=0;z("ytDomDomGetNextId",A("ytDomDomGetNextId")||function(){return++tf},void 0);var uf={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,screenX:1,screenY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};
function vf(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.ctrlKey=this.altKey=!1;this.clientY=this.clientX=0;this.changedTouches=this.touches=null;try{if(a=a||window.event){this.event=a;for(var b in a)b in uf||(this[b]=a[b]);var c=a.target||a.srcElement;c&&3==c.nodeType&&(c=c.parentNode);this.target=c;var d=a.relatedTarget;if(d)try{d=d.nodeName?d:null}catch(e){d=null}else"mouseover"==
this.type?d=a.fromElement:"mouseout"==this.type&&(d=a.toElement);this.relatedTarget=d;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.f=a.pageX;this.g=a.pageY}}catch(e){}}
function wf(a){if(document.body&&document.documentElement){var b=document.body.scrollTop+document.documentElement.scrollTop;a.f=a.clientX+(document.body.scrollLeft+document.documentElement.scrollLeft);a.g=a.clientY+b}}
vf.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
vf.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
vf.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};var ib=y.ytEventsEventsListeners||{};z("ytEventsEventsListeners",ib,void 0);var xf=y.ytEventsEventsCounter||{count:0};z("ytEventsEventsCounter",xf,void 0);
function yf(a,b,c,d){d=void 0===d?{}:d;a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return hb(function(e){var f="boolean"===typeof e[4]&&e[4]==!!d,g=Ma(e[4])&&Ma(d)&&lb(e[4],d);return!!e.length&&e[0]==a&&e[1]==b&&e[2]==c&&(f||g)})}
var zf=Xa(function(){var a=!1;try{var b=Object.defineProperty({},"capture",{get:function(){a=!0}});
window.addEventListener("test",null,b)}catch(c){}return a});
function Af(a,b,c,d){d=void 0===d?{}:d;if(!a||!a.addEventListener&&!a.attachEvent)return"";var e=yf(a,b,c,d);if(e)return e;e=++xf.count+"";var f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document);var g=f?function(h){h=new vf(h);if(!Kc(h.relatedTarget,function(k){return k==a}))return h.currentTarget=a,h.type=b,c.call(a,h)}:function(h){h=new vf(h);
h.currentTarget=a;return c.call(a,h)};
g=He(g);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),zf()||"boolean"===typeof d?a.addEventListener(b,g,d):a.addEventListener(b,g,!!d.capture)):a.attachEvent("on"+b,g);ib[e]=[a,b,c,g,d];return e}
function Bf(a){a&&("string"==typeof a&&(a=[a]),G(a,function(b){if(b in ib){var c=ib[b],d=c[0],e=c[1],f=c[3];c=c[4];d.removeEventListener?zf()||"boolean"===typeof c?d.removeEventListener(e,f,c):d.removeEventListener(e,f,!!c.capture):d.detachEvent&&d.detachEvent("on"+e,f);delete ib[b]}}))}
;var Cf=window.ytcsi&&window.ytcsi.now?window.ytcsi.now:window.performance&&window.performance.timing&&window.performance.now&&window.performance.timing.navigationStart?function(){return window.performance.timing.navigationStart+window.performance.now()}:function(){return(new Date).getTime()};function Df(a){this.u=a;this.f=null;this.j=0;this.m=null;this.l=0;this.h=[];for(a=0;4>a;a++)this.h.push(0);this.i=0;this.G=Af(window,"mousemove",B(this.H,this));a=B(this.C,this);La(a)&&(a=He(a));this.M=window.setInterval(a,25)}
E(Df,M);Df.prototype.H=function(a){void 0===a.f&&wf(a);var b=a.f;void 0===a.g&&wf(a);this.f=new Bc(b,a.g)};
Df.prototype.C=function(){if(this.f){var a=Cf();if(0!=this.j){var b=this.m,c=this.f,d=b.x-c.x;b=b.y-c.y;d=Math.sqrt(d*d+b*b)/(a-this.j);this.h[this.i]=.5<Math.abs((d-this.l)/this.l)?1:0;for(c=b=0;4>c;c++)b+=this.h[c]||0;3<=b&&this.u();this.l=d}this.j=a;this.m=this.f;this.i=(this.i+1)%4}};
Df.prototype.o=function(){window.clearInterval(this.M);Bf(this.G)};function Ef(){}
function Ff(a,b){return Gf(a,0,b)}
function Hf(a,b){return Gf(a,1,b)}
;function If(){}
v(If,Ef);function Gf(a,b,c){isNaN(c)&&(c=void 0);var d=A("yt.scheduler.instance.addJob");return d?d(a,b,c):void 0===c?(a(),NaN):V(a,c||0)}
function Jf(a){if(!isNaN(a)){var b=A("yt.scheduler.instance.cancelJob");b?b(a):Xe(a)}}
If.prototype.start=function(){var a=A("yt.scheduler.instance.start");a&&a()};
If.prototype.pause=function(){var a=A("yt.scheduler.instance.pause");a&&a()};
Ia(If);If.getInstance();var Kf={};
function Lf(a){var b=void 0===a?{}:a;a=void 0===b.Ja?!0:b.Ja;b=void 0===b.Ua?!1:b.Ua;if(null==A("_lact",window)){var c=parseInt(S("LACT"),10);c=isFinite(c)?C()-Math.max(c,0):-1;z("_lact",c,window);z("_fact",c,window);-1==c&&Mf();Af(document,"keydown",Mf);Af(document,"keyup",Mf);Af(document,"mousedown",Mf);Af(document,"mouseup",Mf);a&&(b?Af(window,"touchmove",function(){Nf("touchmove",200)},{passive:!0}):(Af(window,"resize",function(){Nf("resize",200)}),Af(window,"scroll",function(){Nf("scroll",200)})));
new Df(function(){Nf("mouse",100)});
Af(document,"touchstart",Mf,{passive:!0});Af(document,"touchend",Mf,{passive:!0})}}
function Nf(a,b){Kf[a]||(Kf[a]=!0,Hf(function(){Mf();Kf[a]=!1},b))}
function Mf(){null==A("_lact",window)&&Lf();var a=C();z("_lact",a,window);-1==A("_fact",window)&&z("_fact",a,window);(a=A("ytglobal.ytUtilActivityCallback_"))&&a()}
function Of(){var a=A("_lact",window),b;null==a?b=-1:b=Math.max(C()-a,0);return b}
;var Pf=y.ytPubsubPubsubInstance||new Q;Q.prototype.subscribe=Q.prototype.subscribe;Q.prototype.unsubscribeByKey=Q.prototype.P;Q.prototype.publish=Q.prototype.O;Q.prototype.clear=Q.prototype.clear;z("ytPubsubPubsubInstance",Pf,void 0);var Qf=y.ytPubsubPubsubSubscribedKeys||{};z("ytPubsubPubsubSubscribedKeys",Qf,void 0);var Rf=y.ytPubsubPubsubTopicToKeys||{};z("ytPubsubPubsubTopicToKeys",Rf,void 0);var Sf=y.ytPubsubPubsubIsSynchronous||{};z("ytPubsubPubsubIsSynchronous",Sf,void 0);
function Tf(a,b){var c=Uf();if(c){var d=c.subscribe(a,function(){var e=arguments;var f=function(){Qf[d]&&b.apply&&"function"==typeof b.apply&&b.apply(window,e)};
try{Sf[a]?f():V(f,0)}catch(g){T(g)}},void 0);
Qf[d]=!0;Rf[a]||(Rf[a]=[]);Rf[a].push(d);return d}return 0}
function Vf(a){var b=Uf();b&&("number"===typeof a?a=[a]:"string"===typeof a&&(a=[parseInt(a,10)]),G(a,function(c){b.unsubscribeByKey(c);delete Qf[c]}))}
function Wf(a,b){var c=Uf();c&&c.publish.apply(c,arguments)}
function Xf(a){var b=Uf();if(b)if(b.clear(a),a)Yf(a);else for(var c in Rf)Yf(c)}
function Uf(){return y.ytPubsubPubsubInstance}
function Yf(a){Rf[a]&&(a=Rf[a],G(a,function(b){Qf[b]&&delete Qf[b]}),a.length=0)}
;var Zf=window,W=Zf.ytcsi&&Zf.ytcsi.now?Zf.ytcsi.now:Zf.performance&&Zf.performance.timing&&Zf.performance.now&&Zf.performance.timing.navigationStart?function(){return Zf.performance.timing.navigationStart+Zf.performance.now()}:function(){return(new Date).getTime()};var $f=Te("initial_gel_batch_timeout",1E3),ag=Math.pow(2,16)-1,bg=null,cg=0,dg=void 0,eg=0,fg=0,gg=0,hg=!0,ig=y.ytLoggingTransportLogPayloadsQueue_||{};z("ytLoggingTransportLogPayloadsQueue_",ig,void 0);var jg=y.ytLoggingTransportGELQueue_||new Map;z("ytLoggingTransportGELQueue_",jg,void 0);var kg=y.ytLoggingTransportTokensToCttTargetIds_||{};z("ytLoggingTransportTokensToCttTargetIds_",kg,void 0);
function lg(){Xe(eg);Xe(fg);fg=0;dg&&dg.isReady()?(mg(jg),"log_event"in ig&&mg(Object.entries(ig.log_event)),jg.clear(),delete ig.log_event):ng()}
function ng(){U("web_gel_timeout_cap")&&!fg&&(fg=V(lg,6E4));Xe(eg);var a=S("LOGGING_BATCH_TIMEOUT",Te("web_gel_debounce_ms",1E4));U("shorten_initial_gel_batch_timeout")&&hg&&(a=$f);eg=V(lg,a)}
function mg(a){var b=dg,c=Math.round(W());a=u(a);for(var d=a.next();!d.done;d=a.next()){var e=u(d.value);d=e.next().value;var f=e.next().value;e=nb({context:og(b.f||pg())});e.events=f;(f=kg[d])&&qg(e,d,f);delete kg[d];rg(e,c);sg(b,"log_event",e,{retry:!0,onSuccess:function(){cg=Math.round(W()-c)}});
hg=!1}}
function rg(a,b){a.requestTimeMs=String(b);U("unsplit_gel_payloads_in_logs")&&(a.unsplitGelPayloadsInLogs=!0);var c=S("EVENT_ID",void 0);if(c){var d=S("BATCH_CLIENT_COUNTER",void 0)||0;!d&&U("web_client_counter_random_seed")&&(d=Math.floor(Math.random()*ag/2));d++;d>ag&&(d=1);R("BATCH_CLIENT_COUNTER",d);c={serializedEventId:c,clientCounter:String(d)};a.serializedClientEventId=c;bg&&cg&&U("log_gel_rtt_web")&&(a.previousBatchInfo={serializedClientEventId:bg,roundtripMs:String(cg)});bg=c;cg=0}}
function qg(a,b,c){if(c.videoId)var d="VIDEO";else if(c.playlistId)d="PLAYLIST";else return;a.credentialTransferTokenTargetId=c;a.context=a.context||{};a.context.user=a.context.user||{};a.context.user.credentialTransferTokens=[{token:b,scope:d}]}
;var tg=y.ytLoggingGelSequenceIdObj_||{};z("ytLoggingGelSequenceIdObj_",tg,void 0);
function ug(a,b,c,d){d=void 0===d?{}:d;var e={};e.eventTimeMs=Math.round(d.timestamp||W());e[a]=b;e.context={lastActivityMs:String(d.timestamp?-1:Of())};U("log_sequence_info_on_gel_web")&&d.S&&(a=e.context,b=d.S,tg[b]=b in tg?tg[b]+1:0,a.sequence={index:tg[b],groupKey:b},d.xb&&delete tg[d.S]);d=d.fa;a="";d&&(a={},d.videoId?a.videoId=d.videoId:d.playlistId&&(a.playlistId=d.playlistId),kg[d.token]=a,a=d.token);d=jg.get(a)||[];jg.set(a,d);d.push(e);c&&(dg=new c);c=Te("web_logging_max_batch")||100;e=
W();d.length>=c?lg():10<=e-gg&&(ng(),gg=e)}
;function vg(){for(var a={},b=u(Object.entries(Le(S("DEVICE","")))),c=b.next();!c.done;c=b.next()){var d=u(c.value);c=d.next().value;d=d.next().value;"cbrand"===c?a.deviceMake=d:"cmodel"===c?a.deviceModel=d:"cbr"===c?a.browserName=d:"cbrver"===c?a.browserVersion=d:"cos"===c?a.osName=d:"cosver"===c?a.osVersion=d:"cplatform"===c&&(a.platform=d)}return a}
;function wg(){return"INNERTUBE_API_KEY"in ze&&"INNERTUBE_API_VERSION"in ze}
function pg(){return{innertubeApiKey:S("INNERTUBE_API_KEY",void 0),innertubeApiVersion:S("INNERTUBE_API_VERSION",void 0),Ka:S("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),La:S("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),innertubeContextClientVersion:S("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0),Na:S("INNERTUBE_CONTEXT_HL",void 0),Ma:S("INNERTUBE_CONTEXT_GL",void 0),Oa:S("INNERTUBE_HOST_OVERRIDE",void 0)||"",Pa:!!S("INNERTUBE_USE_THIRD_PARTY_AUTH",!1)}}
function og(a){a={client:{hl:a.Na,gl:a.Ma,clientName:a.La,clientVersion:a.innertubeContextClientVersion,configInfo:a.Ka}};var b=window.devicePixelRatio;b&&1!=b&&(a.client.screenDensityFloat=String(b));b=S("EXPERIMENTS_TOKEN","");""!==b&&(a.client.experimentsToken=b);b=[];var c=S("EXPERIMENTS_FORCED_FLAGS",{});for(d in c)b.push({key:d,value:String(c[d])});var d=S("EXPERIMENT_FLAGS",{});for(var e in d)e.startsWith("force_")&&void 0===c[e]&&b.push({key:e,value:String(d[e])});0<b.length&&(a.request={internalExperimentFlags:b});
S("DELEGATED_SESSION_ID")&&!U("pageid_as_header_web")&&(a.user={onBehalfOfUser:S("DELEGATED_SESSION_ID")});a.client=Object.assign(a.client,vg());return a}
function xg(a,b,c){c=void 0===c?{}:c;var d={"X-Goog-Visitor-Id":c.visitorData||S("VISITOR_DATA","")};if(b&&b.includes("www.youtube-nocookie.com"))return d;(b=c.tb||S("AUTHORIZATION"))||(a?b="Bearer "+A("gapi.auth.getToken")().sb:b=ad([]));b&&(d.Authorization=b,d["X-Goog-AuthUser"]=S("SESSION_INDEX",0),U("pageid_as_header_web")&&(d["X-Goog-PageId"]=S("DELEGATED_SESSION_ID")));return d}
function yg(a){a=Object.assign({},a);delete a.Authorization;var b=ad();if(b){var c=new td;c.update(S("INNERTUBE_API_KEY",void 0));c.update(b);b=c.digest();c=3;Ka(b);void 0===c&&(c=0);if(!vc){vc={};for(var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),e=["+/=","+/","-_=","-_.","-_"],f=0;5>f;f++){var g=d.concat(e[f].split(""));uc[f]=g;for(var h=0;h<g.length;h++){var k=g[h];void 0===vc[k]&&(vc[k]=h)}}}c=uc[c];d=[];for(e=0;e<b.length;e+=3){var l=b[e],m=(f=e+1<b.length)?
b[e+1]:0;k=(g=e+2<b.length)?b[e+2]:0;h=l>>2;l=(l&3)<<4|m>>4;m=(m&15)<<2|k>>6;k&=63;g||(k=64,f||(m=64));d.push(c[h],c[l],c[m]||"",c[k]||"")}a.hash=d.join("")}return a}
;function zg(a,b,c,d){zc.set(""+a,b,{sa:c,path:"/",domain:void 0===d?"youtube.com":d,secure:!1})}
;function Ag(){var a=new re;(a=a.isAvailable()?new xe(a,"yt.innertube"):null)||(a=new se("yt.innertube"),a=a.isAvailable()?a:null);this.f=a?new ne(a):null;this.g=document.domain||window.location.hostname}
Ag.prototype.set=function(a,b,c,d){c=c||31104E3;this.remove(a);if(this.f)try{this.f.set(a,b,C()+1E3*c);return}catch(f){}var e="";if(d)try{e=escape(Id(b))}catch(f){return}else e=escape(b);zg(a,e,c,this.g)};
Ag.prototype.get=function(a,b){var c=void 0,d=!this.f;if(!d)try{c=this.f.get(a)}catch(e){d=!0}if(d&&(c=zc.get(""+a,void 0))&&(c=unescape(c),b))try{c=JSON.parse(c)}catch(e){this.remove(a),c=void 0}return c};
Ag.prototype.remove=function(a){this.f&&this.f.remove(a);var b=this.g;zc.remove(""+a,"/",void 0===b?"youtube.com":b)};var Bg=new Ag;function Cg(a,b,c,d){if(d)return null;d=Bg.get("nextId",!0)||1;var e=Bg.get("requests",!0)||{};e[d]={method:a,request:b,authState:yg(c),requestTime:Math.round(W())};Bg.set("nextId",d+1,86400,!0);Bg.set("requests",e,86400,!0);return d}
function Dg(a){var b=Bg.get("requests",!0)||{};delete b[a];Bg.set("requests",b,86400,!0)}
function Eg(a){var b=Bg.get("requests",!0);if(b){for(var c in b){var d=b[c];if(!(6E4>Math.round(W())-d.requestTime)){var e=d.authState,f=yg(xg(!1));lb(e,f)&&(e=d.request,"requestTimeMs"in e&&(e.requestTimeMs=Math.round(W())),sg(a,d.method,e,{}));delete b[c]}}Bg.set("requests",b,86400,!0)}}
;function X(a){return new P(function(b,c){function d(){c(a.error);f()}
function e(){b(a.result);f()}
function f(){a.removeEventListener("success",e);a.removeEventListener("error",d)}
a.addEventListener("success",e);a.addEventListener("error",d)})}
;function Fg(a){this.f=a}
n=Fg.prototype;n.add=function(a,b,c){return Gg(Hg(this,[a],"readwrite"),a).add(b,c)};
n.clear=function(a){return Gg(Hg(this,[a],"readwrite"),a).clear()};
n.close=function(){this.f.close()};
n.count=function(a,b){return Gg(Hg(this,[a]),a).count(b)};
n["delete"]=function(a,b){return Gg(Hg(this,[a],"readwrite"),a)["delete"](b)};
n.get=function(a,b){return Gg(Hg(this,[a]),a).get(b)};
n.getName=function(){return this.f.name};
function Hg(a,b,c){a=a.f.transaction(b,c);return new Ig(a)}
function Jg(a){this.f=a}
n=Jg.prototype;n.add=function(a,b){return X(this.f.add(a,b))};
n.clear=function(){return X(this.f.clear()).then(function(){})};
n.count=function(a){return X(this.f.count(a))};
n["delete"]=function(a){return X(this.f["delete"](a))};
n.get=function(a){return X(this.f.get(a))};
n.index=function(a){return new Kg(this.f.index(a))};
n.getName=function(){return this.f.name};
function Lg(){var a=Error.call(this,"Transaction was aborted");this.message=a.message;"stack"in a&&(this.stack=a.stack);Object.setPrototypeOf(this,Lg.prototype)}
v(Lg,Error);function Ig(a){var b=this;this.f=a;this.g=new Map;this.done=new P(function(c,d){b.f.addEventListener("complete",function(){c()});
b.f.addEventListener("error",function(){d(b.f.error)});
b.f.addEventListener("abort",function(){d(new Lg)})})}
Ig.prototype.abort=function(){this.f.abort();return this.done};
function Gg(a,b){var c=a.f.objectStore(b),d=a.g.get(c);d||(d=new Jg(c),a.g.set(c,d));return d}
function Kg(a){this.f=a}
Kg.prototype.count=function(a){return X(this.f.count(a))};
Kg.prototype.get=function(a){return X(this.f.get(a))};
function Mg(a,b){var c=a.f.openCursor(b,"prev");return X(c).then(function(d){return null===d?null:new Ng(c,d)})}
function Ng(a,b){this.request=a;this.f=b}
Ng.prototype["delete"]=function(){return X(this.f["delete"]()).then(function(){})};
Ng.prototype.getValue=function(){return this.f.value};
Ng.prototype.update=function(a){return X(this.f.update(a))};function Og(a,b,c){function d(){l||(l=new Fg(e.result));return l}
c=void 0===c?{}:c;var e=void 0!==b?self.indexedDB.open(a,b):self.indexedDB.open(a);a=c;var f=a.ub,g=a.blocking,h=a.Cb,k=a.upgrade,l;k&&e.addEventListener("upgradeneeded",function(m){if(null===m.newVersion)throw Error("Invariant: newVersion on IDbVersionChangeEvent is null");if(null===e.transaction)throw Error("Invariant: transaction on IDbOpenDbRequest is null");var q=d(),t=new Ig(e.transaction);k(q,m.oldVersion,m.newVersion,t)});
f&&e.addEventListener("blocked",function(){f()});
return X(e).then(function(m){g&&m.addEventListener("versionchange",function(){g()});
h&&m.addEventListener("close",function(){h()});
return d()})}
;var Ud,Pg=["getAll","getAllKeys","getKey","openKeyCursor"],Qg=["getAll","getAllKeys","getKey","openKeyCursor"];
function Rg(){return O(this,function b(){var c,d,e,f,g,h,k,l;return x(b,function(m){switch(m.f){case 1:if(!self.indexedDB)return m["return"](!1);c=u(Pg);for(d=c.next();!d.done;d=c.next())if(e=d.value,!IDBObjectStore.prototype[e])return m["return"](!1);f=u(Qg);for(d=f.next();!d.done;d=f.next())if(g=d.value,!IDBIndex.prototype[g])return m["return"](!1);if(!IDBObjectStore.prototype.getKey)return m["return"](!1);sa(m);l=!1;return w(m,Og("yt-idb-test-do-not-use",void 0,{blocking:function(){l=!0;h&&(h.close(),
h=void 0)}}),5);
case 5:return h=m.g,w(m,Og("yt-idb-test-do-not-use",h.f.version+1),6);case 6:return k=m.g,k.close(),k=void 0,m["return"](l);case 3:ua(m);if(h)try{h.close()}catch(q){}if(k)try{k.close()}catch(q){}va(m);break;case 2:return ta(m),m["return"](!1)}})})}
function Sg(){return void 0!==Ud?Td():new P(function(a){Rg().then(function(b){Ud=b;a(b)})})}
;var Tg;function Ug(){return O(this,function b(){return x(b,function(c){if(!Tg)try{Tg=Og("LogsDataBase",1,{upgrade:function(d,e){if(1>e){var f=d.f.createObjectStore("LogsRequestsStore",{keyPath:"id",autoIncrement:!0});(new Jg(f)).f.createIndex("newRequest",["status","timestamp"],{unique:!1})}}})}catch(d){"VersionError"===d&&T(d),Tg=Og("LogsDataBase",1)}return c["return"](Tg)})})}
function Vg(a){return O(this,function c(){var d,e,f,g;return x(c,function(h){if(1==h.f)return w(h,Ug(),2);if(3!=h.f)return d=h.g,e=Gg(Hg(d,["LogsRequestsStore"],"readwrite"),"LogsRequestsStore"),f=Object.assign(Object.assign({},a),{options:JSON.parse(JSON.stringify(a.options))}),w(h,e.add(f),3);g=h.g;return h["return"](g)})})}
function Wg(){return O(this,function b(){var c,d,e,f,g,h,k;return x(b,function(l){switch(l.f){case 1:return c=["NEW",0],d=["NEW",W()],e=IDBKeyRange.bound(c,d),w(l,Ug(),2);case 2:return f=l.g,g=Hg(f,["LogsRequestsStore"],"readwrite"),w(l,Mg(Gg(g,"LogsRequestsStore").index("newRequest"),e),3);case 3:h=l.g;k=void 0;if(null===h||void 0===h||!h.getValue()){l.F(4);break}k=h.getValue();k.status="QUEUED";return w(l,h.update(k),4);case 4:return l["return"](k)}})})}
function Xg(a){return O(this,function c(){var d,e,f;return x(c,function(g){switch(g.f){case 1:return w(g,Ug(),2);case 2:return d=g.g,e=Gg(Hg(d,["LogsRequestsStore"],"readwrite"),"LogsRequestsStore"),w(g,e.get(a),3);case 3:return f=g.g,f.status="QUEUED",w(g,X(e.f.put(f,void 0)),4);case 4:return g["return"](f)}})})}
function Yg(a){return O(this,function c(){var d,e,f;return x(c,function(g){switch(g.f){case 1:return w(g,Ug(),2);case 2:return d=g.g,e=Gg(Hg(d,["LogsRequestsStore"],"readwrite"),"LogsRequestsStore"),w(g,e.get(a),3);case 3:return f=g.g,f.status="NEW",f.na+=1,w(g,X(e.f.put(f,void 0)),4);case 4:return g["return"](f)}})})}
function Zg(){return O(this,function b(){var c,d;return x(b,function(e){if(1==e.f)return w(e,Ug(),2);if(3!=e.f)return c=e.g,w(e,c.count("LogsRequestsStore"),3);d=e.g;return e["return"](!d)})})}
function $g(a){return O(this,function c(){var d;return x(c,function(e){if(1==e.f)return w(e,Ug(),2);d=e.g;return e["return"](d["delete"]("LogsRequestsStore",a))})})}
;var ah=Te("network_polling_interval",3E4);function bh(){this.i=0;this.f=window.navigator.onLine;ch(this);dh(this)}
function eh(){bh.f||(bh.f=new bh);return bh.f}
function fh(a){var b=gh,c=hh;a.i||ih(a);(new P(function(d){a.h=d})).then(function(){b();
c&&(a.g=c)})}
function dh(a){window.addEventListener("online",function(){a.f=!0;a.h&&a.h()})}
function ch(a){window.addEventListener("offline",function(){a.f=!1;a.g&&a.g()})}
function ih(a){a.i=Ff(function(){window.navigator.onLine?(!1===a.f&&T(Error("NetworkStatusManager missed online event.")),a.f=!0,a.h&&a.h()):(!0===a.f&&T(Error("NetworkStatusManager missed offline event.")),a.f=!1,a.g&&a.g());ih(a)},ah)}
;var jh=Te("networkless_throttle_timeout")||100,kh=Te("networkless_retry_attempts")||1,lh=0;function mh(a,b){Sg().then(function(c){if(c&&!U("networkless_bypass_write")){var d={url:a,options:b,timestamp:W(),status:"NEW",na:0};Vg(d).then(function(e){d.id=e;e=eh();e.f?nh(d):fh(e)})["catch"](function(){nh(d);
T(Error("Networkless Logging: Log request setting to indexedDB failed."))})}else gf(a,b)})}
function gh(){lh||(lh=Hf(function(){nh();lh=0;gh()},jh))}
function hh(){Jf(lh);lh=0}
function nh(a){O(this,function c(){var d=this,e,f,g,h;return x(c,function(k){switch(k.f){case 1:e=d;if(!a)return w(k,Wg(),6);if(!a.id){k.F(3);break}return w(k,Xg(a.id),5);case 5:a=k.g;k.F(3);break;case 6:if(a=k.g){k.F(3);break}return w(k,Zg(),8);case 8:return(f=k.g)&&hh(),k["return"]();case 3:if(oh(a))g=a.options.onError?a.options.onError:function(){},h=a.options.onSuccess?a.options.onSuccess:function(){},a.options.onError=function(l,m){return O(e,function t(){return x(t,function(p){if(1==p.f)return a&&
a.id?a.na<kh?w(p,Yg(a.id),6):w(p,$g(a.id),2):p.F(2);
2!=p.f&&(lh||fh(eh()),g(l,m));g(l,m);p.f=0})})},a.options.onSuccess=function(l,m){return O(e,function t(){return x(t,function(p){if(1==p.f)return a&&a.id?w(p,$g(a.id),2):p.F(2);
h(l,m);p.f=0})})},gf(a.url,a.options);
else if(Ie(Error("Networkless Logging: Stored logs request expired age limit")),a.id)return w(k,$g(a.id),0);k.F(0)}})})}
function oh(a){a=a.timestamp;return 2592E6<=W()-a?!1:!0}
;function ph(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];d=Error.call(this,a);this.message=d.message;"stack"in d&&(this.stack=d.stack);this.args=[].concat(c instanceof Array?c:fa(u(c)))}
v(ph,Error);function qh(a){var b=this;this.f=null;a?this.f=a:wg()&&(this.f=pg());Ff(function(){Eg(b)},5E3)}
qh.prototype.isReady=function(){!this.f&&wg()&&(this.f=pg());return!!this.f};
function sg(a,b,c,d){!S("VISITOR_DATA")&&"visitor_id"!==b&&.01>Math.random()&&Ie(new ph("Missing VISITOR_DATA when sending innertube request.",b,c,d));if(!a.isReady())throw b=new ph("innertube xhrclient not ready",b,c,d),T(b),b.f=0,b;var e={headers:{"Content-Type":"application/json"},method:"POST",D:c,xa:"JSON",R:function(){d.R()},
wa:d.R,onSuccess:function(t,p){if(d.onSuccess)d.onSuccess(p)},
va:function(t){if(d.onSuccess)d.onSuccess(t)},
onError:function(t,p){if(d.onError)d.onError(p)},
Ab:function(t){if(d.onError)d.onError(t)},
timeout:d.timeout,withCredentials:!0},f="",g=a.f.Oa;g&&(f=g);g=a.f.Pa||!1;var h=xg(g,f,d);Object.assign(e.headers,h);e.headers.Authorization&&!f&&(e.headers["x-origin"]=window.location.origin);var k=Me(""+f+("/youtubei/"+a.f.innertubeApiVersion+"/"+b),{alt:"json",key:a.f.innertubeApiKey}),l;if(d.retry&&U("retry_web_logging_batches")&&"www.youtube-nocookie.com"!=f&&(l=Cg(b,c,h,g))){var m=e.onSuccess,q=e.va;e.onSuccess=function(t,p){Dg(l);m(t,p)};
c.va=function(t,p){Dg(l);q(t,p)}}try{U("use_fetch_for_op_xhr")?df(k,e):U("networkless_logging")&&d.retry?(e.method="POST",mh(k,e)):(e.method="POST",e.D||(e.D={}),gf(k,e))}catch(t){if("InvalidAccessError"==t.name)l&&(Dg(l),l=0),Ie(Error("An extension is blocking network request."));
else throw t;}l&&Ff(function(){Eg(a)},5E3)}
;function rh(a,b,c){c=void 0===c?{}:c;var d=qh;S("ytLoggingEventsDefaultDisabled",!1)&&qh==qh&&(d=null);ug(a,b,d,c)}
;var sh=[{ta:function(a){return"Cannot read property '"+a.key+"'"},
ma:{TypeError:[{regexp:/Cannot read property '([^']+)' of (null|undefined)/,groups:["key","value"]},{regexp:/\u65e0\u6cd5\u83b7\u53d6\u672a\u5b9a\u4e49\u6216 (null|undefined) \u5f15\u7528\u7684\u5c5e\u6027\u201c([^\u201d]+)\u201d/,groups:["value","key"]},{regexp:/\uc815\uc758\ub418\uc9c0 \uc54a\uc74c \ub610\ub294 (null|undefined) \ucc38\uc870\uc778 '([^']+)' \uc18d\uc131\uc744 \uac00\uc838\uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4./,groups:["value","key"]},{regexp:/No se puede obtener la propiedad '([^']+)' de referencia nula o sin definir/,
groups:["key"]},{regexp:/Unable to get property '([^']+)' of (undefined or null) reference/,groups:["key","value"]}],Error:[{regexp:/(Permission denied) to access property "([^']+)"/,groups:["reason","key"]}]}},{ta:function(a){return"Cannot call '"+a.key+"'"},
ma:{TypeError:[{regexp:/(?:([^ ]+)?\.)?([^ ]+) is not a function/,groups:["base","key"]},{regexp:/Object (.*) has no method '([^ ]+)'/,groups:["base","key"]},{regexp:/Object doesn't support property or method '([^ ]+)'/,groups:["key"]},{regexp:/\u30aa\u30d6\u30b8\u30a7\u30af\u30c8\u306f '([^']+)' \u30d7\u30ed\u30d1\u30c6\u30a3\u307e\u305f\u306f\u30e1\u30bd\u30c3\u30c9\u3092\u30b5\u30dd\u30fc\u30c8\u3057\u3066\u3044\u307e\u305b\u3093/,groups:["key"]},{regexp:/\uac1c\uccb4\uac00 '([^']+)' \uc18d\uc131\uc774\ub098 \uba54\uc11c\ub4dc\ub97c \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4./,
groups:["key"]}]}}];var th=new Set,uh=0;function vh(a){wh(a,"WARNING")}
function wh(a,b,c,d,e){e=void 0===e?{}:e;e.name=c||S("INNERTUBE_CONTEXT_CLIENT_NAME",1);e.version=d||S("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0);c=e||{};b=void 0===b?"ERROR":b;b=void 0===b?"ERROR":b;var f=void 0===f?!1:f;if(a&&(U("console_log_js_exceptions")&&(d=[],d.push("Name: "+a.name),d.push("Message: "+a.message),a.hasOwnProperty("params")&&d.push("Error Params: "+JSON.stringify(a.params)),d.push("File name: "+a.fileName),d.push("Stacktrace: "+a.stack),window.console.log(d.join("\n"),a)),(window&&
window.yterr||f)&&!(5<=uh)&&0!==a.f)){var g=wc(a);f=g.message||"Unknown Error";d=g.name||"UnknownError";e=g.lineNumber||"Not available";var h=g.fileName||"Not available";g=g.stack||a.g||"Not available";if(a.hasOwnProperty("args")&&a.args&&a.args.length)for(var k=0,l=0;l<a.args.length;l++){var m=a.args[l],q="params."+l;k+=q.length;if(m)if(Array.isArray(m))for(var t=c,p=0;p<m.length&&!(m[p]&&(k+=xh(p,m[p],q,t),500<k));p++);else if("object"===typeof m)for(t in t=void 0,p=c,m){if(m[t]&&(k+=xh(t,m[t],
q,p),500<k))break}else c[q]=String(JSON.stringify(m)).substring(0,500),k+=c[q].length;else c[q]=String(JSON.stringify(m)).substring(0,500),k+=c[q].length;if(500<=k)break}else if(a.hasOwnProperty("params")&&a.params)if(m=a.params,"object"===typeof a.params)for(l in q=0,m){if(m[l]&&(k="params."+l,t=String(JSON.stringify(m[l])).substr(0,500),c[k]=t,q+=k.length+t.length,500<q))break}else c.params=String(JSON.stringify(m)).substr(0,500);c={message:f,name:d,lineNumber:e,fileName:h,stack:g,params:c};a=Number(a.columnNumber);
isNaN(a)||(c.lineNumber=c.lineNumber+":"+a);a=u(sh);for(f=a.next();!f.done;f=a.next())if(f=f.value,f.ma[c.name])for(e=u(f.ma[c.name]),d=e.next();!d.done;d=e.next())if(h=d.value,d=c.message.match(h.regexp)){c.params["error.original"]=d[0];e=h.groups;h={};for(g=0;g<e.length;g++)h[e[g]]=d[g+1],c.params["error."+e[g]]=d[g+1];c.message=f.ta(h);break}window.yterr&&"function"===typeof window.yterr&&window.yterr(c);if(!(th.has(c.message)||0<=c.stack.indexOf("/YouTubeCenter.js")||0<=c.stack.indexOf("/mytube.js"))){if(U("kevlar_gel_error_routing")){f=
b;d={stackTrace:c.stack};c.fileName&&(d.filename=c.fileName);a=c.lineNumber&&c.lineNumber.split?c.lineNumber.split(":"):[];0!==a.length&&(1!==a.length||isNaN(Number(a[0]))?2!==a.length||isNaN(Number(a[0]))||isNaN(Number(a[1]))||(d.lineNumber=Number(a[0]),d.columnNumber=Number(a[1])):d.lineNumber=Number(a[0]));a={level:"ERROR_LEVEL_UNKNOWN",message:c.message};"ERROR"===f?a.level="ERROR_LEVEL_ERROR":"WARNING"===f&&(a.level="ERROR_LEVEL_WARNNING");f={isObfuscated:!0,browserStackInfo:d};d={pageUrl:window.location.href,
kvPairs:[]};if(e=c.params)for(h=u(Object.keys(e)),g=h.next();!g.done;g=h.next())g=g.value,d.kvPairs.push({key:"client."+g,value:String(e[g])});rh("clientError",{errorMetadata:d,stackTrace:f,logMessage:a});lg()}a=c.params||{};b={gb:{a:"logerror",t:"jserror",type:c.name,msg:c.message.substr(0,250),line:c.lineNumber,level:b,"client.name":a.name},D:{url:S("PAGE_NAME",window.location.href),file:c.fileName},method:"POST"};a.version&&(b["client.version"]=a.version);if(b.D){c.stack&&(b.D.stack=c.stack);f=
u(Object.keys(a));for(d=f.next();!d.done;d=f.next())d=d.value,b.D["client."+d]=a[d];if(a=S("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS",void 0))for(f=u(Object.keys(a)),d=f.next();!d.done;d=f.next())d=d.value,b.D[d]=a[d];a=S("SERVER_NAME",void 0);f=S("SERVER_VERSION",void 0);a&&f&&(b.D["server.name"]=a,b.D["server.version"]=f)}gf(S("ECATCHER_REPORT_HOST","")+"/error_204",b);th.add(c.message);uh++}}}
function xh(a,b,c,d){c+="."+a;a=String(JSON.stringify(b)).substr(0,500);d[c]=a;return c.length+a.length}
;function yh(a,b,c,d,e,f){wh(a,void 0===b?"ERROR":b,c,d,f)}
;var zh=window.yt&&window.yt.msgs_||window.ytcfg&&window.ytcfg.msgs||{};z("yt.msgs_",zh,void 0);function Ah(a){ye(zh,arguments)}
;function Bh(a){a&&(a.dataset?a.dataset[Ch("loaded")]="true":a.setAttribute("data-loaded","true"))}
function Dh(a,b){return a?a.dataset?a.dataset[Ch(b)]:a.getAttribute("data-"+b):null}
var Eh={};function Ch(a){return Eh[a]||(Eh[a]=String(a).replace(/\-([a-z])/g,function(b,c){return c.toUpperCase()}))}
;var Fh=/\.vflset|-vfl[a-zA-Z0-9_+=-]+/,Gh=/-[a-zA-Z]{2,3}_[a-zA-Z]{2,3}(?=(\/|$))/;function Hh(a,b,c){c=void 0===c?null:c;if(window.spf&&spf.script){c="";if(a){var d=a.indexOf("jsbin/"),e=a.lastIndexOf(".js"),f=d+6;-1<d&&-1<e&&e>f&&(c=a.substring(f,e),c=c.replace(Fh,""),c=c.replace(Gh,""),c=c.replace("debug-",""),c=c.replace("tracing-",""))}spf.script.load(a,c,b)}else Ih(a,b,c)}
function Ih(a,b,c){c=void 0===c?null:c;var d=Jh(a),e=document.getElementById(d),f=e&&Dh(e,"loaded"),g=e&&!f;f?b&&b():(b&&(f=Tf(d,b),b=""+Na(b),Kh[b]=f),g||(e=Lh(a,d,function(){Dh(e,"loaded")||(Bh(e),Wf(d),V(Ta(Xf,d),0))},c)))}
function Lh(a,b,c,d){d=void 0===d?null:d;var e=Hc(document,"SCRIPT");e.id=b;e.onload=function(){c&&setTimeout(c,0)};
e.onreadystatechange=function(){switch(e.readyState){case "loaded":case "complete":e.onload()}};
d&&e.setAttribute("nonce",d);Yb(e,Lc(a));a=document.getElementsByTagName("head")[0]||document.body;a.insertBefore(e,a.firstChild);return e}
function Mh(a){a=Jh(a);var b=document.getElementById(a);b&&(Xf(a),b.parentNode.removeChild(b))}
function Nh(a,b){if(a&&b){var c=""+Na(b);(c=Kh[c])&&Vf(c)}}
function Jh(a){var b=document.createElement("a");Xb(b,a);a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"js-"+$b(a)}
var Kh={};var Oh=[],Ph=!1;function Qh(){if("1"!=gb(Ae(),"args","privembed")){var a=function(){Ph=!0;"google_ad_status"in window?R("DCLKSTAT",1):R("DCLKSTAT",2)};
Hh("//static.doubleclick.net/instream/ad_status.js",a);Oh.push(Hf(function(){Ph||"google_ad_status"in window||(Nh("//static.doubleclick.net/instream/ad_status.js",a),Ph=!0,R("DCLKSTAT",3))},5E3))}}
function Rh(){return parseInt(S("DCLKSTAT",0),10)}
;function Sh(){this.g=!1;this.f=null}
Sh.prototype.initialize=function(a,b,c,d,e,f){var g=this;f=void 0===f?!1:f;b?(this.g=!0,Hh(b,function(){g.g=!1;window.botguard?Th(g,c,d,f):(Mh(b),vh(new ph("Unable to load Botguard","from "+b)))},e)):a&&(eval(a),window.botguard?Th(this,c,d,f):vh(Error("Unable to load Botguard from JS")))};
function Th(a,b,c,d){if(d)try{a.f=new window.botguard.bg(b,c?function(){return c(b)}:Ha)}catch(e){vh(e)}else{try{a.f=new window.botguard.bg(b)}catch(e){vh(e)}c&&c(b)}}
Sh.prototype.dispose=function(){this.f=null};var Uh=new Sh,Vh=!1,Wh=0,Xh="";function Yh(a){U("botguard_periodic_refresh")?Wh=W():U("botguard_always_refresh")&&(Xh=a)}
function Zh(a){if(a){if(Uh.g)return!1;if(U("botguard_periodic_refresh"))return 72E5<W()-Wh;if(U("botguard_always_refresh"))return Xh!=a}else return!1;return!Vh}
function $h(){return!!Uh.f}
function ai(a){a=void 0===a?{}:a;a=void 0===a?{}:a;return Uh.f?Uh.f.invoke(void 0,void 0,a):null}
;var bi=C().toString();
function ci(){a:{if(window.crypto&&window.crypto.getRandomValues)try{var a=Array(16),b=new Uint8Array(16);window.crypto.getRandomValues(b);for(var c=0;c<a.length;c++)a[c]=b[c];var d=a;break a}catch(e){}d=Array(16);for(a=0;16>a;a++){b=C();for(c=0;c<b%23;c++)d[a]=Math.random();d[a]=Math.floor(256*Math.random())}if(bi)for(a=1,b=0;b<bi.length;b++)d[a%16]=d[a%16]^d[(a-1)%16]/4^bi.charCodeAt(b),a++}a=[];for(b=0;b<d.length;b++)a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(d[b]&63));
return a.join("")}
;var di=y.ytLoggingDocDocumentNonce_||ci();z("ytLoggingDocDocumentNonce_",di,void 0);var ei=1;function fi(a){this.f=a}
fi.prototype.getAsJson=function(){var a={};void 0!==this.f.trackingParams?a.trackingParams=this.f.trackingParams:(a.veType=this.f.veType,void 0!==this.f.veCounter&&(a.veCounter=this.f.veCounter),void 0!==this.f.elementIndex&&(a.elementIndex=this.f.elementIndex));void 0!==this.f.dataElement&&(a.dataElement=this.f.dataElement.getAsJson());void 0!==this.f.youtubeData&&(a.youtubeData=this.f.youtubeData);return a};
fi.prototype.toString=function(){return JSON.stringify(this.getAsJson())};
fi.prototype.isClientVe=function(){return!this.f.trackingParams&&!!this.f.veType};function gi(a){a=void 0===a?0:a;return 0==a?"client-screen-nonce":"client-screen-nonce."+a}
function hi(a){a=void 0===a?0:a;return 0==a?"ROOT_VE_TYPE":"ROOT_VE_TYPE."+a}
function ii(a){return S(hi(void 0===a?0:a),void 0)}
z("yt_logging_screen.getRootVeType",ii,void 0);function ji(){var a=ii(0),b;a?b=new fi({veType:a,youtubeData:void 0}):b=null;return b}
function ki(){var a=S("csn-to-ctt-auth-info");a||(a={},R("csn-to-ctt-auth-info",a));return a}
function li(a){a=void 0===a?0:a;var b=S(gi(a));if(!b&&!S("USE_CSN_FALLBACK",!0))return null;b||0!=a||(U("kevlar_client_side_screens")||U("c3_client_side_screens")?b="UNDEFINED_CSN":b=S("EVENT_ID"));return b?b:null}
z("yt_logging_screen.getCurrentCsn",li,void 0);function mi(a,b,c){var d=ki();(c=li(c))&&delete d[c];b&&(d[a]=b)}
function ni(a){return ki()[a]}
z("yt_logging_screen.getCttAuthInfo",ni,void 0);function oi(a,b,c,d){c=void 0===c?0:c;if(a!==S(gi(c))||b!==S(hi(c)))if(mi(a,d,c),R(gi(c),a),R(hi(c),b),0==c||U("web_screen_associated_all_layers"))b=function(){setTimeout(function(){a&&ug("foregroundHeartbeatScreenAssociated",{clientDocumentNonce:di,clientScreenNonce:a},qh)},0)},"requestAnimationFrame"in window?window.requestAnimationFrame(b):b()}
z("yt_logging_screen.setCurrentScreen",oi,void 0);function pi(a,b,c){b=void 0===b?{}:b;c=void 0===c?!1:c;var d=S("EVENT_ID");d&&(b.ei||(b.ei=d));if(b){d=a;var e=void 0===e?!0:e;var f=S("VALID_SESSION_TEMPDATA_DOMAINS",[]),g=J(K(3,window.location.href));g&&f.push(g);g=J(K(3,d));if(0<=Ya(f,g)||!g&&0==d.lastIndexOf("/",0))if(U("autoescape_tempdata_url")&&(f=document.createElement("a"),Xb(f,d),d=f.href),d){g=d.match(ac);d=g[5];f=g[6];g=g[7];var h="";d&&(h+=d);f&&(h+="?"+f);g&&(h+="#"+g);d=h;f=d.indexOf("#");if(d=0>f?d:d.substr(0,f))if(e&&!b.csn&&(b.itct||
b.ved)&&(b=Object.assign({csn:li()},b)),k){var k=parseInt(k,10);isFinite(k)&&0<k&&(e=b,b="ST-"+$b(d).toString(36),e=e?cc(e):"",zg(b,e,k||5))}else k=b,e="ST-"+$b(d).toString(36),k=k?cc(k):"",zg(e,k,5)}}if(c)return!1;if((window.ytspf||{}).enabled)spf.navigate(a);else{var l=void 0===l?{}:l;var m=void 0===m?"":m;var q=void 0===q?window:q;c=q.location;a=dc(a,l)+m;a=a instanceof H?a:Ob(a);c.href=Mb(a)}return!0}
;function qi(a,b){this.version=a;this.args=b}
;function ri(a,b){this.topic=a;this.f=b}
ri.prototype.toString=function(){return this.topic};var si=A("ytPubsub2Pubsub2Instance")||new Q;Q.prototype.subscribe=Q.prototype.subscribe;Q.prototype.unsubscribeByKey=Q.prototype.P;Q.prototype.publish=Q.prototype.O;Q.prototype.clear=Q.prototype.clear;z("ytPubsub2Pubsub2Instance",si,void 0);var ti=A("ytPubsub2Pubsub2SubscribedKeys")||{};z("ytPubsub2Pubsub2SubscribedKeys",ti,void 0);var ui=A("ytPubsub2Pubsub2TopicToKeys")||{};z("ytPubsub2Pubsub2TopicToKeys",ui,void 0);var vi=A("ytPubsub2Pubsub2IsAsync")||{};z("ytPubsub2Pubsub2IsAsync",vi,void 0);
z("ytPubsub2Pubsub2SkipSubKey",null,void 0);function wi(a,b){var c=xi();c&&c.publish.call(c,a.toString(),a,b)}
function yi(a){var b=zi,c=xi();if(!c)return 0;var d=c.subscribe(b.toString(),function(e,f){var g=A("ytPubsub2Pubsub2SkipSubKey");g&&g==d||(g=function(){if(ti[d])try{if(f&&b instanceof ri&&b!=e)try{var h=b.f,k=f;if(!k.args||!k.version)throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");try{if(!h.J){var l=new h;h.J=l.version}var m=h.J}catch(q){}if(!m||k.version!=m)throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");try{f=Reflect.construct(h,
db(k.args))}catch(q){throw q.message="yt.pubsub2.Data.deserialize(): "+q.message,q;}}catch(q){throw q.message="yt.pubsub2.pubsub2 cross-binary conversion error for "+b.toString()+": "+q.message,q;}a.call(window,f)}catch(q){T(q)}},vi[b.toString()]?A("yt.scheduler.instance")?Hf(g):V(g,0):g())});
ti[d]=!0;ui[b.toString()]||(ui[b.toString()]=[]);ui[b.toString()].push(d);return d}
function Ai(){var a=Bi,b=yi(function(c){a.apply(void 0,arguments);Ci(b)});
return b}
function Ci(a){var b=xi();b&&("number"===typeof a&&(a=[a]),G(a,function(c){b.unsubscribeByKey(c);delete ti[c]}))}
function xi(){return A("ytPubsub2Pubsub2Instance")}
;function Di(a){qi.call(this,1,arguments);this.csn=a}
v(Di,qi);var zi=new ri("screen-created",Di),Ei=[],Fi=0;function Gi(a,b,c){var d=U("use_default_events_client")?void 0:qh;b={csn:a,parentVe:b.getAsJson(),childVes:$a(c,function(f){return f.getAsJson()})};
c=u(c);for(var e=c.next();!e.done;e=c.next())e=e.value.getAsJson(),(jb(e)||!e.trackingParams&&!e.veType)&&yh(Error("Child VE logged with no data"),"WARNING");c={fa:ni(a),S:a};"UNDEFINED_CSN"==a?Hi("visualElementAttached",b,c):d?ug("visualElementAttached",b,d,c):rh("visualElementAttached",b,c)}
function Hi(a,b,c){Ei.push({payloadName:a,payload:b,options:c});Fi||(Fi=Ai())}
function Bi(a){if(Ei){for(var b=u(Ei),c=b.next();!c.done;c=b.next())c=c.value,c.payload&&(c.payload.csn=a.csn,ug(c.payloadName,c.payload,null,c.options));Ei.length=0}Fi=0}
;function Ii(a){a=a||{};var b={},c={};this.url=a.url||"";this.args=a.args||mb(b);this.assets=a.assets||{};this.attrs=a.attrs||mb(c);this.fallback=a.fallback||null;this.fallbackMessage=a.fallbackMessage||null;this.html5=!!a.html5;this.disable=a.disable||{};this.loaded=!!a.loaded;this.messages=a.messages||{}}
Ii.prototype.clone=function(){var a=new Ii,b;for(b in this)if(this.hasOwnProperty(b)){var c=this[b];"object"==Ja(c)?a[b]=mb(c):a[b]=c}return a};function Ji(){M.call(this);this.f=[]}
v(Ji,M);Ji.prototype.o=function(){for(;this.f.length;){var a=this.f.pop();a.target.removeEventListener(a.name,a.vb)}M.prototype.o.call(this)};var Ki=/cssbin\/(?:debug-)?([a-zA-Z0-9_-]+?)(?:-2x|-web|-rtl|-vfl|.css)/;function Li(a){a=a||"";if(window.spf){var b=a.match(Ki);spf.style.load(a,b?b[1]:"",void 0)}else Mi(a)}
function Mi(a){var b=Ni(a),c=document.getElementById(b),d=c&&Dh(c,"loaded");d||c&&!d||(c=Oi(a,b,function(){Dh(c,"loaded")||(Bh(c),Wf(b),V(Ta(Xf,b),0))}))}
function Oi(a,b,c){var d=document.createElement("link");d.id=b;d.onload=function(){c&&setTimeout(c,0)};
a=Lc(a);d.rel="stylesheet";d.href=zb(a).toString();(document.getElementsByTagName("head")[0]||document.body).appendChild(d);return d}
function Ni(a){var b=Hc(document,"A"),c=new sb(tb,"This URL is never added to the DOM");vb(c);vb(c);Xb(b,new H(Kb,a));a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"css-"+$b(a)}
;function Pi(a,b,c,d){M.call(this);var e=this;this.m=this.Z=a;this.W=b;this.u=!1;this.api={};this.X=this.G=null;this.H=new Q;Sc(this,Ta(Tc,this.H));this.j={};this.T=this.Y=this.h=this.ea=this.f=null;this.M=!1;this.l=this.C=null;this.aa={};this.Aa=["onReady"];this.da=null;this.oa=NaN;this.U={};this.i=d;Qi(this);this.ba("WATCH_LATER_VIDEO_ADDED",this.Ra.bind(this));this.ba("WATCH_LATER_VIDEO_REMOVED",this.Sa.bind(this));this.ba("onAdAnnounce",this.Ca.bind(this));this.Ba=new Ji(this);Sc(this,Ta(Tc,this.Ba));
this.V=0;c?this.V=V(function(){e.loadNewVideoConfig(c)},0):d&&(Ri(this),Si(this))}
v(Pi,M);n=Pi.prototype;n.getId=function(){return this.W};
n.loadNewVideoConfig=function(a){if(!this.g){this.V&&(Xe(this.V),this.V=0);a instanceof Ii||(a=new Ii(a));this.ea=a;this.f=a.clone();Ri(this);this.Y||(this.Y=Ti(this,this.f.args.jsapicallback||"onYouTubePlayerReady"));this.f.args.jsapicallback=null;if(a=this.f.attrs.width)this.m.style.width=Vc(Number(a)||a);if(a=this.f.attrs.height)this.m.style.height=Vc(Number(a)||a);Si(this);this.u&&Ui(this)}};
function Ri(a){var b;a.i?b=a.i.rootElementId:b=a.f.attrs.id;a.h=b||a.h;"video-player"==a.h&&(a.h=a.W,a.f.attrs.id=a.W);a.m.id==a.h&&(a.h+="-player",a.f.attrs.id=a.h)}
n.Ga=function(){return this.ea};
function Ui(a){a.f&&!a.f.loaded&&(a.f.loaded=!0,"0"!=a.f.args.autoplay?a.api.loadVideoByPlayerVars(a.f.args):a.api.cueVideoByPlayerVars(a.f.args))}
function Vi(a){var b=!0,c=Wi(a);c&&a.f&&(a=Xi(a),b=Dh(c,"version")===a);return b&&!!A("yt.player.Application.create")}
function Si(a){if(!a.g&&!a.M){var b=Vi(a);if(b&&"html5"==(Wi(a)?"html5":null))a.T="html5",a.u||Yi(a);else if(Zi(a),a.T="html5",b&&a.l)a.Z.appendChild(a.l),Yi(a);else{a.f&&(a.f.loaded=!0);var c=!1;a.C=function(){c=!0;if(a.i)var d=a.i.serializedExperimentFlags;else a.f&&a.f.args&&(d=a.f.args.fflags);d="true"==Je(d||"").player_bootstrap_method?A("yt.player.Application.createAlternate")||A("yt.player.Application.create"):A("yt.player.Application.create");var e=a.f?a.f.clone():void 0;d(a.Z,e,a.i);Yi(a)};
a.M=!0;b?a.C():(Hh(Xi(a),a.C),(b=a.i?a.i.cssUrl:a.f.assets.css)&&Li(b),$i(a)&&!c&&z("yt.player.Application.create",null,void 0))}}}
function Wi(a){var b=Dc(a.h);!b&&a.m&&a.m.querySelector&&(b=a.m.querySelector("#"+a.h));return b}
function Yi(a){if(!a.g){var b=Wi(a),c=!1;b&&b.getApiInterface&&b.getApiInterface()&&(c=!0);c?(a.M=!1,b.isNotServable&&a.f&&b.isNotServable(a.f.args.video_id)||aj(a)):a.oa=V(function(){Yi(a)},50)}}
function aj(a){Qi(a);a.u=!0;var b=Wi(a);b.addEventListener&&(a.G=bj(a,b,"addEventListener"));b.removeEventListener&&(a.X=bj(a,b,"removeEventListener"));var c=b.getApiInterface();c=c.concat(b.getInternalApiInterface());for(var d=0;d<c.length;d++){var e=c[d];a.api[e]||(a.api[e]=bj(a,b,e))}for(var f in a.j)a.G(f,a.j[f]);Ui(a);a.Y&&a.Y(a.api);a.H.O("onReady",a.api)}
function bj(a,b,c){var d=b[c];return function(){try{return a.da=null,d.apply(b,arguments)}catch(e){"sendAbandonmentPing"!=c&&(e.params=c,a.da=e,Ie(e))}}}
function Qi(a){a.u=!1;if(a.X)for(var b in a.j)a.X(b,a.j[b]);for(var c in a.U)Xe(parseInt(c,10));a.U={};a.G=null;a.X=null;for(var d in a.api)a.api[d]=null;a.api.addEventListener=a.ba.bind(a);a.api.removeEventListener=a.Wa.bind(a);a.api.destroy=a.dispose.bind(a);a.api.getLastError=a.Ha.bind(a);a.api.getPlayerType=a.Ia.bind(a);a.api.getCurrentVideoConfig=a.Ga.bind(a);a.api.loadNewVideoConfig=a.loadNewVideoConfig.bind(a);a.api.isReady=a.Qa.bind(a)}
n.Qa=function(){return this.u};
n.ba=function(a,b){var c=this,d=Ti(this,b);if(d){if(!(0<=Ya(this.Aa,a)||this.j[a])){var e=cj(this,a);this.G&&this.G(a,e)}this.H.subscribe(a,d);"onReady"==a&&this.u&&V(function(){d(c.api)},0)}};
n.Wa=function(a,b){if(!this.g){var c=Ti(this,b);c&&he(this.H,a,c)}};
function Ti(a,b){var c=b;if("string"==typeof b){if(a.aa[b])return a.aa[b];c=function(){var d=A(b);d&&d.apply(y,arguments)};
a.aa[b]=c}return c?c:null}
function cj(a,b){var c="ytPlayer"+b+a.W;a.j[b]=c;y[c]=function(d){var e=V(function(){if(!a.g){a.H.O(b,d);var f=a.U,g=String(e);g in f&&delete f[g]}},0);
kb(a.U,String(e))};
return c}
n.Ca=function(a){Wf("a11y-announce",a)};
n.Ra=function(a){Wf("WATCH_LATER_VIDEO_ADDED",a)};
n.Sa=function(a){Wf("WATCH_LATER_VIDEO_REMOVED",a)};
n.Ia=function(){return this.T||(Wi(this)?"html5":null)};
n.Ha=function(){return this.da};
function Zi(a){a.cancel();Qi(a);a.T=null;a.f&&(a.f.loaded=!1);var b=Wi(a);b&&(Vi(a)||!$i(a)?a.l=b:(b&&b.destroy&&b.destroy(),a.l=null));for(a=a.Z;b=a.firstChild;)a.removeChild(b)}
n.cancel=function(){if(this.C){var a=Xi(this);Nh(a,this.C)}Xe(this.oa);this.M=!1};
n.o=function(){Zi(this);if(this.l&&this.f&&this.l.destroy)try{this.l.destroy()}catch(b){T(b)}this.aa=null;for(var a in this.j)y[this.j[a]]=null;this.ea=this.f=this.api=null;delete this.Z;delete this.m;M.prototype.o.call(this)};
function $i(a){return a.f&&a.f.args&&a.f.args.fflags?-1!=a.f.args.fflags.indexOf("player_destroy_old_version=true"):!1}
function Xi(a){return a.i?a.i.jsUrl:a.f.assets.js}
;var dj={},ej="player_uid_"+(1E9*Math.random()>>>0);function fj(a){delete dj[a.getId()]}
;function gj(a){return(0===a.search("cue")||0===a.search("load"))&&"loadModule"!==a}
function hj(a,b,c){"string"===typeof a&&(a={mediaContentUrl:a,startSeconds:b,suggestedQuality:c});a:{if((b=a.mediaContentUrl)&&(b=/\/([ve]|embed)\/([^#?]+)/.exec(b))&&b[2]){b=b[2];break a}b=null}a.videoId=b;return ij(a)}
function ij(a,b,c){if("string"===typeof a)return{videoId:a,startSeconds:b,suggestedQuality:c};b=["endSeconds","startSeconds","mediaContentUrl","suggestedQuality","videoId"];c={};for(var d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}
function jj(a,b,c,d){if(Ma(a)&&!Array.isArray(a)){b="playlist list listType index startSeconds suggestedQuality".split(" ");c={};for(d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}b={index:b,startSeconds:c,suggestedQuality:d};"string"===typeof a&&16===a.length?b.list="PL"+a:b.playlist=a;return b}
;function kj(a){a=void 0===a?!1:a;M.call(this);this.f=new Q(a);Sc(this,Ta(Tc,this.f))}
E(kj,M);kj.prototype.subscribe=function(a,b,c){return this.g?0:this.f.subscribe(a,b,c)};
kj.prototype.j=function(a,b){this.g||this.f.O.apply(this.f,arguments)};function lj(a,b,c){kj.call(this);this.h=a;this.i=b;this.l=c}
v(lj,kj);function mj(a,b,c){if(!a.g){var d=a.h;d.g||a.i!=d.f||(a={id:a.l,command:b},c&&(a.data=c),d.f.postMessage(Id(a),d.i))}}
lj.prototype.o=function(){this.i=this.h=null;kj.prototype.o.call(this)};function nj(a){M.call(this);this.f=a;this.f.subscribe("command",this.ya,this);this.h={};this.j=!1}
v(nj,M);n=nj.prototype;n.start=function(){this.j||this.g||(this.j=!0,mj(this.f,"RECEIVING"))};
n.ya=function(a,b,c){if(this.j&&!this.g){var d=b||{};switch(a){case "addEventListener":"string"===typeof d.event&&(a=d.event,a in this.h||(c=B(this.Ya,this,a),this.h[a]=c,this.addEventListener(a,c)));break;case "removeEventListener":"string"===typeof d.event&&oj(this,d.event);break;default:this.i.isReady()&&this.i.isExternalMethodAvailable(a,c||null)&&(b=pj(a,b||{}),c=this.i.handleExternalCall(a,b,c||null),(c=qj(a,c))&&this.j&&!this.g&&mj(this.f,a,c))}}};
n.Ya=function(a,b){this.j&&!this.g&&mj(this.f,a,this.ha(a,b))};
n.ha=function(a,b){if(null!=b)return{value:b}};
function oj(a,b){b in a.h&&(a.removeEventListener(b,a.h[b]),delete a.h[b])}
n.o=function(){var a=this.f;a.g||he(a.f,"command",this.ya,this);this.f=null;for(var b in this.h)oj(this,b);M.prototype.o.call(this)};function rj(a,b){nj.call(this,b);this.i=a;this.start()}
v(rj,nj);rj.prototype.addEventListener=function(a,b){this.i.addEventListener(a,b)};
rj.prototype.removeEventListener=function(a,b){this.i.removeEventListener(a,b)};
function pj(a,b){switch(a){case "loadVideoById":return b=ij(b),[b];case "cueVideoById":return b=ij(b),[b];case "loadVideoByPlayerVars":return[b];case "cueVideoByPlayerVars":return[b];case "loadPlaylist":return b=jj(b),[b];case "cuePlaylist":return b=jj(b),[b];case "seekTo":return[b.seconds,b.allowSeekAhead];case "playVideoAt":return[b.index];case "setVolume":return[b.volume];case "setPlaybackQuality":return[b.suggestedQuality];case "setPlaybackRate":return[b.suggestedRate];case "setLoop":return[b.loopPlaylists];
case "setShuffle":return[b.shufflePlaylist];case "getOptions":return[b.module];case "getOption":return[b.module,b.option];case "setOption":return[b.module,b.option,b.value];case "handleGlobalKeyDown":return[b.keyCode,b.shiftKey,b.ctrlKey,b.altKey,b.metaKey,b.key,b.code]}return[]}
function qj(a,b){switch(a){case "isMuted":return{muted:b};case "getVolume":return{volume:b};case "getPlaybackRate":return{playbackRate:b};case "getAvailablePlaybackRates":return{availablePlaybackRates:b};case "getVideoLoadedFraction":return{videoLoadedFraction:b};case "getPlayerState":return{playerState:b};case "getCurrentTime":return{currentTime:b};case "getPlaybackQuality":return{playbackQuality:b};case "getAvailableQualityLevels":return{availableQualityLevels:b};case "getDuration":return{duration:b};
case "getVideoUrl":return{videoUrl:b};case "getVideoEmbedCode":return{videoEmbedCode:b};case "getPlaylist":return{playlist:b};case "getPlaylistIndex":return{playlistIndex:b};case "getOptions":return{options:b};case "getOption":return{option:b}}}
rj.prototype.ha=function(a,b){switch(a){case "onReady":return;case "onStateChange":return{playerState:b};case "onPlaybackQualityChange":return{playbackQuality:b};case "onPlaybackRateChange":return{playbackRate:b};case "onError":return{errorCode:b}}return nj.prototype.ha.call(this,a,b)};
rj.prototype.o=function(){nj.prototype.o.call(this);delete this.i};function sj(a,b,c){M.call(this);var d=this;c=c||S("POST_MESSAGE_ORIGIN",void 0)||window.document.location.protocol+"//"+window.document.location.hostname;this.h=b||null;this.u="*";this.i=c;this.sessionId=null;this.channel="widget";this.C=!!a;this.m=function(e){a:if(!("*"!=d.i&&e.origin!=d.i||d.h&&e.source!=d.h||"string"!==typeof e.data)){try{var f=JSON.parse(e.data)}catch(g){break a}if(!(null==f||d.C&&(d.sessionId&&d.sessionId!=f.id||d.channel&&d.channel!=f.channel))&&f)switch(f.event){case "listening":"null"!=
e.origin&&(d.i=d.u=e.origin);d.h=e.source;d.sessionId=f.id;d.f&&(d.f(),d.f=null);break;case "command":d.j&&(!d.l||0<=Ya(d.l,f.func))&&d.j(f.func,f.args,e.origin)}}};
this.l=this.f=this.j=null;window.addEventListener("message",this.m)}
v(sj,M);sj.prototype.sendMessage=function(a,b){var c=b||this.h;if(c){this.sessionId&&(a.id=this.sessionId);this.channel&&(a.channel=this.channel);try{var d=JSON.stringify(a);c.postMessage(d,this.u)}catch(e){Ie(e)}}};
sj.prototype.o=function(){window.removeEventListener("message",this.m);M.prototype.o.call(this)};function tj(){var a=this.g=new sj(!!S("WIDGET_ID_ENFORCE")),b=B(this.Va,this);a.j=b;a.l=null;this.g.channel="widget";if(a=S("WIDGET_ID"))this.g.sessionId=a;this.i=[];this.l=!1;this.j={}}
n=tj.prototype;n.Va=function(a,b,c){"addEventListener"==a&&b?(a=b[0],this.j[a]||"onReady"==a||(this.addEventListener(a,uj(this,a)),this.j[a]=!0)):this.ua(a,b,c)};
n.ua=function(){};
function uj(a,b){return B(function(c){this.sendMessage(b,c)},a)}
n.addEventListener=function(){};
n.Fa=function(){this.l=!0;this.sendMessage("initialDelivery",this.ia());this.sendMessage("onReady");G(this.i,this.za,this);this.i=[]};
n.ia=function(){return null};
function vj(a,b){a.sendMessage("infoDelivery",b)}
n.za=function(a){this.l?this.g.sendMessage(a):this.i.push(a)};
n.sendMessage=function(a,b){this.za({event:a,info:void 0==b?null:b})};
n.dispose=function(){this.g=null};function wj(a){tj.call(this);this.f=a;this.h=[];this.addEventListener("onReady",B(this.Ta,this));this.addEventListener("onVideoProgress",B(this.cb,this));this.addEventListener("onVolumeChange",B(this.eb,this));this.addEventListener("onApiChange",B(this.Xa,this));this.addEventListener("onPlaybackQualityChange",B(this.Za,this));this.addEventListener("onPlaybackRateChange",B(this.ab,this));this.addEventListener("onStateChange",B(this.bb,this));this.addEventListener("onWebglSettingsChanged",B(this.fb,
this))}
v(wj,tj);n=wj.prototype;n.ua=function(a,b,c){if(this.f.isExternalMethodAvailable(a,c)){b=b||[];if(0<b.length&&gj(a)){var d=b;if(Ma(d[0])&&!Array.isArray(d[0]))d=d[0];else{var e={};switch(a){case "loadVideoById":case "cueVideoById":e=ij.apply(window,d);break;case "loadVideoByUrl":case "cueVideoByUrl":e=hj.apply(window,d);break;case "loadPlaylist":case "cuePlaylist":e=jj.apply(window,d)}d=e}b.length=1;b[0]=d}this.f.handleExternalCall(a,b,c);gj(a)&&vj(this,this.ia())}};
n.Ta=function(){var a=B(this.Fa,this);this.g.f=a};
n.addEventListener=function(a,b){this.h.push({eventType:a,listener:b});this.f.addEventListener(a,b)};
n.ia=function(){if(!this.f)return null;var a=this.f.getApiInterface();cb(a,"getVideoData");for(var b={apiInterface:a},c=0,d=a.length;c<d;c++){var e=a[c];if(0===e.search("get")||0===e.search("is")){var f=0;0===e.search("get")?f=3:0===e.search("is")&&(f=2);f=e.charAt(f).toLowerCase()+e.substr(f+1);try{var g=this.f[e]();b[f]=g}catch(h){}}}b.videoData=this.f.getVideoData();b.currentTimeLastUpdated_=C()/1E3;return b};
n.bb=function(a){a={playerState:a,currentTime:this.f.getCurrentTime(),duration:this.f.getDuration(),videoData:this.f.getVideoData(),videoStartBytes:0,videoBytesTotal:this.f.getVideoBytesTotal(),videoLoadedFraction:this.f.getVideoLoadedFraction(),playbackQuality:this.f.getPlaybackQuality(),availableQualityLevels:this.f.getAvailableQualityLevels(),currentTimeLastUpdated_:C()/1E3,playbackRate:this.f.getPlaybackRate(),mediaReferenceTime:this.f.getMediaReferenceTime()};this.f.getVideoUrl&&(a.videoUrl=
this.f.getVideoUrl());this.f.getVideoContentRect&&(a.videoContentRect=this.f.getVideoContentRect());this.f.getProgressState&&(a.progressState=this.f.getProgressState());this.f.getPlaylist&&(a.playlist=this.f.getPlaylist());this.f.getPlaylistIndex&&(a.playlistIndex=this.f.getPlaylistIndex());this.f.getStoryboardFormat&&(a.storyboardFormat=this.f.getStoryboardFormat());vj(this,a)};
n.Za=function(a){vj(this,{playbackQuality:a})};
n.ab=function(a){vj(this,{playbackRate:a})};
n.Xa=function(){for(var a=this.f.getOptions(),b={namespaces:a},c=0,d=a.length;c<d;c++){var e=a[c],f=this.f.getOptions(e);b[e]={options:f};for(var g=0,h=f.length;g<h;g++){var k=f[g],l=this.f.getOption(e,k);b[e][k]=l}}this.sendMessage("apiInfoDelivery",b)};
n.eb=function(){vj(this,{muted:this.f.isMuted(),volume:this.f.getVolume()})};
n.cb=function(a){a={currentTime:a,videoBytesLoaded:this.f.getVideoBytesLoaded(),videoLoadedFraction:this.f.getVideoLoadedFraction(),currentTimeLastUpdated_:C()/1E3,playbackRate:this.f.getPlaybackRate(),mediaReferenceTime:this.f.getMediaReferenceTime()};this.f.getProgressState&&(a.progressState=this.f.getProgressState());vj(this,a)};
n.fb=function(){var a={sphericalProperties:this.f.getSphericalProperties()};vj(this,a)};
n.dispose=function(){tj.prototype.dispose.call(this);for(var a=0;a<this.h.length;a++){var b=this.h[a];this.f.removeEventListener(b.eventType,b.listener)}this.h=[]};function xj(a,b,c){M.call(this);this.f=a;this.i=c;this.j=Af(window,"message",B(this.l,this));this.h=new lj(this,a,b);Sc(this,Ta(Tc,this.h))}
v(xj,M);xj.prototype.l=function(a){var b;if(b=!this.g)if(b=a.origin==this.i)a:{b=this.f;do{b:{var c=a.source;do{if(c==b){c=!0;break b}if(c==c.parent)break;c=c.parent}while(null!=c);c=!1}if(c){b=!0;break a}b=b.opener}while(null!=b);b=!1}if(b&&(b=a.data,"string"===typeof b)){try{b=JSON.parse(b)}catch(d){return}b.command&&(c=this.h,c.g||c.j("command",b.command,b.data,a.origin))}};
xj.prototype.o=function(){Bf(this.j);this.f=null;M.prototype.o.call(this)};function yj(){var a=mb(zj),b;return Xd(new P(function(c,d){a.onSuccess=function(e){We(e)?c(e):d(new Aj("Request failed, status="+(e&&"status"in e?e.status:-1),"net.badstatus",e))};
a.onError=function(e){d(new Aj("Unknown request error","net.unknown",e))};
a.R=function(e){d(new Aj("Request timed out","net.timeout",e))};
b=gf("//googleads.g.doubleclick.net/pagead/id",a)}),function(c){c instanceof Yd&&b.abort();
return Vd(c)})}
function Aj(a,b){F.call(this,a+", errorCode="+b);this.errorCode=b;this.name="PromiseAjaxError"}
v(Aj,F);function Bj(){this.g=0;this.f=null}
Bj.prototype.then=function(a,b,c){return 1===this.g&&a?(a=a.call(c,this.f),Od(a)?a:Cj(a)):2===this.g&&b?(a=b.call(c,this.f),Od(a)?a:Dj(a)):this};
Bj.prototype.getValue=function(){return this.f};
Bj.prototype.$goog_Thenable=!0;function Dj(a){var b=new Bj;a=void 0===a?null:a;b.g=2;b.f=void 0===a?null:a;return b}
function Cj(a){var b=new Bj;a=void 0===a?null:a;b.g=1;b.f=void 0===a?null:a;return b}
;function Ej(a){F.call(this,a.message||a.description||a.name);this.isMissing=a instanceof Fj;this.isTimeout=a instanceof Aj&&"net.timeout"==a.errorCode;this.isCanceled=a instanceof Yd}
v(Ej,F);Ej.prototype.name="BiscottiError";function Fj(){F.call(this,"Biscotti ID is missing from server")}
v(Fj,F);Fj.prototype.name="BiscottiMissingError";var zj={format:"RAW",method:"GET",timeout:5E3,withCredentials:!0},Gj=null;function De(){if("1"===gb(Ae(),"args","privembed"))return Vd(Error("Biscotti ID is not available in private embed mode"));Gj||(Gj=Xd(yj().then(Hj),function(a){return Ij(2,a)}));
return Gj}
function Hj(a){a=a.responseText;if(0!=a.lastIndexOf(")]}'",0))throw new Fj;a=JSON.parse(a.substr(4));if(1<(a.type||1))throw new Fj;a=a.id;Ee(a);Gj=Cj(a);Jj(18E5,2);return a}
function Ij(a,b){var c=new Ej(b);Ee("");Gj=Dj(c);0<a&&Jj(12E4,a-1);throw c;}
function Jj(a,b){V(function(){Xd(yj().then(Hj,function(c){return Ij(b,c)}),Ha)},a)}
function Kj(){try{var a=A("yt.ads.biscotti.getId_");return a?a():De()}catch(b){return Vd(b)}}
;function Lj(a){if("1"!==gb(Ae(),"args","privembed")){a&&Ce();try{Kj().then(function(){},function(){}),V(Lj,18E5)}catch(b){T(b)}}}
;var Y=A("ytglobal.prefsUserPrefsPrefs_")||{};z("ytglobal.prefsUserPrefsPrefs_",Y,void 0);function Mj(){this.f=S("ALT_PREF_COOKIE_NAME","PREF");var a=zc.get(""+this.f,void 0);if(a){a=decodeURIComponent(a).split("&");for(var b=0;b<a.length;b++){var c=a[b].split("="),d=c[0];(c=c[1])&&(Y[d]=c.toString())}}}
n=Mj.prototype;n.get=function(a,b){Nj(a);Oj(a);var c=void 0!==Y[a]?Y[a].toString():null;return null!=c?c:b?b:""};
n.set=function(a,b){Nj(a);Oj(a);if(null==b)throw Error("ExpectedNotNull");Y[a]=b.toString()};
n.remove=function(a){Nj(a);Oj(a);delete Y[a]};
n.save=function(){zg(this.f,this.dump(),63072E3)};
n.clear=function(){for(var a in Y)delete Y[a]};
n.dump=function(){var a=[],b;for(b in Y)a.push(b+"="+encodeURIComponent(String(Y[b])));return a.join("&")};
function Oj(a){if(/^f([1-9][0-9]*)$/.test(a))throw Error("ExpectedRegexMatch: "+a);}
function Nj(a){if(!/^\w+$/.test(a))throw Error("ExpectedRegexMismatch: "+a);}
function Pj(a){a=void 0!==Y[a]?Y[a].toString():null;return null!=a&&/^[A-Fa-f0-9]+$/.test(a)?parseInt(a,16):null}
Ia(Mj);function Qj(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];if(!Rj(a)||c.some(function(e){return!Rj(e)}))throw Error("Only objects may be merged.");
c=u(c);for(d=c.next();!d.done;d=c.next())Sj(a,d.value);return a}
function Sj(a,b){for(var c in b)if(Rj(b[c])){if(c in a&&!Rj(a[c]))throw Error("Cannot merge an object into a non-object.");c in a||(a[c]={});Sj(a[c],b[c])}else if(Tj(b[c])){if(c in a&&!Tj(a[c]))throw Error("Cannot merge an array into a non-array.");c in a||(a[c]=[]);Uj(a[c],b[c])}else a[c]=b[c];return a}
function Uj(a,b){for(var c=u(b),d=c.next();!d.done;d=c.next())d=d.value,Rj(d)?a.push(Sj({},d)):Tj(d)?a.push(Uj([],d)):a.push(d);return a}
function Rj(a){return"object"===typeof a&&!Array.isArray(a)}
function Tj(a){return"object"===typeof a&&Array.isArray(a)}
;function Vj(a,b){qi.call(this,1,arguments)}
v(Vj,qi);function Wj(a,b){qi.call(this,1,arguments)}
v(Wj,qi);var Xj=new ri("aft-recorded",Vj),Yj=new ri("timing-sent",Wj);var Zj=window;function ak(){this.timing={};this.clearResourceTimings=function(){};
this.webkitClearResourceTimings=function(){};
this.mozClearResourceTimings=function(){};
this.msClearResourceTimings=function(){};
this.oClearResourceTimings=function(){}}
var bk=Zj.performance||Zj.mozPerformance||Zj.msPerformance||Zj.webkitPerformance||new ak;var ck=!1;B(bk.clearResourceTimings||bk.webkitClearResourceTimings||bk.mozClearResourceTimings||bk.msClearResourceTimings||bk.oClearResourceTimings||Ha,bk);function dk(a){var b=ek(a);if(b.aft)return b.aft;a=S((a||"")+"TIMING_AFT_KEYS",["ol"]);for(var c=a.length,d=0;d<c;d++){var e=b[a[d]];if(e)return e}return NaN}
function fk(a){var b;(b=A("ytcsi."+(a||"")+"data_"))||(b={tick:{},info:{}},Ua("ytcsi."+(a||"")+"data_",b));return b}
function gk(a){a=fk(a);a.info||(a.info={});return a.info}
function ek(a){a=fk(a);a.tick||(a.tick={});return a.tick}
function hk(a){var b=fk(a).nonce;b||(b=ci(),fk(a).nonce=b);return b}
function ik(a){var b=ek(a||""),c=dk(a);c&&!ck&&(wi(Xj,new Vj(Math.round(c-b._start),a)),ck=!0)}
;function jk(){var a=A("ytcsi.debug");a||(a=[],z("ytcsi.debug",a,void 0),z("ytcsi.reference",{},void 0));return a}
function kk(a){a=a||"";var b=A("ytcsi.reference");b||(jk(),b=A("ytcsi.reference"));if(b[a])return b[a];var c=jk(),d={timerName:a,info:{},tick:{},span:{}};c.push(d);return b[a]=d}
;var lk=y.ytLoggingLatencyUsageStats_||{};z("ytLoggingLatencyUsageStats_",lk,void 0);function mk(){this.f=0}
function nk(){mk.f||(mk.f=new mk);return mk.f}
mk.prototype.tick=function(a,b,c){ok(this,"tick_"+a+"_"+b)||rh("latencyActionTicked",{tickName:a,clientActionNonce:b},{timestamp:c})};
mk.prototype.info=function(a,b){var c=Object.keys(a).join("");ok(this,"info_"+c+"_"+b)||(c=Object.assign({},a),c.clientActionNonce=b,rh("latencyActionInfo",c))};
mk.prototype.span=function(a,b){var c=Object.keys(a).join("");ok(this,"span_"+c+"_"+b)||(a.clientActionNonce=b,rh("latencyActionSpan",a))};
function ok(a,b){lk[b]=lk[b]||{count:0};var c=lk[b];c.count++;c.time=W();a.f||(a.f=Ff(function(){var d=W(),e;for(e in lk)lk[e]&&6E4<d-lk[e].time&&delete lk[e];a&&(a.f=0)},5E3));
return 5<c.count?(6===c.count&&1>1E5*Math.random()&&(c=new ph("CSI data exceeded logging limit with key",b.split("_")),0<=b.indexOf("plev")||vh(c)),!0):!1}
;var Z={},pk=(Z.ad_allowed="adTypesAllowed",Z.yt_abt="adBreakType",Z.ad_cpn="adClientPlaybackNonce",Z.ad_docid="adVideoId",Z.yt_ad_an="adNetworks",Z.ad_at="adType",Z.browse_id="browseId",Z.p="httpProtocol",Z.t="transportProtocol",Z.cpn="clientPlaybackNonce",Z.ccs="creatorInfo.creatorCanaryState",Z.cseg="creatorInfo.creatorSegment",Z.csn="clientScreenNonce",Z.docid="videoId",Z.GetHome_rid="requestIds",Z.GetSearch_rid="requestIds",Z.GetPlayer_rid="requestIds",Z.GetWatchNext_rid="requestIds",Z.GetBrowse_rid=
"requestIds",Z.GetLibrary_rid="requestIds",Z.is_continuation="isContinuation",Z.is_nav="isNavigation",Z.b_p="kabukiInfo.browseParams",Z.is_prefetch="kabukiInfo.isPrefetch",Z.is_secondary_nav="kabukiInfo.isSecondaryNav",Z.prev_browse_id="kabukiInfo.prevBrowseId",Z.query_source="kabukiInfo.querySource",Z.voz_type="kabukiInfo.vozType",Z.yt_lt="loadType",Z.mver="creatorInfo.measurementVersion",Z.yt_ad="isMonetized",Z.nr="webInfo.navigationReason",Z.nrsu="navigationRequestedSameUrl",Z.ncnp="webInfo.nonPreloadedNodeCount",
Z.pnt="performanceNavigationTiming",Z.prt="playbackRequiresTap",Z.plt="playerInfo.playbackType",Z.pis="playerInfo.playerInitializedState",Z.paused="playerInfo.isPausedOnLoad",Z.yt_pt="playerType",Z.fmt="playerInfo.itag",Z.yt_pl="watchInfo.isPlaylist",Z.yt_pre="playerInfo.preloadType",Z.yt_ad_pr="prerollAllowed",Z.pa="previousAction",Z.yt_red="isRedSubscriber",Z.rce="mwebInfo.responseContentEncoding",Z.scrh="screenHeight",Z.scrw="screenWidth",Z.st="serverTimeMs",Z.ssdm="shellStartupDurationMs",Z.aq=
"tvInfo.appQuality",Z.br_trs="tvInfo.bedrockTriggerState",Z.kebqat="kabukiInfo.earlyBrowseRequestInfo.abandonmentType",Z.kebqa="kabukiInfo.earlyBrowseRequestInfo.adopted",Z.label="tvInfo.label",Z.is_mdx="tvInfo.isMdx",Z.preloaded="tvInfo.isPreloaded",Z.upg_player_vis="playerInfo.visibilityState",Z.query="unpluggedInfo.query",Z.upg_chip_ids_string="unpluggedInfo.upgChipIdsString",Z.yt_vst="videoStreamType",Z.vph="viewportHeight",Z.vpw="viewportWidth",Z.yt_vis="isVisible",Z.rcl="mwebInfo.responseContentLength",
Z.GetSettings_rid="requestIds",Z.GetTrending_rid="requestIds",Z.GetMusicSearchSuggestions_rid="requestIds",Z.REQUEST_ID="requestIds",Z),qk="isContinuation isNavigation kabukiInfo.earlyBrowseRequestInfo.adopted kabukiInfo.isPrefetch kabukiInfo.isSecondaryNav isMonetized navigationRequestedSameUrl performanceNavigationTiming playerInfo.isPausedOnLoad prerollAllowed isRedSubscriber tvInfo.isMdx tvInfo.isPreloaded isVisible watchInfo.isPlaylist playbackRequiresTap".split(" "),rk={},sk=(rk.ccs="CANARY_STATE_",
rk.mver="MEASUREMENT_VERSION_",rk.pis="PLAYER_INITIALIZED_STATE_",rk.yt_pt="LATENCY_PLAYER_",rk.pa="LATENCY_ACTION_",rk.yt_vst="VIDEO_STREAM_TYPE_",rk),tk="all_vc ap c cver cbrand cmodel cplatform ctheme ei l_an l_mm plid srt yt_fss yt_li vpst vpni2 vpil2 icrc icrt pa GetAccountOverview_rid GetHistory_rid cmt d_vpct d_vpnfi d_vpni nsru pc pfa pfeh pftr pnc prerender psc rc start tcrt tcrc ssr vpr vps yt_abt yt_fn yt_fs yt_pft yt_pre yt_pt yt_pvis ytu_pvis yt_ref yt_sts tds".split(" ");
function uk(a){return!!S("FORCE_CSI_ON_GEL",!1)||U("csi_on_gel")||!!fk(a).useGel}
function vk(a){a=fk(a);if(!("gel"in a))a.gel={gelTicks:{},gelInfos:{}};else if(a.gel){var b=a.gel;b.gelInfos||(b.gelInfos={});b.gelTicks||(b.gelTicks={})}return a.gel}
;function wk(a,b,c){if(null!==b)if(gk(c)[a]=b,uk(c)){var d=b;b=vk(c);if(b.gelInfos)b.gelInfos["info_"+a]=!0;else{var e={};b.gelInfos=(e["info_"+a]=!0,e)}if(a.match("_rid")){var f=a.split("_rid")[0];a="REQUEST_ID"}if(a in pk){b=pk[a];0<=Ya(qk,b)&&(d=!!d);a in sk&&"string"===typeof d&&(d=sk[a]+d.toUpperCase());a=d;d=b.split(".");for(var g=e={},h=0;h<d.length-1;h++){var k=d[h];g[k]={};g=g[k]}g[d[d.length-1]]="requestIds"===b?[{id:a,endpoint:f}]:a;f=Qj({},e)}else 0<=Ya(tk,a)||vh(new ph("Unknown label logged with GEL CSI",
a)),f=void 0;f&&uk(c)&&(b=kk(c||""),Qj(b.info,f),b=vk(c),"gelInfos"in b||(b.gelInfos={}),Qj(b.gelInfos,f),c=hk(c),nk().info(f,c))}else kk(c||"").info[a]=b}
function xk(a,b,c){var d=ek(c);if(U("use_first_tick")&&yk(a,c))return d[a];if(!b&&"_"!==a[0]){var e=a;bk.mark&&(0==e.lastIndexOf("mark_",0)||(e="mark_"+e),c&&(e+=" ("+c+")"),bk.mark(e))}e=b||W();d[a]=e;e=vk(c);e.gelTicks&&(e.gelTicks["tick_"+a]=!0);c||b||W();if(uk(c)){kk(c||"").tick[a]=b||W();e=hk(c);if("_start"===a){var f=nk();ok(f,"baseline_"+e)||rh("latencyActionBaselined",{clientActionNonce:e},{timestamp:b})}else nk().tick(a,e,b);ik(c);e=!0}else e=!1;if(!e){if(!A("yt.timing."+(c||"")+"pingSent_")&&
(f=S((c||"")+"TIMING_ACTION",void 0),e=ek(c),A("ytglobal.timing"+(c||"")+"ready_")&&f&&yk("_start")&&dk(c)))if(ik(c),c)zk(c);else{f=!0;var g=S("TIMING_WAIT",[]);if(g.length)for(var h=0,k=g.length;h<k;++h)if(!(g[h]in e)){f=!1;break}f&&zk(c)}kk(c||"").tick[a]=b||W()}return d[a]}
function yk(a,b){var c=ek(b);return a in c}
function zk(a){if(!uk(a)){var b=ek(a),c=gk(a),d=b._start,e=S("CSI_SERVICE_NAME","youtube"),f={v:2,s:e,action:S((a||"")+"TIMING_ACTION",void 0)},g=c.srt;void 0!==b.srt&&delete c.srt;b.aft=dk(a);var h=ek(a),k=h.pbr,l=h.vc;h=h.pbs;k&&l&&h&&k<l&&l<h&&gk(a).yt_pvis&&"youtube"===e&&(wk("yt_lt","hot_bg",a),e=b.vc,k=b.pbs,delete b.aft,c.aft=Math.round(k-e));for(var m in c)"_"!==m.charAt(0)&&(f[m]=c[m]);b.ps=W();m={};e=[];for(var q in b)"_"!==q.charAt(0)&&(k=Math.round(b[q]-d),m[q]=k,e.push(q+"."+k));f.rt=
e.join(",");b=!!c.ap;U("debug_csi_data")&&(c=A("yt.timing.csiData"),c||(c=[],Ua("yt.timing.csiData",c)),c.push({page:location.href,time:new Date,args:f}));c="";for(var t in f)f.hasOwnProperty(t)&&(c+="&"+t+"="+f[t]);f="/csi_204?"+c.substring(1);if(window.navigator&&window.navigator.sendBeacon&&b){var p=void 0===p?"":p;sf(f,p)||pf(f,void 0,void 0,void 0,p)}else pf(f);z("yt.timing."+(a||"")+"pingSent_",!0,void 0);wi(Yj,new Wj(m.aft+(Number(g)||0),a))}}
if(U("overwrite_polyfill_on_logging_lib_loaded")){var Ak=window;Ak.ytcsi&&(Ak.ytcsi.info=wk,Ak.ytcsi.tick=xk)};var Bk=null,Ck=null,Dk=null,Ek={};function Fk(a){var b=a.id;a=a.ve_type;var c=ei++;a=new fi({veType:a,veCounter:c,elementIndex:void 0,dataElement:void 0,youtubeData:void 0});Ek[b]=a;b=li();c=ji();b&&c&&Gi(b,c,[a])}
function Gk(a){var b=a.csn;a=a.root_ve_type;if(b&&a&&(oi(b,a),a=ji()))for(var c in Ek){var d=Ek[c];d&&Gi(b,a,[d])}}
function Hk(a){Ek[a.id]=new fi({trackingParams:a.tracking_params})}
function Ik(a){var b=li(),c=Ek[a.id];if(b&&c){a=U("use_default_events_client")?void 0:qh;var d="INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK";c={csn:b,ve:c.getAsJson(),gestureType:d};d={fa:ni(b),S:b};"UNDEFINED_CSN"==b?Hi("visualElementGestured",c,d):a?ug("visualElementGestured",c,a,d):rh("visualElementGestured",c,d)}}
function Jk(a){a=a.ids;var b=li();if(b)for(var c=0;c<a.length;c++){var d=Ek[a[c]];if(d){var e=b,f=U("use_default_events_client")?void 0:qh;d={csn:e,ve:d.getAsJson(),eventType:1};var g={fa:ni(e),S:e};"UNDEFINED_CSN"==e?Hi("visualElementShown",d,g):f?ug("visualElementShown",d,f,g):rh("visualElementShown",d,g)}}}
;z("yt.setConfig",R,void 0);z("yt.config.set",R,void 0);z("yt.setMsg",Ah,void 0);z("yt.msgs.set",Ah,void 0);z("yt.logging.errors.log",yh,void 0);
z("writeEmbed",function(){var a=S("PLAYER_CONFIG",void 0);Lj(!0);"gvn"==a.args.ps&&(document.body.style.backgroundColor="transparent");var b=document.referrer,c=S("POST_MESSAGE_ORIGIN");window!=window.top&&b&&b!=document.URL&&(a.args.loaderUrl=b);S("LIGHTWEIGHT_AUTOPLAY")&&(a.args.autoplay="1");b="player";var d=void 0===d?!0:d;b="string"===typeof b?Dc(b):b;var e=ej+"_"+Na(b),f=dj[e];f&&d?a&&a.args&&a.args.fflags&&a.args.fflags.includes("web_player_remove_playerproxy=true")?f.api.loadVideoByPlayerVars(a.args||
null):f.loadNewVideoConfig(a):(f=new Pi(b,e,a,void 0),dj[e]=f,Wf("player-added",f.api),Sc(f,Ta(fj,f)));a=f.api;Bk=a;a.addEventListener("onScreenChanged",Gk);a.addEventListener("onLogClientVeCreated",Fk);a.addEventListener("onLogServerVeCreated",Hk);a.addEventListener("onLogVeClicked",Ik);a.addEventListener("onLogVesShown",Jk);d=S("POST_MESSAGE_ID","player");S("ENABLE_JS_API")?Dk=new wj(a):S("ENABLE_POST_API")&&"string"===typeof d&&"string"===typeof c&&(Ck=new xj(window.parent,d,c),Dk=new rj(a,Ck.h));
c=S("BG_P",void 0);Zh(c)&&(S("BG_I")||S("BG_IU"))&&(Vh=!0,Uh.initialize(S("BG_I",null),S("BG_IU",null),c,Yh,void 0,!!S("BG_CE",!1)));Qh()},void 0);
z("yt.www.watch.ads.restrictioncookie.spr",function(a){pf(a+"mac_204?action_fcts=1");return!0},void 0);
var Kk=He(function(){xk("ol");var a=Mj.getInstance(),b=!!((Pj("f"+(Math.floor(119/31)+1))||0)&67108864),c=1<window.devicePixelRatio;if(document.body&&xd(document.body,"exp-invert-logo"))if(c&&!xd(document.body,"inverted-hdpi")){var d=document.body;if(d.classList)d.classList.add("inverted-hdpi");else if(!xd(d,"inverted-hdpi")){var e=vd(d);wd(d,e+(0<e.length?" inverted-hdpi":"inverted-hdpi"))}}else!c&&xd(document.body,"inverted-hdpi")&&yd();b!=c&&(b="f"+(Math.floor(119/31)+1),d=Pj(b)||0,d=c?d|67108864:
d&-67108865,0==d?delete Y[b]:(c=d.toString(16),Y[b]=c.toString()),a.save())}),Lk=He(function(){var a=Bk;
a&&a.sendAbandonmentPing&&a.sendAbandonmentPing();S("PL_ATT")&&Uh.dispose();a=0;for(var b=Oh.length;a<b;a++)Jf(Oh[a]);Oh.length=0;Mh("//static.doubleclick.net/instream/ad_status.js");Ph=!1;R("DCLKSTAT",0);Uc(Dk,Ck);if(a=Bk)a.removeEventListener("onScreenChanged",Gk),a.removeEventListener("onLogClientVeCreated",Fk),a.removeEventListener("onLogServerVeCreated",Hk),a.removeEventListener("onLogVeClicked",Ik),a.removeEventListener("onLogVesShown",Jk),a.destroy();Ek={}});
window.addEventListener?(window.addEventListener("load",Kk),window.addEventListener("unload",Lk)):window.attachEvent&&(window.attachEvent("onload",Kk),window.attachEvent("onunload",Lk));Ua("yt.abuse.player.botguardInitialized",A("yt.abuse.player.botguardInitialized")||$h);Ua("yt.abuse.player.invokeBotguard",A("yt.abuse.player.invokeBotguard")||ai);Ua("yt.abuse.dclkstatus.checkDclkStatus",A("yt.abuse.dclkstatus.checkDclkStatus")||Rh);
Ua("yt.player.exports.navigate",A("yt.player.exports.navigate")||pi);Ua("yt.util.activity.init",A("yt.util.activity.init")||Lf);Ua("yt.util.activity.getTimeSinceActive",A("yt.util.activity.getTimeSinceActive")||Of);Ua("yt.util.activity.setTimestamp",A("yt.util.activity.setTimestamp")||Mf);}).call(this);
