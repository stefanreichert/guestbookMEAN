module.exports = function(config){
  config.set({
    basePath : '../..',

    files : [
      'public/bower_components/*/angular.js',
      'public/bower_components/*/angular-*.js',
      'public/bower_components/*/spin.js',
      'public/bower_components/*/toaster.js',
      'public/scripts/*.js',
      'tests/ui/*.js'
    ],

    preprocessors : {
      'public/scripts/*.js': ['coverage']
    },

    reporters: ['progress', 'coverage', 'junit'],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome', 'Firefox'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-script-launcher',
            'karma-coverage',
            'karma-junit-reporter',
            'karma-jasmine'
            ],

    coverageReporter : {
      type : 'html',
      dir : 'tests/ui/coverage'
    },

    junitReporter: {
      outputFile: 'tests/ui/result/test-results.xml',
      suite: '[guestbook MEAN - Test Suite]'
    }

  });
};
