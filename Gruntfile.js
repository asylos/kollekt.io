module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
        //'Gruntfile.js',
        'www/tests/app/**/*.js',
        'www/app/**/*.js'
      ],
      options: {
        jshintrc: 'www/.jshintrc'
      }
    },

    watch: {
      files: ['<%= jshint.files %>', 'www/assets/css/app/*.scss', 'www/app/templates/*.html'],
      tasks: ['jshint', 'compass'],
      options: {
        livereload: true
      }
    },

    hoodie: {
      start: {
        options: {
          callback: function (config) {
            grunt.config.set('cfg', config);
          }
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 9000,
          base: 'www',
          hostname: '0.0.0.0',
          middleware: function (connect, options) {
            var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
            return [
            proxy,
            connect.static(options.base),
            connect.directory(options.base)
            ];
          }
        },
        proxies: [
        {
          context: '/_api',
          host: '<%= cfg.stack.www.host %>',
          port: '<%= cfg.stack.www.port %>'
        }

        ]
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
        files: [{
          expand: true,
          cwd: 'www/',
          src: [
            'index.html',
            'assets/css/**/*',
          ],
          dest: 'www/prod/'
        }]
        // {
        //   'www/prod/app/index.html': 'www/app/index.html',
        //   'www/prod/assets/css/app/': 'www/assets/css/**'
        // }
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
            files: ['www/prod/index.html'],
            module: 'main',
            modulePath: 'app/main'
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
            text:          '../lib/requirejs-text/text',
            hbs:           '../lib/backbone.marionette.hbs/backbone.marionette.hbs',
            jquery:        '../lib/jquery/jquery',
            handlebars:    '../lib/handlebars/handlebars',
            lodash:        '../lib/lodash/lodash',
            backbone:      '../lib/backbone/backbone',
            marionette:    '../lib/backbone.marionette/lib/backbone.marionette',
            routeFilter:   '../lib/backbone.routefilter/index',
            hoodie:        '../lib/hoodie/index',
            validation:    '../lib/backbone-validation/dist/backbone-validation',
            urlify:        '../lib/urlify/index',
            slip:          '../lib/slip/slip',
            backboneHoodie:'../lib/backbone-hoodie/src/backbone-hoodie',
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
            },
            'validation': {
              deps: ['backbone'],
              exports: 'Backbone.Validation'
            },
            'urlify':{
              exports: 'Urlify'
            },
            'routeFilter': {
              deps: ['backbone'],
              exports: 'Backbone.Router'
            },
            'slip': {
              exports: 'slip'
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
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['jshint', 'watch']);
  grunt.registerTask('test', ['shell:test']);
  grunt.registerTask('build', ['jshint', 'compass', 'copy', 'requirejs']);
  grunt.registerTask('server', ['hoodie', 'connect:server', 'configureProxies:server', 'watch']);

};
