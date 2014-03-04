//
// # views.questionHeader
//

define([
  'helpers/namespace',
  'marionette'
],

function (app, Marionette) {

  'use strict';

  var view = Marionette.ItemView.extend({
    onShow: function(){
      app.vent.trigger('resize');
    }
  });

  return view;

});
