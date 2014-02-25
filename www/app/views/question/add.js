//
// # views.question
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/question/add'
],

function (app, Marionette, template) {

  'use strict';

  return Marionette.ItemView.extend({
    className: 'addView',
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
