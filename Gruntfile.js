module.exports = function(grunt) {

grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env : {
      test : {
        multi: 'html-cov=test/coverage/index.html xunit=test/results/test-result.xml',
        NODE_ENV: 'test'
      }
    },
    clean: {
      test: {
        src: ['test/coverage', 'test/results']
      }
    },
    mkdir: {
      test: {
        options: {
          create: ['test/coverage', 'test/results', 'mongoDB']
        },
      }
    },
    mochaTest: {
      test: {
        src: ['test/**/*.js'],
        options: {
          reporter: 'mocha-multi'
        }
      },
    },
    jscoverage: {
      test: {
        src: 'app',
        dest: 'app-cov'
      },
      options: {
        exclude: ['public', 'app']
      }
    },
    karma: {
      options: {
        configFile: 'test-ui/karma.conf.js'
      },
      testUI_background: {
        background: true
      },
      testUI: {
        singleRun: true
      }
    },
    watch: {
      // run the node tests
      test_background: {
        files: ['app/*/*.js', 'test/**/*.js'],
        tasks: ['test']
      },
      //run ui tests (karma server needs to be already running)
      testUI_background: {
        files: ['app/public/**/*.js', 'test-ui/**/*.js'],
        tasks: ['karma:testUI_background:run']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-jscoverage");
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-shell-spawn');


  grunt.registerTask('testServer', ['clean:test', 'env:test', 'jscoverage:test', 'mkdir:test', 'mochaTest:test']);
  grunt.registerTask('testServer_background', ['watch:test_background']);
  grunt.registerTask('testUI', ['karma:testUI']);
  grunt.registerTask('testUI_background', ['karma:testUI_background:start', 'watch:testUI_background']);

};