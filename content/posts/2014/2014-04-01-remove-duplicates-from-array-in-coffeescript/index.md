---
authors:
- max
blog: maxrohde.com
categories:
- javascript
date: "2014-04-01"
title: Remove Duplicates from Array in CoffeeScript
---

**Problem**

You have an array in CoffeeScript, which contains equal elements multiple times such as:

\[1,1,2,3,3\]

You would like to have only unique values in the array. Thus, transform it into:

\[1,2,3\]

**Solution**

You can use the following method to accomplish such:

```javascript
removeDuplicates = (ar) ->
  if ar.length == 0
    return []
  res = {}
  res[ar[key]] = ar[key] for key in [0..ar.length-1]
  value for key, value of res

alert(removeDuplicates([1,2,3,3,4,4,5]));
```

**References**

This solution is based on [this approach](http://coffeescriptcookbook.com/chapters/arrays/removing-duplicate-elements-from-arrays) (with a few minor issues fixed).