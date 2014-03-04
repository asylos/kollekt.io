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

  // Load the question controller, then start app
  require(['controllers/question'], function (Controller) {
    Backbone.connect(); // gives you Backbone.hoodie

    Backbone.associate(Question, {
      answers: { type: Answers }
    });
    app.question = new Controller({});
    app.start(options);
  });


});

