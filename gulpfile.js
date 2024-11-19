/**
 * Gulp Configuration File
 *
 * @description
 * Gulp setup for automating SCSS to CSS compilation,
 * with PostCSS for additional CSS processing
 * and optimization.
 *
 * Author: Cristian Moreno (Kyonax)
 * Email: iamkyo@kyo.wtf
 */

const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));

/**
 * Processes SCSS files into CSS and applies
 * PostCSS transformations.
 *
 * @returns {Stream} Processed CSS file with
 * PostCSS plugins applied.
 */

function processStyles() {
  return src('src/config/styling/scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()])) // Apply PostCSS plugins
    .pipe(dest('dist/css'));
}

/**
 * Transpiles JavaScript files using Babel
 * for compatibility.
 *
 * @returns {Stream} Transpiled JavaScript files
 * written to the destination folder.
 */
function processScripts() {
  return src('src/config/plugins/**/*.js')
    .pipe(
      babel({
        presets: ['@babel/env'],
      }).on('error', (err) => {
        console.error('Babel Error:', err.message);
      })
    )
    .pipe(dest('dist/js'));
}

/**
 * Watches SCSS and JavaScript files for
 * changes and triggers respective tasks.
 */
function watchFiles() {
  watch(['src/config/styling/scss/index.scss'], processStyles);
  watch(['src/config/plugins/**/*.js'], processScripts);
}

// Default task to process styles and scripts in parallel and watch for changes
exports.default = series(
  parallel(processStyles, processScripts),
  watchFiles
);
