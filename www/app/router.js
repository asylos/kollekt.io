//
// ## router
//

define([
  'helpers/namespace',
  'marionette',
  'helpers/mvc/router'
],

function (app, Marionette, BaseRouter) {

  'use strict';

  app.on('initialize:before', function () {

    var Router = BaseRouter.extend({

      routes: {
        ''                                                          : 'index',
        'signup'                                                    : 'signup',
        'signin'                                                    : 'signin',
        'signout'                                                   : 'signout',
        'question/:id'                                              : 'question',
        //'question/:id/add-answer'                                   : 'addAnswer',
        //'question/:id/show-answer/:answerid'                        : 'showAnswer',
        // The slug is never used, it's just for read- and bookmarkability
        'question/:id/:slug'                                        : 'question',
        'question/:id/:slug/add-answer'                             : 'addAnswer',
        'question/:id/:slug/show-answer/:answerid'                  : 'showAnswer',
      },

      index: function () {
        require(['controllers/index'], function (Controller) {
          new Controller();
        });
      },

      signup: function () {
        require(['controllers/signup'], function (Controller) {
          new Controller();
        });
      },

      signin: function () {
        require(['controllers/signin'], function (Controller) {
          new Controller();
        });
      },

      signout: function () {
        require(['controllers/signout'], function (Controller) {
          new Controller();
        });
      },

      question: function ( id, slug ) {
        require(['controllers/question'], function (Controller) {
          new Controller({
            id: id
          });
        });
      },

      addAnswer: function ( id, slug ) {
        require(['controllers/question'], function (Controller) {
          new Controller({
            id: id,
            action: 'addAnswer'
          });
        });
      },

      showAnswer: function ( id, slug, answerid ) {
        require(['controllers/question'], function (Controller) {
          new Controller({
            id: id,
            answerID: answerid,
            action: 'showAnswer'
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
