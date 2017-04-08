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

// gulp.task('test:login', ()=>
// {
//   return gulp.src(['./tests/features/login.feature'])
//     .pipe(protractor({
//       configFile: './protractor.config.js'
//     }))
//     .on('error', onError);
// });

// gulp.task('test:atendimento', ()=>
// {
//   return gulp.src(['./tests/features/atendimento.feature'])
//     .pipe(protractor({
//       configFile: './protractor.config.js'
//     }))
//     .on('error', onError);
// });

// gulp.task('test:demais-ajustes', ()=>
// {
//   return gulp.src(['tests/features/demais-ajustes.feature'])
//     .pipe(protractor({
//       configFile: './protractor.config.js'
//     }))
//     .on('error', onError);
// });

// gulp.task('generateReport', ['test'], ()=>
// {
//   return gulp.src('./tests/cucumber_report.json')
//     .pipe(protractorReport({
//         dest: 'tests_result/'
//     }))
//     .on('error', onError)
//     .on('end', function(e){
//       console.log("Cucumber end to end tests is completed.");
//     });
// });

// gulp.task('e2e', ['generateReport'])

gulp.task('copy', ['clean'], function(){
  return gulp.src([
     '/**.*',
  ])
    .pipe(gulp.dest('/dist'));
});

gulp.task('clean', function(){
  return del('dist/**');
});

// gulp.task('login:js', ['copy'], function(){
//   return gulp.src([
//     '/public/app/login/**.js'
//   ])
//   .pipe(jshint())
//   .pipe(jshint.reporter('default'))
//   .pipe(uglify())
//   .pipe(gulp.dest('/dist/public/app/login/'));
// });

function runCommand(command) {
  return function (cb) {
    exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  }
}

gulp.task('default', ['test']);

//deploy
// gulp.task('deploy', ['login:js']);
