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
    template: tmpl
  });

  var View = Marionette.CollectionView.extend({
    tagName: 'ul',
    itemView: PrintAnswer
  });

  return View;

});
