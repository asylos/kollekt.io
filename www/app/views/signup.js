//
// # views.question
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/signup',
  'validation'
],

function (app, Marionette, template) {

  'use strict';

  var view = Marionette.ItemView.extend({
    className: 'signupView paddedContainer light',
    template : template,
    initialize: function() {
      Backbone.Validation.bind(this);
      _.bindAll(this, 'onSignUp', 'onSignUpFail');
    },

    events : {
      'click .submit' : 'submit',
      'keydown input[type=password]' : 'submitOnEnter'
    },

    submitOnEnter: function (e) {
      var key = e.keyCode || e.which;

      if (key === 13) {
        e.preventDefault();
        this.submit();
      }
    },

    submit: function (event){
      if(event){
        event.preventDefault();
      }
      // elements and values
      var $usernameField = $('#username');
      var $passwordField = $('#password');
      var $passwordConfirmField = $('#passwordConfirm');
      var username = $usernameField.val();
      var password = $passwordField.val();
      var passwordConfirm = $passwordConfirmField.val();

      // Check if the inputs aren't empty
      var errorMessage = this.model.preValidate({
        'username': username,
        'password': password
      });
      if(errorMessage){
        _.each(errorMessage, function(value, key){
          $('#'+key).attr('placeholder', value);
        });
      } else {
        $('.submit').addClass('disabled');
        // TODO: change submit button to spinner
        this.model.signUp(username, password).done(this.onSignUp).fail(this.onSignUpFail);
      }
    },

    onSignUp: function (user){
      console.log("onSignUp: ",user);
      if(this.model.attributes.continueAfterSignIn){
        app.router.navigate(app.router.routeAfterSignIn, {trigger: true});
      } else {
        app.router.navigate('', {trigger: true});
      }
    },

    onSignUpFail: function (user){
      console.log("onSignUpFail: ",user);
      $('.submit').removeClass('disabled');
      $('.warning').text('There was an error creating your account.');
      $('#password').val('');
      $('#username').focus().select();
    }

  });

  return view;

});
