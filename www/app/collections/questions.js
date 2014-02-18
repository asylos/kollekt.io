define([
  'helpers/mvc/collection',
  'models/question'
],

function (BaseCollection, Model) {

  'use strict';

  return BaseCollection.extend({
    model: Model
  });

});

