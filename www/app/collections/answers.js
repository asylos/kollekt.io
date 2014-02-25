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
      var self = this;
      return Backbone.hoodie.store.findAll('answer').done(function(answer){
        self.reset(answer);
      });
    },

    belongsToQuestion: function (model) {
      console.log("filter belongsToQuestion: ",model);
      if (model.get('type') === "answer" && model.get('belongsToQuestion') === questionId){
        return true;
      }
    }

  });

});

