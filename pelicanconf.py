#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Jim Lynn'
SITENAME = 'Jim Lynn'
SITEURL = ''

PATH = 'content'

TIMEZONE = 'America/Chicago'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

#  Will show the 5 newest posts in the sidebar.
DISPLAY_RECENT_POSTS_ON_SIDEBAR = True

# Blogroll
LINKS = (('Laci Lynn', 'http://LaciLynn.com/'),
         )

# Social widget
SOCIAL = (('linkedin', 'http://www.linkedin.com/in/jim-lynn-8484a329'),
          ('Google+', 'https://aboutme.google.com/'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

THEME = './pelican-themes/pelican-bootstrap3'
PLUGIN_PATHS = ['./pelican-plugins'] 
PLUGINS = ['i18n_subsites']
JINJA_ENVIRONMENT = {'extensions': ['jinja2.ext.i18n']}
BOOTSTRAP_THEME = 'sandstone'
INDEX_SAVE_AS = 'blog_index.html'
# BOOTSTRAP_THEME = 'flatly'
# BOOTSTRAP_THEME = 'cosmo'
PYGMENTS_STYLE  = 'vim'
# tell pelican where your custom.css file is in your content folder
STATIC_PATHS = ['images', 'extra']

# tell pelican where it should copy that file to in your output folder
EXTRA_PATH_METADATA = {
'extra/custom.css': {'path': 'static/custom.css'}
}

# tell the pelican-bootstrap-3 theme where to find the custom.css file in your output folder
CUSTOM_CSS = 'static/custom.css'