import { readFileSync } from 'node:fs';
import { expect } from '@playwright/test';
import { Given, When } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export function selectS5Scenario(description: string, context = 'journey'): Record<string, string> {
  if (context !== 'journey') {
    throw new Error(`Unsupported FAR data context: FARS5/${context}`);
  }
  switch (description) {
    case "Apply for a new authority":
      return {
        whatYouWantToDo: "Apply for a new authority",
        uploadAdditionalExistingDoc: "N/A",
        uploadAdditionalDoc: "No",
        typeOfOrganisation: "Company",
        prohibitedItemsBeImported: "Yes",
        willProhibitedItemsBeStoredOnBusinessPremises: "Yes",
        anotherAddressToStoreProhibitedItems: "Yes",
        weaponsOrComponentsSections: "Unspecified sections and quantities, Text input",
        ammunitionSection: "Unspecified sections and quantities, Text input",
        individualNamedOnTheAuthority: "One",
        nameOfFirstAuthorityHolder: "N/A",
        nameOfAuthorityHolder: "Test",
        nameOfSecondAuthorityHolder: "N/A",
        whoToContactAbtApplication: "Test",
        testContactAddress: "address already provided",
        purchaseOrder: "Yes",
      };
    case "Renew existing authority":
      return {
        whatYouWantToDo: "Renew an existing authority",
        uploadAdditionalExistingDoc: "No",
        uploadAdditionalDoc: "No",
        typeOfOrganisation: "Charity",
        prohibitedItemsBeImported: "No",
        willProhibitedItemsBeStoredOnBusinessPremises: "No",
        anotherAddressToStoreProhibitedItems: "N/A",
        weaponsOrComponentsSections: "Fully automatic or burst-fire weapons - Section 5(1)(a), Text input",
        ammunitionSection: "Actual missiles (projectiles) for all the above ammunition - Section 5(1A)(g), Text input",
        individualNamedOnTheAuthority: "One",
        nameOfFirstAuthorityHolder: "N/A",
        nameOfAuthorityHolder: "Test",
        nameOfSecondAuthorityHolder: "N/A",
        whoToContactAbtApplication: "Test",
        testContactAddress: "address already provided",
        purchaseOrder: "No",
      };
    case "Renew existing authority - additional Supporting doc - Yes":
      return {
        whatYouWantToDo: "Renew an existing authority",
        uploadAdditionalExistingDoc: "Yes",
        uploadAdditionalDoc: "Yes",
        typeOfOrganisation: "Museum",
        prohibitedItemsBeImported: "Yes",
        willProhibitedItemsBeStoredOnBusinessPremises: "Yes",
        anotherAddressToStoreProhibitedItems: "Yes",
        weaponsOrComponentsSections: "Unspecified sections and quantities, Text input",
        ammunitionSection: "Unspecified sections and quantities, Text input",
        individualNamedOnTheAuthority: "One",
        nameOfFirstAuthorityHolder: "N/A",
        nameOfAuthorityHolder: "Test",
        nameOfSecondAuthorityHolder: "N/A",
        whoToContactAbtApplication: "Someone",
        testContactAddress: "address already provided",
        purchaseOrder: "Yes",
      };
    case "Amend existing authority":
      return {
        whatYouWantToDo: "Amend an existing authority",
        uploadAdditionalExistingDoc: "No",
        uploadAdditionalDoc: "No",
        typeOfOrganisation: "Other",
        prohibitedItemsBeImported: "Yes",
        willProhibitedItemsBeStoredOnBusinessPremises: "No",
        anotherAddressToStoreProhibitedItems: "Yes",
        weaponsOrComponentsSections: "Launchers or projecting apparatus for use with the rockets or ammunition detailed above - Section 5(1A)(c), Text input",
        ammunitionSection: "Cartridges designed to explode, noxious ammunition, grenades, bombs or rockets fired from firearms - Section 5(1)(c)\r\nText input-Maximum quantity (leave blank if unspecified)",
        individualNamedOnTheAuthority: "Two",
        nameOfFirstAuthorityHolder: "Test1",
        nameOfAuthorityHolder: "Test1",
        nameOfSecondAuthorityHolder: "Test2",
        whoToContactAbtApplication: "Test2",
        testContactAddress: "different address",
        purchaseOrder: "Yes",
      };
    case "Amend existing authority - additional Supporting doc - Yes":
      return {
        whatYouWantToDo: "Amend an existing authority",
        uploadAdditionalExistingDoc: "Yes",
        uploadAdditionalDoc: "Yes",
        typeOfOrganisation: "Shooting club (section 7(3))",
        prohibitedItemsBeImported: "Yes",
        willProhibitedItemsBeStoredOnBusinessPremises: "Yes",
        anotherAddressToStoreProhibitedItems: "Yes",
        weaponsOrComponentsSections: "Launchers or projecting apparatus for use with the rockets or ammunition detailed above - Section 5(1A)(c), Text input",
        ammunitionSection: "Cartridges designed to explode, noxious ammunition, grenades, bombs or rockets fired from firearms - Section 5(1)(c)",
        individualNamedOnTheAuthority: "Two",
        nameOfFirstAuthorityHolder: "Test1",
        nameOfAuthorityHolder: "Test1",
        nameOfSecondAuthorityHolder: "Test2",
        whoToContactAbtApplication: "Test2",
        testContactAddress: "different address",
        purchaseOrder: "Yes",
      };
    case "Max character":
      return {
        whatYouWantToDo: "Apply for a new authority",
        uploadAdditionalExistingDoc: "N/A",
        uploadAdditionalDoc: "No",
        typeOfOrganisation: "Sole trader",
        prohibitedItemsBeImported: "No",
        willProhibitedItemsBeStoredOnBusinessPremises: "Yes",
        anotherAddressToStoreProhibitedItems: "No",
        weaponsOrComponentsSections: "Unspecified sections and quantities, Max Characters 15000",
        ammunitionSection: "Unspecified sections and quantities, Text input - Explain why you can't specify the section and quantities of prohibited items being handled, Max Characters 15000",
        individualNamedOnTheAuthority: "One",
        nameOfFirstAuthorityHolder: "N/A",
        nameOfAuthorityHolder: "Test",
        nameOfSecondAuthorityHolder: "N/A",
        whoToContactAbtApplication: "Test",
        testContactAddress: "address already provided",
        purchaseOrder: "No",
      };
    default:
      throw new Error(`Unknown FAR scenario description: FARS5/${context}/${JSON.stringify(description)}`);
  }
}

