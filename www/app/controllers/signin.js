//
// ## controllers.signin
//

define([
  'helpers/namespace',
  'marionette',
  'models/user',
  'views/signin',
  'views/header',
  'hbs!templates/defaultHeader'
],

function (app, Marionette, Model, View, HeaderView, headerTemplate) {

  "use strict";

  var controller = Marionette.Controller.extend({
    initialize: function (options) {
      var self = this;
      this.options = options || {};
      this.model = new Model({
        continueAfterSignIn: app.router.routeAfterSignIn
      });

      console.log("model: ",self.model);

      this.view = new View({
        model: self.model
      });

      this.headerView = new HeaderView({
        model: self.model,
        template : headerTemplate
      });

      app.content.show(self.view);
      app.header.show(self.headerView);

    }

  });

  app.indexController = controller;

  return controller;

});
