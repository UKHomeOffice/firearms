import { readFileSync } from 'node:fs';
import { expect } from '@playwright/test';
import { Given, When } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import type { Pages } from '../fixture/fixtures';
import { answerInvoiceContactAddressDetailsAndPurchaseOrder, uploadSupportAndAdditionalDocs } from './far-common.step';

async function answerContactDetails(pages: Pages) {
  await pages.farWhatAreContactDetailsPage.assertPageTitle();
  await pages.farWhatAreContactDetailsPage.answerHoldersContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
}

async function answerSelectAuthTypeOfOrgWhatToHandleAndHowtoObtainTheItems(pages: Pages) {
    const organisation = pages.farS5WhatTypeOfOrgIsTheAuthForPage;
    await organisation.assertPageTitle();
    const type = pages.basePage.data('typeOfOrganisation');
    switch (type) {
      case 'Company': await organisation.answerSelectCompany(type, c.COMPANY_NAME, c.COMPANY_HOUSE_NUMBER); break;
      case 'Sole trader': await organisation.answerSelectSoleTrader(type, c.TRADER_NAME); break;
      case 'Shooting club (section 7(3))': await organisation.answerSelectShootingClub(type, c.SHOOT_CLUB_NAME); break;
      case 'Charity': await organisation.answerSelectOrgCharity(type, c.CHARITY_NAME, c.CHARITY_NUMBER); break;
      case 'Museum': await organisation.answerSelectMuseum(type, c.MUSEUM_NAME); break;
      case 'Other': await organisation.answerSelectOther(type, c.OTHER_ORG_NAME); break;
      default: throw new Error(`Unknown FAR organisation: ${type}`);
    }
    await answerWhatToHandleHowtoObtainTheItems(pages);
  }

async function answerWhatToHandleHowtoObtainTheItems(pages: Pages) {
    await pages.farS5WhatToHandleUnderTheAuthPage.assertPageTitle();
    await pages.farS5WhatToHandleUnderTheAuthPage.answerSelectAllWeapons();
    await pages.farS5HowWillProhibitedItemsBeObtainedPage.assertPageTitle();
    await pages.farS5HowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItems();
    await answerProhibitedItemBeImported(pages);
  }

async function answerProhibitedItemBeImported(pages: Pages) {
    const imported = pages.farS5WillProhibitedBeImportedPage;
    await imported.assertPageTitle();
    if (pages.basePage.isYes(pages.basePage.data('prohibitedItemsBeImported'))) await imported.answerProhibitedItemBeImportedYes();
    else await imported.answerProhibitedItemBeImportedNo();
    await answerWillItemBeStoredInBusPremises(pages);
  }

async function answerWillItemBeStoredInBusPremises(pages: Pages) {
    const storage = pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage;
    await storage.assertPageTitle();
    if (pages.basePage.isYes(pages.basePage.data('willProhibitedItemsBeStoredOnBusinessPremises'))) {
      await storage.answerItemsStoredOnBusPremisesYes();
      await answerWhereWillItemsBeStored(pages);
      await answerAnotherAddressItemsWillBeStored(pages);
    } else await storage.answerItemsStoredOnBusPremisesNo();
    await answerBusActivitiesAndWeaponsComponents(pages);
  }

async function answerWhereWillItemsBeStored(pages: Pages) {
    await pages.farS5WhereWillProhibitedItemsBeStoredPage.assertPageTitle();
    await pages.farS5WhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  }

async function answerAnotherAddressItemsWillBeStored(pages: Pages) {
    const storage = pages.farS5AnotherAddressForStoragePage;
    await storage.assertPageTitle();
    expect(await storage.isStorageAddressAdded()).toBe(true);
    if (pages.basePage.isYes(pages.basePage.data('anotherAddressToStoreProhibitedItems'))) {
      await storage.answerProhibitedInAnotherAddressYes();
      await answerWhereWillItemsBeStored(pages);
    }
    await storage.answerProhibitedInAnotherAddressNo();
  }

async function answerBusActivitiesAndWeaponsComponents(pages: Pages) {
    await pages.farS5WhatBusinessActivitiesToCarryOutPage.assertPageTitle();
    await pages.farS5WhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivities();
    const weapons = pages.farS5WeaponsAndComponentsSectionPage;
    await weapons.assertPageTitle();
    const section = pages.basePage.data('weaponsOrComponentsSections');
    if (section.includes('Unspecified')) {
      await weapons.answerSelectUnspecifiedSection(section.includes('Max Characters 15000') ? readFileSync(c.MAX_TEXT_FILE, 'utf8') : undefined);
    } else if (section.includes('Fully automatic')) await weapons.answerSelectFullyAutomaticSection();
    else if (section.includes('Launchers')) await weapons.answerSelectFullyLaunchersSection();
    else throw new Error(`Unknown FAR weapons section: ${section}`);
    await answerAmmunitionSections(pages);
  }

