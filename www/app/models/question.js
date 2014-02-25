//
//  ## models.question
//

define([
  'helpers/mvc/model'
],

function (BaseModel) {

  'use strict';

  return BaseModel.extend({
    type: 'question',
    initialize: function(){
      _.bindAll(this, 'onQuestion', 'onNoQuestion', 'fetchAnswers', 'onAnswers', 'onAnswersFail', 'onNewAnswerFromStore');

      Backbone.hoodie.store.on('change:answer', this.onNewAnswerFromStore);

      // SVEN: This is probably a rubbish way to do this, but I'm not sure how to
      // properly give a model an id and have it load the data into itself.
      Backbone.hoodie.store.find('question', this.id)
      .done(this.onQuestion)
      .fail(this.onNoQuestion);
    },

    defaults: {
      question: '',
      id: '',
      createdAt: ''
    },

    onQuestion: function (question){
      this.attributes = {};
      this.attributes.id = question.id;
      this.attributes.question = question.question;
      this.attributes.createdAt = question.createdAt;
      this.fetchAnswers();
    },

    onNoQuestion: function (data){
      console.log("onNoQuestion: ",data);
      console.log("This question doesn't exist.");
    },

    fetchAnswers: function(){
      console.log("fetchAnswers",this.attributes.id);
      var questionId = this.attributes.id;
      Backbone.hoodie.store.findAll(function(object){
        if(object.type === "answer" && object.belongsToQuestion === questionId){
          return true;
        }
      })
      .done(this.onAnswers).fail(this.onAnswersFail);
    },

    onAnswers: function(answers){
      console.log("onAnswers: ", answers);
      this.attributes.answers = answers;
      app.vent.trigger('question:showAnswers:'+this.attributes.id, this);
    },

    onAnswersFail: function(data){
      console.log("onAnswersFail: ", data);
    },

    onNewAnswerFromStore: function(eventName, answer){
      var questionId = this.attributes.id;
      // Only update if the answer belongs to this question
      if(answer.belongsToQuestion === questionId ) {
        // Only save in the model if the answer is new
        if(eventName === 'add'){
          this.attributes.answers.push(answer);
        }
        app.vent.trigger('question:showAnswers', this);
      }

    }

  });

});

