//
// ## controllers.layout
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/layout'
],

function (app, Marionette, appLayoutTmpl) {

  "use strict";

  app.addInitializer(function() {

    var Controller = Marionette.Controller.extend({

      initialize: function (options) {

        var Layout, container, layout;

        //
        // create layouts and regions
        //
        Layout = Marionette.Layout.extend({
          template: appLayoutTmpl
        });

        container = new Backbone.Marionette.Region({
          el: ".container"
        });

        layout = new Layout();
        container.show(layout);

        app.addRegions({
          header: "header",
          content: '#content'
        });

      }
    });

    app.layout = new Controller();

  });

});

