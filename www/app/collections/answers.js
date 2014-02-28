define([
  'helpers/mvc/collection',
  'models/answer'
],

function (BaseCollection, Model) {

  'use strict';

  return BaseCollection.extend({
    model: Model,

    initialize: function(options) {
      this.options = options || {};
    },

    fetch: function() {
      var self = this;
      return Backbone.hoodie.store.findAll('answer').done(function(answers){
        self.reset(answers);
      });
    },

    belongsToQuestion: function (answers) {
      var self = this;
      var payload = [];
      this.filter(function(answers) {
        if (answers.get('type') === "answer" && answers.get('belongsToQuestion') === self.options.id){
          payload.push(answers.toJSON());
        }
      });
      return payload;
    },

    getAnswerByID: function (answers, id) {
      var self = this;
      var result = this.find(function(answers) {
        if (answers.get('type') === "answer" && answers.get('id') === id){
          return answers;
        }
      });
      console.log("result: ",result);
      return result;
    },

    getPrintableAnswers: function (answers) {
      var self = this;
      var payload = [];
      var results = _.filter(answers, function(answer){
        if (answer.attributes.type === "answer" && answer.attributes.print === true){
          payload.push(answer.toJSON());
        }
      });
      return payload;
    }

  });

});

