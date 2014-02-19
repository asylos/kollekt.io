//
// ## controllers.signin
//

define([
  'helpers/namespace',
  'marionette',
  'models/user',
  'views/signin'
],

function (app, Marionette, Model, View) {

  "use strict";

  var controller = Marionette.Controller.extend({
    initialize: function (options) {
      var self = this;
      this.options = options || {};
      this.model = new Model({
        continueAfterSignIn: app.router.routeAfterSignIn
      });
      /*
      if(app.router.routeAfterSignIn){
        this.model.attributes.continueAfterSignIn = true;
      }
      */
      console.log("model: ",self.model);

      this.view = new View({
        model: self.model
      });

      app.content.show(self.view);
    }

  });

  app.indexController = controller;

  return controller;

});
