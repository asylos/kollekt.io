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
      return Backbone.hoodie.store.findAll('answer').done(function(answer){
        self.reset(answer);
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
    }

  });

});

