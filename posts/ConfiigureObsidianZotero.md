---
author: "Me"
title: Configure Obsidian/Zotero Bridge
date: 2025-09-29
description: Show process required to configure Obsidian to use Zotero.  
image: /static/img/undraw_personal-website_kz7a.svg
tags: ['markdown', 'text']
---

 This document will outline the process necessary to create a bridge between Zotero and Obsidian.  I'm assuming 
 Obsidian and Zotero have already been installed. The process will start with the 
plugins required, the necessary configuration and finally the process of adding 
Zotero notes to Obsidian. 


 

## Plugins
### BetterBibTex for Zotero plugin
* Open up Zotero.
* Go to Tools > Plugins 
* Click on link to "Zotero Plugins directory"
* Look for "Better BibTex" on the plugin page.  
* Click the link.  
* On Better BibTex page, select download and download the plugin 
* Click on Gear icon and choose "install plugin from file"
* Select the file you downloaded (.xpi file)

## Setup BetterBibTex to automatically export
* In Zotero, select your entire library.
* Right-click and choose Export Library....
* Select Better CSL JSON as the format and check the Keep updated box.
* Save this file "My Library.json" to your Obsidian Vault. 

### Create Obsidian Template to use during the zotero Import
* Create new directory in Obsidian.  Name it "templates"
* Create file named "Zetero-Template" in the "templates" directory.
* Add the following to the template file
```Markdown Template File
{% raw %}
---
citekey: {{citekey}}
title: {{title}}
authors: {{authors}}
date: {{date}}
tags: #zotero #literature-note {{allTags}}
---

# {{title}}

**Authors:** {{authors}}
**Publication:** {{publicationTitle}}
**Year:** {{date}}
**DOI:** {{DOI}}

**Zotero Link:** [Zotero]({{zoteroSelectURI}})

## Abstract
> {{abstractNote}}

## Annotations
{% for annotation in annotations -%}
>[!quote] (Page {{annotation.pageLabel}})
>{{annotation.comment}}
{{annotation.annotatedText}}
{% endfor -%}

## My Notes
<!-- The content in this section will be preserved on re-import -->
{% endraw %}
```
* Click on "Add Import Format" button and choose the file you created in the step above. 



### Zotero Integration plugin 
* open up Obsidian
* Go to Settings > Community plugins > Browse. 
*  Search for "Zotero Integration," click on it, and then click the Install button. 
* Once installed, click Enable to activate the plugin.
* Go to Settings > Community plugins > Zotero Integration.
* Click on "PDF Utility" and update it
* Set Zotero as the Database: Ensure Zotero is selected as your database source.
* Under "Import Formats", setup a new format and name it "My-Zetero-Template"
* under "Template File", Select the file you just created in the templates directory. 

### Notes:
The Obsidian/Zotero bridge will only work with pdf files.  All snapshot files will need to be converted to pdfs. 
