'use strict';

// create a function that returns the next item of an array every time it is called
const iterate = (arr) => {
  let count = 0;
  return () => {
    const value = arr[count];
    count++;
    return value || arr[arr.length - 1];
  };
};

const values = {
  activity: 'new',
  organisation: 'company',
  'weapons-types': 'fully-automatic',
  'ammunition-types': 'explosive-cartridges',
  'first-authority-holders-nationality-multi': null,
  'contact-holder': 'first',
  'supporting-document-add-another': 'no',
  'stored-on-premises': 'true'
};

Feature('S5 - Edit storage addresses');

Before((I) => {
  I.amOnPage('/s5/activity');
});

Scenario('Selecting "no" to add another address returns to confirm page', (I) => {
  I.completeToStep('/s5/confirm', values);
  I.amOnPage('/s5/storage-add-another-address/edit');
  I.click('input[name="storage-add-another-address"][value="no"]');
  I.click('input[type="submit"]');
  I.seeInCurrentUrl('/s5/confirm');
});

Scenario('Selecting "yes" to add another address takes user to postcode entry page', (I) => {
  I.completeToStep('/s5/confirm', values);
  I.amOnPage('/s5/storage-add-another-address/edit');
  I.click('input[name="storage-add-another-address"][value="yes"]');
  I.click('input[type="submit"]');
  I.seeInCurrentUrl('/s5/storage-postcode/edit');
});

// Scenario('Adding an address in edit mode shows the new address on the confirm page', (I) => {
//   I.completeToStep('/s5/confirm', values);
//   I.amOnPage('/s5/storage-add-another-address/edit');
//   I.click('input[name="storage-add-another-address"][value="yes"]');
//   I.click('input[type="submit"]');
//   I.click('#manual-entry');
//   I.fillField('[name="storage-address-manual"]', 'My newly added address');
//   I.click('input[type="submit"]');
//   I.seeInCurrentUrl('/s5/storage-add-another-address/edit');
//   I.click('input[name="storage-add-another-address"][value="no"]');
//   I.click('input[type="submit"]');
//   I.seeInCurrentUrl('/s5/confirm');
//   I.see('My newly added address');
// });

Scenario('Deleting an address and continuing returns to confirm page', (I) => {
  I.completeToStep('/s5/confirm', values);
  I.amOnPage('/s5/storage-add-another-address/edit');
  I.click('input[name="storage-add-another-address"][value="yes"]');
  I.click('input[type="submit"]');
  I.click('#manual-entry');
  I.fillField('[name="storage-address-manual"]', 'My newly added address');
  I.click('input[type="submit"]');
  I.seeInCurrentUrl('/s5/storage-add-another-address/edit');
  I.click('input[name="storage-add-another-address"][value="no"]');
  I.click('input[type="submit"]');
  I.seeInCurrentUrl('/s5/confirm');
  I.see('My newly added address');
  I.amOnPage('/s5/storage-add-another-address/edit');
  I.see('My newly added address');
  I.click('tr.address-summary:nth-child(2) .button-delete');
  I.seeInCurrentUrl('/s5/storage-add-another-address/edit');
  I.click('input[type="submit"]');
  I.seeInCurrentUrl('/s5/confirm');
  I.dontSee('My newly added address');
});

