//
// # views.questions.noanswers
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/question/noanswers'
],

function (app, Marionette, template) {

  'use strict';

  return Marionette.ItemView.extend({
    className: 'noAnswersView',
    template : template
  });

  // BUmp?

});