async function answerAmmunitionSections(pages: Pages) {
    const ammunition = pages.farS5AmmunitionSectionsPage;
    await ammunition.assertPageTitle();
    const section = pages.basePage.data('ammunitionSection');
    if (section.includes('Unspecified')) {
      await ammunition.answerSelectUnspecifiedSections(section.includes('Max Characters 15000') ? readFileSync(c.MAX_TEXT_FILE, 'utf8') : undefined);
    } else if (section.includes('Actual missiles')) await ammunition.answerSelectActualMissiles();
    else if (section.includes('Cartridges')) await ammunition.answerSelectCartridges();
    else throw new Error(`Unknown FAR ammunition section: ${section}`);
    await pages.farS5HowManyIndividualsToBeNamedPage.assertPageTitle();
    const holders = pages.basePage.data('individualNamedOnTheAuthority');
    await pages.farS5HowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder(holders);
    switch (holders) {
      case 'One':
        await answerFullNameOfTheAuthority(pages);
        await answerBirthAndNationalDetails(pages);
        break;
      case 'Two':
        await answerFullNameOfTheFirstAuthority(pages);
        await answerBirthAndNationalDetails(pages);
        await answerFullNameOfTheSecondAuthority(pages);
        await answerBirthAndNationalDetails(pages);
        break;
      default: throw new Error(`Unknown authority holder count: ${holders}`);
    }
  }

async function answerFullNameOfTheAuthority(pages: Pages) {
    await pages.farS5WhatsTheFullNameOfAuthorityHolderPage.assertPageTitle();
    await pages.farS5WhatsTheFullNameOfAuthorityHolderPage.answerEnterNameOfAuthorityHolder(pages.basePage.data('nameOfAuthorityHolder'));
  }

