module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/_includes/font': 'font' });
  eleventyConfig.addPassthroughCopy({ 'src/_includes/fonts': 'fonts' });
  eleventyConfig.addPassthroughCopy({ 'src/_includes/webfonts': 'webfonts' });
  eleventyConfig.addPassthroughCopy({ 'src/images': 'images' });
  eleventyConfig.setWatchThrottleWaitTime(250);
  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
