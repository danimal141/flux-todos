var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');

gulp.task('build', function() {
  browserify({entries: ['./js/app.js']})
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log(err) })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build'))
});

gulp.task('watch', function() {
  gulp.watch('./js/**/*.js', ['build']);
  gulp.watch('./index.html', ['build']);
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      host: '127.0.0.1',
      livereload: true
    })
  );
});

gulp.task('default', ['build', 'watch', 'webserver']);
