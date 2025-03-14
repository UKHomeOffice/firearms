'use strict';

const _ = require('lodash');

module.exports = (data, token) => {
  const response = {};
  const activity = [
    { activity: 'new', response: 'Application' },
    { activity: 'renew', response: 'Renewal' },
    { activity: 'vary', response: 'Vary' }
  ];

  response.AuthorityType = 'Museums';
  response.ApplicationType = data.activity ?
    _.find(activity, { activity: data.activity }).response : 'Renewal';

  response['Customer.Name'] = data.name;
  response.UKStorageAddress = data['exhibit-address'];
  response['Agent.Name'] = data['contact-name'];
  response['Customer.Email'] = data['contact-email'];
  response['Customer.Phone'] = data['contact-phone'];
  response['Customer.Address'] = data['contact-address'];

  response.InvoicingAddress = data['invoice-address'];
  response.ContactFirstName = data['invoice-contact-name'];
  response.ContactEmail = data['invoice-contact-email'];
  response.ContactPhone = data['invoice-contact-phone'];
  response.InvoicingPONumber = data['purchase-order-number'];

  data['existing-authority-documents'] = data['existing-authority-documents'] || [];

  data['existing-authority-documents'].forEach((doc, i) => {
    console.log('********* ', doc);
    const index = i + 2;
    response[`Document${index}.URL`] = `${doc.url.replace('/file', '/vault')}&token=${token.bearer}`;
    response[`Document${index}.Name`] = doc.description;
    response[`Document${index}.MimeType`] = doc.type;
    response[`Document${index}.URLLoadContent`] = true;
  });
  console.log('********* ', response);
  return response;
};
