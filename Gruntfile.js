module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
        'Gruntfile.js',
        'www/tests/app/**/*.js',
        'www/app/collections/**/*.js',
        'www/app/controllers/**/*.js',
        'www/app/helpers/**/*.js',
        'www/app/models/**/*.js',
        'www/app/views/**/*.js',
        'www/app/*.js'
      ],
      options: {
        jshintrc: 'www/.jshintrc'
      }
    },

    watch: {
      files: ['<%= jshint.files %>', 'www/assets/css/app/*.scss', 'www/app/templates/*.html'],
      tasks: ['jshint', 'compass']
    },

    hoodie: {
      start: {
        options: {
        }
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'www/assets/css/app',
          cssDir: 'www/assets/css/app',
          environment: 'production'
        }
      },
      dev: {
        options: {
          sassDir: 'www/assets/css/app',
          cssDir: 'www/assets/css/app'
        }
      }

    },

    copy: {
      dist: {
        files: {
          'www/prod/app/index.html': 'www/app/index.html',
          'www/prod/assets/css/app/': 'www/assets/css/**'
        }
      }
    },

    shell: {
      test: {
        command: 'node node_modules/karma/bin/karma start',
        options: {
          stdout: true,
          stderr: true
        }
      }
    },

    requirejs: {
      production: {
        options: {
          almond: true,
          replaceRequireScript: [{
            files: ['www/prod/app/index.html'],
            module: 'main',
            modulePath: 'www/app/main'
          }],
          insertRequire: ['main'],
          baseUrl: "www/app/",
          optimizeCss: "none",
          optimize: "uglify",
          uglify: {
            "beautify": false,
            "no-dead-code": true,
            "reserved-names": "require"
          },
          inlineText: true,
          useStrict: true,
          findNestedDependencies: true,
          optimizeAllPluginResources: true,
          paths: {
            app:           '.',
            text:          'www/lib/require-text/text',
            hbs:           'www/lib/backbone.marionette.hbs/backbone.marionette.hbs',
            jquery:        'www/lib/jquery/jquery',
            handlebars:    'www/lib/handlebars/handlebars',
            lodash:        'www/lib/lodash/lodash',
            backbone:      'www/lib/backbone/backbone',
            marionette:    'www/lib/backbone.marionette/lib/backbone.marionette',
            hoodie:        'www/lib/hoodie/dist/hoodie.min'
          },
          shim: {
            'backbone': {
              deps: ['lodash', 'jquery'],
              exports: 'Backbone'
            },

            'marionette': {
              deps: ['backbone'],
              exports: 'Backbone.Marionette'
            },

            'handlebars': {
              exports: 'Handlebars'
            }
          },
          out: "www/prod/app/main.js",
          name: "main"
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-hoodie');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['jshint', 'watch']);
  grunt.registerTask('test', ['shell:test']);
  grunt.registerTask('build', ['jshint', 'compass', 'copy', 'requirejs']);
  grunt.registerTask('server', ['hoodie', 'watch']);

};
