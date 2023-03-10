---
authors:
- max
blog: maxrohde.com
categories:
- coding
date: "2022-07-30"
tags:
- calibre
- ebooks
- epub
- tutorial
title: Remove Link Underlines from EPUB Files with Calibre
---

Some [EPUB](https://en.wikipedia.org/wiki/EPUB) documents may display links with an annoying underline in the [calibre](https://calibre-ebook.com/) viewer or your e-book reader.

Thankfully this can be solved easily in calibre in a few steps:

- Select the book where underlines are displayed under links, right click it and select _Edit betadata_ / _Edit metadata individually_

[![](https://nexnet.files.wordpress.com/2022/07/image.png?w=607)](https://nexnet.files.wordpress.com/2022/07/image.png)

- Right click on the EPUB format and selected _Edit EPUB_

[![](https://nexnet.files.wordpress.com/2022/07/image-1.png?w=732)](https://nexnet.files.wordpress.com/2022/07/image-1.png)

- Scroll down to the bottom on the _File browser_ view on the left-hand side and select _stylesheet.css_.

[![](https://nexnet.files.wordpress.com/2022/07/image-2.png?w=708)](https://nexnet.files.wordpress.com/2022/07/image-2.png)

- Add the following code:

```css
a:link,
a:link * {
  color: #000 !important;
  text-decoration: none !important;
}
```

- Save the document and the underlines should have disappeared

### See Also

[Remove underline from links in epub](https://www.mobileread.com/forums/showthread.php?t=98806)
