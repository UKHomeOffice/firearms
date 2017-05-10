'use strict';

module.exports = data => {
  const response = {};

  response.AuthorityType = 'Museums';
  response.ApplicationType = data.activity === 'new' ? 'Application' : 'Renewal';

  if (data.activity === 'renew') {
    response['Cusomter.CustomerReference'] = data['reference-number'];
    response.ExistingAuthorityReference = data['authority-number'];
  }

  response['Customer.Name'] = data.name;
  response.UKStorageAddress = data['exhibit-address'];
  response['Agent.Name'] = data['contact-name'];
  response['Customer.Email'] = data['contact-email'];
  response['Customer.Phone'] = data['contact-phone'];

  response['Customer.Address'] = data['contact-address'];

  return response;
};

