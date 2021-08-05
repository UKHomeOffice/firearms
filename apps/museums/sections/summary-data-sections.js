'use strict';

module.exports = {
  'museum-details': [
    'name',
    {
      field: 'exhibit-addresses',
      parse: (value) => value.map(a => a.address).join('\n')
    },
    'reference-number'
  ],
  'contact-details': [
    'contact-name',
    'contact-email',
    'contact-phone',
    'contact-address'
  ]
};
