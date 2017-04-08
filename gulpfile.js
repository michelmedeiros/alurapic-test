"use strict";

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var protractor = require("gulp-protractor").protractor;
var exec = require('child_process').exec;
var protractorReport = require('gulp-protractor-cucumber-html-report');
var del = require('del');


function onError(err) {
    console.log(err);
    this.emit('end');
}

gulp.task('test', function() {
    var params = process.argv;
    var args = [];
    for (var i = 0; i < params.length; i++) {
        if(params[i].substring(0, 2) == '--') args.push(params[i]);
    }
    return gulp.src([])
        .pipe(protractor({
            configFile: './protractor.config.js',
            args: args
        }))
        .on('error', onError);
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);