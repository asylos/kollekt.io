define([
  'backbone'
],

function (Backbone) {

  'use strict';

  return Backbone.Model.extend({

    defaults: {
      username: ''
    },

    setUsername: function(username) {
      this.set({
        username: Backbone.hoodie.account.username
      });
    },

    hasAccount: function() {
      return Backbone.hoodie.account.hasAccount();
    },

    hasAnonymousAccount: function() {
      return Backbone.hoodie.account.hasAnonymousAccount();
    },

    hasValidSession: function() {
      return Backbone.hoodie.account.hasValidSession();
    },

    hasInvalidSession: function() {
      return Backbone.hoodie.account.hasInvalidSession();
    },

    signIn: function(username, password) {
      return Backbone.hoodie.account.signIn(username, password);
    },

    signOut: function() {
      return Backbone.hoodie.account.signOut();
    },

    signUp: function(username, password) {
      return Backbone.hoodie.account.signUp(username, password);
    },

    changePassword: function(currentPwd, newPwd) {
      return Backbone.hoodie.account.changePassword(currentPwd, newPwd);
    },

    changeUsername: function(currentPwd, newUsername) {
      return Backbone.hoodie.account.changeUsername(currentPwd, newUsername);
    },

    resetPassword: function(username) {
      return Backbone.hoodie.account.resetPassword(username);
    },

    destroy: function() {
      if (window.confirm('you sure mate?')) {
        Backbone.hoodie.account.destroy();
      }
    },

    validation: {
      username: {
        required: true,
        msg: 'Username can\'t be empty'
      },
      password: {
        required: true,
        msg: 'Password can\'t be empty'
      }
    }

  });


});
