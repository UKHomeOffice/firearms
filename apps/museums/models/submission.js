'use strict';

const _ = require('lodash');

module.exports = data => {
  const response = {};
  const activity = [
    { activity: 'new', response: 'Application' },
    { activity: 'renew', response: 'Renewal' },
    { activity: 'vary', response: 'Vary' }
  ];

  response.AuthorityType = 'Museums';
  response.ApplicationType = data.activity ?
    _.find(activity, { activity: data.activity }).response : 'Renewal';

  if (data.activity === 'renew' || data.activity === 'vary') {
    response['Customer.CustomerReference'] = data['reference-number'];
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
