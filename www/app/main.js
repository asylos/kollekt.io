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
  'models/question',
  'collections/answers',
  'hoodie',
  'backboneHoodie',  //is going to be globally available on the backbone object
  'associate'
],

function (app, router, Config, Urlify, Backbone, Question, Answers) {

  'use strict';

  require([
    'helpers/handlebars',
    'controllers/layout',
  ]);

  app.on('initialize:before', function() {
    Backbone.connect(); // gives you Backbone.hoodie

    Backbone.associate(Question, {
      answers: { type: Answers }
    });

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

