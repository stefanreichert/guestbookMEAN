module.exports = function(config){
  config.set({
    basePath : '..',

    files : [
      'app/public/bower_components/*/angular.js',
      'app/public/bower_components/*/angular-*.js',
      'app/public/bower_components/*/spin.js',
      'app/public/bower_components/*/toaster.js',
      'app/public/scripts/*.js',
      'tests/ui/*.js'
    ],

    preprocessors : {
      'app/public/scripts/*.js': ['coverage']
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
      dir : 'test-ui/coverage'
    },

    junitReporter: {
      outputFile: 'test-ui/results/test-results.xml',
      suite: '[guestbook MEAN - Test Suite]'
    }

  });
};
