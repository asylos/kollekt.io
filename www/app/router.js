//
// ## router
//

define([
  'backbone',
  'helpers/namespace',
  'marionette'
],

function (Backbone, app) {

  'use strict';

  app.on('initialize:before', function () {

    var Router = Backbone.Router.extend({

      routes: {
        ''                      : 'index',
        'question/:id'          : 'question',
        // The slug is never used, it's just for read- and bookmarkability
        'question/:id/:slug'    : 'question'
      },

      index: function () {
        require(['controllers/index'], function (Controller) {
          new Controller();
        });
      },

      question: function ( id, slug ) {
        require(['controllers/question'], function (Controller) {
          new Controller({
            id: id
          });
        });
      }

    });

    app.router = new Router();

  });

  app.on('start', function () {
    if (Backbone.history) {
      Backbone.history.start();
    }
  });

  return app;

});
