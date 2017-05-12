'use strict';
export default {
    scripts: {
        src: 'src/js/app.js',
        dest: 'dist/'
    },
    styles: {
        name: 'style.css',
        src: 'src/styles/**/*.+(less|css)',
        //import: ['./node-modules/bootstrap/less/', './src/styles/'],
        dest: 'dist/'
    }
};