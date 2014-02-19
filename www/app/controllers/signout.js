//
// ## controllers.signout
//

define([
  'helpers/namespace',
  'marionette',
  'models/user',
],

function (app, Marionette, Model) {

  "use strict";

  var controller = Marionette.Controller.extend({
    initialize: function (options) {
      var self = this;
      this.options = options || {};
      this.model = new Model();

      this.model.signOut().done(this.onSignout).fail(this.onSignoutFail);
    },

    onSignout: function (data){
      console.log("onSignout: ",data);
      app.router.navigate('signin', { trigger: true });
    },

    onSignoutFail: function (data){
      console.log("onSignoutFail: ",data);
    }

  });

  app.indexController = controller;

  return controller;

});
