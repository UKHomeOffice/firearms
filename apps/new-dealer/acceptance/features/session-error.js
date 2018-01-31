'use strict';

const baseUrl = require('../../').baseUrl || '';

Feature('Given my session has expired');

Scenario('When I click the start again button Then I am redirected to the first page /activity', (
  I
) => {
  I.amOnPage(`${baseUrl}`);
  I.clearCookie('hod.sid');
  I.refreshPage();
  I.click('a[href="/s5"]');
  I.seeInCurrentUrl(`${baseUrl}/activity`);
});
