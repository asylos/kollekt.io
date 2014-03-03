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
      }).fail(function(error){
        console.log("Could not fetch answers: ",error);
      });
    },

    update: function(answer, id){
      Backbone.hoodie.store.update('answer', id, answer).done(this.onStoreUpdate).fail(this.onStoreAnswerFailed);
    },

    onStoreUpdate: function(answer){
      // Go back up one level in the URL
      var fragment = Backbone.history.fragment;
      app.router.navigate(fragment.substr(0, fragment.indexOf('/edit-answer')), { trigger: true });
    },

    // Save a new answer to the store
    store: function(answer){
      Backbone.hoodie.store.add('answer', answer).publish().done(this.onStoreAnswer).fail(this.onStoreAnswerFailed);
    },

    onStoreAnswer: function(answer){
      // Go back up one level in the URL
      app.router.navigate(Backbone.history.fragment.replace('/add-answer',''), { trigger: true });
    },

    onStoreAnswerFail: function(error){
      console.log("onStoreAnswerFail: ",error);
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
    },

    getSortedPrintableAnswers: function (answers, order) {
      var self = this;
      var payload = [];
      _.each(order, function(id){
        payload.push(_.find(answers, function(answer){
          return answer.attributes.id === id;
        }));
      });
      return payload;
    }

  });

});

