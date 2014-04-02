module.exports = function(config){
  config.set({
    basePath : '../..',

    files : [
      'public/lib/angular.js',
      'public/lib/angular-*.js',
      'public/lib/spin.js',
      'public/lib/toaster.js',
      'public/lib/ui-bootstrap*.js',
      'public/scripts/*.js',
      'tests/lib/*.js',
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
