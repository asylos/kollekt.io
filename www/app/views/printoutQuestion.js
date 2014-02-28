//
// # views.printoutQuestion
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/printoutQuestion'
],

function (app, Marionette, tmpl) {

  'use strict';

  var PrintAnswer = Marionette.ItemView.extend({
    template: tmpl
  });

  return PrintAnswer;

});
