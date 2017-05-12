/**
 * Created by marina on 5/12/17.
 */
import gulp        from 'gulp';
import config from '../config';

gulp.task('html', () => {
    return gulp.src('./index.html')
        .pipe(gulp.dest(config.scripts.dest));
});