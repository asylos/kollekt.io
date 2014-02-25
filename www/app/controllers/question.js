//
// ## controllers.question
//

define([
  'helpers/namespace',
  'marionette',
  'models/question',
  'collections/answers',
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

function (app, Marionette, Model, AnswersCollection, View, AddView, QuestionHeaderView, questionHeaderTemplate, FooterView, FooterTemplateDefault, FooterTemplateAdd) {

  "use strict";

  var controller = Marionette.Controller.extend({

    initialize: function (options) {
      this.options = options || {};
      var self = this;

      Backbone.hoodie.store.on('change:answer', this.onNewAnswerFromStore);

      console.log("listen to: ",'question:showAnswers:'+this.options.id);

      app.vent.on('question:showAnswers', function(model) {

        this.collection = new AnswersCollection({
          id: self.options.id
        });

        this.listenTo(this.collection, 'reset', function (model) {
          this.filteredAnswers = new AnswersCollection(this.collection.belongsToQuestion(model));
        });

        this.collection.fetch();
      });

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
        app.vent.once('question:addAnswer:'+this.options.id, function(model) {
          self.addAnswer(model);
        });
      } else {
        if(app.details.$el){
          app.details.$el.removeClass('active');
        }
        footer = new FooterView({
          model: model,
          template: FooterTemplateDefault
        });
      }

      // show loading screen
      app.overview.show(self.view);
      app.header.show(questionHeaderView);
      app.footer.show(footer);
    },

    filterAnswers: function(model){
      this.filteredAnswersCollection = new Collection()
    },

    addAnswer: function(answer){
      Backbone.hoodie.store.add('answer', answer).done(this.onAddAnswer).fail(this.onAddAnswerFailed);
    },

    onAddAnswer: function(answer){
      app.router.navigate(Backbone.history.fragment.replace('/add-answer',''), { trigger: true });
    },

    onAddAnswerFail: function(error){
      console.log("onAddAnswerFail: ",error);
    },

    onAnswers: function(answers) {

      debugger
      console.log("onAnswers: ", answers, 'question:showAnswers:'+this.attributes.id);

      //app.vent.trigger('question:showAnswers:'+this.attributes.id, this);
    },

    onAnswersFail: function(data){
      console.log("onAnswersFail: ", data);
    },

    onNewAnswerFromStore: function(eventName, answer){
      /*
      var questionId = this.attributes.id;
      // Only update if the answer belongs to this question
      if(answer.belongsToQuestion === questionId ) {
        // Only save in the model if the answer is new
        if(eventName === 'add'){
          this.attributes.answers.push(answer);
        }
        app.vent.trigger('question:showAnswers', this);
      }
      */
    }
  });

  return controller;

});

