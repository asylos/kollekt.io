//
// ## controllers.index
//

define([
  'helpers/namespace',
  'marionette',
  'models/index',
  'views/index',
  'views/header',
  'hbs!templates/index',
  'hbs!templates/defaultHeader'
],

function (app, Marionette, Model, IndexView, HeaderView, indexTemplate, headerTemplate) {

  "use strict";

  var controller = Marionette.Controller.extend({
    initialize: function (options) {
      var self = this;
      this.options = options || {};
      this.model = new Model();

      this.model.attributes.currentUser = Backbone.hoodie.account.username;

      this.indexView = new IndexView({
        model: self.model,
        template: indexTemplate,
        className: 'paddedContainer'
      });

      this.headerView = new HeaderView({
        model: self.model,
        template: headerTemplate
      });

      // FIX: This sometimes errors because the regions aren't ready yet
      app.overview.show(self.indexView);
      app.header.show(self.headerView);
    }

  });

  app.indexController = controller;

  return controller;

});

