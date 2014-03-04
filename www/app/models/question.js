//
//  ## models.question
//

define([
  'helpers/mvc/model',
  'collections/answers'
],

function (BaseModel, Answers) {

  'use strict';

  return BaseModel.extend({
    type: 'question',
    initialize: function(){
      _.bindAll(this, 'fetch', 'onQuestion', 'onNoQuestion');
    },

    defaults: {
      question: '',
      id: '',
      createdAt: '',
      action: '',
      currentUser: '',
      authorName: '',
      filteredAnswers: {}
    },

    fetch: function (){
      Backbone.hoodie.store.find('question', this.id)
      .done(this.onQuestion)
      .fail(this.onNoQuestion);
    },

    onQuestion: function (question){
      this.attributes = {};
      this.attributes.id = question.id;
      this.attributes.question = question.question;
      this.attributes.createdAt = question.createdAt;
      this.attributes.authorName = question.authorName;
      this.answers = new Answers({
        id: question.id
      });

      this.listenTo(this.answers, 'reset', function (model) {
        // Filter the answers to only show those belonging to this question
        this.filteredAnswers = new Answers(this.answers.belongsToQuestion(model));
        app.vent.trigger('question:showAnswers', this);
      });

      this.answers.fetch();
    },

    onNoQuestion: function (data){
      console.log("onNoQuestion: ",data);
      console.log("This question doesn't exist.");
      app.vent.trigger('question:invalidURL', data);
    }

  });

});

