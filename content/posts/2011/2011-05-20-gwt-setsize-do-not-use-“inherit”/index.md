---
blog: maxrohde.com
categories:
- java
date: "2011-05-20"
title: 'GWT setSize(): Do not use “inherit”'
---

Widgets in GWT are essentially elements in the DOM tree of a web document. [GWT widgets](http://google-web-toolkit.googlecode.com/svn/javadoc/latest/com/google/gwt/user/client/ui/Widget.html) enable convenient control over these elements. For instance, a call of the widget method setSize(String width, String height) will set the dimensions of the HTML element underlying the widgets. Values to define the size can be anything allowed in HTML and CSS.

Possible values are:

- "100px"
- "50%"
- "15em"
- "auto"
- "inherit"
- Etc.

However, using convenience methods such as Widget.setSize() mindlessly can easily lead to serious bugs.

In particular, the code widget.setSize("inherit", "inherit") will compile without errors or warnings. However, when loading the compiled JavaScript in Internet Explorer, a cryptic JavaScript error will occur. This is caused by Internet Explorer's lack of support for the inheritance of attributes (also for font-size etc.).

### Resources

"[How-to inherit CSS width attributes for Internet Explorer](http://kevin.deldycke.com/2008/06/how-to-inherit-css-width-attributes-for-internet-explorer/)", Kevin Deldycke's blog

"[IE7 CSS inherit problem](http://stackoverflow.com/questions/511066/ie7-css-inherit-problem)", stackoverflow.com
