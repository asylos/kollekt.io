//
// # views.question
//

define([
  'helpers/namespace',
  'marionette',
  'hbs!templates/question'
],

function (app, Marionette, template) {

  'use strict';

  return Marionette.ItemView.extend({
    className: 'questionView',
    template : template,
    initialize: function() {
      $(window).on("resize", this.onResize);
      app.vent.on('resize', this.onResize);
      this.onResize();
    },

    onResize: function() {
      if($(window).width() > 800){
        var baseHeight = $(window).height();
        if(app.header.$el){
          baseHeight -= app.header.$el.outerHeight();
        }
        if(app.footer.$el){
          baseHeight -= app.footer.$el.outerHeight();
        }
        $('#content').height(baseHeight);
      }
    },

    remove: function() {
      $(window).off("resize", this.onResize);
      Backbone.View.prototype.remove.apply(this, arguments);
    }
  });

});
