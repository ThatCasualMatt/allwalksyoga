const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const toBootstrapNav = require('eleventy-navigation-bootstrap');
const htmlmin = require('html-minifier');
const purgeCssPlugin = require('eleventy-plugin-purgecss');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addNunjucksFilter('bootstrapNav', toBootstrapNav);

  // Returns a list of class descriptions
  eleventyConfig.addCollection('classDesc', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('./src/class-descriptions/*.md')
      .sort(function (a, b) {
        if (a.data.title > b.data.title) return -1;
        else if (a.data.title < b.data.title) return 1;
        else return 0;
      });
  });

  //Run things in production
  if (process.env.NODE_ENV === 'production') {
    //Purge unused CSS from the files.
    eleventyConfig.addPlugin(purgeCssPlugin);

    //Minify the HTML!
    eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
      if (outputPath.endsWith('.html')) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
        return minified;
      }
      return content;
    });
  }

  eleventyConfig.addPassthroughCopy('src/_redirects');

  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
