'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var livereload = require('gulp-livereload');


gulp.task('test', function () {
	return gulp.src('tests/**/*.js', {read: false})
		.pipe(mocha());
});

gulp.task('watch', function () {
	livereload.listen();
	gulp
		.watch('src/**')
		.on('change', livereload.changed);
});
