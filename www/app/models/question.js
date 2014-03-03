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
      _.bindAll(this, 'fetch', 'onQuestion', 'onNoQuestion');
      this.fetch();
    },

    defaults: {
      question: '',
      id: '',
      createdAt: '',
      action: '',
      currentUser: ''
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
      app.vent.trigger('question:showAnswers', this);
    },

    onNoQuestion: function (data){
      console.log("onNoQuestion: ",data);
      console.log("This question doesn't exist.");
      app.vent.trigger('question:showAnswers', data);
    }

  });

});

