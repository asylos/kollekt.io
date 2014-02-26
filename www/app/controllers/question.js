//
// ## controllers.question
//

define([
  'helpers/namespace',
  'marionette',
  'models/question',
  'collections/answers',
  // Overview views
  'views/answersList',
  // Detail views
  'views/question',
  'views/question/add',
  'views/question/show',
  // Headers
  'views/header',
  'hbs!templates/questionHeader',
  // Footers
  'views/footer',
  'hbs!templates/question/footerDefault',
  'hbs!templates/question/footerAdd',
  'hbs!templates/question/footerShow'
],

function (app, Marionette, Model, AnswersCollection, AnswersListView, View, AddView, ShowView, QuestionHeaderView, questionHeaderTemplate, FooterView, FooterTemplateDefault, FooterTemplateAdd, FooterTemplateShow) {

  "use strict";

  var controller = Marionette.Controller.extend({

    initialize: function (options) {
      this.options = options || {};
      var self = this;

      // Events

      Backbone.hoodie.store.on('change:answer', this.onNewAnswerFromStore);

      // Fetch all the answers
      app.vent.on('question:showAnswers', function(model) {
        self.collection = new AnswersCollection({
          id: self.options.id
        });

        this.listenTo(self.collection, 'reset', function (model) {
          // Filter the answers to only show those belonging to this question
          self.filteredAnswers = new AnswersCollection(self.collection.belongsToQuestion(model));
          console.log("filteredAnswers: ",self.filteredAnswers);
          var answersView = new AnswersListView({
            collection: self.filteredAnswers
          });
          app.overview.show(answersView);
        });

        self.collection.fetch();
      });

      // Question model
      var model = new Model({
        id: this.options.id
      });

      model.set({
        action: this.options.action,
        currentUser: Backbone.hoodie.account.username,
        currentUserID: Backbone.hoodie.id()
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
      console.log("questionHeaderView: ",questionHeaderView);

      var footer;

      switch(this.options.action){
      case 'showAnswer':
        // render the add answer interface in the details region (right side)
        var answerModel = self.collection.getAnswerByID(self.collection.models, self.options.answerID);
        var showView = new ShowView({
          model: answerModel
        });
        app.details.show(showView);

        app.details.$el.addClass('active');
        app.overview.$el.addClass('hidden');
        // check if the current user can edit the current answer
        if(model.get('currentUserID') === answerModel.get('createdBy')){
          answerModel.set({isEditable: true});
        }
        // Create footer for the show answer view
        footer = new FooterView({
          model: answerModel,
          template: FooterTemplateShow
        });
        app.vent.once('question:editAnswerAsNew', function(model) {
          if(model.belongsToQuestion === self.options.id){
            //self.addAnswer(model);
            console.log("editAnswerAsNew");
          }
        });
        app.vent.once('question:editAnswer', function(model) {
          if(model.belongsToQuestion === self.options.id){
            //self.addAnswer(model);
            console.log("editAnswer");
          }
        });
        app.vent.once('question:deleteAnswer', function(model) {
          if(model.belongsToQuestion === self.options.id){
            //self.addAnswer(model);
            console.log("deleteAnswer");
          }
        });

        break;
      case 'addAnswer':
        // render the add answer interface in the details region (right side)
        var addView = new AddView({
          model: model
        });
        app.details.show(addView);
        app.details.$el.addClass('active');
        app.overview.$el.addClass('hidden');
        footer = new FooterView({
          model: model,
          template: FooterTemplateAdd
        });
        app.vent.once('question:addAnswer', function(model) {
          if(model.belongsToQuestion === self.options.id){
            self.addAnswer(model);
          }
        });
        break;
      default:
        // render the answers list in the overview region (left side)
        footer = new FooterView({
          model: model,
          template: FooterTemplateDefault
        });
        if(app.details.$el){
          app.details.$el.removeClass('active');
        }
        _.delay(function(){
          app.details.reset();
          app.overview.$el.removeClass('hidden');
        }, 333);
        break;
      }

      // Scroll to top
      $('body').scrollTop(0);

      //app.overview.show(self.view);
      app.header.show(questionHeaderView);
      app.footer.show(footer);
    },

    addAnswer: function(answer){
      console.log("store answer: ",answer);
      Backbone.hoodie.store.add('answer', answer).done(this.onAddAnswer).fail(this.onAddAnswerFailed);
    },

    onAddAnswer: function(answer){
      app.router.navigate(Backbone.history.fragment.replace('/add-answer',''), { trigger: true });
    },

    onAddAnswerFail: function(error){
      console.log("onAddAnswerFail: ",error);
    },

    onAnswers: function(answers) {
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

