---
blog: maxrohde.com
categories:
- java
date: "2012-08-14"
tags:
- gwt
- jsni
title: Something other than a Java object was returned from JSNI method
---

[Google Web Toolkit](https://developers.google.com/web-toolkit/) allows building powerful bridges between the world of Java and JavaScript using so called [JS overlay objects](http://googlewebtoolkit.blogspot.co.nz/2008/08/getting-to-really-know-gwt-part-2.html).

However, these overlay objects can become it bit tricky if it is not certain what the type of objects passed from JavaScript will be.

Wait? Types and JavaScript? Yes, but only the most fundamental ones of \`string\`, \`number\` and \`Boolean\`.

## Problem

Variations of the following exceptions are reported in GWT hosted mode, if the wrong type is declared in the JS overlay object.

java.lang.IllegalArgumentException: Something other than a Java object was returned from JSNI method '@one.app.js.api.IntParams::getValue()': JS value of type boolean, expected java.lang.Object

In the example above, a method such as the following might have been declared in the JS overlay object:

public final native Object getValue()/\*-{ this.value; }-\*/;

Howerver, \`this.value\` happened to be of the type \`boolean\` in JavaScript.

# Solution

An easy solution is to change the declaration of the method in the JavaScript overlay type to:

public final native **boolean** getValue()/\*-{ this.value; }-\*/;

However, things are a bit more difficult, if depending on the context, \`this.value\` can take on values of different type than boolean (for instance \`number\` or java script object).

In this case, the a little bit more work is required. First, the function in the overlay type must be changed to something like:

```java

public final native Object getValue() /*-{
	if ( this.value &&
	     ((typeof this.value == "number") ||
	      (typeof this.value == "boolean")) ) {
		return {
			type: "JsAtomicTypeWrapper",
			value: this.value
		};
	}

	return this.value;
}-*/;
```

This method replaces the value with a wrapper JS object. For retrieving the value, another JS overlay type can be introduced to extract the value such as:

```java

ublic class JsAtomicTypeWrapper extends JavaScriptObject {

	protected JsAtomicTypeWrapper() {
	}

	public final native boolean isWrapper()/*-{
		if ( this.type && this.type == "JsAtomicTypeWrapper") return true;
		return false;
	}-*/;

	public final native boolean isBoolean()/*-{
		return typeof this.value == "boolean";
	}-*/;

	public final native boolean isDouble()/*-{
		return !isNaN(parseFloat(this.value));
	}-*/;

	public final native boolean isInteger()/*-{
		return this.value % 1 === 0;
	}-*/;

	public final Object getValue() {
		if (isBoolean()) {
			return getBooleanValue();
		}

		if (isInteger()) {
			return getIntValue();
		}

		if (isDouble()) {
			return getDoubleValue();
		}

		return getGenericValue();

	}

	public final native Object getGenericValue()/*-{
		return this.value;
	}-*/;

	public final native int getIntValue()/*-{
		return this.value;
	}-*/;

	public final native double getDoubleValue()/*-{
		return this.value;
	}-*/;

	public final native boolean getBooleanValue()/*-{
		return this.value;
	}-*/;

}
```

When reading the returned value of the first JS overlay type, the JsAtomicType Wrapper overlay type can be used as follows:

```java

JsAtomicTypeWrapper wrapper;
wrapper = ((JavaScriptObject) jso.getValue()).cast();

if (wrapper.isWrapper()) {
	GWT.log("Number value: " + wrapper.getValue());
	GWT.log("Number value class: " + wrapper.getValue().getClass());
}
```
