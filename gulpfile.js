var gulp = require('gulp');
var livereload = require('gulp-livereload');

gulp.task('default', function () {
	livereload.listen();
	gulp
		.watch('src/**')
		.on('change', livereload.changed);
});
