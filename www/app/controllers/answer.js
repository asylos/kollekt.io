//
// ## controllers.answer
//

define([
  'helpers/namespace',
  'marionette',
  'collection/answers',
  'models/answer',
],

function (app, Marionette, Collection, Model) {

  "use strict";

  var controller = Marionette.Controller.extend({
    initialize: function (options) {
      var self = this;
      this.options = options || {};
      //Backbone.hoodie.store.on('change:answer', this.onNewAnswerFromStore);
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

  app.indexController = controller;

  return controller;

});
