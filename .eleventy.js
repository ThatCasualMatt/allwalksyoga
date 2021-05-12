const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const toBootstrapNav = require('eleventy-navigation-bootstrap');
  
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addNunjucksFilter('bootstrapNav', toBootstrapNav);
  
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
