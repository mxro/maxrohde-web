---
authors:
- max
blog: maxrohde.com
date: "2010-12-12"
title: SmartGWT and Ext GWT/GXT (or the question of the GWT UI framework)
---

Really exiting about GWT is the promise to develop sleek user interfaces with Java; even the GWT UIs created out of the box look quite impressive when compared for instance, with a vanilla Swing interface. However, a number of frameworks help tremendously in unleashing the full capabilities JavaScript offers nowadays. The brief exploration of some frameworks here is coloured by the requirement to implement a visual tree with drag and drop capabilities. Specifically, the tree should be able to support custom renderers for different kinds of trees.

The space of GWT UI frameworks seems to be dominated by the frameworks Ext GWT (also known as GXT) and SmartGWT (formerly GWT Ext). A number of smaller frameworks can also assist in GUI development, among them, for instance, [gwt-dnd](http://code.google.com/p/gwt-dnd/), the [GWT incubator](http://code.google.com/p/google-web-toolkit-incubator/), [GWT Widget Library](http://www.gwtlib.org/) and [GWT mosaic](http://code.google.com/p/gwt-mosaic/). The latter listed frameworks seem to be rather immature and not very feature rich. However, they are trying to keep closer to the original GWT GUI APIs.

The main discussion on the net seems to boil down to three alternatives: (1) SmartGWT, (2) Ext GWT, and (3) sticking to the GWT standard widgets.

**_SmartGWT_:**

**(+)** Licensed under LGPG, therewith can be used in commercial products without purchasing a licence

**(+)** Many powerful widgets

**(+)** I have read some comments that their data binding model is superior to Ext GWT (but I didn't look into this issue)

**(-)** Is very tightly linked to the underlying JavaScript library, SmartClient JS. JSNI calls are literally everywhere in the code.

**(-)** Maybe it is just my specific browser configuration but I found their showcase components to be quite slow and sluggish. Surprisingly the deprecated GWT Ext components seem to work better?

**_Ext GWT_:**

**(+)** Lots of Java Code

**(+)** Supported by Sencha, the maker of the Ext JS framework

**(+)** Compare the descriptions of GUI frameworks on the official GWT website; the description of Ext GWT seems to be the most positive ( [Ext GWT (GXT)](http://code.google.com/webtoolkit/tools/gwtdesigner/features/gwt/gxt.html), [GWT-Ext](http://code.google.com/webtoolkit/tools/gwtdesigner/features/gwt/gwt-ext.html), [SmartGWT](http://code.google.com/webtoolkit/tools/gwtdesigner/features/gwt/smartgwt.html))

**(+)** They seem to plan to integrate their code closer with the GWT standard.

**(-)** Licensed under GPL, therefore for any commercial product a licence must be bought.

**(-)** The [performance of GXT is 2x to 10x slower than vanilla GWT](http://maxrohde.com/2011/02/12/gxt-vs-vanilla-gwt-performance/).

**(-)** Senacha has recently given a lot of attention to their Senacha Touch framework for developing cross-platform mobile applications. It seems they have been given less attention to Ext GWT in the recent past. However, this could also be a plus if features from Sencha Touch are migrated to Ext GWT.

**(-)** Since the framework is based on Java classes, GWT compile time increases (in comparison to frameworks relying on pre-built JavaScript libraries). However, the tailor made compilation also potentially reduces the download size and performance of the generated JS scripts.

**_Vanilla GWT Widgets_:**

**(+)** Increase portability/reusability/reliability of your code; if there is no functionality provided by the frameworks you MUST provide, stick to the standard.

**(+)** High customizability

**(+)** Best performance

**(-)** Limited set of widgets in comparison with Smart GWT and Ext GWT

**(-)** Weak support for drag and drop

**Issues to Consider**

_GWT Integration: Can the widgets of these libraries be mixed with GWT standard widgets?_

Many libraries such as SmartGWT or GWT Ext are mostly JSNI wrappers around existing java script frameworks. This of course raises more or less subtle issues of integration in the long run. However, also the current version of the Ext GWT framework (especially the layouts) are reported to work together with vanilla GWT poorly. However, I usually use <div ..> elements to do the layout of my pages. Using this approach I did not have any issues combining widgets from different frameworks.

_Debugging: Is it possible to debug the code easily?_

Debugging is difficult for framework relying on JavaScript. Moreover, having the code available as Java source code helps greatly in using and customizing the widget library (for instance by using inheritance). Also, the documentation of these frameworks is not exhaustive in places; therefore its good to be able to look at the code directly and let is speak for itself. However, if you are a JavaScript wizz, the same applies for the JavaScript libraries.

_Licence: Open source/commercial?_

Both SmartGWT and GWT ext seem to have suitable open source licences for creating client side code. To take full advantage of SmartGWTs server-side capabilities, the Pro version must be obtained.

Ext Gwt seems to have switched to an GPL licence, unsuited for most commercial applications. However, their licenses are cheaper than SmartGWT.

**Drag and Drop for Trees**

Ext Gwt (GXT)

- Offers a custom widget renderer tree grid ([http://www.sencha.com/examples/#widgetrenderertreegrid](http://www.sencha.com/examples/#widgetrenderertreegrid))
- Seems to be far better integrated with GWT. The Tree class, for instance, has no JSNI calls to javascript (Gwt Ext has many ...)

Gwt Ext

- Tree nodes can only be defined by a string. Constructor for tree nodes public TreeNode(final String text)
- Expand/Collapse seems to work smooth
- Drag and drop works fine

SmartGWT

- Expand/Collapse does not seem to be very performant. Continuous expanding/collapsing leads to the UI not reacting to some of the 'clicks' (Strang, this seems to work better in Ext Gwt, try for yourself on the showcases)

**Prototypes**

[_Drag and drop tree with gwt-dnd_](http://www.linnk.de/prototypes/treednd/gwtdnd/NxUiGwtTree.html):

Only a very simple demo (which can of course be improved). However, it led me to the conclusion that gwt-dnd does not seem to be mature enough to handle complex drag and drop operations on trees out of the box.

There are a number of other projects providing Tree support, such as gwt-dnd-tree – but they do not seem to provide a wide range of functionality.

Prototypes for Ext Gwt (GXT) and SmartGWT are not required, since their showcases already illustrate the functionality. It took me around 1 hr to rebuild an Ext Gwt example in an Maven/Eclipse/OSGi environment.

**Showcases (as of 11.12.2010)**

[SmartGWT Showcase](http://www.smartclient.com/smartgwt/showcase/)

[EXT Gwt Showcase](http://www.sencha.com/examples/)

[GWT ext Showcase](http://www.gwt-ext.com/demo/) (superseded by SmartGWT)

[GWT Incubator Demo](http://collectionofdemos.appspot.com/demo/index.html)

[GWT Drag and Drop (gwt-dnd) Demo](http://allen-sauer.com/com.allen_sauer.gwt.dnd.demo.DragDropDemo/DragDropDemo.html)

[GWT Mosaic Gallery](http://mosaic.arkasoft.com/gwt-mosaic-current/Showcase.html)

[GWT Widget Gallery](http://code.google.com/webtoolkit/doc/latest/RefWidgetGallery.html)

**Further Resources**

[Official Google Web Toolkit page on Ext GWT (GXT)](http://code.google.com/webtoolkit/tools/gwtdesigner/features/gwt/gxt.html) (and on [GWT-Ext](http://code.google.com/webtoolkit/tools/gwtdesigner/features/gwt/gwt-ext.html), [SmartGWT](http://code.google.com/webtoolkit/tools/gwtdesigner/features/gwt/smartgwt.html)) – read between the lines ...

[Example Gallery for Grids, Tree and Tree Grids with Ext Gwt (with tutorials + source code)](http://gxtexamplegallery.appspot.com/)

[Stackoverflow Discussion "Best GWT widget library?"](http://stackoverflow.com/questions/867451/best-gwt-widget-library)

[Discussion on theserverside.com on GWT toolkits](http://www.theserverside.com/discussions/thread.tss?thread_id=60186)

[Stackoverflow Discussion "GWT vs SmartGWT, extJS"](http://stackoverflow.com/questions/2038392/gwt-vs-smartgwt-extjs)

[Long and comprehensive discussion on the Google Web Toolkit Group](http://groups.google.com/group/google-web-toolkit/browse_thread/thread/1627991578cf4ab3/4fad872e67bd6cec?show_docid=4fad872e67bd6cec&pli=1)

[GWT Built in Widgets (GWT Doc)](http://code.google.com/webtoolkit/doc/latest/DevGuideUiWidgets.html)

[GWT Ext Homepage (superseded by Smart Gwt)](http://gwt-ext.com/)