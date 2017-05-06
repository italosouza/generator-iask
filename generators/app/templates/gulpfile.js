var gulp = require('gulp');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
// var ngBuild = require('gulp-ng-build');

// gulp.task('ngBuild', ngBuild, function(){
//    console.log('build done with success');
// });

gulp.task('server', function() {
  return gulp.src(['./server/**/*.js', '!./server/vendor/**/*.js', '!./server/**/*_test.js'])
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('prod-env', function() {
  return gulp.src(['./server/**/prod.env'])
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(rename('.env'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('dev-env', function() {
  return gulp.src(['./server/**/dev.env'])
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(rename('.env'))
    .pipe(gulp.dest('./dist'));
});


gulp.task('default', function() {
  gulp.watch("./server/**/*.js", ['server']);
});

gulp.task('build', ['server', 'dev-env']);
gulp.task('deploy', ['server', 'prod-env']);
