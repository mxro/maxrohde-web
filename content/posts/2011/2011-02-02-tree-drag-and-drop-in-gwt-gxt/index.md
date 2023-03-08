---
categories:
- java
date: "2011-02-02"
blog: maxrohde.com
title: Tree Drag and Drop in GWT / GXT
---

In Ext Gwt or GXT there are various ways to intercept drag and drop events directed at a Tree or TreeGrid. However, many of these do not necessarily lead to the expected results. There is also not much documentation of how to work with these events.

1. Implement the **Interface StoreListener<ModelData>** (com.extjs.gxt.ui.client.store.StoreListener)

This implementation should have the following functions:

- public void storeAdd(StoreEvent<ModelData> se)
- public void storeDataChanged(StoreEvent<ModelData> se)
- public void storeRemove(StoreEvent<ModelData> se)
- public void storeUpdate(StoreEvent<ModelData> se)

1. The secret now is really that the events for each of these methods need to **be cast to TreeStoreEvent** (com.extjs.gxt.ui.client.store.TreeStoreEvent)

For Add the interesting attributes can be accessed using:

TreeStoreEvent<ModelData> tse = (TreeStoreEvent<ModelData>) se;

ModelData parent = tse.getParent(); // the node that new children have been inserted to

List<ModelData> children = tse.getChildren(); // the inserted nodes

For Remove the interesting attributes are:

TreeStoreEvent<ModelData> tse = (TreeStoreEvent<ModelData>) se;

ModelData parent = tse.getParent();

ModelData child = tse.getChild();

(node that for remove its tse.getChild() rather than tse.getChildren())

Note that these events are no 'Drag and Drop' events as such but rather generic events triggered by the data model of the Ui. Therewith, these events will also be triggered if the Tree is modified in another way than by drag and drop.

**Resources**

[Official TreeModel JavaDoc](http://dev.sencha.com/deploy/gxtdocs/com/extjs/gxt/ui/client/data/TreeModel.html) (explains the events and their parameters)

[Example using GXT Dnd Framework for Tree Dnd](http://zawoad.blogspot.com/2010/08/working-with-dnd-framework-of-ext-gwt.html)

[Tutorial explaining how a tree can interact with remote data](http://www.sencha.com/helpcenter/index.jsp?topic=/com.extjs.gxt.help/html/tutorials/remotetreetable.html)

[GXT Example showing how to catch DnD events directly](http://www.sencha.com/examples/explorer.html)

[How to add a selection listener to a tree](http://www.sencha.com/forum/showthread.php?70681-Tree-How-to-add-a-selection-change-event-listener)