//
// # views.answer
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/question/showAnswer',
  'hbs!templates/question/addAnswer',
  'hbs!templates/question/noAnswer'
],

function (app, Marionette, showAnswers, addAnswer, noAnswers) {

  'use strict';

  return Marionette.ItemView.extend({
    initialize: function(){
      switch(this.model.get('action')){
      case 'showAnswer':
        this.template = showAnswers;
        this.$el.addClass('showView');
        break;
      case 'addAnswer':
        this.template = addAnswer;
        this.$el.addClass('addView');
        break;
      case 'editAnswer':
        this.template = addAnswer;
        this.$el.addClass('editView');
        break;
      default:
        this.template = noAnswers;
        this.$el.addClass('noAnswersView');
        break;
      }
      app.vent.off('resize');
      app.vent.on('resize', this.onResize);
      this.onResize();
    },

    onResize: function() {
      var baseHeight = $(window).height();
      if(app.header.$el){
        baseHeight -= app.header.$el.outerHeight();
      }
      if(app.footer.$el){
        baseHeight -= app.footer.$el.find('.detail').outerHeight();
      }
      $('#details').height(baseHeight);
    },

    onShow: function(){
      this.$el.find("textarea").each(function(index, el){
        $(el).height( el.scrollHeight);
      });
    },

    events : {
      'click .addAnswer' : 'addAnswer'
    },

    addAnswer: function(event){
      event.preventDefault();
      app.router.navigate(Backbone.history.fragment+'/add-answer', { trigger: true });
    }
  });

});
