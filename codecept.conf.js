'use strict';

const path = require('path');

const pagesPath = page => path.resolve(__dirname,
  `./apps/new-dealer/acceptance/pages/${page}`);

module.exports = {
  name: 'firearms',
  features: './**/acceptance/features/**/*.js',
  include: {
    companyNamePage: pagesPath('company-name.js'),
    handlePage: pagesPath('handle.js'),
    obtainPage: pagesPath('obtain.js'),
    storagePage: pagesPath('storage.js'),
    usagePage: pagesPath('usage.js'),
    supportingDocsPage: pagesPath('supporting-docs.js'),
    weaponsPage: pagesPath('weapons.js'),
    ammunitionsPage: pagesPath('ammunition.js'),
    authorityHoldersPage: pagesPath('authority-holders.js'),
    firstAuthorityHoldersNamePage: pagesPath('first-authority-holders-name.js'),
    firstAuthorityHoldersBirthPage: pagesPath('first-authority-holders-birth.js'),
    firstAuthorityHoldersNationalityPage: pagesPath('first-authority-holders-nationality.js'),
    firstAuthorityHoldersAddressPage: pagesPath('first-authority-holders-address.js'),
    secondAuthorityHoldersNamePage: pagesPath('second-authority-holders-name.js'),
    secondAuthorityHoldersBirthPage: pagesPath('second-authority-holders-birth.js'),
    secondAuthorityHoldersNationalityPage: pagesPath('second-authority-holders-nationality.js'),
    secondAuthorityHoldersAddressPage: pagesPath('second-authority-holders-address.js'),
    storageWeaponsAndAmmoPage: pagesPath('storage-weapons-ammo.js'),
    storageAddressPage: pagesPath('storage-address.js'),
    storageAnotherAddressPage: pagesPath('storage-add-another-address.js'),
    contactPage: pagesPath('contact.js'),
    contactDetailsPage: pagesPath('contact-details.js')
  }
};
