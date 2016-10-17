'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var inject = require('gulp-inject');
var es = require('event-stream');
var concat = require('gulp-concat');  
var uglify = require('gulp-uglify');   

var yeoman = {
  dist: './src/main/resources/static'
};

var paths = {
  scripts: ['./scripts/**/*.js'],
  styles: ['./styles/**/*.css'],
  test: ['test/spec/**/*.js'],
  testRequire: [
    './bower_components/angular/angular.js',
    './bower_components/angular-mocks/angular-mocks.js',
    './bower_components/angular-resource/angular-resource.js',
    './bower_components/angular-cookies/angular-cookies.js',
    './bower_components/angular-sanitize/angular-sanitize.js',
    './bower_components/angular-route/angular-route.js',
    'test/mock/**/*.js',
    'test/spec/**/*.js'
  ],
  karma: 'karma.conf.js',
  views: {
    main: './index.html',
    files: ['./views/**/*.html']
  },
  appScripts: [ './app.js','./services/*.js','./controllers/*.js','./directives/*.js'],
  vendor: ['./vendor/*.js']
};


////////////////////////
// Reusable pipelines //
////////////////////////

var lintScripts = lazypipe()
  .pipe($.jshint, '.jshintrc')
  .pipe($.jshint.reporter, 'jshint-stylish');

var styles = lazypipe()
  .pipe($.autoprefixer, 'last 1 version')
  .pipe(gulp.dest, '.tmp/styles');

///////////
// Tasks //
///////////

gulp.task('lint:scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(lintScripts());
});

gulp.task('clean:tmp', function (cb) {
  rimraf('./.tmp', cb);
});

gulp.task('start:client', ['start:server', 'styles'], function () {
  openURL('http://localhost:9000');
});

gulp.task('start:server', function() {
  $.connect.server({
    root: ['./', '.tmp'],
    livereload: true,
    // Change this to '0.0.0.0' to access the server from outside.
    port: 9000
  });
});

gulp.task('start:server:test', function() {
  $.connect.server({
    root: ['test', './', '.tmp'],
    livereload: true,
    port: 9001
  });
});

gulp.task('watch', function () {
  $.watch(paths.styles)
    .pipe($.plumber())
    .pipe(styles())
    .pipe($.connect.reload());

  $.watch(paths.views.files)
    .pipe($.plumber())
    .pipe($.connect.reload());

  $.watch(paths.scripts)
    .pipe($.plumber())
    .pipe(lintScripts())
    .pipe($.connect.reload());

  $.watch(paths.test)
    .pipe($.plumber())
    .pipe(lintScripts());

  gulp.watch('bower.json', ['bower']);
});

gulp.task('serve:dev', function (cb) {
  runSequence('clean:tmp',
    ['lint:scripts'],
    ['start:client'],
    'watch', cb);
});

gulp.task('serve:prod', function() {
  $.connect.server({
    root: [yeoman.dist],
    livereload: true,
    port: 9000
  });
});

gulp.task('test', ['start:server:test'], function () {
  var testToFiles = paths.testRequire.concat(paths.scripts, paths.test);
  return gulp.src(testToFiles)
    .pipe($.karma({
      configFile: paths.karma,
      action: 'watch'
    }));
});

// inject bower components
gulp.task('bower', function () {
  return gulp.src(paths.views.main)
    .pipe(wiredep({
      directory:  '/bower_components',
      ignorePath: '..'
    }))
  .pipe(gulp.dest('/views'));
});

///////////
// Build //
///////////

gulp.task('clean:dist', function (cb) {
  rimraf(yeoman.dist, cb);
});

gulp.task('client:build', ['html', 'styles','vendor'], function () {
  var jsFilter = $.filter('**/*.js');
  return gulp.src(paths.appScripts)
    .pipe($.useref({searchPath: ['./', '.tmp']}))
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe(concat('app.min.js'))
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(gulp.dest('./scripts'))
    .pipe(gulp.dest(yeoman.dist+'/scripts'));
});

gulp.task('index', function () {
	var target = gulp.src('./index.html');
	return target.pipe(inject(gulp.src('./scripts/app.min.js', {read: false}), {relative: true}))
		.pipe(gulp.dest('./')).pipe(gulp.dest(yeoman.dist));
});

gulp.task('index:dev', function() {
	var target = gulp.src('./index.html');
	var sources = gulp.src(['./app.js','./controllers/*.js','./services/*.js','./directives/*.js']);
	return target.pipe(inject(sources)).pipe(gulp.dest('./'));
});

gulp.task('html', function () {
  return gulp.src('./views/*.*')
    .pipe(gulp.dest(yeoman.dist+'/views'));
});

gulp.task('images', function () {
  return gulp.src('./images/**/*')
//    .pipe($.cache($.imagemin({
//        optimizationLevel: 5,
//        progressive: true,
//        interlaced: true
//    })))
    .pipe(gulp.dest(yeoman.dist+'/images'));
});

gulp.task('vendor', function () {
	  return gulp.src(paths.vendor)
	    .pipe(gulp.dest(yeoman.dist+'/vendor'));
});

gulp.task('styles', function () {
  return gulp.src('./styles/*')
    .pipe(gulp.dest(yeoman.dist+'/styles'));
});

gulp.task('copy:extras', function () {
  return gulp.src('/*/.*', { dot: true })
    .pipe(gulp.dest(yeoman.dist));
});

gulp.task('copy:fonts', function () {
  return gulp.src('/fonts/**/*')
    .pipe(gulp.dest(yeoman.dist + '/fonts'));
});

gulp.task('build', ['clean:dist'], function () {
  runSequence(['index','images', 'copy:extras', 'copy:fonts', 'client:build']);
});

gulp.task('build:dev', [ 'clean:dist' ], function() {
	runSequence(['index:dev','images', 'copy:extras', 'copy:fonts' ]);
});

gulp.task('default', ['build']);

