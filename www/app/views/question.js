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
      this.listenTo(app.vent, 'resize', this.onResize, this);
      this.onResize();
    },

    onResize: function() {
      var baseHeight = $(window).height();
      if(app.header.$el){
        baseHeight -= app.header.$el.outerHeight();
      }
      if(app.footer.$el){
        baseHeight -= app.footer.$el.find('.overview').outerHeight();
      }
      $('#overview').height(baseHeight);
    }
  });

});
