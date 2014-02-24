//
// ## app/config
//

require.config({
  deps:            ['main'],
  paths: {
    lib:           '../lib/',
    app:           '.',
    text:          '/lib/requirejs-text/text',
    hbs:           '/lib/backbone.marionette.hbs/backbone.marionette.hbs',
    jquery:        '/lib/jquery/jquery',
    handlebars:    '/lib/handlebars/handlebars',
    lodash:        '/lib/lodash/lodash',
    backbone:      '/lib/backbone/backbone',
    marionette:    '/lib/backbone.marionette/lib/backbone.marionette',
    validation:    '/lib/backbone-validation/dist/backbone-validation',
    hoodie:        '/lib/hoodie/dist/hoodie',
    backboneHoodie:'/lib/backbone-hoodie/src/backbone-hoodie',
    urlify:        '/lib/urlify/index',
    routeFilter:   '/lib/backbone.routefilter/index'
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
    }
  }
});

//
// requirejs error reporting
//
window.requirejs.onError = function (err) {
  "use strict";

  console.warn('require error: ', err.requireType);
  if (err.requireType === 'timeout') {
    console.warn('modules: ' + err.requireModules);
  }

  throw err;
};
