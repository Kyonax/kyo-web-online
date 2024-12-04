module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    favicons: {
      options: {},
      icons: {
        src: 'src/assets/favicon.png',
        dest: 'dist/favicons'
      }
    },
  })

  // Load the plugin
  grunt.loadNpmTasks('grunt-favicons');

  // Register default task
  grunt.registerTask('default', ['favicons']);
};
