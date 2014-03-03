//
// # views.footer
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/question/footerDefault',
  'hbs!templates/question/footerAdd',
  'hbs!templates/question/footerShow'
],

function (app, Marionette, defaultTemplate, addTemplate, showTemplate) {

  'use strict';

  var view = Marionette.ItemView.extend({
    initialize: function(){
      // This is a wrong URL, don't show anything
      if(this.model.get('question') === ""){
        return;
      }
      switch(this.model.get('action')){
      case 'showAnswer':
        this.template = showTemplate;
        break;
      case 'addAnswer':
        this.template = addTemplate;
        break;
      default:
        this.template = defaultTemplate;
        break;
      }
    },

    blockSubmission: false,
    events : {
      'click .addAnswer'        : 'addAnswer',
      'click .saveAnswer'       : 'saveAnswer',
      'click .cancelAnswer'     : 'cancelAnswer',
      'click .printAnswers'     : 'printAnswers',
      'click .editAnswerAsNew'  : 'editAnswerAsNew',
      'click .editAnswer'       : 'editAnswer',
      'click .deleteAnswer'     : 'deleteAnswer'
    },

    addAnswer: function(event){
      event.preventDefault();
      app.router.navigate(Backbone.history.fragment+'/add-answer', { trigger: true });
    },

    saveAnswer: function(event){
      if(this.blockSubmission){
        return;
      }
      event.preventDefault();
      var answer = {
        belongsToQuestion: this.model.get('id'),
        title: $('#answerName').val(),
        original: $('#answerOriginal').val(),
        translation: $('#answerTranslation').val(),
        sourceName: $('#answerSourceName').val(),
        source: $('#answerSource').val()
      };
      this.blockSubmission = true;
      this.model.answers.store(answer);
    },

    cancelAnswer: function(event){
      event.preventDefault();
      app.router.navigate(Backbone.history.fragment.replace('/add-answer', ''), { trigger: true });
    },

    printAnswers: function(event){
      event.preventDefault();
      app.vent.trigger('question:printAnswers');
    },

    editAnswerAsNew: function(event){

    },

    editAnswer: function(event){

    },

    deleteAnswer: function(event){

    }

  });

  return view;

});
