//
// # main
//
//

require([
  'helpers/namespace',
  'router',
  'models/config',
  'urlify',
  'backbone',
  'hoodie',
  'backboneHoodie'  //is going to be globally available on the backbone object
],

function (app, router, Config, Urlify, Backbone) {

  'use strict';

  require([
    'helpers/handlebars',
    'controllers/layout',
  ]);

  app.on('initialize:before', function() {
    Backbone.connect(); // gives you Backbone.hoodie
  });

  var config = new Config(),
      options = config.toJSON();

  app.reqres.setHandler('config', function () {
    return options;
  });

  app.urlify = Urlify.create({
    spaces: '-',
    nonPrintable: '',
    toLower: true,
    trim: true
  });

  app.start(options);

});

