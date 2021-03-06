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
      authorName: '',
      original: '',
      translation: '',
      sourceName: '',
      source: '',
      print: false
    }

  });

});

