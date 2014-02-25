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
      _.bindAll(this, 'onQuestion', 'onNoQuestion');

      // SVEN: This is probably a rubbish way to do this, but I'm not sure how to
      // properly give a model an id and have it load the data into itself.
      console.log("hoodie find question:",this.id);
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
      console.log("trigger question: ",question.id);
      app.vent.trigger('question:showAnswers', {trigger: true});
    },

    onNoQuestion: function (data){
      console.log("onNoQuestion: ",data);
      console.log("This question doesn't exist.");
    }

  });

});

