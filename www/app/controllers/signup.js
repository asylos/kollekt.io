//
// ## controllers.signin
//

define([
  'helpers/namespace',
  'marionette',
  'models/user',
  'views/signup'
],

function (app, Marionette, Model, View) {

  "use strict";

  var controller = Marionette.Controller.extend({
    initialize: function (options) {
      var self = this;
      this.options = options || {};
      this.model = new Model();

      if(app.router.routeAfterSignIn){
        this.model.attributes.continueAfterSignIn = true;
      }

      this.model.signOut();

      this.view = new View({
        model: self.model
      });

      app.overview.show(self.view);
      app.details.reset();
    }

  });

  app.indexController = controller;

  return controller;

});
