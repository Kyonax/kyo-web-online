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
        src: "src/assets/favicon.png",
        dest: "dist/favicons",
      },
    },
  });

  grunt.loadNpmTasks("grunt-favicons");
  grunt.registerTask("default", ["favicons"]);
};
