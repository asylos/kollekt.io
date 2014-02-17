//
// ## controllers.question
//

define([
  'helpers/namespace',
  'marionette',
  'models/question',
  'views/question'
],

function (app, Marionette, Model, View) {

  "use strict";

  var controller = Marionette.Controller.extend({

    initialize: function (options) {
      this.options = options || {};
      var self = this;

      var model = new Model({
        id: this.options.id
      });

      this.listenTo(model, 'reset', function (m) {
        console.log("change: ",self.model);
      });

      var view = new View({
        model: model
      });

      // show loading screen
      app.content.show(view);
    }

  });

  return controller;

});
