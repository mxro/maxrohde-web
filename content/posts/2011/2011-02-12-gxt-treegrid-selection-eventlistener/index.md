---
blog: maxrohde.com
categories:
- java
date: "2011-02-12"
title: GXT TreeGrid Selection Event/Listener
---

In the evolution of the Ext GWT (GXT) framework, there seemed to have been some change as to how selection events of trees/tree grids can be intercepted. In release 2.2.1, the following approach works:

treeGrid.getSelectionModel().addSelectionChangedListener(new SelectionChangedListener<ModelData>() {

@Override

public void selectionChanged(SelectionChangedEvent<ModelData> se) {

GWT.log("selection changed from getSelectionModel");

}

});

The following approaches **do not work**:

store.addListener(Events.SelectionChange, new SelectionChangedListener<TreeModel>() {

@Override

public void selectionChanged(SelectionChangedEvent<TreeModel> se) {

GWT.log("selection changed");

}

});

treeGrid.addListener(Events.SelectionChange, new SelectionChangedListener<TreeModel>() {

@Override

public void selectionChanged(SelectionChangedEvent<TreeModel> se) {

GWT.log("selection changed");

}

});

**Resources:**

[TreeBinder JavaDoc](http://dev.sencha.com/deploy/gxtdocs/com/extjs/gxt/ui/client/binder/TreeBinder.html) – TreeBinder seems to be deprecated, use selection model instead.
