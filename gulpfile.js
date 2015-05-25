var BOWER_ROOT = 'bower_components/'
var PROJECT_ROOT = 'prototype/';

var EXPRESS_ROOT = __dirname + '/' + PROJECT_ROOT + '/dist';

var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var reload = require('gulp-livereload');
var connect = require('connect-livereload');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var jslint = require('gulp-jslint');
var open = require('gulp-open');
var console = require('better-console');
var karma = require('karma').server;
var mocha = require('gulp-mocha-phantomjs');
var templateCache = require('gulp-angular-templatecache');

gulp.task('markup', function() {
    gulp.src(PROJECT_ROOT + 'js/**/*.html')
        .pipe(templateCache({
            standalone: true
        }))
        .pipe(gulp.dest(PROJECT_ROOT + 'dist'));

    gulp.src(PROJECT_ROOT + 'index.html')
        .pipe(plumber())
        .pipe(gulp.dest(PROJECT_ROOT + 'dist'))
        .pipe(reload());
});

gulp.task('angularStyles', function() {
    gulp.src([
            BOWER_ROOT + 'bootstrap/dist/css/bootstrap.min.css',
            BOWER_ROOT + 'angular-loading-bar/build/loading-bar.min.css'
        ])
        .pipe(plumber())
        .pipe(concat('angular.css'))
        .pipe(gulp.dest(PROJECT_ROOT + 'dist'))
        .pipe(reload());
});

gulp.task('styles', function() {
    gulp.src(PROJECT_ROOT + 'less/**/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(PROJECT_ROOT + 'dist'))
        .pipe(reload());
});

gulp.task('angularScripts', function() {
    gulp.src([
            BOWER_ROOT + 'lodash/lodash.min.js',
            BOWER_ROOT + 'moment/min/moment.min.js',
            BOWER_ROOT + 'angular/angular.min.js',
            BOWER_ROOT + 'angular-mocks/angular-mocks.js',
            BOWER_ROOT + 'angular-ui-router/release/angular-ui-router.min.js',
            BOWER_ROOT + 'restangular/dist/restangular.min.js',
            BOWER_ROOT + 'angular-moment/angular-moment.min.js',
            BOWER_ROOT + 'angular-loading-bar/build/loading-bar.min.js'
        ])
        .pipe(plumber())
        .pipe(concat('angular.js'))
        .pipe(gulp.dest(PROJECT_ROOT + 'dist'))
        .pipe(reload());
});

gulp.task('scripts', function() {
    gulp.src([
            PROJECT_ROOT + 'js/**/*.js'
        ])
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(PROJECT_ROOT + 'dist'))
        .pipe(reload());
});

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('start', function() {

    var express = require('express');
    var app = express();
    app.use(connect());
    app.use(express.static(EXPRESS_ROOT));
    app.use('/', express.static(EXPRESS_ROOT));
    app.listen(4000);

    reload.listen();

    gulp.src(PROJECT_ROOT + 'index.html')
        .pipe(open('', { url: 'http://localhost:4000' }));
});

gulp.task('tdd', ['angularStyles', 'styles', 'angularScripts', 'scripts', 'markup', 'start'], function () {

    gulp.watch(PROJECT_ROOT + 'less/*.less', ['styles']);
    gulp.watch(PROJECT_ROOT + 'js/**/*.html', ['markup']);
    gulp.watch(PROJECT_ROOT + 'index.html', ['markup']);

    gulp.watch(PROJECT_ROOT + 'js/**/*.js', ['scripts']);

    karma.start({
        configFile: __dirname + '/karma.conf.js',
    });

    console.log();
    console.log('           Hello! Everything is ready for you!');
    console.log('           To speed up development, omit tests using: ' + 'gulp'.bold);
    console.log('           For a single Mocha test use: ' + 'gulp test'.bold);
    console.log();
    console.log('           Please go to: ' + 'http://localhost:4000'.bold);
    console.log();
});

gulp.task('default', ['angularStyles', 'styles', 'angularScripts', 'scripts', 'markup', 'start'], function () {

    gulp.watch(PROJECT_ROOT + 'less/*.less', ['styles']);
    gulp.watch(PROJECT_ROOT + 'js/**/*.html', ['markup']);
    gulp.watch(PROJECT_ROOT + 'index.html', ['markup']);

    gulp.watch(PROJECT_ROOT + 'js/**/*.js', ['scripts']);

    console.log();
    console.log('           Hello! Everything is ready for you!');
    console.log('           To run tests on every save go for: ' + 'gulp tdd'.bold);
    console.log('           For a single Mocha test use: ' + 'gulp test'.bold);
    console.log();
    console.log('           Please go to: ' + 'http://localhost:4000'.bold);
    console.log();
});

