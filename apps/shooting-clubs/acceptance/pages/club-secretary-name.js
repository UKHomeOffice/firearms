'use strict';

let I;

module.exports = {

    _init(){
      I = require('so-acceptance/steps.js')();
    },

    url: 'club-secretary-name',
    'club-secretary-name': '#club-secretary-name',
    content: {
      'name': 'Michael Knight'
    },

    fillFormAndSubmit(){
        I.fillField(this['club-secretary-name'], this.content['name']);
        I.submitForm();
    }
};