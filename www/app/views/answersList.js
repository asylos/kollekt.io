//
// # views.answersList
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/answer',
  'slip',
  'views/question/noanswers'
],

function (app, Marionette, tmpl, Slip, NoAnswersView) {

  'use strict';

  var Answer = Marionette.ItemView.extend({
    tagName: 'li',
    template: tmpl,
    events : {
      'click' : 'showAnswer',
    },

    showAnswer: function(event) {
      if($(event.target).prop('tagName') === 'LI'){
        app.router.navigate(Backbone.history.fragment+'/show-answer/'+this.model.attributes.id, { trigger: true });
      }
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

        ol.addEventListener('slip:beforereorder', function(e){
          if (/demo-no-reorder/.test(e.target.className)) {
            e.preventDefault();
          }
        }, false);

        ol.addEventListener('slip:beforewait', function(e){
          if (e.target.className.indexOf('instant') > -1) {
            e.preventDefault();
          }
        }, false);

        /*
        ol.addEventListener('slip:tap', function(e){
          console.log("e: ",e);
        }, false);
        */

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
