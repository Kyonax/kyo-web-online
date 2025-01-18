/**
 * @file Gruntfile.js - GruntFile
 *
 * This Gruntfile configures tasks for automating various build and
 * development processes using Grunt. The main task configured in this
 * file is the generation of favicons, which uses the `grunt-favicons`
 * plugin to create and place the necessary favicon files in the appropriate
 * directories based on the source image defined in the `FAVICON` constant.
 *
 * node.js-v20.17.0
 *
 * @author Cristian Moreno (Kyonax)
 * @contact iamkyo@kyo.wtf
 * @date 2025-01-17
 *
 * Code Guidelines :: @CCSv0.1
 * More details: https://code-guidelines.cybercodesyndicate.org
 * - Tabs only—no spaces.
 * - Naming:
 *   - snake_case for variables/methods.
 *   - _private_method() for private methods (underscore prefix).
 *   - UPPER_SNAKE_CASE for constants (in constant files).
 *   - kebab-case for file names (e.g., file-example.js).
 * - Meaningful names—fetch_user_data() over doThing().
 *
 * Repository-URL
 * https://github.com/Kyonax/kyo-web-online
 *
 * @dependencies
 * - FAVICON from "./src/app/constants/Data"
 *
 * @usage
 * This Gruntfile is executed via the following npm commands:
 * - `npm run generate-favicons`: To generate favicon files based on the configured settings.
 * - `npm run build-all`: Includes the favicon generation as part of the overall build process.
 */
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
