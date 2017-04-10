"use strict";

var gulp                = require('gulp'),
    protractor          = require("gulp-protractor").protractor,
    exec                = require('child_process').exec,
    protractorReport    = require('gulp-protractor-cucumber-html-report'),
    del                 = require('del'),
    jshint              = require('gulp-jshint'),
    uglify              = require('gulp-uglify'),
    concat              = require('gulp-concat');

function onError(err) {
  console.log(err);
  this.emit('end');
}




gulp.task('test', ()=>
{
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


gulp.task('generateReport', ['test'], ()=>
{
  return gulp.src('./tests/cucumber_report.json')
    .pipe(protractorReport({
        dest: 'tests_result/'
    }))
    .on('error', onError)
    .on('end', function(e){
      console.log("Cucumber end to end tests is completed.");
    });
});

gulp.task('copy', ['clean'], function(){
  return gulp.src([
     '/**.*',
  ])
    .pipe(gulp.dest('/dist'));
});

gulp.task('clean', function(){
  return del('dist/**');
});

gulp.task('e2e', ['generateReport'])

function runCommand(command) {
  return function (cb) {
    exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  }
}

gulp.task('default', ['e2e']);

