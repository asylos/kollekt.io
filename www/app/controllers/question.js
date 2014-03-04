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
      console.log("initialize: ",self);

      // Events

      // Backbone.hoodie.store.on('change:answer', this.onNewAnswerFromStore);

      this.listenTo(app.vent, 'resize', this.onResize, this);

      app.vent.off('question:showAnswers');
      app.vent.off('question:invalidURL');
      app.vent.off('question:renderAnswerListFooter');
      app.vent.off('question:printAnswers');

      // Listen for model fetch
      app.vent.on('question:showAnswers', function(model) {
        self.prepareRender(self);
      });

      app.vent.on('question:invalidURL', function() {
        self.render(self);
      });

      app.vent.on('question:renderAnswerListFooter', function(model) {
        self.renderAnswerListFooter(self);
      });

      app.vent.on('question:printAnswers', function(model) {
        self.printAnswers(self);
      });

      app.vent.on('question:init', function(id) {
        self.options.id = id;
        self.options.action = null;
        self.options.answerID = null;
        self.getData(self);
      });

      app.vent.on('question:addanswer', function(id){
        self.options.id = id;
        self.options.action = 'addAnswer';
        self.options.answerID = null;
        self.prepareRender(self);
      });

      app.vent.on('question:showanswer', function(id, answerID){
        self.options.id = id;
        self.options.action = 'showAnswer';
        self.options.answerID = answerID;
        self.prepareRender(self);
      });

      app.vent.on('question:editanswer', function(id, answerID){
        self.options.id = id;
        self.options.action = 'editAnswer';
        self.options.answerID = answerID;
        self.prepareRender(self);
      });

      Backbone.hoodie.store.on('add:answer', function(answer){
        self.model.answers.add(answer, {at: 0});
      });

      Backbone.hoodie.store.on('change:answer', function(eventName, answer){
        if(eventName === "update"){
          self.model.answers.set(answer, {remove: false});
        }
      });
    },

    getData: function(self){
      // If we're not switching question ids, just render without fetching
      if(self.model && self.options.id === self.model.get('id')){
        self.prepareRender(self);
        return;
      }
      // Question model
      self.model = new Model({
        id: self.options.id
      });

      /*
      this.listenTo(self.model, 'add change', function(event){
        self.render(self);
      });
      */

      self.model.fetch();
    },

    prepareRender: function(self){
      if(!self.model){
        self.getData(self);
        return;
      }
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

      if(app.footer.currentView){
        app.footer.currentView.undelegateEvents();
        app.footer.currentView.close();
      }
      app.footer.close();
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
        app.footer.currentView.render();
      }
    },

    printAnswers: function(self){
      var frame = document.getElementById("printf");
      if(frame) {
        frame.parentNode.removeChild(frame);
      }
      $('#printContainer').empty();

      // create and render print view
      var printableQuestion = new PrintOutQuestion({
        model: self.model
      });
      printableQuestion.render();

      var printOrder = [];
      $('#slipList li').each(function(){
        if($(this).find('.printToggle.active').length !== 0){
          printOrder.push($(this).data('id'));
        }
      });

      var sortedPrintableAnswers = new AnswersCollection(self.model.answers.getSortedPrintableAnswers(self.model.filteredAnswers.models, printOrder));
      var printview = new PrintOutAnswer({
        collection: sortedPrintableAnswers
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
        if(frame) {
          frame.parentNode.removeChild(frame);
        }
        $('#printContainer').empty();
      }, 100);
    }
  });

  return controller;

});

