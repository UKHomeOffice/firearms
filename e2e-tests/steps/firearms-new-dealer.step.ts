import { readFileSync } from 'node:fs';
import { expect } from '@playwright/test';
import { Given, Then, When, type Pages } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export async function completeNewDealerApplicationForm(pages: Pages, scenario: string): Promise<void> {
  await pages.firearmsChooseAJourneyHomePage.chooseJourneyWithTitleCheck('New Dealer');
  await pages.firearmsPrivacyNoticePage.continueWithTitleCheck();
  await pages.firearmsBeforeYouStartPage.clickContinueBtnWithTitleCheck();
  await pages.firearmsWhatDoYouWantToDoPage.assertPageTitle(pages.firearmsWhatDoYouWantToDoPage.page, await pages.firearmsWhatDoYouWantToDoPage.expectedPageTitle());

  switch (scenario) {
    case "Apply for a new authority": {
      await pages.firearmsWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Apply for a new authority");
      await pages.firearmsNewDealerUploadSupportingDocsPage.uploadSupportingFileWithTitleCheck(c.UPLOAD_FILE);
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.firearmsDoYouWantToUploadAdditionalDocsPage.page, await pages.firearmsDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.assertPageTitle(pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.page, await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.expectedPageTitle());
      await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.answerSelectCompany("Company", c.COMPANY_NAME, c.COMPANY_HOUSE_NUMBER);
      await pages.firearmsNewDealerWhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.firearmsNewDealerHowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.firearmsNewDealerWillProhibitedBeImportedPage.assertPageTitle(pages.firearmsNewDealerWillProhibitedBeImportedPage.page, await pages.firearmsNewDealerWillProhibitedBeImportedPage.expectedPageTitle());
      await pages.firearmsNewDealerWillProhibitedBeImportedPage.answerProhibitedItemBeImportedYes();
      await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle(pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.page, await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.expectedPageTitle());
      await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesYes();
      await pages.firearmsNewDealerWhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsNewDealerAnotherAddressForStoragePage.assertPageTitle(pages.firearmsNewDealerAnotherAddressForStoragePage.page, await pages.firearmsNewDealerAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.firearmsNewDealerAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.firearmsNewDealerAnotherAddressForStoragePage.answerProhibitedInAnotherAddressYes();
      await pages.firearmsNewDealerWhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsNewDealerAnotherAddressForStoragePage.answerProhibitedInAnotherAddressNo();
      await pages.firearmsNewDealerWhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.assertPageTitle(pages.firearmsNewDealerWeaponsAndComponentsSectionPage.page, await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.expectedPageTitle());
      await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.answerSelectUnspecifiedSection(undefined);
      await pages.firearmsNewDealerAmmunitionSectionsPage.assertPageTitle(pages.firearmsNewDealerAmmunitionSectionsPage.page, await pages.firearmsNewDealerAmmunitionSectionsPage.expectedPageTitle());
      await pages.firearmsNewDealerAmmunitionSectionsPage.answerSelectUnspecifiedSections(undefined);
      await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.assertPageTitle(pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.page, await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.expectedPageTitle());
      await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder("One");
      await pages.firearmsNewDealerWhatsTheFullNameOfAuthorityHolderPage.answerFullNameOfTheAuthority("Test");
      await pages.firearmsNewDealerWhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.firearmsNewDealerWhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.firearmsNewDealerWhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.assertPageTitle(pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.page, await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.expectedPageTitle());
      await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.answerContactHolderFirst();
      await pages.firearmsWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsNewDealerWhichAddressToContactYouPage.answerSelectAddressWithTitleCheck("address already provided");
      await pages.firearmsWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.firearmsWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsDoYouHavePurchaseOrderPage.assertPageTitle(pages.firearmsDoYouHavePurchaseOrderPage.page, await pages.firearmsDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.firearmsDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Renew existing authority": {
      await pages.firearmsWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Renew an existing authority");
      await pages.firearmsUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.firearmsUploadAdditionalExistingDocsPage.assertPageTitle(pages.firearmsUploadAdditionalExistingDocsPage.page, await pages.firearmsUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.firearmsUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsNewDealerUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.firearmsDoYouWantToUploadAdditionalDocsPage.page, await pages.firearmsDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.assertPageTitle(pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.page, await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.expectedPageTitle());
      await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.answerSelectOrgCharity("Charity", c.CHARITY_NAME, c.CHARITY_NUMBER);
      await pages.firearmsNewDealerWhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.firearmsNewDealerHowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.firearmsNewDealerWillProhibitedBeImportedPage.assertPageTitle(pages.firearmsNewDealerWillProhibitedBeImportedPage.page, await pages.firearmsNewDealerWillProhibitedBeImportedPage.expectedPageTitle());
      await pages.firearmsNewDealerWillProhibitedBeImportedPage.answerProhibitedItemBeImportedNo();
      await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle(pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.page, await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.expectedPageTitle());
      await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesNo();
      await pages.firearmsNewDealerWhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.assertPageTitle(pages.firearmsNewDealerWeaponsAndComponentsSectionPage.page, await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.expectedPageTitle());
      await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.answerSelectFullyAutomaticSection();
      await pages.firearmsNewDealerAmmunitionSectionsPage.assertPageTitle(pages.firearmsNewDealerAmmunitionSectionsPage.page, await pages.firearmsNewDealerAmmunitionSectionsPage.expectedPageTitle());
      await pages.firearmsNewDealerAmmunitionSectionsPage.answerSelectActualMissiles();
      await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.assertPageTitle(pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.page, await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.expectedPageTitle());
      await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder("One");
      await pages.firearmsNewDealerWhatsTheFullNameOfAuthorityHolderPage.answerFullNameOfTheAuthority("Test");
      await pages.firearmsNewDealerWhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.firearmsNewDealerWhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.firearmsNewDealerWhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.assertPageTitle(pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.page, await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.expectedPageTitle());
      await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.answerContactHolderFirst();
      await pages.firearmsWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsNewDealerWhichAddressToContactYouPage.answerSelectAddressWithTitleCheck("address already provided");
      await pages.firearmsWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.firearmsWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsDoYouHavePurchaseOrderPage.assertPageTitle(pages.firearmsDoYouHavePurchaseOrderPage.page, await pages.firearmsDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.firearmsDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
      break;
    }
    case "Renew existing authority - additional Supporting doc - Yes": {
      await pages.firearmsWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Renew an existing authority");
      await pages.firearmsUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.firearmsUploadAdditionalExistingDocsPage.assertPageTitle(pages.firearmsUploadAdditionalExistingDocsPage.page, await pages.firearmsUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.firearmsUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.firearmsUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.firearmsUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsNewDealerUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.firearmsDoYouWantToUploadAdditionalDocsPage.page, await pages.firearmsDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.firearmsNewDealerUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.assertPageTitle(pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.page, await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.expectedPageTitle());
      await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.answerSelectMuseum("Museum", c.MUSEUM_NAME);
      await pages.firearmsNewDealerWhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.firearmsNewDealerHowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.firearmsNewDealerWillProhibitedBeImportedPage.assertPageTitle(pages.firearmsNewDealerWillProhibitedBeImportedPage.page, await pages.firearmsNewDealerWillProhibitedBeImportedPage.expectedPageTitle());
      await pages.firearmsNewDealerWillProhibitedBeImportedPage.answerProhibitedItemBeImportedYes();
      await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle(pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.page, await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.expectedPageTitle());
      await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesYes();
      await pages.firearmsNewDealerWhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsNewDealerAnotherAddressForStoragePage.assertPageTitle(pages.firearmsNewDealerAnotherAddressForStoragePage.page, await pages.firearmsNewDealerAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.firearmsNewDealerAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.firearmsNewDealerAnotherAddressForStoragePage.answerProhibitedInAnotherAddressYes();
      await pages.firearmsNewDealerWhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsNewDealerAnotherAddressForStoragePage.answerProhibitedInAnotherAddressNo();
      await pages.firearmsNewDealerWhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.assertPageTitle(pages.firearmsNewDealerWeaponsAndComponentsSectionPage.page, await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.expectedPageTitle());
      await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.answerSelectUnspecifiedSection(undefined);
      await pages.firearmsNewDealerAmmunitionSectionsPage.assertPageTitle(pages.firearmsNewDealerAmmunitionSectionsPage.page, await pages.firearmsNewDealerAmmunitionSectionsPage.expectedPageTitle());
      await pages.firearmsNewDealerAmmunitionSectionsPage.answerSelectUnspecifiedSections(undefined);
      await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.assertPageTitle(pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.page, await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.expectedPageTitle());
      await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder("One");
      await pages.firearmsNewDealerWhatsTheFullNameOfAuthorityHolderPage.answerFullNameOfTheAuthority("Test");
      await pages.firearmsNewDealerWhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.firearmsNewDealerWhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.firearmsNewDealerWhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.assertPageTitle(pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.page, await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.expectedPageTitle());
      await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.answerContactSomeoneElse("Someone");
      await pages.firearmsWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsNewDealerWhatIsSomeOneElseAddressPage.answerSomeoneElseContactWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.firearmsWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsDoYouHavePurchaseOrderPage.assertPageTitle(pages.firearmsDoYouHavePurchaseOrderPage.page, await pages.firearmsDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.firearmsDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Amend existing authority": {
      await pages.firearmsWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Amend an existing authority");
      await pages.firearmsUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.firearmsUploadAdditionalExistingDocsPage.assertPageTitle(pages.firearmsUploadAdditionalExistingDocsPage.page, await pages.firearmsUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.firearmsUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsNewDealerUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.firearmsDoYouWantToUploadAdditionalDocsPage.page, await pages.firearmsDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.assertPageTitle(pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.page, await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.expectedPageTitle());
      await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.answerSelectOther("Other", c.OTHER_ORG_NAME);
      await pages.firearmsNewDealerWhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.firearmsNewDealerHowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.firearmsNewDealerWillProhibitedBeImportedPage.assertPageTitle(pages.firearmsNewDealerWillProhibitedBeImportedPage.page, await pages.firearmsNewDealerWillProhibitedBeImportedPage.expectedPageTitle());
      await pages.firearmsNewDealerWillProhibitedBeImportedPage.answerProhibitedItemBeImportedYes();
      await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle(pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.page, await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.expectedPageTitle());
      await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesNo();
      await pages.firearmsNewDealerWhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.assertPageTitle(pages.firearmsNewDealerWeaponsAndComponentsSectionPage.page, await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.expectedPageTitle());
      await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.answerSelectFullyLaunchersSection();
      await pages.firearmsNewDealerAmmunitionSectionsPage.assertPageTitle(pages.firearmsNewDealerAmmunitionSectionsPage.page, await pages.firearmsNewDealerAmmunitionSectionsPage.expectedPageTitle());
      await pages.firearmsNewDealerAmmunitionSectionsPage.answerSelectCartridges();
      await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.assertPageTitle(pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.page, await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.expectedPageTitle());
      await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder("Two");
      await pages.firearmsNewDealerFullNameOfFirstAuthorityHolderPage.answerFirstAuthorityHolderWithTitleCheck("Test1");
      await pages.firearmsNewDealerWhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.firearmsNewDealerWhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.firearmsNewDealerWhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsNewDealerFullNameOfSecondAuthorityHolderPage.answerSecondAuthorityHolderWithTitleCheck("Test2");
      await pages.firearmsNewDealerWhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.firearmsNewDealerWhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.firearmsNewDealerWhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.assertPageTitle(pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.page, await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.expectedPageTitle());
      await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.answerContactHolderSecond();
      await pages.firearmsWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsNewDealerWhichAddressToContactYouPage.answerSelectAddressWithTitleCheck("different address");
      await pages.firearmsNewDealerWhichAddressToContactYouPage.answerSomeoneElseContact(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.firearmsWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsDoYouHavePurchaseOrderPage.assertPageTitle(pages.firearmsDoYouHavePurchaseOrderPage.page, await pages.firearmsDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.firearmsDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Amend existing authority - additional Supporting doc - Yes": {
      await pages.firearmsWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Amend an existing authority");
      await pages.firearmsUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.firearmsUploadAdditionalExistingDocsPage.assertPageTitle(pages.firearmsUploadAdditionalExistingDocsPage.page, await pages.firearmsUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.firearmsUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.firearmsUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.firearmsUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsNewDealerUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.firearmsDoYouWantToUploadAdditionalDocsPage.page, await pages.firearmsDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.firearmsNewDealerUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.assertPageTitle(pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.page, await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.expectedPageTitle());
      await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.answerSelectShootingClub("Shooting club (section 7(3))", c.SHOOT_CLUB_NAME);
      await pages.firearmsNewDealerWhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.firearmsNewDealerHowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.firearmsNewDealerWillProhibitedBeImportedPage.assertPageTitle(pages.firearmsNewDealerWillProhibitedBeImportedPage.page, await pages.firearmsNewDealerWillProhibitedBeImportedPage.expectedPageTitle());
      await pages.firearmsNewDealerWillProhibitedBeImportedPage.answerProhibitedItemBeImportedYes();
      await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle(pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.page, await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.expectedPageTitle());
      await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesYes();
      await pages.firearmsNewDealerWhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsNewDealerAnotherAddressForStoragePage.assertPageTitle(pages.firearmsNewDealerAnotherAddressForStoragePage.page, await pages.firearmsNewDealerAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.firearmsNewDealerAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.firearmsNewDealerAnotherAddressForStoragePage.answerProhibitedInAnotherAddressYes();
      await pages.firearmsNewDealerWhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsNewDealerAnotherAddressForStoragePage.answerProhibitedInAnotherAddressNo();
      await pages.firearmsNewDealerWhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.assertPageTitle(pages.firearmsNewDealerWeaponsAndComponentsSectionPage.page, await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.expectedPageTitle());
      await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.answerSelectFullyLaunchersSection();
      await pages.firearmsNewDealerAmmunitionSectionsPage.assertPageTitle(pages.firearmsNewDealerAmmunitionSectionsPage.page, await pages.firearmsNewDealerAmmunitionSectionsPage.expectedPageTitle());
      await pages.firearmsNewDealerAmmunitionSectionsPage.answerSelectCartridges();
      await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.assertPageTitle(pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.page, await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.expectedPageTitle());
      await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder("Two");
      await pages.firearmsNewDealerFullNameOfFirstAuthorityHolderPage.answerFirstAuthorityHolderWithTitleCheck("Test1");
      await pages.firearmsNewDealerWhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.firearmsNewDealerWhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.firearmsNewDealerWhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsNewDealerFullNameOfSecondAuthorityHolderPage.answerSecondAuthorityHolderWithTitleCheck("Test2");
      await pages.firearmsNewDealerWhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.firearmsNewDealerWhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.firearmsNewDealerWhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.assertPageTitle(pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.page, await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.expectedPageTitle());
      await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.answerContactHolderSecond();
      await pages.firearmsWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsNewDealerWhichAddressToContactYouPage.answerSelectAddressWithTitleCheck("different address");
      await pages.firearmsNewDealerWhichAddressToContactYouPage.answerSomeoneElseContact(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.firearmsWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsDoYouHavePurchaseOrderPage.assertPageTitle(pages.firearmsDoYouHavePurchaseOrderPage.page, await pages.firearmsDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.firearmsDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Max character": {
      await pages.firearmsWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Apply for a new authority");
      await pages.firearmsNewDealerUploadSupportingDocsPage.uploadSupportingFileWithTitleCheck(c.UPLOAD_FILE);
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.firearmsDoYouWantToUploadAdditionalDocsPage.page, await pages.firearmsDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.assertPageTitle(pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.page, await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.expectedPageTitle());
      await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.answerSelectSoleTrader("Sole trader", c.TRADER_NAME);
      await pages.firearmsNewDealerWhatToHandleUnderTheAuthPage.answerSelectAllWeaponsWithTitleCheck();
      await pages.firearmsNewDealerHowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItemsWithTitleCheck();
      await pages.firearmsNewDealerWillProhibitedBeImportedPage.assertPageTitle(pages.firearmsNewDealerWillProhibitedBeImportedPage.page, await pages.firearmsNewDealerWillProhibitedBeImportedPage.expectedPageTitle());
      await pages.firearmsNewDealerWillProhibitedBeImportedPage.answerProhibitedItemBeImportedNo();
      await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.assertPageTitle(pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.page, await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.expectedPageTitle());
      await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesYes();
      await pages.firearmsNewDealerWhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorageWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsNewDealerAnotherAddressForStoragePage.assertPageTitle(pages.firearmsNewDealerAnotherAddressForStoragePage.page, await pages.firearmsNewDealerAnotherAddressForStoragePage.expectedPageTitle());
      expect(await pages.firearmsNewDealerAnotherAddressForStoragePage.isStorageAddressAdded()).toBe(true);
      await pages.firearmsNewDealerAnotherAddressForStoragePage.answerProhibitedInAnotherAddressNo();
      await pages.firearmsNewDealerWhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivitiesWithTitleCheck();
      await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.assertPageTitle(pages.firearmsNewDealerWeaponsAndComponentsSectionPage.page, await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.expectedPageTitle());
      await pages.firearmsNewDealerWeaponsAndComponentsSectionPage.answerSelectUnspecifiedSection(readFileSync(c.MAX_TEXT_FILE, 'utf8'));
      await pages.firearmsNewDealerAmmunitionSectionsPage.assertPageTitle(pages.firearmsNewDealerAmmunitionSectionsPage.page, await pages.firearmsNewDealerAmmunitionSectionsPage.expectedPageTitle());
      await pages.firearmsNewDealerAmmunitionSectionsPage.answerSelectUnspecifiedSections(readFileSync(c.MAX_TEXT_FILE, 'utf8'));
      await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.assertPageTitle(pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.page, await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.expectedPageTitle());
      await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder("One");
      await pages.firearmsNewDealerWhatsTheFullNameOfAuthorityHolderPage.answerFullNameOfTheAuthority("Test");
      await pages.firearmsNewDealerWhatAreBirthDayDetailsPage.answerAuthorityBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
      await pages.firearmsNewDealerWhatIsCountryOfNationalityPage.answerAuthorityNationality(c.COUNTRY_UK);
      await pages.firearmsNewDealerWhatIsHolderMainBusinessPage.answerAuthorityMainBusinessAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.assertPageTitle(pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.page, await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.expectedPageTitle());
      await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.answerContactHolderFirst();
      await pages.firearmsWhatAreContactDetailsPage.answerHoldersContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsNewDealerWhichAddressToContactYouPage.answerSelectAddressWithTitleCheck("address already provided");
      await pages.firearmsWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.firearmsWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsDoYouHavePurchaseOrderPage.assertPageTitle(pages.firearmsDoYouHavePurchaseOrderPage.page, await pages.firearmsDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.firearmsDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
      break;
    }
    default:
      throw new Error(`Unknown Firearms scenario description: FARNewDealer/journey/${JSON.stringify(scenario)}`);
  }
}

When('I change the company name to {string} and company house number to {string} and continue', async ({ pages }, companyName: string, companyHouseNo: string) => {
  await pages.firearmsNewDealerCheckYourAnswersPage.clickToChangeBusinessDetails();
  await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.answerSelectCompanyWithTitleCheck('Company', companyName, companyHouseNo);
});

When('I select the organisation type {string} and click continue', async ({ pages }, type: string) => {
  await pages.firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage.answerSelectCompany(type, c.COMPANY_NAME, c.COMPANY_HOUSE_NUMBER);
});

When('I answer how many individual will be named {string} and click continue', async ({ pages }, holder: string) => {
  await pages.firearmsNewDealerHowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder(holder);
});

When('I select what will be handled under the authority and click continue', async ({ pages }) => {
  await pages.firearmsNewDealerWhatToHandleUnderTheAuthPage.answerSelectAllWeapons();
});

When('I select how the prohibited items will be obtained and click continue', async ({ pages }) => {
  await pages.firearmsNewDealerHowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItems();
});

When('I select import prohibited items and click continue', async ({ pages }) => {
  await pages.firearmsNewDealerWillProhibitedBeImportedPage.answerProhibitedItemBeImportedNo();
});

When('I answer will prohibited items be stored in business premises and click continue', async ({ pages }) => {
  await pages.firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesNo();
});

When('I select what business activities to be carried out and click continue', async ({ pages }) => {
  await pages.firearmsNewDealerWhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivities();
});

When('I select weapons sections and click continue', async ({ pages }) => {
  await pages.firearmsNewDealerAmmunitionSectionsPage.answerSelectUnspecifiedSections();
});

When('I select ammunition sections and click continue', async ({ pages }) => {
  await pages.firearmsNewDealerAmmunitionSectionsPage.answerSelectUnspecifiedSections();
});

When('I enter full name of authority holder and click continue', async ({ pages }) => {
  await pages.firearmsNewDealerWhatsTheFullNameOfAuthorityHolderPage.answerEnterNameOfAuthorityHolder(c.FULL_NAME);
});

When('I enter birth details and click continue', async ({ pages }) => {
  await pages.firearmsNewDealerWhatAreBirthDayDetailsPage.answerDateOfBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
});

When('I enter country of nationality and click continue', async ({ pages }) => {
  await pages.firearmsNewDealerWhatIsCountryOfNationalityPage.answerEnterCountryOfNationality(c.COUNTRY_UK);
});

When('I select who to contact and click continue', async ({ pages }) => {
  await pages.firearmsNewDealerWhoDoWeContactAbtThisApplicationPage.answerContactHolderFirst();
});

When('I enter contact email address and click continue', async ({ pages }) => {
  await pages.firearmsWhatAreContactDetailsPage.answerHoldersContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
});

When('I select the New Dealer contact address for scenario {string} and click continue', async ({ pages }, scenario: string) => {
  switch (scenario) {
    case 'Apply for a new authority':
    case 'Renew existing authority':
    case 'Renew existing authority - additional Supporting doc - Yes':
    case 'Max character':
      await pages.firearmsNewDealerWhichAddressToContactYouPage.answerSelectAddress('address already provided');
      break;
    case 'Amend existing authority':
    case 'Amend existing authority - additional Supporting doc - Yes':
      await pages.firearmsNewDealerWhichAddressToContactYouPage.answerSelectAddress('different address');
      break;
    default:
      throw new Error(`Unknown Firearms scenario description: FARNewDealer/journey/${JSON.stringify(scenario)}`);
  }
});

Then('I check the company details changes {string} and {string} are updated on the Check your answers page', async ({ pages }, name: string, number: string) => {
  await pages.firearmsNewDealerCheckYourAnswersPage.assertPageTitle(pages.firearmsNewDealerCheckYourAnswersPage.page, await pages.firearmsNewDealerCheckYourAnswersPage.expectedPageTitle());
  const details = await pages.firearmsNewDealerCheckYourAnswersPage.getUpdatedBusinessDetails();
  expect(details['Company name']).toBe(name);
  expect(details['Companies House number']).toBe(number);
});