---
title: Adding and Publish new Posts
date: 2022-12-20
description: Process used to add new blog posts and publish the updated blog. 
image: /static/img/undraw_blog_post.svg  
tags:
  - blog
  - eleventy
  
---
Use the following processes to add new posts to the blog and later to publish the updated blog.  

## Add a new Post to the blog
First add a new markdown file into the posts directory.  Copying and modifying an existing post is the simplest method.  Other will open a new markdown file (with a subscript of .md) and add the below front matters to the new file. (and then modify). If you have images in the markdown file, add them into the static/img directory. 

```code
---
title: Adding and Publish new Posts
date: 2022-12-20
description: Process used to add new blog posts and publish the updated blog. 
image: /static/img/MarkdownPost.svg  
tags:
  - blog
  - eleventy
  
---
```
## Building the Blog
Once the post has been added to the blog, the blog can be built and tested using the command

```code
npm run dev
```
Point the browser at localhost:5000. Verify that everything is working correctly and that the blog looks right. 

The blog can be built with the following command:

```code
npm run build
```
 

## Publishing the Blog
Publish the blog by commiting the changes to git with the commands.

```code
git commit -m "description"
git push
```
Check the blog build by logging into Netlify.  When the build is complete, go to the newly published blog. 





