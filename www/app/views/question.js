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

  return Marionette.ItemView.extend({
    className: 'questionView paddedContainer',
    template : template,

    events : {
      'click .addAnswer' : 'addAnswer'
    },

    addAnswer: function(event){
      event.preventDefault();
      app.router.navigate(Backbone.history.fragment+'/add-answer', { trigger: true });
    }
  });

});
