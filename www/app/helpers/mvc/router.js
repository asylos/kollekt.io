define([
  'backbone',
  'routeFilter'
],

function (Backbone) {

  'use strict';

  var BaseRouter = Backbone.Router.extend({

    before: function (route) {
      console.log('before:route', route);
    },

    after: function (route) {
      console.log('after:route', route);
    }

  });

  return BaseRouter;

});

