var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var gutil = require('gulp-util');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

gulp.task('scripts', function(){
  return gulp.src('client/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('client/web/'));
});

gulp.task('templates', function(){
  return gulp.src('client/js/templates/*.html')
    .pipe(gulp.dest('client/web/js/templates'));
});

gulp.task('sass', function () {
	return gulp.src('client/sass/**/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(rename('bundle-styles.css'))
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('client/web/css/'))
		.pipe(rename('bundle-styles.min.css'))
		.pipe(cssnano())
		.pipe(gulp.dest('client/web/css/'))
});

gulp.task('watch', function () {
	gulp.watch(['client/sass/**/*.sass'], ['sass']);
	gulp.watch(['client/js/**/*.js'], ['scripts']);
	gulp.watch(['client/*.html'], ['scripts']);
	gulp.watch(['client/js/templates/*.html'], ['templates']);
});

gulp.task('default', ['sass', 'scripts', 'templates', 'watch']);
