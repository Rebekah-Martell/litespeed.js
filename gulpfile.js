// Include gulp
var gulp    = require('gulp'),

    // Plugins
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat'),
    rename  = require('gulp-rename'),
    watch   = require('gulp-watch'),
    copy    = require('gulp-copy'),

    // Config
    config  = {
        mainFile: './litespeed.js'
    }
;

gulp.task('concat', function() {
    return gulp.src('src/**/*.js')
        .pipe(concat(config.mainFile))
        .pipe(gulp.dest('./example/scripts'));
});

gulp.task('uglify', function() {
    return gulp.src(config.mainFile)
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('./example/scripts'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.js', ['build']);
});

// Default Task
gulp.task('build', ['concat', 'uglify']);