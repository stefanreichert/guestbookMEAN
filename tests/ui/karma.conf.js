module.exports = function(config){
  config.set({
    basePath : '../..',

    files : [
      'public/lib/angular.js',
      'public/lib/angular-*.js',
      'public/lib/spin.js',
      'public/lib/toaster.js',
      'public/scripts/*.js',
      'tests/lib/*.js',
      'tests/ui/*.js'
    ],

    exclude : [
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-script-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'tests/ui/results/unit.xml',
      suite: 'unit'
    }
  });
};
