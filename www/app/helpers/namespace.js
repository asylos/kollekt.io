//
// ## helpers.namespace
//

define([
  'marionette',
  'models/config',
  'models/user'
],

function (Marionette, ConfigModel, UserModel) {

  'use strict';

  var config = new ConfigModel(),
  app = new Marionette.Application();

  app.user = new UserModel();

  if (config.get('debug')) {
    window.app = app;
  }

  return app;

});
