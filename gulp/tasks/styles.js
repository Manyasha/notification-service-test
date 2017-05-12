import gulp       from 'gulp';
import less       from 'gulp-less';
import concat     from "gulp-concat";
import sourcemaps from "gulp-sourcemaps";
import config     from '../config';

gulp.task('styles', () => {
    return gulp.src(config.styles.src)
        .pipe(sourcemaps.init())
        .pipe(less({
           // filename: config.styles.name,
           // paths: config.styles.import,
            compress: true
        }))
        .pipe(concat(config.styles.name))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(config.styles.dest));
});