//
// # views.question
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/question',
  'slip'
],

function (app, Marionette, template, Slip) {

  'use strict';

  return Marionette.ItemView.extend({
    className: 'questionView',
    template : template,
    onRender: function () {
      console.log("afterRender: ", $('#slipList').length);
      if($('#slipList').length !== 0){
        console.log("Slip attached!");
        new Slip($('#slipList')[0]);
      }
    }
  });

});
