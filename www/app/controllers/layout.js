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
          centered: "#centered",
          content: '#content',
          overview: '#overview',
          details: '#details',
          footer: '#footer'
        });

        if ('ontouchstart' in document) {
          $('body').removeClass('no-touch');
        }

        $(window).on("resize", this.onResize);

      },

      onResize: function() {
        app.vent.trigger('resize');
      },

      remove: function() {
        $(window).off("resize", this.onResize);
        Backbone.View.prototype.remove.apply(this, arguments);
      }
    });

    app.layout = new Controller();

  });

});

