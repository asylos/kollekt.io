//
//  ## models.answer
//

define([
  'helpers/mvc/model'
],

function (BaseModel) {

  'use strict';

  return BaseModel.extend({
    type: 'answer',

    defaults: {
      title: '',
      belongsToQuestion: '',
      id: '',
      createdAt: '',
      createdBy: '',
      original: '',
      translation: '',
      sourceName: '',
      source: ''
    }

  });

});

