const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const toBootstrapNav = require('eleventy-navigation-bootstrap');

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
