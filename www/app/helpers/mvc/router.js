define([
  'helpers/namespace',
  'backbone',
  'helpers/storage/local',
  'routeFilter'
],

function (app, Backbone, localStorage) {

  'use strict';

  var BaseRouter = Backbone.Router.extend({

    constructor: function (options) {
      Backbone.Router.prototype.constructor.call(this, options);
      this.history = [];
      this.avoidRoute = ['login', 'logout', 'reset', '*defaults'];
    },

    storeRoute: function () {
      this.history.push(Backbone.history.fragment.split('/')[0]);
    },

    getPreviousRoute: function () {
      return this.history[this.history.length - 2];
    },

    before: function (route) {

      //if ($.inArray(route, this.avoidRoute) < 1) {
        //localStorage.setItem('route', route.split('/')[0]);
      //}

      if (app.user.hasValidSession()) {
        app.router.navigate('', {
          trigger: true
        });
        console.log('signup');
        return false;
      }

      console.log('before:route', route);

    },

    after: function (route) {
      console.log('after:route', route);

      if ($.inArray(route, this.avoidRoute) < 1) {
        this.storeRoute();

        this.current = route.split('/')[0];
        this.prev = this.getPreviousRoute();

        app.vent.trigger('route', this.prev, this.current);
      }

    }

  });

  return BaseRouter;

});

