//
// # views.answersList
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/answer',
  'slip'
],

function (app, Marionette, tmpl, Slip) {

  'use strict';

  var Answer = Marionette.ItemView.extend({
    tagName: 'li',
    template: tmpl,
    /*
    events : {
      'click li img' : 'show',
    },

    show: function() {
      app.vent.trigger('asset:graphics:show', this.model);
    },

    onRender: function() {
      if (this.model.get('active')) {
        this.$el.addClass('active');
      }
    }
    */

  });

  var View = Marionette.CollectionView.extend({
    tagName: 'ul',
    id: 'slipList',
    itemView: Answer,
    onDomRefresh: function() {
      var self = this;

      console.log("answersList has rendered");
      console.log("afterRender: ", $('#slipList').length);
      if($('#slipList').length !== 0){
        console.log("Slip attached!");
        //new Slip($('#slipList')[0]);


        var ol = document.getElementById('slipList');
        ol.addEventListener('slip:beforereorder', function(e){
          if (/demo-no-reorder/.test(e.target.className)) {
            e.preventDefault();
          }
        }, false);

        ol.addEventListener('slip:beforeswipe', function(e){
          if (e.target.nodeName === 'INPUT' || /demo-no-swipe/.test(e.target.className)) {
            e.preventDefault();
          }
        }, false);

        ol.addEventListener('slip:beforewait', function(e){
          if (e.target.className.indexOf('instant') > -1) {
            e.preventDefault();
          }
        }, false);

        ol.addEventListener('slip:afterswipe', function(e){
          e.target.parentNode.appendChild(e.target);
        }, false);

        ol.addEventListener('slip:reorder', function(e){
          e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
          return false;
        }, false);

        new Slip(ol);


      }
    }

  });

  return View;

});
