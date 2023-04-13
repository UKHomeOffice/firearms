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

  response['Customer.Name'] = 'Club Name';                // Club Name
  response['Customer.Address'] = 'Club Address';          // Club Address

  response['Agent.Name'] = 'Club Secretary Name';         // Club Secretary Name
  response['Agent.Address'] = 'Club Secretary Address';   // Club Secretary Address
  response['Customer.Email'] = 'Club Secretary Email';    // Club Secretary Email
  response['Customer.Phone'] = 'Club Secretary Phone';    // Club Secretary Phone

  response['SecondaryContact.Name'] = 'Secondary Contact Name';
  response['SecondaryContact.Address'] = 'Secondary Contact Address';
  response['SecondaryContact.Email'] = 'Secondary Contact Email';
  response['SecondaryContact.Phone'] = 'Secondary Contact Phone';



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

  data['existing-authority-documents'] = data['existing-authority-documents'] || [];

  data['existing-authority-documents'].forEach((doc, i) => {
    const index = i + 2;
    response[`Document${index}.URL`] = `${doc.url.replace('/file', '/vault')}&token=${token.bearer}`;
    response[`Document${index}.Name`] = doc.description;
    response[`Document${index}.MimeType`] = doc.type;
    response[`Document${index}.URLLoadContent`] = true;
  });

  return response;
};
