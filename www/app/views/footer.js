//
// # views.footer
//

define([
  'helpers/namespace',
  'marionette'
],

function (app, Marionette) {

  'use strict';

  var view = Marionette.ItemView.extend({
    blockSubmission: false,
    events : {
      'click .addAnswer' : 'addAnswer',
      'click .saveAnswer' : 'saveAnswer',
      'click .cancelAnswer' : 'cancelAnswer',
      'click .printAnswers' : 'printAnswers'
    },

    addAnswer: function(event){
      event.preventDefault();
      app.router.navigate(Backbone.history.fragment+'/add-answer', { trigger: true });
    },

    saveAnswer: function(event){
      if(this.blockSubmission){
        console.log("double submission!");
        return;
      }
      event.preventDefault();
      var answer = {
        belongsToQuestion: this.model.attributes.id,
        title: $('#answerName').val(),
        original: $('#answerOriginal').val(),
        translation: $('#answerTranslation').val(),
        sourceName: $('#answerSourceName').val(),
        source: $('#answerSource').val()
      };
      console.log("answer: ",answer);
      this.blockSubmission = true;
      app.vent.trigger('question:addAnswer', answer);
    },

    cancelAnswer: function(event){
      event.preventDefault();
      app.router.navigate(Backbone.history.fragment.replace('/add-answer', ''), { trigger: true });
    },

    printAnswers: function(event){
      event.preventDefault();
      app.vent.trigger('question:printAnswers');
    }


  });

  return view;

});
