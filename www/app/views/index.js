//
// # views.index
//

define([
  'helpers/namespace',
  'marionette',
  'validation',
  'urlify'
],

function (app, Marionette) {

  'use strict';

  return Marionette.ItemView.extend({

    submitClicked: false,

    initialize: function() {
      Backbone.Validation.bind(this);
    },

    events : {
      'click .submit' : 'submit',
      'keydown input[type=text]' : 'submitOnEnter'
    },

    submitOnEnter: function (e) {
      var key = e.keyCode || e.which;

      if (key === 13) {
        e.preventDefault();
        this.submit();
      }
    },

    submit: function (event){
      if(!this.submitClicked){
        $('.submit').val('Are you sure? No typos?');
        this.submitClicked = true;
        return;
      }
      if(event){
        event.preventDefault();
      }
      var $input = $('#question');
      var question = $input.val();
      // Check if the input isn't empty
      var errorMessage = this.model.preValidate('question', question);
      if(errorMessage){
        // Input is empty, tell user
        $input.attr('placeholder', errorMessage);
      } else {
        // Update model
        // SVEN: this isn't really an actual model for a question, I just needed something to
        // save the thing with. We never use it again afterwards.
        this.model.save({
          question: question
        });
        // Immediately open the question's page
        this.model.save().done(function(data){
          // URLify the question and append it to the url, for the humans
          var urlifiedQuestion = app.urlify(data.question);
          app.router.navigate('question/'+data.id+'/'+urlifiedQuestion, {trigger: true});
        });
      }
    }
  });

});
