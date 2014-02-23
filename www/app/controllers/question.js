//
// ## controllers.question
//

define([
  'helpers/namespace',
  'marionette',
  'models/question',
  'collections/questions',
  'views/question',
  'views/header',
  'hbs!templates/questionHeader'
],

function (app, Marionette, Model, Collection, View, QuestionHeaderView, questionHeaderTemplate) {

  "use strict";

  var controller = Marionette.Controller.extend({

    initialize: function (options) {
      this.options = options || {};
      var self = this;

      this.collection = new Collection();
      /*
      this.collection.fetch({
        reset: true
      });
      */

      this.listenTo(this.collection, 'all', function (m) {
        console.log('collection evt: ', m);
      });

      var model = new Model({
        id: this.options.id,
        currentUser: Backbone.hoodie.account.username
      });

      self.view = new View({
        model: model
      });

      // FIX: find out why listenTo doesn't work
      app.vent.on('question:showAnswers', function(model) {
        console.log("question:showAnswers: ",model);
        self.view.render();
      });

      this.listenTo(model, 'reset', function (m) {
        console.log("reset: ", self.model);
      });

      var questionHeaderView = new QuestionHeaderView({
        model: model,
        className: 'questionView',
        template : questionHeaderTemplate
      });
      console.log("questionHeaderView: ",questionHeaderView);

      // show loading screen
      app.content.show(self.view);
      app.header.show(questionHeaderView);
    }

  });

  return controller;

});

