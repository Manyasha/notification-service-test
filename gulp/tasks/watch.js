/**
 * Created by marina on 5/12/17.
 */
import gulp from 'gulp';
var watch = require('gulp-watch');
gulp.task('watch', function() {
    gulp.watch( 'src/js', ['scripts']);
    gulp.watch( 'src/css', ['styles']);
    gulp.watch( './*.html', ['html']);
});