/* eslint-disable */
'use strict';

require('hof/frontend/themes/gov-uk/client-js');

const accessibleAutocomplete = require('accessible-autocomplete');

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.typeahead').forEach((element) => {
    accessibleAutocomplete.enhanceSelectElement({
      defaultValue: '',
      selectElement: element,
    });
  });
});
