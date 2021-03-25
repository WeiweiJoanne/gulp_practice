var gulp = require('gulp');
const $ = require('gulp-load-plugins')();
// var jade = require('gulp-jade');
// var sass = require('gulp-sass');
// var plumber = require('gulp-plumber');
// const postcss = require('gulp-postcss');
const watch = require('gulp-watch');
const autoprefixer = require('autoprefixer');


gulp.task('jade', function () {
  gulp.src('./src/*.jade')
    .pipe($.plumber())
    .pipe($.jade())
    .pipe(gulp.dest('./dest/'))
});

gulp.task('copyHTML', function () {
  return gulp.src('./src/**/*.html')
    .pipe($.plumber())
    .pipe(gulp.dest('./dest/'))
})


gulp.task('sass', function () {
  //  var plugins =  [
  //   autoprefixer({browsers:['last 5 version']})
  // ];

  return gulp.src('./src/**/*.sass')
    .pipe($.plumber())
    .pipe($.sass({ indentedSyntax: true }).on('error', $.sass.logError))
    // .pipe($.postcss(plugins)) // 直接引入 autoprefixer
    .pipe($.postcss([autoprefixer()])) // 直接引入 autoprefixer
    .pipe(gulp.dest('./dest/css'));
});

gulp.task('babel', () => {
  return gulp.src('src/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['@babel/env']
    }))
    .pipe($.concat('all.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dest/js'))
});

gulp.task('watch', function () {
  gulp.watch('./src/*.sass', ['sass']);
  gulp.watch('./src/*.jade', ['jade']);
  gulp.watch('./src/*.js', ['babel']);
});

gulp.task('default', ['jade', 'sass', 'babel', 'watch']);
