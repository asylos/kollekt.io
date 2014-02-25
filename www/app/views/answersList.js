//
// # views.answersList
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/answer',
],

function (app, Marionette, tmpl) {

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
    }

  });

  return View;

});
