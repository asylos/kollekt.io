//
// ## controllers.index
//

define([
  'helpers/namespace',
  'marionette',
  'models/index',
  'views/index',
  'hbs!templates/index'
],

function (app, Marionette, Model, IndexView, indexTemplate) {

  "use strict";

  var controller = Marionette.Controller.extend({
    initialize: function (options) {
      var self = this;
      this.options = options || {};
      this.model = new Model();

      this.indexView = new IndexView({
        model: self.model,
        template: indexTemplate,
      });

      app.content.show(self.indexView);
    }

  });

  app.indexController = controller;

  return controller;

});

