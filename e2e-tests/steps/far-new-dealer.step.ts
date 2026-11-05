import { readFileSync } from 'node:fs';
import { expect } from '@playwright/test';
import { Given, Then, When, type Pages } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export async function completeNewDealerQuestionnaire(pages: Pages, scenario: string): Promise<void> {
  await pages.farChooseAJourneyHomePage.chooseJourneyWithTitleCheck('New Dealer');
  await pages.farPrivacyNoticePage.continueWithTitleCheck();
  await pages.farBeforeYouStartPage.clickContinueBtnWithTitleCheck();
  await pages.farWhatDoYouWantToDoPage.assertPageTitle(pages.farWhatDoYouWantToDoPage.page, await pages.farWhatDoYouWantToDoPage.expectedPageTitle());

  switch (scenario) {
    case "Apply for a new authority": {
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Apply for a new authority");
      await pages.farNewDealerUploadSupportingDocsPage.uploadSupportingFileWithTitleCheck(c.UPLOAD_FILE);
      await pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.farDoYouWantToUploadAdditionalDocsPage.page, await pages.farDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.assertPageTitle(pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.page, await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.expectedPageTitle());
      await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.answerSelectCompany("Company", c.COMPANY_NAME, c.COMPANY_HOUSE_NUMBER);
      await pages.farNewDealerWhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.farNewDealerHowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.farNewDealerWillProhibitedBeImportedPage.assertPageTitle(pages.farNewDealerWillProhibitedBeImportedPage.page, await pages.farNewDealerWillProhibitedBeImportedPage.expectedPageTitle());
      await pages.farNewDealerWillProhibitedBeImportedPage.answerProhibitedItemBeImportedYes();
      await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle(pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.page, await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.expectedPageTitle());
      await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesYes();
      await pages.farNewDealerWhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farNewDealerAnotherAddressForStoragePage.assertPageTitle(pages.farNewDealerAnotherAddressForStoragePage.page, await pages.farNewDealerAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.farNewDealerAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farNewDealerAnotherAddressForStoragePage.answerProhibitedInAnotherAddressYes();
      await pages.farNewDealerWhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farNewDealerAnotherAddressForStoragePage.answerProhibitedInAnotherAddressNo();
      await pages.farNewDealerWhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.farNewDealerWeaponsAndComponentsSectionPage.assertPageTitle(pages.farNewDealerWeaponsAndComponentsSectionPage.page, await pages.farNewDealerWeaponsAndComponentsSectionPage.expectedPageTitle());
      await pages.farNewDealerWeaponsAndComponentsSectionPage.answerSelectUnspecifiedSection(undefined);
      await pages.farNewDealerAmmunitionSectionsPage.assertPageTitle(pages.farNewDealerAmmunitionSectionsPage.page, await pages.farNewDealerAmmunitionSectionsPage.expectedPageTitle());
      await pages.farNewDealerAmmunitionSectionsPage.answerSelectUnspecifiedSections(undefined);
      await pages.farNewDealerHowManyIndividualsToBeNamedPage.assertPageTitle(pages.farNewDealerHowManyIndividualsToBeNamedPage.page, await pages.farNewDealerHowManyIndividualsToBeNamedPage.expectedPageTitle());
      await pages.farNewDealerHowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder("One");
      await pages.farNewDealerWhatsTheFullNameOfAuthorityHolderPage.answerFullNameOfTheAuthority("Test");
      await pages.farNewDealerWhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farNewDealerWhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farNewDealerWhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.assertPageTitle(pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.page, await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.expectedPageTitle());
      await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.answerContactHolderFirst();
      await pages.farWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.farNewDealerWhichAddressToContactYouPage.answerSelectAddressWithTitleCheck("address already provided");
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle(pages.farDoYouHavePurchaseOrderPage.page, await pages.farDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Renew existing authority": {
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Renew an existing authority");
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.assertPageTitle(pages.farUploadAdditionalExistingDocsPage.page, await pages.farUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farNewDealerUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.farDoYouWantToUploadAdditionalDocsPage.page, await pages.farDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.assertPageTitle(pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.page, await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.expectedPageTitle());
      await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.answerSelectOrgCharity("Charity", c.CHARITY_NAME, c.CHARITY_NUMBER);
      await pages.farNewDealerWhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.farNewDealerHowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.farNewDealerWillProhibitedBeImportedPage.assertPageTitle(pages.farNewDealerWillProhibitedBeImportedPage.page, await pages.farNewDealerWillProhibitedBeImportedPage.expectedPageTitle());
      await pages.farNewDealerWillProhibitedBeImportedPage.answerProhibitedItemBeImportedNo();
      await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle(pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.page, await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.expectedPageTitle());
      await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesNo();
      await pages.farNewDealerWhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.farNewDealerWeaponsAndComponentsSectionPage.assertPageTitle(pages.farNewDealerWeaponsAndComponentsSectionPage.page, await pages.farNewDealerWeaponsAndComponentsSectionPage.expectedPageTitle());
      await pages.farNewDealerWeaponsAndComponentsSectionPage.answerSelectFullyAutomaticSection();
      await pages.farNewDealerAmmunitionSectionsPage.assertPageTitle(pages.farNewDealerAmmunitionSectionsPage.page, await pages.farNewDealerAmmunitionSectionsPage.expectedPageTitle());
      await pages.farNewDealerAmmunitionSectionsPage.answerSelectActualMissiles();
      await pages.farNewDealerHowManyIndividualsToBeNamedPage.assertPageTitle(pages.farNewDealerHowManyIndividualsToBeNamedPage.page, await pages.farNewDealerHowManyIndividualsToBeNamedPage.expectedPageTitle());
      await pages.farNewDealerHowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder("One");
      await pages.farNewDealerWhatsTheFullNameOfAuthorityHolderPage.answerFullNameOfTheAuthority("Test");
      await pages.farNewDealerWhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farNewDealerWhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farNewDealerWhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.assertPageTitle(pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.page, await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.expectedPageTitle());
      await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.answerContactHolderFirst();
      await pages.farWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.farNewDealerWhichAddressToContactYouPage.answerSelectAddressWithTitleCheck("address already provided");
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle(pages.farDoYouHavePurchaseOrderPage.page, await pages.farDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
      break;
    }
    case "Renew existing authority - additional Supporting doc - Yes": {
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Renew an existing authority");
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.assertPageTitle(pages.farUploadAdditionalExistingDocsPage.page, await pages.farUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farNewDealerUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.farDoYouWantToUploadAdditionalDocsPage.page, await pages.farDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.farNewDealerUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.assertPageTitle(pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.page, await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.expectedPageTitle());
      await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.answerSelectMuseum("Museum", c.MUSEUM_NAME);
      await pages.farNewDealerWhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.farNewDealerHowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.farNewDealerWillProhibitedBeImportedPage.assertPageTitle(pages.farNewDealerWillProhibitedBeImportedPage.page, await pages.farNewDealerWillProhibitedBeImportedPage.expectedPageTitle());
      await pages.farNewDealerWillProhibitedBeImportedPage.answerProhibitedItemBeImportedYes();
      await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle(pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.page, await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.expectedPageTitle());
      await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesYes();
      await pages.farNewDealerWhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farNewDealerAnotherAddressForStoragePage.assertPageTitle(pages.farNewDealerAnotherAddressForStoragePage.page, await pages.farNewDealerAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.farNewDealerAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farNewDealerAnotherAddressForStoragePage.answerProhibitedInAnotherAddressYes();
      await pages.farNewDealerWhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farNewDealerAnotherAddressForStoragePage.answerProhibitedInAnotherAddressNo();
      await pages.farNewDealerWhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.farNewDealerWeaponsAndComponentsSectionPage.assertPageTitle(pages.farNewDealerWeaponsAndComponentsSectionPage.page, await pages.farNewDealerWeaponsAndComponentsSectionPage.expectedPageTitle());
      await pages.farNewDealerWeaponsAndComponentsSectionPage.answerSelectUnspecifiedSection(undefined);
      await pages.farNewDealerAmmunitionSectionsPage.assertPageTitle(pages.farNewDealerAmmunitionSectionsPage.page, await pages.farNewDealerAmmunitionSectionsPage.expectedPageTitle());
      await pages.farNewDealerAmmunitionSectionsPage.answerSelectUnspecifiedSections(undefined);
      await pages.farNewDealerHowManyIndividualsToBeNamedPage.assertPageTitle(pages.farNewDealerHowManyIndividualsToBeNamedPage.page, await pages.farNewDealerHowManyIndividualsToBeNamedPage.expectedPageTitle());
      await pages.farNewDealerHowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder("One");
      await pages.farNewDealerWhatsTheFullNameOfAuthorityHolderPage.answerFullNameOfTheAuthority("Test");
      await pages.farNewDealerWhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farNewDealerWhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farNewDealerWhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.assertPageTitle(pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.page, await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.expectedPageTitle());
      await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.answerContactSomeoneElse("Someone");
      await pages.farWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.farNewDealerWhatIsSomeOneElseAddressPage.answerSomeoneElseContactWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle(pages.farDoYouHavePurchaseOrderPage.page, await pages.farDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Amend existing authority": {
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Amend an existing authority");
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.assertPageTitle(pages.farUploadAdditionalExistingDocsPage.page, await pages.farUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farNewDealerUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.farDoYouWantToUploadAdditionalDocsPage.page, await pages.farDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.assertPageTitle(pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.page, await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.expectedPageTitle());
      await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.answerSelectOther("Other", c.OTHER_ORG_NAME);
      await pages.farNewDealerWhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.farNewDealerHowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.farNewDealerWillProhibitedBeImportedPage.assertPageTitle(pages.farNewDealerWillProhibitedBeImportedPage.page, await pages.farNewDealerWillProhibitedBeImportedPage.expectedPageTitle());
      await pages.farNewDealerWillProhibitedBeImportedPage.answerProhibitedItemBeImportedYes();
      await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle(pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.page, await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.expectedPageTitle());
      await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesNo();
      await pages.farNewDealerWhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.farNewDealerWeaponsAndComponentsSectionPage.assertPageTitle(pages.farNewDealerWeaponsAndComponentsSectionPage.page, await pages.farNewDealerWeaponsAndComponentsSectionPage.expectedPageTitle());
      await pages.farNewDealerWeaponsAndComponentsSectionPage.answerSelectFullyLaunchersSection();
      await pages.farNewDealerAmmunitionSectionsPage.assertPageTitle(pages.farNewDealerAmmunitionSectionsPage.page, await pages.farNewDealerAmmunitionSectionsPage.expectedPageTitle());
      await pages.farNewDealerAmmunitionSectionsPage.answerSelectCartridges();
      await pages.farNewDealerHowManyIndividualsToBeNamedPage.assertPageTitle(pages.farNewDealerHowManyIndividualsToBeNamedPage.page, await pages.farNewDealerHowManyIndividualsToBeNamedPage.expectedPageTitle());
      await pages.farNewDealerHowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder("Two");
      await pages.farNewDealerFullNameOfFirstAuthorityHolderPage.answerFirstAuthorityHolderWithTitleCheck("Test1");
      await pages.farNewDealerWhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farNewDealerWhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farNewDealerWhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farNewDealerFullNameOfSecondAuthorityHolderPage.answerSecondAuthorityHolderWithTitleCheck("Test2");
      await pages.farNewDealerWhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farNewDealerWhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farNewDealerWhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.assertPageTitle(pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.page, await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.expectedPageTitle());
      await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.answerContactHolderSecond();
      await pages.farWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.farNewDealerWhichAddressToContactYouPage.answerSelectAddressWithTitleCheck("different address");
      await pages.farNewDealerWhichAddressToContactYouPage.answerSomeoneElseContact(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle(pages.farDoYouHavePurchaseOrderPage.page, await pages.farDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Amend existing authority - additional Supporting doc - Yes": {
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Amend an existing authority");
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.assertPageTitle(pages.farUploadAdditionalExistingDocsPage.page, await pages.farUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.farUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farNewDealerUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.farDoYouWantToUploadAdditionalDocsPage.page, await pages.farDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.farNewDealerUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.assertPageTitle(pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.page, await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.expectedPageTitle());
      await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.answerSelectShootingClub("Shooting club (section 7(3))", c.SHOOT_CLUB_NAME);
      await pages.farNewDealerWhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.farNewDealerHowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.farNewDealerWillProhibitedBeImportedPage.assertPageTitle(pages.farNewDealerWillProhibitedBeImportedPage.page, await pages.farNewDealerWillProhibitedBeImportedPage.expectedPageTitle());
      await pages.farNewDealerWillProhibitedBeImportedPage.answerProhibitedItemBeImportedYes();
      await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle(pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.page, await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.expectedPageTitle());
      await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesYes();
      await pages.farNewDealerWhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farNewDealerAnotherAddressForStoragePage.assertPageTitle(pages.farNewDealerAnotherAddressForStoragePage.page, await pages.farNewDealerAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.farNewDealerAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farNewDealerAnotherAddressForStoragePage.answerProhibitedInAnotherAddressYes();
      await pages.farNewDealerWhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farNewDealerAnotherAddressForStoragePage.answerProhibitedInAnotherAddressNo();
      await pages.farNewDealerWhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.farNewDealerWeaponsAndComponentsSectionPage.assertPageTitle(pages.farNewDealerWeaponsAndComponentsSectionPage.page, await pages.farNewDealerWeaponsAndComponentsSectionPage.expectedPageTitle());
      await pages.farNewDealerWeaponsAndComponentsSectionPage.answerSelectFullyLaunchersSection();
      await pages.farNewDealerAmmunitionSectionsPage.assertPageTitle(pages.farNewDealerAmmunitionSectionsPage.page, await pages.farNewDealerAmmunitionSectionsPage.expectedPageTitle());
      await pages.farNewDealerAmmunitionSectionsPage.answerSelectCartridges();
      await pages.farNewDealerHowManyIndividualsToBeNamedPage.assertPageTitle(pages.farNewDealerHowManyIndividualsToBeNamedPage.page, await pages.farNewDealerHowManyIndividualsToBeNamedPage.expectedPageTitle());
      await pages.farNewDealerHowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder("Two");
      await pages.farNewDealerFullNameOfFirstAuthorityHolderPage.answerFirstAuthorityHolderWithTitleCheck("Test1");
      await pages.farNewDealerWhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farNewDealerWhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farNewDealerWhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farNewDealerFullNameOfSecondAuthorityHolderPage.answerSecondAuthorityHolderWithTitleCheck("Test2");
      await pages.farNewDealerWhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farNewDealerWhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farNewDealerWhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.assertPageTitle(pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.page, await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.expectedPageTitle());
      await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.answerContactHolderSecond();
      await pages.farWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.farNewDealerWhichAddressToContactYouPage.answerSelectAddressWithTitleCheck("different address");
      await pages.farNewDealerWhichAddressToContactYouPage.answerSomeoneElseContact(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle(pages.farDoYouHavePurchaseOrderPage.page, await pages.farDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Max character": {
      await pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Apply for a new authority");
      await pages.farNewDealerUploadSupportingDocsPage.uploadSupportingFileWithTitleCheck(c.UPLOAD_FILE);
      await pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.farDoYouWantToUploadAdditionalDocsPage.page, await pages.farDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.assertPageTitle(pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.page, await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.expectedPageTitle());
      await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.answerSelectSoleTrader("Sole trader", c.TRADER_NAME);
      await pages.farNewDealerWhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.farNewDealerHowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.farNewDealerWillProhibitedBeImportedPage.assertPageTitle(pages.farNewDealerWillProhibitedBeImportedPage.page, await pages.farNewDealerWillProhibitedBeImportedPage.expectedPageTitle());
      await pages.farNewDealerWillProhibitedBeImportedPage.answerProhibitedItemBeImportedNo();
      await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle(pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.page, await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.expectedPageTitle());
      await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesYes();
      await pages.farNewDealerWhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farNewDealerAnotherAddressForStoragePage.assertPageTitle(pages.farNewDealerAnotherAddressForStoragePage.page, await pages.farNewDealerAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.farNewDealerAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.farNewDealerAnotherAddressForStoragePage.answerProhibitedInAnotherAddressNo();
      await pages.farNewDealerWhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.farNewDealerWeaponsAndComponentsSectionPage.assertPageTitle(pages.farNewDealerWeaponsAndComponentsSectionPage.page, await pages.farNewDealerWeaponsAndComponentsSectionPage.expectedPageTitle());
      await pages.farNewDealerWeaponsAndComponentsSectionPage.answerSelectUnspecifiedSection(readFileSync(c.MAX_TEXT_FILE, 'utf8'));
      await pages.farNewDealerAmmunitionSectionsPage.assertPageTitle(pages.farNewDealerAmmunitionSectionsPage.page, await pages.farNewDealerAmmunitionSectionsPage.expectedPageTitle());
      await pages.farNewDealerAmmunitionSectionsPage.answerSelectUnspecifiedSections(readFileSync(c.MAX_TEXT_FILE, 'utf8'));
      await pages.farNewDealerHowManyIndividualsToBeNamedPage.assertPageTitle(pages.farNewDealerHowManyIndividualsToBeNamedPage.page, await pages.farNewDealerHowManyIndividualsToBeNamedPage.expectedPageTitle());
      await pages.farNewDealerHowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder("One");
      await pages.farNewDealerWhatsTheFullNameOfAuthorityHolderPage.answerFullNameOfTheAuthority("Test");
      await pages.farNewDealerWhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.farNewDealerWhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.farNewDealerWhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.assertPageTitle(pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.page, await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.expectedPageTitle());
      await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.answerContactHolderFirst();
      await pages.farWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.farNewDealerWhichAddressToContactYouPage.answerSelectAddressWithTitleCheck("address already provided");
      await pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.farDoYouHavePurchaseOrderPage.assertPageTitle(pages.farDoYouHavePurchaseOrderPage.page, await pages.farDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
      break;
    }
    default:
      throw new Error(`Unknown FAR scenario description: FARNewDealer/journey/${JSON.stringify(scenario)}`);
  }
}

When('I change the company name to {string} and company house number to {string} and continue', async ({ pages }, companyName: string, companyHouseNo: string) => {
  await pages.farNewDealerCheckYourAnswersPage.clickToChangeBusinessDetails();
  await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.answerSelectCompanyWithTitleCheck('Company', companyName, companyHouseNo);
});

When('I select the organisation type {string} and click continue', async ({ pages }, type: string) => {
  await pages.farNewDealerWhatTypeOfOrgIsTheAuthForPage.answerSelectCompany(type, c.COMPANY_NAME, c.COMPANY_HOUSE_NUMBER);
});

When('I answer how many individual will be named {string} and click continue', async ({ pages }, holder: string) => {
  await pages.farNewDealerHowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder(holder);
});

When('I select what will be handled under the authority and click continue', async ({ pages }) => {
  await pages.farNewDealerWhatToHandleUnderTheAuthPage.answerSelectAllWeapons();
});

When('I select how the prohibited items will be obtained and click continue', async ({ pages }) => {
  await pages.farNewDealerHowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItems();
});

When('I select import prohibited items and click continue', async ({ pages }) => {
  await pages.farNewDealerWillProhibitedBeImportedPage.answerProhibitedItemBeImportedNo();
});

When('I answer will prohibited items be stored in business premises and click continue', async ({ pages }) => {
  await pages.farNewDealerProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesNo();
});

When('I select what business activities to be carried out and click continue', async ({ pages }) => {
  await pages.farNewDealerWhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivities();
});

When('I select weapons sections and click continue', async ({ pages }) => {
  await pages.farNewDealerAmmunitionSectionsPage.answerSelectUnspecifiedSections();
});

When('I select ammunition sections and click continue', async ({ pages }) => {
  await pages.farNewDealerAmmunitionSectionsPage.answerSelectUnspecifiedSections();
});

When('I enter full name of authority holder and click continue', async ({ pages }) => {
  await pages.farNewDealerWhatsTheFullNameOfAuthorityHolderPage.answerEnterNameOfAuthorityHolder(c.FULL_NAME);
});

When('I enter birth details and click continue', async ({ pages }) => {
  await pages.farNewDealerWhatAreBirthDayDetailsPage.answerDateOfBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
});

When('I enter country of nationality and click continue', async ({ pages }) => {
  await pages.farNewDealerWhatIsCountryOfNationalityPage.answerEnterCountryOfNationality(c.COUNTRY_UK);
});

When('I select who to contact and click continue', async ({ pages }) => {
  await pages.farNewDealerWhoDoWeContactAbtThisApplicationPage.answerContactHolderFirst();
});

When('I enter contact email address and click continue', async ({ pages }) => {
  await pages.farWhatAreContactDetailsPage.answerHoldersContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
});

When('I select the S5 contact address for scenario {string} and click continue', async ({ pages }, scenario: string) => {
  switch (scenario) {
    case 'Apply for a new authority':
    case 'Renew existing authority':
    case 'Renew existing authority - additional Supporting doc - Yes':
    case 'Max character':
      await pages.farNewDealerWhichAddressToContactYouPage.answerSelectAddress('address already provided');
      break;
    case 'Amend existing authority':
    case 'Amend existing authority - additional Supporting doc - Yes':
      await pages.farNewDealerWhichAddressToContactYouPage.answerSelectAddress('different address');
      break;
    default:
      throw new Error(`Unknown FAR scenario description: FARNewDealer/journey/${JSON.stringify(scenario)}`);
  }
});

Then('I check the company details changes {string} and {string} are updated on the Check your answers page', async ({ pages }, name: string, number: string) => {
  await pages.farNewDealerCheckYourAnswersPage.assertPageTitle(pages.farNewDealerCheckYourAnswersPage.page, await pages.farNewDealerCheckYourAnswersPage.expectedPageTitle());
  const details = await pages.farNewDealerCheckYourAnswersPage.getUpdatedBusinessDetails();
  expect(details['Company name']).toBe(name);
  expect(details['Companies House number']).toBe(number);
});