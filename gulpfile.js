const gulp = require('gulp');
const promises = require('fs/promises');
const favicons = require('favicons').stream;
const config = require(`./src/app/constants/Data`);
const log = require(`fancy-log`);

gulp.task("favicons", async function() {

  return gulp
    .src(config.FAVICON.path)
    .pipe(
      favicons(config.FAVICON.gulp)
    )
    .on("error", log.bind(log, 'Gulp Favicons Generator Error'))
    .pipe(gulp.dest(`./dist/favicons`));
});