async function answerBirthAndNationalDetails(pages: Pages) {
    await pages.farS5WhatAreBirthDayDetailsPage.assertPageTitle();
    await pages.farS5WhatAreBirthDayDetailsPage.answerDateOfBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
    await pages.farS5WhatIsCountryOfNationalityPage.assertPageTitle();
    await pages.farS5WhatIsCountryOfNationalityPage.answerEnterCountryOfNationality(c.COUNTRY_UK);
    await pages.farS5WhatIsHolderMainBusinessPage.assertPageTitle();
    await pages.farS5WhatIsHolderMainBusinessPage.answerBusinessDetails(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  }

async function answerFullNameOfTheSecondAuthority(pages: Pages) {
    await pages.farS5FullNameOfSecondAuthorityHolderPage.assertPageTitle();
    await pages.farS5FullNameOfSecondAuthorityHolderPage.answerSecondAuthorityHolder(pages.basePage.data('nameOfSecondAuthorityHolder'));
  }

async function answerFullNameOfTheFirstAuthority(pages: Pages) {
    await pages.farS5FullNameOfFirstAuthorityHolderPage.assertPageTitle();
    await pages.farS5FullNameOfFirstAuthorityHolderPage.answerFirstAuthorityHolder(pages.basePage.data('nameOfFirstAuthorityHolder'));
  }

async function answerWhoToContactAbtThisApplication(pages: Pages) {
    const contact = pages.farS5WhoDoWeContactAbtThisApplicationPage;
    await contact.assertPageTitle();
    const name = pages.basePage.data('whoToContactAbtApplication');
    switch (name.toLowerCase()) {
      case 'test': case 'test1':
        await contact.answerContactHolderFirst();
        await answerAddressToContact(pages);
        break;
      case 'test2':
        await contact.answerContactHolderSecond();
        await answerAddressToContact(pages);
        break;
      case 'someone':
        await contact.answerContactSomeoneElse(name);
        await answerContactDetails(pages);
        await answerSecondContactOrSomeOneElseAddress(pages);
        break;
      default: throw new Error(`Unknown FAR application contact: ${name}`);
    }
  }

async function answerSecondContactOrSomeOneElseAddress(pages: Pages) {
    await pages.farS5WhatIsSomeOneElseAddressPage.assertPageTitle();
    await pages.farS5WhatIsSomeOneElseAddressPage.answerSomeoneElseContact(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  }

async function answerAddressToContact(pages: Pages) {
    await answerContactDetails(pages);
    const address = pages.farS5WhichAddressToContactYouPage;
    await address.assertPageTitle();
    const choice = pages.basePage.data('testContactAddress');
    await address.answerSelectAddress(choice);
    if (choice === 'different address') {
      await address.answerSomeoneElseContact(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
    }
  }

async function changeYourAnsForS5(pages: Pages, companyName: string, companyHouseNo: string) {
    await pages.farS5CheckYourAnswersPage.clickToChangeBusinessDetails();
    await pages.farS5WhatTypeOfOrgIsTheAuthForPage.assertPageTitle();
    await pages.farS5WhatTypeOfOrgIsTheAuthForPage.answerSelectCompany('Company', companyName, companyHouseNo);
  }

async function getUpdatedBusDetails(pages: Pages) {
    await pages.farS5CheckYourAnswersPage.assertPageTitle();
    return pages.farS5CheckYourAnswersPage.getUpdatedBusinessDetails();
  }



When('I fill out my answers to the Firearms S5 {string} questionnaire', async ({ pages, page }, journey: string) => {
  await uploadSupportAndAdditionalDocs(pages, journey);
  await answerSelectAuthTypeOfOrgWhatToHandleAndHowtoObtainTheItems(pages);
  await answerWhoToContactAbtThisApplication(pages);
  await answerInvoiceContactAddressDetailsAndPurchaseOrder(pages);
});

Given('I change the company name to {string} and company house number to {string} and continue', async ({ pages, page }, name: string, number: string) => {
  await changeYourAnsForS5(pages, name, number);
});

Given('I check the company details changes {string} and {string} are updated on the Check your answers page', async ({ pages, page }, name: string, number: string) => {
  const details = await getUpdatedBusDetails(pages);
  expect(details['Company name']).toBe(name);
  expect(details['Companies House number']).toBe(number);
});

When('I select the organisation type {string} and click continue', async ({ pages, page }, type: string) => {
  await pages.farS5WhatTypeOfOrgIsTheAuthForPage.answerSelectCompany(type, c.COMPANY_NAME, c.COMPANY_HOUSE_NUMBER);
});

When('I answer how many individual will be named {string} and click continue', async ({ pages, page }, holder: string) => {
  await pages.farS5HowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder(holder);
});

When('I select what will be handled under the authority and click continue', async ({ pages, page }) => {
  await pages.farS5WhatToHandleUnderTheAuthPage.answerSelectAllWeapons();
});

When('I select how the prohibited items will be obtained and click continue', async ({ pages, page }) => {
  await pages.farS5HowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItems();
});

When('I select import prohibited items and click continue', async ({ pages, page }) => {
  await pages.farS5WillProhibitedBeImportedPage.answerProhibitedItemBeImportedNo();
});

When('I answer will prohibited items be stored in business premises and click continue', async ({ pages, page }) => {
  await pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesNo();
});

When('I select what business activities to be carried out and click continue', async ({ pages, page }) => {
  await pages.farS5WhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivities();
});

When('I select weapons sections and click continue', async ({ pages, page }) => {
  await pages.farS5AmmunitionSectionsPage.answerSelectUnspecifiedSections();
});

When('I select ammunition sections and click continue', async ({ pages, page }) => {
  await pages.farS5AmmunitionSectionsPage.answerSelectUnspecifiedSections();
});

When('I enter full name of authority holder and click continue', async ({ pages, page }) => {
  await pages.farS5WhatsTheFullNameOfAuthorityHolderPage.answerEnterNameOfAuthorityHolder(c.FULL_NAME);
});

When('I enter birth details and click continue', async ({ pages, page }) => {
  await pages.farS5WhatAreBirthDayDetailsPage.answerDateOfBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
});

When('I enter country of nationality and click continue', async ({ pages, page }) => {
  await pages.farS5WhatIsCountryOfNationalityPage.answerEnterCountryOfNationality(c.COUNTRY_UK);
});

When('I select who to contact and click continue', async ({ pages, page }) => {
  await pages.farS5WhoDoWeContactAbtThisApplicationPage.answerContactHolderFirst();
});

When('I enter contact email address and click continue', async ({ pages, page }) => {
  await pages.farWhatAreContactDetailsPage.answerHoldersContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
});

When('I select address to use and click continue', async ({ pages, page }) => {
  await pages.farS5WhichAddressToContactYouPage.answerSelectAddress(pages.basePage.data('testContactAddress'));
});