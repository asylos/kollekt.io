//
// # views.question
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/signin',
  'validation'
],

function (app, Marionette, template) {

  'use strict';

  var view = Marionette.ItemView.extend({
    className: 'signinView paddedContainer light',
    template : template,
    initialize: function() {
      Backbone.Validation.bind(this);
      _.bindAll(this, 'onSignIn', 'onSignInFail');
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
      var username = $usernameField.val();
      var password = $passwordField.val();

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
        this.model.signIn(username, password).done(this.onSignIn).fail(this.onSignInFail);
      }
    },

    onSignIn: function (user){
      console.log("onSignIn: ",user);
      if(this.model.attributes.continueAfterSignIn){
        app.router.navigate(app.router.routeAfterSignIn, {trigger: true});
      } else {
        app.router.navigate('', {trigger: true});
      }
    },

    onSignInFail: function (user){
      console.log("onSignInFail: ",user);
      $('.submit').removeClass('disabled');
      $('.warning').text('Username and/or password are wrong.');
      $('#password').val('');
      $('#username').focus().select();
    }

  });

  return view;

});
