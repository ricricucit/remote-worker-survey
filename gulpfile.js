//var config      = require('./config.json');

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var sass        = require('gulp-sass');
var minifyCSS   = require('gulp-minify-css');
var sourceMaps  = require('gulp-sourcemaps');
var rename      = require('gulp-rename');
var postcss      = require('gulp-postcss');
var autoprefixer      = require('autoprefixer');



// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    //watch files
    var files = [
    './style.css',
    '**/*.php',
    '**/*.html'
    ];

    //initialize browsersync
    browserSync.init(files, {
    //browsersync with a php server
    //proxy: config.proxy,
    //notify: true,
    //online: true
      server: {
        baseDir: "./"
      }
    });
});

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function () {
    return gulp.src('sass/*.scss')
        .pipe(sass({precision: '20'})) //compila sass
        .pipe(postcss([ autoprefixer({ browsers: ['last 7 versions'] }) ])) // aggiunge css di autoprefixer
        .pipe(rename('unmin-style.css')) //rinomina il file
        .pipe(gulp.dest('./'))
        .pipe(sourceMaps.init())
        .pipe(minifyCSS({keepSpecialComments:1},{processImport: false}))
        .pipe(rename('style.css')) //rinomina il file minifcato
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./'))
        .pipe(reload({stream:true}));

});

// Default task to be run with `gulp`
gulp.task('default', ['sass', 'browser-sync'], function () {
    gulp.watch("sass/**/*.scss", ['sass']);
//    gulp.watch("**/*.scss", ['sass']);
//    gulp.watch("**/*.php", ['sass']);
});
