//
// # views.footer
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/question/footerDefault',
  'hbs!templates/question/footerAdd',
  'hbs!templates/question/footerEdit',
  'hbs!templates/question/footerShow'
],

function (app, Marionette, defaultTemplate, addTemplate, editTemplate, showTemplate) {

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
      case 'editAnswer':
        this.template = editTemplate;
        break;
      default:
        this.template = defaultTemplate;
        break;
      }
    },

    blockSubmission: false,
    events : {
      'click .addAnswer'                : 'addAnswer',
      'click .saveAnswer'               : 'saveAnswer',
      'click .updateAnswer'             : 'updateAnswer',
      'click .cancelAnswer'             : 'cancelAnswer',
      'click .printAnswers'             : 'printAnswers',
      'click .editAnswerAsNew'          : 'editAnswerAsNew',
      'click .editOrDeleteAnswer'       : 'editAnswer',
      'click .deleteAnswer'             : 'deleteAnswer'
    },

    addAnswer: function(event){
      event.preventDefault();
      app.router.navigate(Backbone.history.fragment+'/add-answer', { trigger: true });
    },

    saveAnswer: function(event){
      event.preventDefault();
      if(this.blockSubmission){
        return;
      }
      var answer = {
        belongsToQuestion: this.model.get('id'),
        title: $('#answerName').val(),
        original: $('#answerOriginal').val(),
        translation: $('#answerTranslation').val(),
        sourceName: $('#answerSourceName').val(),
        source: $('#answerSource').val(),
        authorName: Backbone.hoodie.account.username
      };
      this.blockSubmission = true;
      this.model.answers.store(answer);
    },

    updateAnswer: function(event){
      event.preventDefault();
      if(this.blockSubmission){
        return;
      }
      var answer = {
        title: $('#answerName').val(),
        original: $('#answerOriginal').val(),
        translation: $('#answerTranslation').val(),
        sourceName: $('#answerSourceName').val(),
        source: $('#answerSource').val()
      };
      this.blockSubmission = true;
      this.model.answers.update(answer, this.model.get('currentAnswer').get('id'));
    },

    cancelAnswer: function(event){
      event.preventDefault();
      var fragment = Backbone.history.fragment;
      if(fragment.indexOf('/add-answer') !== -1){
        app.router.navigate(fragment.replace('/add-answer', ''), { trigger: true });
      }
      if(fragment.indexOf('/edit-answer') !== -1){
        app.router.navigate(fragment.substr(0, fragment.indexOf('/edit-answer')), { trigger: true });
      }
    },

    printAnswers: function(event){
      event.preventDefault();
      app.vent.trigger('question:printAnswers');
    },

    editAnswerAsNew: function(event){
      event.preventDefault();
      console.log("editAnswerAsNew: ");
    },

    editAnswer: function(event){
      event.preventDefault();
      app.router.navigate(Backbone.history.fragment.replace('/show-answer', '/edit-answer'), { trigger: true });
    },

    deleteAnswer: function(event){
      event.preventDefault();
      console.log("deleteAnswer: ");
    }

  });

  return view;

});
