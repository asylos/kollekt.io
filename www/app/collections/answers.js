define([
  'helpers/mvc/collection',
  'models/answer'
],

function (BaseCollection, Model) {

  'use strict';

  return BaseCollection.extend({
    model: Model,

    initialize: function() {

      this.fetch();

    },

    fetch: function() {
      /*console.log("fetchAnswers",this.attributes.id);
      var questionId = this.attributes.id;
      */
      return Backbone.hoodie.store.findAll('answer');
    },

    belongsToQuestion: function (model) {
      if (model.get('type') === "answer" && model.get('belongsToQuestion') === questionId){
        return true;
      }
    }

  });

});

