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
  ],
  'invoice-contact-details': [
    'invoice-contact-name',
    'invoice-contact-email',
    'invoice-contact-phone',
    {
      step: '/invoice-address-input',
      field: 'invoice-address',
      useOriginalValue: true
    },
    'purchase-order-number'
  ],
  documents: [
    {
      step: '/existing-authority-add-another',
      field: 'existing-authority-documents',
      parse: list => (list) ? list.map(a => a.description).join('\n') : ''
    }
  ]
};
