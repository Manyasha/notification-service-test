import gulp from 'gulp';

gulp.task('build', ['styles', 'scripts', 'html']);
gulp.task('serve', ['webserver', 'watch']);