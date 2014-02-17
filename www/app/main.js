//
// # main
//
//

require([
  'helpers/namespace',
  'router',
  'models/config',
  'urlify'
],

function (app, router, Config, Urlify) {

  'use strict';

  require([
    'helpers/handlebars',
    'controllers/layout'
  ]);

  var config = new Config(),
      options = config.toJSON();

  app.reqres.setHandler('config', function () {
    return options;
  });

  app.urlify = Urlify.create({
    spaces: '-',
    toLower: true,
    trim: true
  });

  app.start(options);

});

define([
  'backboneHoodie'  //is going to be globally available on the backbone object
],

function () {
  'use strict';
  Backbone.connect(); // gives you Backbone.hoodie
});
