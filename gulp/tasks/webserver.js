/**
 * Created by marina on 5/12/17.
 */
var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            //livereload: true,
            //open: true,
            fallback: 'index.html',
            host: 'localhost',

            port: 8000,
            proxies : [{
                source: '/search',
                target: 'http://localhost:8087/users/lookup',
                options:
                    {
                        headers: {'ABC_HEADER': 'abc'}
                    }
            }]
        }));
});
