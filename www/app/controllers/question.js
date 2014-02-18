//
// ## controllers.question
//

define([
  'helpers/namespace',
  'marionette',
  'models/question',
  'collections/questions',
  'views/question',
  'views/questionHeader'
],

function (app, Marionette, Model, Collection, View, QuestionHeaderView) {

  "use strict";

  var controller = Marionette.Controller.extend({

    initialize: function (options) {
      this.options = options || {};
      var self = this;

      this.collection = new Collection();
      this.collection.fetch({
        reset: true
      });

      this.listenTo(this.collection, 'all', function (m) {
        console.log('collection evt: ', m);
      });

      var model = new Model({
        id: this.options.id
      });

      this.listenTo(model, 'reset', function (m) {
        console.log("change: ", self.model);
      });

      var view = new View({
        model: model
      });

      var questionHeaderView = new QuestionHeaderView({
        model: model
      });

      // show loading screen
      app.content.show(view);
      app.header.show(questionHeaderView);
    }

  });

  return controller;

});

