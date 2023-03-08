---
authors:
- max
blog: maxrohde.com
categories:
- java
date: "2010-04-16"
title: Click on Links in Editable JEditorPanes
---

JEditorPane is a Java Swing component, which allows to display and edit rich text. Supported formats are RTF and HTML. When using HTML, the user can click on hyperlinks embedded in the documents. However, this only works when the JEditorPane is not in edit mode (setEditable(false)).

The following class can be used to alter the behavior of JEditorPane when displaying HTML in such, that hyperlinks are clickable even when the EditorPane is in edit mode. Hyperlinks are activated if the user double clicks hyperlinks in the component.

```java

package de.mxro.textedit;

import java.awt.Cursor;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.Shape;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;
import java.net.MalformedURLException;
import java.net.URL;

import javax.swing.JEditorPane;
import javax.swing.SwingUtilities;
import javax.swing.event.HyperlinkEvent;
import javax.swing.plaf.TextUI;
import javax.swing.text.AttributeSet;
import javax.swing.text.BadLocationException;
import javax.swing.text.Document;
import javax.swing.text.Element;
import javax.swing.text.Position;
import javax.swing.text.StyleConstants;
import javax.swing.text.html.HTML;
import javax.swing.text.html.HTMLDocument;
import javax.swing.text.html.HTMLEditorKit;


public class MyLinkController extends MouseAdapter implements
MouseMotionListener {

        private Element curElem = null;

        private boolean curElemImage = false;
        private String href = null;

        private Position.Bias[] bias = new Position.Bias[1];

        private int curOffset;
        /**
         * Called for a mouse click event.
         * If the component is read-only (ie a browser) then
         * the clicked event is used to drive an attempt to
         * follow the reference specified by a link.
         *
         * @param e the mouse event
         * @see MouseListener#mouseClicked
         */
        public void mouseClicked(MouseEvent e) {
                JEditorPane editor = (JEditorPane) e.getSource();
                if ( ((!editor.isEditable()) || e.getClickCount() == 2)
                                &amp;&amp; SwingUtilities.isLeftMouseButton(e)) {
                        Point pt = new Point(e.getX(), e.getY());
                        int pos = editor.viewToModel(pt);
                        if (pos &gt;= 0) {
                                activateLink(pos, editor, e.getX(), e.getY());
                        }
                }
        }
        // ignore the drags
        public void mouseDragged(MouseEvent e) {
        }
        // track the moving of the mouse.
        public void mouseMoved(MouseEvent e) {
                JEditorPane editor = (JEditorPane) e.getSource();
                HTMLEditorKit kit = (HTMLEditorKit)editor.getEditorKit();
                boolean adjustCursor = true;
                Cursor newCursor = kit.getDefaultCursor();
                if (!editor.isEditable()) {
                        Point pt = new Point(e.getX(), e.getY());
                        int pos = editor.getUI().viewToModel(editor, pt, bias);
                        if (bias[0] == Position.Bias.Backward &amp;&amp; pos &gt; 0) {
                                pos--;
                        }
                        if (pos &gt;= 0 &amp;&amp;(editor.getDocument() instanceof HTMLDocument)){
                                HTMLDocument hdoc = (HTMLDocument)editor.getDocument();
                                Element elem = hdoc.getCharacterElement(pos);
                                if (!doesElementContainLocation(editor, elem, pos,
                                                e.getX(), e.getY())) {
                                        elem = null;
                                }
                                if (curElem != elem || curElemImage) {
                                        Element lastElem = curElem;
                                        curElem = elem;
                                        String href = null;
                                        curElemImage = false;
                                        if (elem != null) {
                                                AttributeSet a = elem.getAttributes();
                                                AttributeSet anchor = (AttributeSet)a.
                                                getAttribute(HTML.Tag.A);
                                                if (anchor == null) {
                                                        curElemImage = (a.getAttribute(StyleConstants.
                                                                        NameAttribute) == HTML.Tag.IMG);
                                                        if (curElemImage) {
                                                                href = getMapHREF(editor, hdoc, elem, a,
                                                                                pos, e.getX(), e.getY());
                                                        }
                                                }
                                                else {
                                                        href = (String)anchor.getAttribute
                                                        (HTML.Attribute.HREF);
                                                }
                                        }
                                        if (href != this.href) {
                                                // reference changed, fire event(s)
                                                fireEvents(editor, hdoc, href, lastElem);
                                                this.href = href;
                                                if (href != null) {
                                                        newCursor = kit.getLinkCursor();
                                                }
                                        }
                                        else {
                                                adjustCursor = false;
                                        }
                                }
                                else {
                                        adjustCursor = false;
                                }
                                curOffset = pos;
                        }
                }
                if (adjustCursor &amp;&amp; editor.getCursor() != newCursor) {
                        editor.setCursor(newCursor);
                }
        }
        /**
         * Returns a string anchor if the passed in element has a
         * USEMAP that contains the passed in location.
         */
        private String getMapHREF(JEditorPane html, HTMLDocument hdoc,
                        Element elem, AttributeSet attr, int offset,
                        int x, int y) {
                Object useMap = attr.getAttribute(HTML.Attribute.USEMAP);
                if (useMap != null &amp;&amp; (useMap instanceof String)) {
                        //hdoc.getMap((String) useMap);

                        // Map m = new Map();

                        if ( offset &lt; hdoc.getLength()) {
                                Rectangle bounds;
                                TextUI ui = html.getUI();
                                try {
                                        Shape lBounds = ui.modelToView(html, offset,
                                                        Position.Bias.Forward);
                                        Shape rBounds = ui.modelToView(html, offset + 1,
                                                        Position.Bias.Backward);
                                        bounds = lBounds.getBounds();
                                        bounds.add((rBounds instanceof Rectangle) ?
                                                        (Rectangle)rBounds : rBounds.getBounds());
                                } catch (BadLocationException ble) {
                                        bounds = null;
                                }
                                
                        }
                }
                return null;
        }
        /**
         * Returns true if the View representing &lt;code&gt;e&lt;/code&gt; contains
         * the location &lt;code&gt;x&lt;/code&gt;, &lt;code&gt;y&lt;/code&gt;. &lt;code&gt;offset&lt;/code&gt;
         * gives the offset into the Document to check for.
         */
        private boolean doesElementContainLocation(JEditorPane editor,
                        Element e, int offset,
                        int x, int y) {
                if (e != null &amp;&amp; offset &gt; 0 &amp;&amp; e.getStartOffset() == offset) {
                        try {
                                TextUI ui = editor.getUI();
                                Shape s1 = ui.modelToView(editor, offset,
                                                Position.Bias.Forward);
                                if (s1 == null) {
                                        return false;
                                }
                                Rectangle r1 = (s1 instanceof Rectangle) ? (Rectangle)s1 :
                                        s1.getBounds();
                                Shape s2 = ui.modelToView(editor, e.getEndOffset(),
                                                Position.Bias.Backward);
                                if (s2 != null) {
                                        Rectangle r2 = (s2 instanceof Rectangle) ? (Rectangle)s2 :
                                                s2.getBounds();
                                        r1.add(r2);
                                }
                                return r1.contains(x, y);
                        } catch (BadLocationException ble) {
                        }
                }
                return true;
        }
        /**
         * Calls linkActivated on the associated JEditorPane
         * if the given position represents a link.&lt;p&gt;This is implemented
         * to forward to the method with the same name, but with the following
         * args both == -1.
         *
         * @param pos the position
         * @param editor the editor pane
         */
        protected void activateLink(int pos, JEditorPane editor) {
                activateLink(pos, editor, -1, -1);
        }
        /**
         * Calls linkActivated on the associated JEditorPane
         * if the given position represents a link. If this was the result
         * of a mouse click, &lt;code&gt;x&lt;/code&gt; and
         * &lt;code&gt;y&lt;/code&gt; will give the location of the mouse, otherwise
         * they will be &lt; 0.
         *
         * @param pos the position
         * @param html the editor pane
         */
        void activateLink(int pos, JEditorPane html, int x, int y) {
                Document doc = html.getDocument();
                if (doc instanceof HTMLDocument) {
                        HTMLDocument hdoc = (HTMLDocument) doc;
                        Element e = hdoc.getCharacterElement(pos);
                        AttributeSet a = e.getAttributes();
                        AttributeSet anchor = (AttributeSet)a.getAttribute(HTML.Tag.A);
                        HyperlinkEvent linkEvent = null;
                        String description;
                        if (anchor == null) {
                                href = getMapHREF(html, hdoc, e, a, pos, x, y);
                        }
                        else {
                                href = (String)anchor.getAttribute(HTML.Attribute.HREF);
                        }
                        if (href != null) {
                                linkEvent = createHyperlinkEvent(html, hdoc, href, anchor,
                                                e);
                        }
                        if (linkEvent != null) {
                                html.fireHyperlinkUpdate(linkEvent);
                        }
                }
        }
        /**
         * Creates and returns a new instance of HyperlinkEvent. If
         * &lt;code&gt;hdoc&lt;/code&gt; is a frame document a HTMLFrameHyperlinkEvent
         * will be created.
         */
        HyperlinkEvent createHyperlinkEvent(JEditorPane html,
                        HTMLDocument hdoc, String href,
                        AttributeSet anchor,
                        Element element) {
                URL u;
                try {
                        URL base = hdoc.getBase();
                        u = new URL(base, href);
                        // Following is a workaround for 1.2, in which
                        // new URL("file://...", "#...") causes the filename to
                        // be lost.
                        if (href != null &amp;&amp; "file".equals(u.getProtocol()) &amp;&amp;
                                        href.startsWith("#")) {
                                String baseFile = base.getFile();
                                String newFile = u.getFile();
                                if (baseFile != null &amp;&amp; newFile != null &amp;&amp;
                                                !newFile.startsWith(baseFile)) {
                                        u = new URL(base, baseFile + href);
                                }
                        }
                } catch (MalformedURLException m) {
                        u = null;
                }
                HyperlinkEvent linkEvent = null;
                String target = (anchor != null) ?
                                (String)anchor.getAttribute(HTML.Attribute.TARGET) : null;

                                linkEvent = new HyperlinkEvent(html, HyperlinkEvent.EventType.
                                                ACTIVATED, u, href, element);


                                return linkEvent;
        }
        void fireEvents(JEditorPane editor, HTMLDocument doc, String href,
                        Element lastElem) {
                if (this.href != null) {
                        // fire an exited event on the old link
                        URL u;
                        try {
                                u = new URL(doc.getBase(), this.href);
                        } catch (MalformedURLException m) {
                                u = null;
                        }
                        HyperlinkEvent exit = new HyperlinkEvent(editor,
                                        HyperlinkEvent.EventType.EXITED, u, this.href,
                                        lastElem);
                        editor.fireHyperlinkUpdate(exit);
                }
                if (href != null) {
                        // fire an entered event on the new link
                        URL u;
                        try {
                                u = new URL(doc.getBase(), href);
                        } catch (MalformedURLException m) {
                                u = null;
                        }
                        HyperlinkEvent entered = new HyperlinkEvent(editor,
                                        HyperlinkEvent.EventType.ENTERED,
                                        u, href, curElem);
                        editor.fireHyperlinkUpdate(entered);
                }
        }

}
```

This class can be assigned to any JEditorPane:

```java

         MyLinkController controller = new MyLinkController();
            editorpane.addMouseListener(controller);
            editorpane.addMouseListener(controller);
```