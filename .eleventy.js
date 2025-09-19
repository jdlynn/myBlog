const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const codeClipboard = require("eleventy-plugin-code-clipboard");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  // Add plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight); // Ensure syntax highlight is also added
  eleventyConfig.addPlugin(codeClipboard);
  eleventyConfig.addPlugin(pluginRss);


  // Customize Markdown-it
  let options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  };
  let markdownLib = markdownIt(options);
  eleventyConfig.setLibrary("md", markdownLib);

  // Luxon filters for date formatting
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
  });


  // Passthrough copy for CSS, images, and other assets
  eleventyConfig.addPassthroughCopy("./static/css");
  eleventyConfig.addPassthroughCopy("./static/img");
  eleventyConfig.addPassthroughCopy("assets");
      // In your .eleventy.js config

  // eleventyConfig.addCollection("tagList", function(collectionApi) {
  //   const tags = new Set();
  //   collectionApi.getAll().forEach(item => {
  //     if (item.data.tags) {
  //       if (Array.isArray(item.data.tags)) {
  //         item.data.tags.forEach(tag => tags.add(tag));
  //       } else {
  //         tags.add(item.data.tags);
  //       }
  //     }
  //   });
  //   return Array.from(tags).sort(); // Sort for consistent order
  // });

    eleventyConfig.addCollection('tagListWithCount', (collectionApi) => {
      const allPosts = collectionApi.getAll();
      const countPostsByTag = new Map();

      allPosts.forEach((post) => {
        // Get all tags for the current post, or an empty array if none exist
        const tags = post.data.tags || [];

        tags.forEach((tag) => {
          // Exclude system tags that you don't want to display
          if (['post', 'all'].includes(tag)) {
            return;
          }

          const count = countPostsByTag.get(tag) || 0;
          countPostsByTag.set(tag, count + 1);
        });
      });

    // Return an array of [tag, count] pairs, sorted by tag name
      return [...countPostsByTag].sort((a, b) => a[0].localeCompare(b[0]));
    });

   const markdownLibrary = markdownIt({
    html: true
  }).use(codeClipboard.markdownItCopyButton);

  eleventyConfig.setLibrary("md", markdownLibrary);

  // Return configuration object
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
  };
};
