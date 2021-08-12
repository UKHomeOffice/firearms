'use strict';

module.exports = {
  'museum-details': [
    'name',
    {
      step: '/exhibit-add-another-address',
      field: 'exhibit-addresses',
      parse: value => value.map(a => a.address).join('\n')
    },
    'reference-number'
  ],
  'contact-details': [
    'contact-name',
    'contact-email',
    'contact-phone',
    {
      step: '/contact-address',
      field: 'contact-address',
      useOriginalValue: true
    }
  ]
};
