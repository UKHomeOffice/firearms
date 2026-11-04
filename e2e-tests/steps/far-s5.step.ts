import { readFileSync } from 'node:fs';
import { expect } from '@playwright/test';
import { Given, When, type Pages } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

async function startS5Questionnaire(pages: Pages): Promise<void> {
  await pages.farChooseAJourneyHomePage.chooseJourneyWithTitleCheck('New Dealer');
  await pages.farPrivacyNoticePage.continueWithTitleCheck();
  await pages.farBeforeYouStartPage.clickContinueBtnWithTitleCheck();
  await pages.farWhatDoYouWantToDoPage.assertPageTitle();
}

export async function completeS5Questionnaire(pages: Pages, scenario: string, dataOnly = false, context = 'journey'): Promise<void> {
  if (context !== 'journey') {
    throw new Error(`Unsupported FAR data context: FARS5/${context}`);
  }
  switch (scenario) {
    case "Apply for a new authority": {
      const answers = {
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
      pages.basePage.applicant = answers;
      if (dataOnly) return;
      await startS5Questionnaire(pages);
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo(answers.whatYouWantToDo);
      await pages.farS5UploadSupportingDocsPage.uploadSupportingFileWithTitleCheck(c.UPLOAD_FILE);
      await pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle();
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farS5WhatTypeOfOrgIsTheAuthForPage.assertPageTitle();
      await pages.farS5WhatTypeOfOrgIsTheAuthForPage.answerSelectCompany(answers.typeOfOrganisation, c.COMPANY_NAME, c.COMPANY_HOUSE_NUMBER);
      await pages.farS5WhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.farS5HowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.farS5WillProhibitedBeImportedPage.assertPageTitle();
      await pages.farS5WillProhibitedBeImportedPage.answerProhibitedItemBeImportedYes();
      await pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle();
      await pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesYes();
      await pages.farS5WhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farS5AnotherAddressForStoragePage.assertPageTitle();
      expect(await pages.farS5AnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farS5AnotherAddressForStoragePage.answerProhibitedInAnotherAddressYes();
      await pages.farS5WhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farS5AnotherAddressForStoragePage.answerProhibitedInAnotherAddressNo();
      await pages.farS5WhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.farS5WeaponsAndComponentsSectionPage.assertPageTitle();
      await pages.farS5WeaponsAndComponentsSectionPage.answerSelectUnspecifiedSection(undefined);
      await pages.farS5AmmunitionSectionsPage.assertPageTitle();
      await pages.farS5AmmunitionSectionsPage.answerSelectUnspecifiedSections(undefined);
      await pages.farS5HowManyIndividualsToBeNamedPage.assertPageTitle();
      await pages.farS5HowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder(answers.individualNamedOnTheAuthority);
      await pages.farS5WhatsTheFullNameOfAuthorityHolderPage.answerFullNameOfTheAuthority(answers.nameOfAuthorityHolder);
      await pages.farS5WhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farS5WhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farS5WhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farS5WhoDoWeContactAbtThisApplicationPage.assertPageTitle();
      await pages.farS5WhoDoWeContactAbtThisApplicationPage.answerContactHolderFirst();
      await pages.farWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.farS5WhichAddressToContactYouPage.answerSelectAddressWithTitleCheck(answers.testContactAddress);
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle();
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Renew existing authority": {
      const answers = {
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
      pages.basePage.applicant = answers;
      if (dataOnly) return;
      await startS5Questionnaire(pages);
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo(answers.whatYouWantToDo);
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.assertPageTitle();
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farS5UploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle();
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farS5WhatTypeOfOrgIsTheAuthForPage.assertPageTitle();
      await pages.farS5WhatTypeOfOrgIsTheAuthForPage.answerSelectOrgCharity(answers.typeOfOrganisation, c.CHARITY_NAME, c.CHARITY_NUMBER);
      await pages.farS5WhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.farS5HowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.farS5WillProhibitedBeImportedPage.assertPageTitle();
      await pages.farS5WillProhibitedBeImportedPage.answerProhibitedItemBeImportedNo();
      await pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle();
      await pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesNo();
      await pages.farS5WhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.farS5WeaponsAndComponentsSectionPage.assertPageTitle();
      await pages.farS5WeaponsAndComponentsSectionPage.answerSelectFullyAutomaticSection();
      await pages.farS5AmmunitionSectionsPage.assertPageTitle();
      await pages.farS5AmmunitionSectionsPage.answerSelectActualMissiles();
      await pages.farS5HowManyIndividualsToBeNamedPage.assertPageTitle();
      await pages.farS5HowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder(answers.individualNamedOnTheAuthority);
      await pages.farS5WhatsTheFullNameOfAuthorityHolderPage.answerFullNameOfTheAuthority(answers.nameOfAuthorityHolder);
      await pages.farS5WhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farS5WhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farS5WhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farS5WhoDoWeContactAbtThisApplicationPage.assertPageTitle();
      await pages.farS5WhoDoWeContactAbtThisApplicationPage.answerContactHolderFirst();
      await pages.farWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.farS5WhichAddressToContactYouPage.answerSelectAddressWithTitleCheck(answers.testContactAddress);
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle();
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
      break;
    }
    case "Renew existing authority - additional Supporting doc - Yes": {
      const answers = {
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
      pages.basePage.applicant = answers;
      if (dataOnly) return;
      await startS5Questionnaire(pages);
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo(answers.whatYouWantToDo);
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.assertPageTitle();
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farS5UploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle();
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.farS5UploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farS5WhatTypeOfOrgIsTheAuthForPage.assertPageTitle();
      await pages.farS5WhatTypeOfOrgIsTheAuthForPage.answerSelectMuseum(answers.typeOfOrganisation, c.MUSEUM_NAME);
      await pages.farS5WhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.farS5HowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.farS5WillProhibitedBeImportedPage.assertPageTitle();
      await pages.farS5WillProhibitedBeImportedPage.answerProhibitedItemBeImportedYes();
      await pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle();
      await pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesYes();
      await pages.farS5WhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farS5AnotherAddressForStoragePage.assertPageTitle();
      expect(await pages.farS5AnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farS5AnotherAddressForStoragePage.answerProhibitedInAnotherAddressYes();
      await pages.farS5WhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farS5AnotherAddressForStoragePage.answerProhibitedInAnotherAddressNo();
      await pages.farS5WhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.farS5WeaponsAndComponentsSectionPage.assertPageTitle();
      await pages.farS5WeaponsAndComponentsSectionPage.answerSelectUnspecifiedSection(undefined);
      await pages.farS5AmmunitionSectionsPage.assertPageTitle();
      await pages.farS5AmmunitionSectionsPage.answerSelectUnspecifiedSections(undefined);
      await pages.farS5HowManyIndividualsToBeNamedPage.assertPageTitle();
      await pages.farS5HowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder(answers.individualNamedOnTheAuthority);
      await pages.farS5WhatsTheFullNameOfAuthorityHolderPage.answerFullNameOfTheAuthority(answers.nameOfAuthorityHolder);
      await pages.farS5WhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farS5WhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farS5WhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farS5WhoDoWeContactAbtThisApplicationPage.assertPageTitle();
      await pages.farS5WhoDoWeContactAbtThisApplicationPage.answerContactSomeoneElse(answers.whoToContactAbtApplication);
      await pages.farWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.farS5WhatIsSomeOneElseAddressPage.answerSomeoneElseContactWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle();
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Amend existing authority": {
      const answers = {
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
      pages.basePage.applicant = answers;
      if (dataOnly) return;
      await startS5Questionnaire(pages);
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo(answers.whatYouWantToDo);
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.assertPageTitle();
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farS5UploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle();
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farS5WhatTypeOfOrgIsTheAuthForPage.assertPageTitle();
      await pages.farS5WhatTypeOfOrgIsTheAuthForPage.answerSelectOther(answers.typeOfOrganisation, c.OTHER_ORG_NAME);
      await pages.farS5WhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.farS5HowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.farS5WillProhibitedBeImportedPage.assertPageTitle();
      await pages.farS5WillProhibitedBeImportedPage.answerProhibitedItemBeImportedYes();
      await pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle();
      await pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesNo();
      await pages.farS5WhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.farS5WeaponsAndComponentsSectionPage.assertPageTitle();
      await pages.farS5WeaponsAndComponentsSectionPage.answerSelectFullyLaunchersSection();
      await pages.farS5AmmunitionSectionsPage.assertPageTitle();
      await pages.farS5AmmunitionSectionsPage.answerSelectCartridges();
      await pages.farS5HowManyIndividualsToBeNamedPage.assertPageTitle();
      await pages.farS5HowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder(answers.individualNamedOnTheAuthority);
      await pages.farS5FullNameOfFirstAuthorityHolderPage.answerFirstAuthorityHolderWithTitleCheck(answers.nameOfFirstAuthorityHolder);
      await pages.farS5WhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farS5WhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farS5WhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farS5FullNameOfSecondAuthorityHolderPage.answerSecondAuthorityHolderWithTitleCheck(answers.nameOfSecondAuthorityHolder);
      await pages.farS5WhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farS5WhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farS5WhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farS5WhoDoWeContactAbtThisApplicationPage.assertPageTitle();
      await pages.farS5WhoDoWeContactAbtThisApplicationPage.answerContactHolderSecond();
      await pages.farWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.farS5WhichAddressToContactYouPage.answerSelectAddressWithTitleCheck(answers.testContactAddress);
      await pages.farS5WhichAddressToContactYouPage.answerSomeoneElseContact(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle();
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Amend existing authority - additional Supporting doc - Yes": {
      const answers = {
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
      pages.basePage.applicant = answers;
      if (dataOnly) return;
      await startS5Questionnaire(pages);
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo(answers.whatYouWantToDo);
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.assertPageTitle();
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farS5UploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle();
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.farS5UploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farS5WhatTypeOfOrgIsTheAuthForPage.assertPageTitle();
      await pages.farS5WhatTypeOfOrgIsTheAuthForPage.answerSelectShootingClub(answers.typeOfOrganisation, c.SHOOT_CLUB_NAME);
      await pages.farS5WhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.farS5HowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.farS5WillProhibitedBeImportedPage.assertPageTitle();
      await pages.farS5WillProhibitedBeImportedPage.answerProhibitedItemBeImportedYes();
      await pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle();
      await pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesYes();
      await pages.farS5WhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farS5AnotherAddressForStoragePage.assertPageTitle();
      expect(await pages.farS5AnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farS5AnotherAddressForStoragePage.answerProhibitedInAnotherAddressYes();
      await pages.farS5WhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farS5AnotherAddressForStoragePage.answerProhibitedInAnotherAddressNo();
      await pages.farS5WhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.farS5WeaponsAndComponentsSectionPage.assertPageTitle();
      await pages.farS5WeaponsAndComponentsSectionPage.answerSelectFullyLaunchersSection();
      await pages.farS5AmmunitionSectionsPage.assertPageTitle();
      await pages.farS5AmmunitionSectionsPage.answerSelectCartridges();
      await pages.farS5HowManyIndividualsToBeNamedPage.assertPageTitle();
      await pages.farS5HowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder(answers.individualNamedOnTheAuthority);
      await pages.farS5FullNameOfFirstAuthorityHolderPage.answerFirstAuthorityHolderWithTitleCheck(answers.nameOfFirstAuthorityHolder);
      await pages.farS5WhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farS5WhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farS5WhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farS5FullNameOfSecondAuthorityHolderPage.answerSecondAuthorityHolderWithTitleCheck(answers.nameOfSecondAuthorityHolder);
      await pages.farS5WhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farS5WhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farS5WhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farS5WhoDoWeContactAbtThisApplicationPage.assertPageTitle();
      await pages.farS5WhoDoWeContactAbtThisApplicationPage.answerContactHolderSecond();
      await pages.farWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.farS5WhichAddressToContactYouPage.answerSelectAddressWithTitleCheck(answers.testContactAddress);
      await pages.farS5WhichAddressToContactYouPage.answerSomeoneElseContact(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle();
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Max character": {
      const answers = {
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
      pages.basePage.applicant = answers;
      if (dataOnly) return;
      await startS5Questionnaire(pages);
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo(answers.whatYouWantToDo);
      await pages.farS5UploadSupportingDocsPage.uploadSupportingFileWithTitleCheck(c.UPLOAD_FILE);
      await pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle();
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farS5WhatTypeOfOrgIsTheAuthForPage.assertPageTitle();
      await pages.farS5WhatTypeOfOrgIsTheAuthForPage.answerSelectSoleTrader(answers.typeOfOrganisation, c.TRADER_NAME);
      await pages.farS5WhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.farS5HowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.farS5WillProhibitedBeImportedPage.assertPageTitle();
      await pages.farS5WillProhibitedBeImportedPage.answerProhibitedItemBeImportedNo();
      await pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle();
      await pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesYes();
      await pages.farS5WhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farS5AnotherAddressForStoragePage.assertPageTitle();
      expect(await pages.farS5AnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farS5AnotherAddressForStoragePage.answerProhibitedInAnotherAddressNo();
      await pages.farS5WhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.farS5WeaponsAndComponentsSectionPage.assertPageTitle();
      await pages.farS5WeaponsAndComponentsSectionPage.answerSelectUnspecifiedSection(readFileSync(c.MAX_TEXT_FILE, 'utf8'));
      await pages.farS5AmmunitionSectionsPage.assertPageTitle();
      await pages.farS5AmmunitionSectionsPage.answerSelectUnspecifiedSections(readFileSync(c.MAX_TEXT_FILE, 'utf8'));
      await pages.farS5HowManyIndividualsToBeNamedPage.assertPageTitle();
      await pages.farS5HowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder(answers.individualNamedOnTheAuthority);
      await pages.farS5WhatsTheFullNameOfAuthorityHolderPage.answerFullNameOfTheAuthority(answers.nameOfAuthorityHolder);
      await pages.farS5WhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farS5WhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farS5WhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farS5WhoDoWeContactAbtThisApplicationPage.assertPageTitle();
      await pages.farS5WhoDoWeContactAbtThisApplicationPage.answerContactHolderFirst();
      await pages.farWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.farS5WhichAddressToContactYouPage.answerSelectAddressWithTitleCheck(answers.testContactAddress);
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle();
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
      break;
    }
    default:
      throw new Error(`Unknown FAR scenario description: FARS5/${context}/${JSON.stringify(scenario)}`);
  }
}

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
