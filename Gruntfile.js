const { FAVICON } = require("./src/app/constants/Data");

// TODO: Fix the Favicon Issue by creating a Grunt Plugin - Favicon use ImageMagick, however
// this version uses something call 'convert' a command deprecated by ImageMagick

module.exports = function (grunt) {
  grunt.initConfig({
    favicons: {
      options: {
        debug: true,
        windowsTile: false,
      },
      icons: {
        src: FAVICON.path,
        dest: FAVICON.dest,
      },
    },
  });

  grunt.loadNpmTasks("grunt-favicons");
  grunt.registerTask("default", ["favicons"]);
};
