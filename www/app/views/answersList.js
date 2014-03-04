//
// # views.answersList
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/answer',
  'slip',
  'views/question/noAnswers'
],

function (app, Marionette, tmpl, Slip, NoAnswersView) {

  'use strict';

  var Answer = Marionette.ItemView.extend({
    tagName: 'li',
    template: tmpl,
    initialize: function(){
      this.listenTo(this.model, 'change', function(model){
        this.$el.find('.printToggle').toggleClass('active');
      });
      this.$el.attr({
        'data-id': this.model.get('id')
      });
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
        baseHeight -= app.footer.$el.find('.overview').outerHeight();
      }
      $('#overview').height(baseHeight);
    },

    events : {
      'click' : 'showAnswer',
      'click .printToggle' : 'printToggle',
    },

    showAnswer: function(event) {
      if($(event.target).prop('tagName') === 'LI'){
        var fragments = Backbone.history.fragment.split('/');
        var questionFragment = fragments[0]+'/'+fragments[1]+'/'+fragments[2]+'/show-answer/'+this.model.attributes.id;
        app.router.navigate(questionFragment, { trigger: true });
      }
    },

    printToggle: function(event) {
      if(this.model.get('print')){
        this.model.set({print: false});
      } else {
        this.model.set({print: true});
      }
      app.vent.trigger('question:renderAnswerListFooter');
    }

  });

  var View = Marionette.CollectionView.extend({
    tagName: 'ul',
    id: 'slipList',
    itemView: Answer,
    emptyView: NoAnswersView,
    onDomRefresh: function() {
      var self = this;

      if($('#slipList').length !== 0){

        var ol = document.getElementById('slipList');
        ol.addEventListener('slip:beforeswipe', function(e) {
          // NO SWIPE FOR YU!
          e.preventDefault();
        });

        // Instant dragging on the handle
        ol.addEventListener('slip:beforewait', function(e){
          if (e.target.className.indexOf('instant') > -1 || $(e.target).closest('.instant').length !== 0) {
            e.preventDefault();
          }
        }, false);

        ol.addEventListener('slip:reorder', function(e){
          e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
          app.vent.trigger('answers:reordered',{trigger: true});
          return false;
        }, false);

        new Slip(ol);

      }
    }

  });

  return View;

});
