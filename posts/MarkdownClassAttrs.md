---
author: "Jim Lynn"
title: Markdown Attributes in Eleventy
date: 2022-12-20
description:  Implementing markdown-it-attrs will provide css classes to Eleventy's markdown. 
image: /static/img/undraw_blogging.svg
tags:
 - eleventy
 - markdown 
---

Markdown doesn't support using classes natively, but installing the "markdown-it-attrs" module will add this functionality.   This document outlines the process of installing and using in Eleventy.  

## Install necessary modules
The modules "markdown-it" and "markdown-it-attrs" need to be installed.  Use the commands below to accomplish:

```
yarn add markdown-it
yarn ad markdown-it-addrs 
``` 
## Add Markdown config to Eleventy
Add the following lines into .eleventy.js to activate the markdown modules. 

```
/**************** Markdown Plugins********************/
  let markdownIt = require("markdown-it");
  const markdownItAttrs = require('markdown-it-attrs');
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  let markdownLib = markdownIt(options).use(markdownItAttrs);
 config.setLibrary("md", markdownLib);
``` 
## Add classes to Markdown
Below is an example of adding a class to an image.  

```
]![Screen image with url](/static/img/requiredURL.png "Required url"){ .img-fluid .post-img}
```

The ability to add classes to markdown makes it possible to add custom styling to your pages.  The class example above makes the image reactive.  This wouldn't be possible without using classes. 
