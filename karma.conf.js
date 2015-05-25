// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-02-09 using
// generator-karma 0.9.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: [
        'mocha',
        'chai-jquery',
        'chai',
        'jquery-1.11.0',
        'sinon-chai'
    ],

    preprocessors: {
      'static/prototype/js/**/*.html': ['ng-html2js'],
      'static/prototype/mock/*.json': ['ng-json2js']
    },

    ngHtml2JsPreprocessor: {
        // If your build process changes the path to your templates,
        // use stripPrefix and prependPrefix to adjust it.
        stripPrefix: "static/prototype/js/",

        // the name of the Angular module to create
        moduleName: "templates"
    },

    ngJson2JsPreprocessor: {
      // strip this from the file path
        stripPrefix: "static/prototype/mock/",
      // prepend this to the


      /* or define a custom transform function
      cacheIdFromPath: function(filepath) {
        return cacheId;
      }
      */
    },

    // list of files / patterns to load in the browser
    files: [
        'angular_blueprint/bower_components/angular/angular.min.js',
        'angular_blueprint/bower_components/angular-mocks/angular-mocks.js',
        'angular_blueprint/bower_components/lodash/lodash.min.js',
        'angular_blueprint/bower_components/moment/min/moment.min.js',
        'angular_blueprint/bower_components/angular-moment/angular-moment.min.js',
        'angular_blueprint/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'angular_blueprint/bower_components/angular-loading-bar/build/loading-bar.min.js',
        'angular_blueprint/bower_components/restangular/dist/restangular.min.js',
        'angular_blueprint/prototype/dist/templates.js',
        'angular_blueprint/prototype/js/app.js',
        'angular_blueprint/prototype/js/**/*.js',
        'angular_blueprint/prototype/js/**/*.html',
        'angular_blueprint/prototype/mock/*.json',
        'angular_blueprint/prototype/test/**/*.js',
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8090,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-phantomjs-launcher',
      'karma-ng-html2js-preprocessor',
      'karma-ng-json2js-preprocessor',
      'karma-chrome-launcher',
      'karma-jquery',
      'karma-chai-jquery',
      'karma-sinon-chai',
    ],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    reporters: ['dots']

  });
};
