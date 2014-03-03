//
// # views.printoutAnswer
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/printoutAnswer'
],

function (app, Marionette, tmpl) {

  'use strict';

  var PrintAnswer = Marionette.ItemView.extend({
    tagName: 'li',
    template: tmpl,
    initialize: function(){
      this.$el.attr({
        'data-id': this.model.id
      });
    }
  });

  var View = Marionette.CollectionView.extend({
    tagName: 'ul',
    itemView: PrintAnswer
  });

  return View;

});
