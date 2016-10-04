'use strict';

let I;

module.exports =  {

  _init() {
    I = require('so-acceptance/steps.js')();
  },

  url: 'second-authority-holders-nationality',
  'first-nationality-group': '#second-authority-holders-nationality-group',
  'first-nationality': '#second-authority-holders-nationality',
  'multi-nationality': '#second-authority-holders-nationality-multi',
  'second-nationality': '#second-authority-holders-nationality-second',
  'third-nationality': '#second-authority-holders-nationality-third',

  content: {
    header: 'What is Barry Dylan\'s nationality?',
    'nationality-one': 'British',
    'nationality-two': 'American'
  },

  sameValueInFields(fieldOne, fieldTwo) {
    I.click(this['multi-nationality']);
    I.fillField(fieldOne, this.content['nationality-one']);
    I.fillField(fieldTwo, this.content['nationality-one']);
    I.submitForm();
    I.seeErrors(fieldTwo);
  },

  fillFormAndSubmit() {
    I.fillField(this['first-nationality'], this.content['nationality-one']);
    I.submitForm();
  }
};
