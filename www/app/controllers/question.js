//
// ## controllers.question
//

define([
  'helpers/namespace',
  'marionette',
  'models/question',
  'collections/questions',
  'views/question',
  'views/question/add',
  // Headers
  'views/header',
  'hbs!templates/questionHeader',
  // Footers
  'views/footer',
  'hbs!templates/question/footerDefault',
  'hbs!templates/question/footerAdd'
],

function (app, Marionette, Model, Collection, View, AddView, QuestionHeaderView, questionHeaderTemplate, FooterView, FooterTemplateDefault, FooterTemplateAdd) {

  "use strict";

  var controller = Marionette.Controller.extend({

    initialize: function (options) {
      this.options = options || {};
      var self = this;

      this.collection = new Collection();

      var model = new Model({
        id: this.options.id,
        currentUser: Backbone.hoodie.account.username
      });

      self.view = new View({
        model: model
      });



      var questionHeaderView = new QuestionHeaderView({
        model: model,
        className: 'questionView',
        template : questionHeaderTemplate
      });

      var footer;

      // Show the add answer interface
      if(this.options.addAnswer){
        var addView = new AddView({
          model: model
        });
        app.details.show(addView);
        app.details.$el.addClass('active');
        footer = new FooterView({
          model: model,
          template: FooterTemplateAdd
        });
        // FIX: find out why listenTo doesn't work
        app.vent.on('question:showAnswers'+this.options.id, function(model) {
          console.log("question:showAnswers: ",model);
          self.view.render();
        });
      } else {
        if(app.details.$el){
          app.details.$el.removeClass('active');
        }
        footer = new FooterView({
          model: model,
          template: FooterTemplateDefault
        });
        app.vent.once('question:addAnswer:'+this.options.id, function(model) {
          console.log("vent question:addAnswer: ",model);
          self.addAnswer(model);
        });
      }

      // show loading screen
      app.overview.show(self.view);
      app.header.show(questionHeaderView);
      app.footer.show(footer);
    },

    addAnswer: function(answer){
      console.log("SAVING THE ANSWER NOW",answer);
      Backbone.hoodie.store.add('answer', answer).done(this.onAddAnswer).fail(this.onAddAnswerFailed);
    },

    onAddAnswer: function(answer){
      console.log("ANSWER SAVED",answer);
      app.router.navigate(Backbone.history.fragment.replace('/add-answer',''), { trigger: true });
    },

    onAddAnswerFail: function(error){
      console.log("onAddAnswerFail: ",error);
    },
  });

  return controller;

});

