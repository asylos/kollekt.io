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
  'views/answersList',
  // Headers
  'views/header',
  'hbs!templates/questionHeader',
  // Footers
  'views/footer',
  'hbs!templates/question/footerDefault',
  'hbs!templates/question/footerAdd'
],

function (app, Marionette, Model, AnswersCollection, View, AddView, AnswersListView, QuestionHeaderView, questionHeaderTemplate, FooterView, FooterTemplateDefault, FooterTemplateAdd) {

  "use strict";

  var controller = Marionette.Controller.extend({

    initialize: function (options) {
      this.options = options || {};
      var self = this;

      // Events

      Backbone.hoodie.store.on('change:answer', this.onNewAnswerFromStore);

      app.vent.on('question:showAnswers', function(model) {
        this.collection = new AnswersCollection({
          id: self.options.id
        });

        this.listenTo(this.collection, 'reset', function (model) {
          this.filteredAnswers = new AnswersCollection(this.collection.belongsToQuestion(model));
          // Answers compositeView
          console.log("filteredAnswers: ",this.filteredAnswers);
          var answersView = new AnswersListView({
            collection: this.filteredAnswers
          });
          console.log("answersView: ",answersView);
          app.overview.show(answersView);
        });

        this.collection.fetch();
      });

      // Question model
      var model = new Model({
        id: this.options.id,
        currentUser: Backbone.hoodie.account.username
      });

      // Overview view (left side)
      self.view = new View({
        model: model
      });


      // Header view
      var questionHeaderView = new QuestionHeaderView({
        model: model,
        className: 'questionView',
        template : questionHeaderTemplate
      });

      var footer;

      if(this.options.addAnswer){
        // render the add answer interface in the details region (right side)
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
        // render the answers list in the overview region (left side)
        if(app.details.$el){
          app.details.$el.removeClass('active');
        }
        footer = new FooterView({
          model: model,
          template: FooterTemplateDefault
        });
      }

      //app.overview.show(self.view);
      app.header.show(questionHeaderView);
      app.footer.show(footer);
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

