'use strict';
const _ = require('lodash');

module.exports = (data, token) => {
  const response = {};
  const activity = [
    { activity: 'new', response: 'Application' },
    { activity: 'renew', response: 'Renewal' },
    { activity: 'vary', response: 'Vary' }
  ];

  response.AuthorityType = 'Shooting clubs';

  if (data.activity) {
    response.ApplicationType = _.find(activity, { activity: data.activity }).response;
  } else {
    response.ApplicationType = 'Renewal';
  }

  response['Customer.Name'] = data['club-name'];
  response['Customer.Address'] = data['club-address'];

  response['Agent.Name'] = data['club-secretary-name'];
  response['Agent.Address'] = data['club-secretary-address'];

  response['Customer.Email'] = data['club-secretary-email'];
  response['Customer.Phone'] = data['club-secretary-phone'];

  response['SecondaryContact.Name'] = data['second-contact-name'];
  response['SecondaryContact.Address'] = data['second-contact-address'];
  response['SecondaryContact.Email'] = data['second-contact-email'];
  response['SecondaryContact.Phone'] = data['second-contact-phone'];

  data['location-addresses'].forEach((address, i) => {
    const index = i + 1;
    response[`ShootingRange${index}.Address`] = address.address;
    if (Array.isArray(address['address-category'])) {
      response[`ShootingRange${index}.Firearms`] = address['address-category'].join(', ');
    } else {
      response[`ShootingRange${index}.Firearms`] = address['address-category'];
    }
  });

  response.InvoicingAddress = data['invoice-address'];
  response.ContactFirstName = data['invoice-contact-name'];
  response.ContactEmail = data['invoice-contact-email'];
  response.ContactPhone = data['invoice-contact-phone'];
  response.InvoicingPONumber = data['purchase-order-number'];

  data['supporting-documents'] = data['supporting-documents'] || [];
  data['existing-authority-documents'] = data['existing-authority-documents'] || [];

  data['supporting-documents'] = data['supporting-documents']
    .concat(data['existing-authority-documents']);

  data['supporting-documents'].forEach((doc, i) => {
    const index = i + 2;
    response[`Document${index}.URL`] = `${doc.url.replace('/file', '/vault')}?token=${token.bearer}`;
    response[`Document${index}.Name`] = doc.description;
    response[`Document${index}.MimeType`] = doc.type;
    response[`Document${index}.URLLoadContent`] = true;
  });

  return response;
};
