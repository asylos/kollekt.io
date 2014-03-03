//
// ## controllers.question
//

define([
  'helpers/namespace',
  'marionette',
  'views/printoutQuestion',
  'views/printoutAnswer',
  'models/question',
  'collections/answers',
  // Overview views
  'views/answersList',
  // Detail views
  'views/question',
  'views/question/answerDetail',
  // Headers
  'views/header',
  'hbs!templates/questionHeader',
  // Footers
  'views/footer'
],

function (app, Marionette, PrintOutQuestion, PrintOutAnswer, Model, AnswersCollection, AnswersListView, View, AnswerDetailView, QuestionHeaderView, questionHeaderTemplate, FooterView) {

  "use strict";

  var controller = Marionette.Controller.extend({

    initialize: function (options) {
      this.options = options || {};
      var self = this;

      // Events

      // Backbone.hoodie.store.on('change:answer', this.onNewAnswerFromStore);

      // Listen for model fetch
      app.vent.once('question:showAnswers', function(model) {
        self.prepareRender(self);
      });

      app.vent.once('question:invalidURL', function() {
        self.render(self);
      });

      app.vent.on('question:renderAnswerListFooter', function(model) {
        self.renderAnswerListFooter(self);
      });

      app.vent.on('question:printAnswers', function(model) {
        self.printAnswers(self);
      });

      // Question model
      self.model = new Model({
        id: this.options.id
      });

      self.model.fetch();
    },

    prepareRender: function(self){
      // Set some useful attributes about the current state
      self.model.set({
        action: this.options.action,
        currentAnswer: self.model.answers.getAnswerByID(self.model.answers.models, self.options.answerID),
        currentUser: Backbone.hoodie.account.username,
        currentUserID: Backbone.hoodie.id()
      });

      // Check whether the current answer is editable by the current user
      if(self.model.get('currentAnswer')){
        if(self.model.get('currentUserID') === self.model.get('currentAnswer').get('createdBy')){
          self.model.set({isEditable: true});
        }
      }

      self.render(self);
    },

    render: function(self){
      console.log("RENDER! ",self);

      // Header view
      var questionHeaderView = new QuestionHeaderView({
        model: self.model,
        className: 'questionView',
        template : questionHeaderTemplate
      });

      // This is the detail view on the right side
      var detailView = new AnswerDetailView({
        model: self.model
      });

      // If there are no answers, show overview view
      if(self.model.answers.length === 0){
        self.overviewView = new View({
          model: self.model
        });
        this.renderAnswerListFooter(self);
      } else {
        // If there are answers, show the answer list view
        self.overviewView = new AnswersListView({
          collection: self.model.filteredAnswers
        });
      }

      self.footer = new FooterView({
        model: self.model
      });

      app.header.show(questionHeaderView);
      app.overview.show(self.overviewView);
      app.details.show(detailView);
      app.footer.show(self.footer);

      // Do some animating
      if(this.options.action){
        if(app.details.$el){
          app.details.$el.addClass('active');
        }
        app.overview.$el.addClass('hidden');
      } else {
        if(app.details.$el){
          app.details.$el.removeClass('active');
        }
        _.delay(function(){
          if(app.details.$el){
            app.details.reset();
          }
          if(app.overview.$el){
            app.overview.$el.removeClass('hidden');
          }
        }, 333);
      }

      // Scroll to top
      $('body').scrollTop(0);

    },

    renderAnswerListFooter: function(self){
      if(self.model.get('question')){
        var printableAnswers = self.model.answers.getPrintableAnswers(self.model.filteredAnswers.models);
        self.model.set({printableAnswers: printableAnswers.length});
        var footer = new FooterView({
          model: self.model
        });
        app.footer.show(footer);
      }
    },

    printAnswers: function(self){
      // create and render print view
      var printableQuestion = new PrintOutQuestion({
        model: self.model
      });
      printableQuestion.render();

      var printableAnswers = new AnswersCollection(self.model.answers.getPrintableAnswers(self.model.filteredAnswers.models));
      var printview = new PrintOutAnswer({
        collection: printableAnswers
      });
      printview.render();

      // create an iframe and append the rendered printview to it
      $('<iframe id="printf"/>').appendTo('#printContainer');
      $("#printf").contents().find('head').append('<link rel="stylesheet" href="assets/css/app/print.css">');
      $('#printf').contents().find('body').append(printableQuestion.el);
      $('#printf').contents().find('body').append(printview.el);

      // focus and print the iframe
      window.frames.printf.focus();
      window.frames.printf.print();

      // remove the iframe
      _.delay(function(){
        var frame = document.getElementById("printf");
        frame.parentNode.removeChild(frame);
      }, 100);
    }
  });

  return controller;

});

