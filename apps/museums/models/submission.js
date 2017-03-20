'use strict';

module.exports = data => {
  const response = {};

  response.AuthorityType = 'Dealer';
  response.ApplicationType = data.activity === 'new' ? 'Initial application' : 'Renewal';

  if (data.activity === 'renew') {
    response['Cusomter.CustomerReference'] = data['reference-number'];
    response.ExistingAuthorityReference = data['authority-number'];
  }

  return response;
};

