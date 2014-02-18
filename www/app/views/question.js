//
// # views.question
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/question'
],

function (app, Marionette, template) {

  'use strict';

  var view = Marionette.ItemView.extend({
    className: 'questionView',
    template : template
  });

  return view;

});
