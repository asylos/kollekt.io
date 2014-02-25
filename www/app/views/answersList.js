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
    onRender: function() {
      var self = this;

      console.log("answersList has rendered");
      console.log("afterRender: ", $('#slipList').length);
      if($('#slipList').length !== 0){
        console.log("Slip attached!");
        new Slip($('#slipList')[0]);
      }
    }

  });

  return View;

});
