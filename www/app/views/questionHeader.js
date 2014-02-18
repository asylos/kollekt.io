//
// # views.questionHeader
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/questionHeader'
],

function (app, Marionette, template) {

  'use strict';

  var view = Marionette.ItemView.extend({
    className: 'questionView',
    template : template
  });

  return view;

});