When('I fill out my answers to the Firearms S5 {string} questionnaire pertaining to {string}', async ({ pages }, journey: string, scenario: string) => {
  pages.basePage.assertScenario('FARS5', scenario);
  if (pages.basePage.data('whatYouWantToDo') !== 'Apply for a new authority') {
    if (journey === 'New Dealer') {
      await pages.farS5UploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
    } else {
      await pages.farShootClubUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
    }
    await pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle();
    if (pages.basePage.isYes(pages.basePage.data('uploadAdditionalDoc'))) {
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      if (journey === 'New Dealer' && pages.basePage.data('whatYouWantToDo') !== 'Apply for a new authority') {
        await pages.farS5UploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      }
      if (journey === 'Shooting Clubs') {
        await pages.farShootClubUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      }
    }
    await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
  }
  const organisation = pages.farS5WhatTypeOfOrgIsTheAuthForPage;
  await organisation.assertPageTitle();
  const typeOfOrganisation = pages.basePage.data('typeOfOrganisation');

  switch (typeOfOrganisation) {
    case 'Company': await organisation.answerSelectCompany(typeOfOrganisation, c.COMPANY_NAME, c.COMPANY_HOUSE_NUMBER); break;
    case 'Sole trader': await organisation.answerSelectSoleTrader(typeOfOrganisation, c.TRADER_NAME); break;
    case 'Shooting club (section 7(3))': await organisation.answerSelectShootingClub(typeOfOrganisation, c.SHOOT_CLUB_NAME); break;
    case 'Charity': await organisation.answerSelectOrgCharity(typeOfOrganisation, c.CHARITY_NAME, c.CHARITY_NUMBER); break;
    case 'Museum': await organisation.answerSelectMuseum(typeOfOrganisation, c.MUSEUM_NAME); break;
    case 'Other': await organisation.answerSelectOther(typeOfOrganisation, c.OTHER_ORG_NAME); break;
    default: throw new Error(`Unknown FAR organisation: ${typeOfOrganisation}`);
  }
  await pages.farS5WhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
  await pages.farS5HowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
  const imported = pages.farS5WillProhibitedBeImportedPage;
  await imported.assertPageTitle();
  if (pages.basePage.isYes(pages.basePage.data('prohibitedItemsBeImported'))) {
    await imported.answerProhibitedItemBeImportedYes();
  } else {
    await imported.answerProhibitedItemBeImportedNo();
  }

  const storage = pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage;
  await storage.assertPageTitle();
  if (pages.basePage.isYes(pages.basePage.data('willProhibitedItemsBeStoredOnBusinessPremises'))) {
    await storage.answerItemsStoredOnBusPremisesYes();
    await pages.farS5WhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
    await pages.farS5AnotherAddressForStoragePage.assertPageTitle();
    expect(await pages.farS5AnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
    if (pages.basePage.isYes(pages.basePage.data('anotherAddressToStoreProhibitedItems'))) {
      await pages.farS5AnotherAddressForStoragePage.answerProhibitedInAnotherAddressYes();
      await pages.farS5WhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
    }
    await pages.farS5AnotherAddressForStoragePage.answerProhibitedInAnotherAddressNo();
  } else {
    await storage.answerItemsStoredOnBusPremisesNo();
  }

  await pages.farS5WhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
  await pages.farS5WeaponsAndComponentsSectionPage.assertPageTitle();

  const weaponsOrComponentsSections = pages.basePage.data('weaponsOrComponentsSections');
  if (weaponsOrComponentsSections.includes('Unspecified')) {
    await pages.farS5WeaponsAndComponentsSectionPage.answerSelectUnspecifiedSection(weaponsOrComponentsSections.includes('Max Characters 15000') ? readFileSync(c.MAX_TEXT_FILE, 'utf8') : undefined);
  } else if (weaponsOrComponentsSections.includes('Fully automatic')) {
    await pages.farS5WeaponsAndComponentsSectionPage.answerSelectFullyAutomaticSection();
  } else if (weaponsOrComponentsSections.includes('Launchers')) {
    await pages.farS5WeaponsAndComponentsSectionPage.answerSelectFullyLaunchersSection();
  }
  else {
    throw new Error(`Unknown FAR weapons section: ${weaponsOrComponentsSections}`);
  }

  await pages.farS5AmmunitionSectionsPage.assertPageTitle();
  const ammunitionSection = pages.basePage.data('ammunitionSection');
  if (ammunitionSection.includes('Unspecified')) {
    await pages.farS5AmmunitionSectionsPage.answerSelectUnspecifiedSections(ammunitionSection.includes('Max Characters 15000') ? readFileSync(c.MAX_TEXT_FILE, 'utf8') : undefined);
  } else if (ammunitionSection.includes('Actual missiles')) {
    await pages.farS5AmmunitionSectionsPage.answerSelectActualMissiles();
  } else if (ammunitionSection.includes('Cartridges')) {
    await pages.farS5AmmunitionSectionsPage.answerSelectCartridges();
  } else {
    throw new Error(`Unknown FAR ammunition section: ${ammunitionSection}`);
  }

  await pages.farS5HowManyIndividualsToBeNamedPage.assertPageTitle();
  const holders = pages.basePage.data('individualNamedOnTheAuthority');
  await pages.farS5HowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder(holders);
  switch (holders) {
    case 'One':
      await pages.farS5WhatsTheFullNameOfAuthorityHolderPage.answerFullNameOfTheAuthority(pages.basePage.data('nameOfAuthorityHolder'));
      await pages.farS5WhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farS5WhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farS5WhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      break;
    case 'Two':
      await pages.farS5FullNameOfFirstAuthorityHolderPage.answerFirstAuthorityHolderWithTitleCheck(pages.basePage.data('nameOfFirstAuthorityHolder'));
      await pages.farS5WhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farS5WhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farS5WhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farS5FullNameOfSecondAuthorityHolderPage.answerSecondAuthorityHolderWithTitleCheck(pages.basePage.data('nameOfSecondAuthorityHolder'));
      await pages.farS5WhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farS5WhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farS5WhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      break;
    default: throw new Error(`Unknown authority holder count: ${holders}`);
  }

  await pages.farS5WhoDoWeContactAbtThisApplicationPage.assertPageTitle();
  const whoToContactAboutApplication = pages.basePage.data('whoToContactAbtApplication');
  switch (whoToContactAboutApplication.toLowerCase()) {
    case 'test': case 'test1':
      await pages.farS5WhoDoWeContactAbtThisApplicationPage.answerContactHolderFirst();
      await pages.farWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.farS5WhichAddressToContactYouPage.answerSelectAddressWithTitleCheck(pages.basePage.data('testContactAddress'));
      if (pages.basePage.data('testContactAddress') === 'different address') {
        await pages.farS5WhichAddressToContactYouPage.answerSomeoneElseContact(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      }
      break;
    case 'test2':
      await pages.farS5WhoDoWeContactAbtThisApplicationPage.answerContactHolderSecond();
      await pages.farWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.farS5WhichAddressToContactYouPage.answerSelectAddressWithTitleCheck(pages.basePage.data('testContactAddress'));
      if (pages.basePage.data('testContactAddress') === 'different address') {
        await pages.farS5WhichAddressToContactYouPage.answerSomeoneElseContact(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      }
      break;
    case 'someone':
      await pages.farS5WhoDoWeContactAbtThisApplicationPage.answerContactSomeoneElse(whoToContactAboutApplication);
      await pages.farWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.farS5WhatIsSomeOneElseAddressPage.answerSomeoneElseContactWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      break;
    default: throw new Error(`Unknown FAR application contact: ${whoToContactAboutApplication}`);
  }
  await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
  await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  await pages.farDoYouHavePurchaseOrderPage.assertPageTitle();
  if (pages.basePage.isYes(pages.basePage.data('purchaseOrder'))) await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
  else await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
});

Given('I change the company name to {string} and company house number to {string} and continue', async ({ pages, page }, companyName: string, companyHouseNo: string) => {
  await pages.farS5CheckYourAnswersPage.clickToChangeBusinessDetails();
  await pages.farS5WhatTypeOfOrgIsTheAuthForPage.answerSelectCompanyWithTitleCheck('Company', companyName, companyHouseNo);
});

Given('I check the company details changes {string} and {string} are updated on the Check your answers page', async ({ pages, page }, name: string, number: string) => {
  await pages.farS5CheckYourAnswersPage.assertPageTitle();
  const details = await pages.farS5CheckYourAnswersPage.getUpdatedBusinessDetails();
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