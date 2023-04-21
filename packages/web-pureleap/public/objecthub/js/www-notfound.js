(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
function ba(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}
var ca=ba(this);function da(a,b){if(b)a:{for(var c=ca,e=a.split("."),d=0;d<e.length-1;d++){var f=e[d];if(!(f in c))break a;c=c[f]}e=e[e.length-1];d=c[e];f=b(d);f!=d&&null!=f&&aa(c,e,{configurable:!0,writable:!0,value:f})}}
var ea="function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var e=arguments[c];if(e)for(var d in e)Object.prototype.hasOwnProperty.call(e,d)&&(a[d]=e[d])}return a};
da("Object.assign",function(a){return a||ea});
var g=this||self,fa=/^[\w+/_-]+[=]{0,2}$/,h=null;function l(a){return(a=a.querySelector&&a.querySelector("script[nonce]"))&&(a=a.nonce||a.getAttribute("nonce"))&&fa.test(a)?a:""}
function n(a){a=a.split(".");for(var b=g,c=0;c<a.length;c++)if(b=b[a[c]],null==b)return null;return b}
function p(){}
function q(a){var b=typeof a;return"object"!=b?b:a?Array.isArray(a)?"array":b:"null"}
function ha(a){Object.prototype.hasOwnProperty.call(a,r)&&a[r]||(a[r]=++ia)}
var r="closure_uid_"+(1E9*Math.random()>>>0),ia=0;function ja(a,b,c){return a.call.apply(a.bind,arguments)}
function ka(a,b,c){if(!a)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var d=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(d,e);return a.apply(b,d)}}return function(){return a.apply(b,arguments)}}
function t(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?t=ja:t=ka;return t.apply(null,arguments)}
function la(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var e=c.slice();e.push.apply(e,arguments);return a.apply(this,e)}}
function u(a,b){var c=a.split("."),e=g;c[0]in e||"undefined"==typeof e.execScript||e.execScript("var "+c[0]);for(var d;c.length&&(d=c.shift());)c.length||void 0===b?e[d]&&e[d]!==Object.prototype[d]?e=e[d]:e=e[d]={}:e[d]=b}
function ma(a,b){function c(){}
c.prototype=b.prototype;a.v=b.prototype;a.prototype=new c;a.prototype.constructor=a}
function v(a){return a}
;var na=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if("string"===typeof a)return"string"!==typeof b||1!=b.length?-1:a.indexOf(b,0);
for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},w=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var e=a.length,d="string"===typeof a?a.split(""):a,f=0;f<e;f++)f in d&&b.call(c,d[f],f,a)};function x(a,b){this.f=a;this.g=b;this.b=0;this.a=null}
x.prototype.get=function(){if(0<this.b){this.b--;var a=this.a;this.a=a.next;a.next=null}else a=this.f();return a};var y;a:{var z=g.navigator;if(z){var A=z.userAgent;if(A){y=A;break a}}y=""};var B;function C(a,b){this.f=a===D&&b||"";this.g=E}
C.prototype.b=!0;C.prototype.a=function(){return this.f.toString()};
var E={},D={};function F(a,b){this.f=a===G&&b||"";this.g=H}
F.prototype.b=!0;F.prototype.a=function(){return this.f.toString()};
var oa=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,H={},G={};function pa(a,b){if(b instanceof C&&b.constructor===C&&b.g===E)var c=b.f;else q(b),c="type_error:TrustedResourceUrl";a.src=c;(c=a.ownerDocument&&a.ownerDocument.defaultView)&&c!=g?c=l(c.document):(null===h&&(h=l(g.document)),c=h);c&&a.setAttribute("nonce",c)}
;function I(a){var b=document;a=String(a);"application/xhtml+xml"===b.contentType&&(a=a.toLowerCase());return b.createElement(a)}
;function qa(a){g.setTimeout(function(){throw a;},0)}
var J;
function ra(){var a=g.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==y.indexOf("Presto")&&(a=function(){var d=I("IFRAME");d.style.display="none";document.documentElement.appendChild(d);var f=d.contentWindow;d=f.document;d.open();d.close();var k="callImmediate"+Math.random(),m="file:"==f.location.protocol?"*":f.location.protocol+"//"+f.location.host;d=t(function(V){if(("*"==m||V.origin==m)&&V.data==k)this.port1.onmessage()},this);
f.addEventListener("message",d,!1);this.port1={};this.port2={postMessage:function(){f.postMessage(k,m)}}});
if("undefined"!==typeof a&&-1==y.indexOf("Trident")&&-1==y.indexOf("MSIE")){var b=new a,c={},e=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var d=c.m;c.m=null;d()}};
return function(d){e.next={m:d};e=e.next;b.port2.postMessage(0)}}return function(d){g.setTimeout(d,0)}}
;function K(){this.b=this.a=null}
var M=new x(function(){return new L},function(a){a.reset()});
K.prototype.add=function(a,b){var c=M.get();c.set(a,b);this.b?this.b.next=c:this.a=c;this.b=c};
K.prototype.remove=function(){var a=null;this.a&&(a=this.a,this.a=this.a.next,this.a||(this.b=null),a.next=null);return a};
function L(){this.next=this.b=this.a=null}
L.prototype.set=function(a,b){this.a=a;this.b=b;this.next=null};
L.prototype.reset=function(){this.next=this.b=this.a=null};function sa(a){N||ta();O||(N(),O=!0);P.add(a,void 0)}
var N;function ta(){if(g.Promise&&g.Promise.resolve){var a=g.Promise.resolve(void 0);N=function(){a.then(Q)}}else N=function(){var b=Q,c;
!(c="function"!=q(g.setImmediate))&&(c=g.Window&&g.Window.prototype)&&(c=-1==y.indexOf("Edge")&&g.Window.prototype.setImmediate==g.setImmediate);c?(J||(J=ra()),J(b)):g.setImmediate(b)}}
var O=!1,P=new K;function Q(){for(var a;a=P.remove();){try{a.a.call(a.b)}catch(c){qa(c)}var b=M;b.g(a);100>b.b&&(b.b++,a.next=b.a,b.a=a)}O=!1}
;function R(){this.f=this.f;this.g=this.g}
R.prototype.f=!1;R.prototype.dispose=function(){this.f||(this.f=!0,this.j())};
R.prototype.j=function(){if(this.g)for(;this.g.length;)this.g.shift()()};function ua(a){va();if(void 0===B){var b=null;var c=g.trustedTypes;if(c&&c.createPolicy){try{b=c.createPolicy("goog#html",{createHTML:v,createScript:v,createScriptURL:v})}catch(e){g.console&&g.console.error(e.message)}B=b}else B=b}a=(b=B)?b.createScriptURL(a):a;return new C(D,a)}
var va=p;function S(a){R.call(this);this.o=1;this.h=[];this.i=0;this.a=[];this.b={};this.s=!!a}
ma(S,R);S.prototype.subscribe=function(a,b,c){var e=this.b[a];e||(e=this.b[a]=[]);var d=this.o;this.a[d]=a;this.a[d+1]=b;this.a[d+2]=c;this.o=d+3;e.push(d);return d};
S.prototype.l=function(a){var b=this.a[a];if(b){var c=this.b[b];if(0!=this.i)this.h.push(a),this.a[a+1]=p;else{if(c){var e=na(c,a);0<=e&&Array.prototype.splice.call(c,e,1)}delete this.a[a];delete this.a[a+1];delete this.a[a+2]}}return!!b};
S.prototype.u=function(a,b){var c=this.b[a];if(c){for(var e=Array(arguments.length-1),d=1,f=arguments.length;d<f;d++)e[d-1]=arguments[d];if(this.s)for(d=0;d<c.length;d++){var k=c[d];wa(this.a[k+1],this.a[k+2],e)}else{this.i++;try{for(d=0,f=c.length;d<f;d++)k=c[d],this.a[k+1].apply(this.a[k+2],e)}finally{if(this.i--,0<this.h.length&&0==this.i)for(;c=this.h.pop();)this.l(c)}}return 0!=d}return!1};
function wa(a,b,c){sa(function(){a.apply(b,c)})}
S.prototype.clear=function(a){if(a){var b=this.b[a];b&&(w(b,this.l,this),delete this.b[a])}else this.a.length=0,this.b={}};
S.prototype.j=function(){S.v.j.call(this);this.clear();this.h.length=0};var T=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};u("yt.config_",T);function U(a){var b=arguments;1<b.length?T[b[0]]=b[1]:1===b.length&&Object.assign(T,b[0])}
function W(a,b){return a in T?T[a]:b}
;function xa(a){return a?a.dataset?a.dataset[ya()]:a.getAttribute("data-loaded"):null}
var za={};function ya(){return za.loaded||(za.loaded="loaded".replace(/\-([a-z])/g,function(a,b){return b.toUpperCase()}))}
;var Aa=[];function Ba(a){Aa.forEach(function(b){return b(a)})}
function Ca(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){Da(b),Ba(b)}}:a}
function Da(a){var b=n("yt.logging.errors.log");b?b(a,"ERROR",void 0,void 0,void 0):(b=W("ERRORS",[]),b.push([a,"ERROR",void 0,void 0,void 0]),U("ERRORS",b))}
;function Ea(a){"function"==q(a)&&(a=Ca(a));window.setTimeout(a,0)}
;var Fa=g.ytPubsubPubsubInstance||new S;S.prototype.subscribe=S.prototype.subscribe;S.prototype.unsubscribeByKey=S.prototype.l;S.prototype.publish=S.prototype.u;S.prototype.clear=S.prototype.clear;u("ytPubsubPubsubInstance",Fa);var X=g.ytPubsubPubsubSubscribedKeys||{};u("ytPubsubPubsubSubscribedKeys",X);var Y=g.ytPubsubPubsubTopicToKeys||{};u("ytPubsubPubsubTopicToKeys",Y);var Ga=g.ytPubsubPubsubIsSynchronous||{};u("ytPubsubPubsubIsSynchronous",Ga);
function Ha(a,b){var c=Z();if(c){var e=c.subscribe(a,function(){var d=arguments;var f=function(){X[e]&&b.apply&&"function"==typeof b.apply&&b.apply(window,d)};
try{Ga[a]?f():Ea(f)}catch(k){Da(k)}},void 0);
X[e]=!0;Y[a]||(Y[a]=[]);Y[a].push(e)}}
function Ia(a,b){var c=Z();c&&c.publish.apply(c,arguments)}
function Ja(a){var b=Z();if(b)if(b.clear(a),a)Ka(a);else for(var c in Y)Ka(c)}
function Z(){return g.ytPubsubPubsubInstance}
function Ka(a){Y[a]&&(a=Y[a],w(a,function(b){X[b]&&delete X[b]}),a.length=0)}
;var La=/\.vflset|-vfl[a-zA-Z0-9_+=-]+/,Ma=/-[a-zA-Z]{2,3}_[a-zA-Z]{2,3}(?=(\/|$))/;function Na(a,b){var c=void 0===c?null:c;if(window.spf&&spf.script){c="";if(a){var e=a.indexOf("jsbin/"),d=a.lastIndexOf(".js"),f=e+6;-1<e&&-1<d&&d>f&&(c=a.substring(f,d),c=c.replace(La,""),c=c.replace(Ma,""),c=c.replace("debug-",""),c=c.replace("tracing-",""))}spf.script.load(a,c,b)}else Oa(a,b,c)}
function Oa(a,b,c){c=void 0===c?null:c;var e=Pa(a),d=document.getElementById(e),f=d&&xa(d),k=d&&!f;f?b&&b():(b&&(Ha(e,b),ha(b)),k||(d=Qa(a,e,function(){if(!xa(d)){var m=d;m&&(m.dataset?m.dataset[ya()]="true":m.setAttribute("data-loaded","true"));Ia(e);Ea(la(Ja,e))}},c)))}
function Qa(a,b,c,e){e=void 0===e?null:e;var d=I("SCRIPT");d.id=b;d.onload=function(){c&&setTimeout(c,0)};
d.onreadystatechange=function(){switch(d.readyState){case "loaded":case "complete":d.onload()}};
e&&d.setAttribute("nonce",e);pa(d,ua(a));a=document.getElementsByTagName("head")[0]||document.body;a.insertBefore(d,a.firstChild);return d}
function Pa(a){var b=document.createElement("a");a instanceof F||a instanceof F||(a="object"==typeof a&&a.b?a.a():String(a),oa.test(a)||(a="about:invalid#zClosurez"),a=new F(G,a));a instanceof F&&a.constructor===F&&a.g===H?a=a.f:(q(a),a="type_error:SafeUrl");b.href=a;b=b.href.replace(/^[a-zA-Z]+:\/\//,"//");for(var c=a=0;c<b.length;++c)a=31*a+b.charCodeAt(c)>>>0;return"js-"+a}
;u("_gel",function(a){var b=document;return"string"===typeof a?b.getElementById(a):a});
u("yt.setConfig",U);u("yt.config.set",U);u("yt.www.notfound.init",function(){var a=W("SBOX_JS_URL",void 0);a&&Na(a,function(){try{n("yt.www.masthead.searchbox.init")()}catch(b){throw b.message+=' SboxUrl: "'+a+'"',b;}})});}).call(this);
