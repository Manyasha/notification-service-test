import gulp        from 'gulp';
import browserify  from 'gulp-browserify';
import sourcemaps  from "gulp-sourcemaps";
import uglify      from "gulp-uglify";
import config      from '../config';

gulp.task('scripts', () => {
    return gulp.src(config.scripts.src)
        .pipe(browserify({
            insertGlobals : true
        }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.scripts.dest));
});