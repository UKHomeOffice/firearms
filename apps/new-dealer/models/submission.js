'use strict';
/* eslint complexity: 0 max-statements: 0 */
const contains = (arr, val) => arr.includes(val) ? 'Yes' : 'No';

const authorityType = usage => {
  if (usage.includes('arm-guards')) {
    return 'Maritime Guards';
  }

  // usage can be an array or a string
  if (usage.includes('transport') || usage.includes('transfer')) {
    // check if any other values are selected
    if ([].concat(usage).filter(use => use !== 'transport' && use !== 'transfer').length) {
      return 'Carriers and Dealers';
    }
    return 'Carriers';
  }

  return 'Dealer';
};

module.exports = data => {
  const response = {};

  response.AuthorityType = authorityType(data.usage);

  response.ApplicationType = data.activity === 'new' ? 'Application' : 'Renewal';

  response['Customer.Organisation'] = data[`${data.organisation}-name`];

  if (data.activity === 'renew') {
    response['Customer.CustomerReference'] = data['reference-number'];
    response.ExistingAuthorityReference = data['authority-number'];
  }

  response['Customer.Category'] = data.organisation;
  response['Customer.Name'] = data['first-authority-holders-name'];
  response['Customer.Address'] = data['first-authority-holders-address-manual']
    || data['first-authority-holders-address-lookup'];

  let addressKey;
  let contactKey;
  if (data['contact-holder'] === 'first') {
    addressKey = 'first-authority-holders';
    contactKey = addressKey;
  } else if (data['contact-holder'] === 'second') {
    addressKey = 'second-authority-holders';
    contactKey = addressKey;
  } else if (data['contact-holder'] === 'other') {
    addressKey = 'contact';
    contactKey = 'someone-else';
  }

  response['Agent.Address'] = data[`${addressKey}-address-manual`] || data[`${addressKey}-address-lookup`];

  response['Agent.Name'] = data[`${contactKey}-name`];
  response['Customer.Email'] = data['contact-email'];
  response['Agent.Email'] = data['contact-email'];
  response['Agent.Phone'] = data['contact-phone'];

  if (data['weapons-ammunition'].includes('weapons')) {
    response.AuthorityCoversWeapons = 'Yes';
    if (data['weapons-types'].includes('unspecified')) {
      response.WeaponsUnspecified = 'Yes';
      response.WeaponsUnspecifiedReason = data['weapons-unspecified-details'];
    }

    const types = {
      'fully-automatic': 'WeaponsS1-a',
      'self-loading': 'WeaponsS1-ab',
      'short-pistols': 'WeaponsS1-aba',
      'short-self-loading': 'WeaponsS1-ac',
      'large-revolvers': 'WeaponsS1-ad',
      'rocket-launchers': 'WeaponsS1-ae',
      'air-rifles': 'WeaponsS1-af',
      'fire-noxious-substance': 'WeaponsS1-b',
      'disguised-firearms': 'WeaponsS1A-a',
      'military-use-rockets': 'WeaponsS1A-b',
      'projecting-launchers': 'WeaponsS1A-c'
    };
    Object.keys(types).forEach(key => {
      if (data['weapons-types'].includes(key)) {
        response[types[key]] = 'Yes';
        response[`${types[key]}Quantity`] = data[`${key}-quantity`];
      }
    });
  }

  if (data['weapons-ammunition'].includes('ammunition')) {
    response.AuthorityCoversAmmunition = 'Yes';
    if (data['ammunition-types'].includes('unspecified')) {
      response.AmmunitionUnspecified = 'Yes';
      response.AmmunitionUnspecifiedReason = data['ammunition-unspecified-details'];
    }

    const types = {
      'explosive-cartridges': 'AmmunitionS1-c',
      'incendiary-missile': 'AmmunitionS1A-d',
      'armour-piercing': 'AmmunitionS1A-e',
      'expanding-missile': 'AmmunitionS1A-f',
      'missiles-for-above': 'AmmunitionS1A-g'
    };
    Object.keys(types).forEach(key => {
      if (data['ammunition-types'].includes(key)) {
        response[types[key]] = 'Yes';
        response[`${types[key]}Quantity`] = data[`${key}-quantity`];
      }
    });
  }

  response.AcquiredBuy = contains(data.obtain, 'buy');
  response.AcquiredTemporaryPossession = contains(data.obtain, 'temporary-possession');
  response.AcquiredManufacture = contains(data.obtain, 'manufacture');
  response.AcquiredNoPossesion = contains(data.obtain, 'wont-take-possession');
  response.AcquiredOtherMeans = contains(data.obtain, 'other-means');

  if (data.import === 'yes') {
    response.CountryOfImport = data['import-country'];
  }

  response.ActivitySelling = contains(data.usage, 'sell');
  response.ActivityTransport = contains(data.usage, 'transport');
  response.ActivityTransfer = contains(data.usage, 'transfer');
  response.ActivityArmedGuardsToProtectShips = contains(data.usage, 'arm-guards');
  response.ActivityTrainingAndDemonstration = contains(data.usage, 'training');
  response.ActivityResearchForensicsTesting = contains(data.usage, 'research');
  response.ActivityDeactivation = contains(data.usage, 'deactivation');
  response.ActivityOther = contains(data.usage, 'other');

  data['supporting-documents'] = data['supporting-documents'] || [];

  data['supporting-documents'].forEach((doc, i) => {
    const index = i + 2;
    response[`Document${index}.URL`] = doc.url;
    response[`Document${index}.Name`] = doc.description;
    response[`Document${index}.MimeType`] = doc.type;
    response[`Document${index}.URLLoadContent`] = true;
  });

  return response;
};
