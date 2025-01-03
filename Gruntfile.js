const { FAVICON } = require("./src/app/constants/Data");

module.exports = function (grunt) {
  grunt.initConfig({
    favicons: {
      options: {
        trueColor: true,
        precomposed: false,
        windowsTile: true,
        tileBlackWhite: true,
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
