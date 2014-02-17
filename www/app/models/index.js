//
//  ## models.index
//

define([
  'helpers/mvc/model'
],

function (BaseModel) {

  'use strict';

  return BaseModel.extend({
    type: 'question',
    initialize: function(){

    },

    defaults: {
      question: ''
    },

    validation: {
      question: {
        required: true,
        msg: 'You can\'t leave the question empty.'
      }
    }

  });

});
