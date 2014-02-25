//
//  ## models.question
//

define([
  'helpers/mvc/model'
],

function (BaseModel) {

  'use strict';

  return BaseModel.extend({
    type: 'question',

    defaults: {
      question: '',
      id: '',
      createdAt: ''
    }

  });

});

