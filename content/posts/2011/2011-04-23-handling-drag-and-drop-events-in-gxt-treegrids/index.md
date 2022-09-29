---
title: "Handling Drag and Drop Events in Gxt TreeGrids"
date: "2011-04-23"
categories: 
  - "java"
---

The [Ext GWT framework](http://www.sencha.com/products/extgwt/) offers some rather sophisticated support for drag and drop in GWT applications. However dealings with drag and drop in TreeGrids can be complicated at times, since only limited documentation apart from the examples in the showcase is provided.

Here some information, how it can be controlled, where an item can be inserted in a TreeGrid.

<table style="border-collapse:collapse;" border="0"><colgroup><col style="width:330px;"><col style="width:387px;"></colgroup><tbody valign="top"><tr><td style="padding-left:7px;padding-right:7px;border-top:solid .5pt;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><p><strong>Element</strong></p></td><td style="padding-left:7px;padding-right:7px;border-top:solid .5pt;border-left:none;border-bottom:solid .5pt;border-right:solid .5pt;"><p><strong>Description</strong></p></td></tr><tr><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><p>Class <a href="http://dev.sencha.com/deploy/gxtdocs/com/extjs/gxt/ui/client/dnd/TreeGridDropTarget.html">TreeGridDropTarget</a></p></td><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:none;border-bottom:solid .5pt;border-right:solid .5pt;"><p>This class can be utilized to handle drop events on a TreeGrid. It can be assigned to a TreeGrid through its constructor new TreeGridDropTarget(treeGrid).</p></td></tr><tr><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><p>Method <a href="http://dev.sencha.com/deploy/gxtdocs/com/extjs/gxt/ui/client/dnd/TreeGridDropTarget.html">showFeedback</a>(...)</p></td><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:none;border-bottom:solid .5pt;border-right:solid .5pt;"><p>This method can be overridden in TreeGridDropTarget to achieve custom rules for where a 'drop' is allowed.</p></td></tr><tr><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><p>DNDEvent event</p></td><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:none;border-bottom:solid .5pt;border-right:solid .5pt;"><p>This is the parameter of the showFeedback method. Its attributes can be used to determine an appropriate feedback.</p></td></tr><tr><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><p>event.getDragSource()</p></td><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:none;border-bottom:solid .5pt;border-right:solid .5pt;"><p>Can be cast to TreeGridDragSource. Points to the source tree grid for the drop.</p></td></tr><tr><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><p>event.getDropTarget()</p></td><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:none;border-bottom:solid .5pt;border-right:solid .5pt;"><p>Can be cast to TreeGridDropTarget. This should point to the drop target triggering the method.</p></td></tr><tr><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><p>source.getData()</p></td><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:none;border-bottom:solid .5pt;border-right:solid .5pt;"><p>Can be cast to List&lt;?&gt;. Points to the items, which are to be dropped.</p></td></tr><tr><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><p>((List&lt;?&gt;) source.getData()).get(..)</p></td><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:none;border-bottom:solid .5pt;border-right:solid .5pt;"><p>Can be cast to TreeStoreModel. Points to a specific item, which is to be dropped.</p><p><strong>Through the method getModel(..) of the TreeStoreModel the actual item in the drag source can be accessed (As a BaseTreeModel).</strong></p></td></tr><tr><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:solid .5pt;border-bottom:solid .5pt;border-right:solid .5pt;"><p>event.getTarget()</p></td><td style="padding-left:7px;padding-right:7px;border-top:none;border-left:none;border-bottom:solid .5pt;border-right:solid .5pt;"><p>Points to a dom element where the drag is to take place. If it's currently over a TreeNode, it can be found through:</p><p><strong>TreeNode n = this.getTreeGrid().findNode(event.getTarget());</strong></p></td></tr></tbody></table>

Finally, if the user feedback should be delivered, that it is illegal to drop the node at the current location, the following commands can be added to the overridden showFeedback(..) method:

Insert.get().hide();

event.getStatus().setStatus(false);

return;

If the default feedback shall be delivered, the overridden method should be called through calling super.showFeedback(event);.

### Resources

[Source Code of Source of TreeGridDropTarget](http://grepcode.com/file/repo1.maven.org/maven2/com.extjs/gxt/2.2.0/com/extjs/gxt/ui/client/dnd/TreeGridDropTarget.java)

[TreeGridDropTarget JavaDoc](http://dev.sencha.com/deploy/gxtdocs/com/extjs/gxt/ui/client/dnd/TreeGridDropTarget.html)

[DropTarget JavaDoc](http://dev.sencha.com/deploy/gxtdocs/com/extjs/gxt/ui/client/dnd/DropTarget.html)

[Sibling Reordering DND Tree (Sencha Forum)](http://www.sencha.com/forum/showthread.php?111017-Sibling-Reordering-DND-Tree) Check here for methods to override for TreeGridDropTarget
