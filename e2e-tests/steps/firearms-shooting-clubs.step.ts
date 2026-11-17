import { expect } from '@playwright/test';
import { Given, Then, When, type Pages } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

export async function completeShootingClubsApplicationForm(pages: Pages, scenario: string): Promise<void> {
  await pages.firearmsChooseAJourneyHomePage.chooseJourneyWithTitleCheck('Shooting Clubs');
  await pages.firearmsPrivacyNoticePage.continueWithTitleCheck();
  await pages.firearmsWhatDoYouWantToDoPage.assertPageTitle(pages.firearmsWhatDoYouWantToDoPage.page, await pages.firearmsWhatDoYouWantToDoPage.expectedPageTitle());
  switch (scenario) {
    case "Apply for a new authority": {
      await pages.firearmsWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Apply for a new authority");
      await pages.firearmsShootClubUploadSupportingDocsPage.uploadSupportingFileWithTitleCheck(c.UPLOAD_FILE);
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.firearmsDoYouWantToUploadAdditionalDocsPage.page, await pages.firearmsDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsShootClubIsTheClubNewPage.assertPageTitle(pages.firearmsShootClubIsTheClubNewPage.page, await pages.firearmsShootClubIsTheClubNewPage.expectedPageTitle());
      await pages.firearmsShootClubIsTheClubNewPage.answerClubIsNewYes();
      await pages.firearmsShootClubWhatIsTheNamePage.answerEnterClubNameWithTitleCheck(c.BUSINESS_OR_COMPANY_NAME);
      await pages.firearmsShootClubWhatIsClubAddressPage.answerEnterClubAddressWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubWhatIsTheClubSecNamePage.answerEnterClubSecNameWithTitleCheck(c.CLUB_SEC_NAME);
      await pages.firearmsShootClubSecContactAddressPage.answerClubSecretaryContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubSecContactDetailsPage.answerClubSecretaryContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsShootClubWhoToContactInAbsencePage.answerEnterClubNameWithTitleCheck(c.CLUB_SEC_DEPUTY_NAME);
      await pages.firearmsShootClubSecContactAddressPage.answerDeputyContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubSecContactDetailsPage.answerDeputyContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsShootClubShootingRangesToUsePage.answerShootingRangesAddressWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubFirearmsCategoriesToUsePage.answerSelectFirearmsCategoriesRangeWithTitleCheck();
      expect(await pages.firearmsShootClubUseAnotherShootingRangePage.isFirearmsCategoriesAdded()).toBe(true);
      await pages.firearmsShootClubUseAnotherShootingRangePage.assertPageTitle(pages.firearmsShootClubUseAnotherShootingRangePage.page, await pages.firearmsShootClubUseAnotherShootingRangePage.expectedPageTitle());
      await pages.firearmsShootClubUseAnotherShootingRangePage.answerUseAnotherShootingRangeNo();
      await pages.firearmsShootClubFirearmsStorageAddressesPage.answerSelectStorageAddressWithTitleCheck();
      expect(await pages.firearmsShootClubAnotherAddressGunStoragePage.isFirearmsCategoriesAdded()).toBe(true);
      await pages.firearmsShootClubAnotherAddressGunStoragePage.assertPageTitle(pages.firearmsShootClubAnotherAddressGunStoragePage.page, await pages.firearmsShootClubAnotherAddressGunStoragePage.expectedPageTitle());
      await pages.firearmsShootClubAnotherAddressGunStoragePage.answerUseAnotherAddressNo();
      await pages.firearmsWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.firearmsWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsDoYouHavePurchaseOrderPage.assertPageTitle(pages.firearmsDoYouHavePurchaseOrderPage.page, await pages.firearmsDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.firearmsDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Apply for a new authority - Another Gun Storage address": {
      await pages.firearmsWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Apply for a new authority");
      await pages.firearmsShootClubUploadSupportingDocsPage.uploadSupportingFileWithTitleCheck(c.UPLOAD_FILE);
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.firearmsDoYouWantToUploadAdditionalDocsPage.page, await pages.firearmsDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsShootClubIsTheClubNewPage.assertPageTitle(pages.firearmsShootClubIsTheClubNewPage.page, await pages.firearmsShootClubIsTheClubNewPage.expectedPageTitle());
      await pages.firearmsShootClubIsTheClubNewPage.answerClubIsNewNo();
      await pages.firearmsShootClubWhatIsTheNamePage.answerEnterClubNameWithTitleCheck(c.BUSINESS_OR_COMPANY_NAME);
      await pages.firearmsShootClubWhatIsClubAddressPage.answerEnterClubAddressWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubWhatIsTheClubSecNamePage.answerEnterClubSecNameWithTitleCheck(c.CLUB_SEC_NAME);
      await pages.firearmsShootClubSecContactAddressPage.answerClubSecretaryContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubSecContactDetailsPage.answerClubSecretaryContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsShootClubWhoToContactInAbsencePage.answerEnterClubNameWithTitleCheck(c.CLUB_SEC_DEPUTY_NAME);
      await pages.firearmsShootClubSecContactAddressPage.answerDeputyContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubSecContactDetailsPage.answerDeputyContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsShootClubShootingRangesToUsePage.answerShootingRangesAddressWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubFirearmsCategoriesToUsePage.answerSelectFirearmsCategoriesRangeWithTitleCheck();
      expect(await pages.firearmsShootClubUseAnotherShootingRangePage.isFirearmsCategoriesAdded()).toBe(true);
      await pages.firearmsShootClubUseAnotherShootingRangePage.assertPageTitle(pages.firearmsShootClubUseAnotherShootingRangePage.page, await pages.firearmsShootClubUseAnotherShootingRangePage.expectedPageTitle());
      await pages.firearmsShootClubUseAnotherShootingRangePage.answerUseAnotherShootingRangeYes();
      await pages.firearmsShootClubShootingRangesToUsePage.answerShootingRangesAddressWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubFirearmsCategoriesToUsePage.answerSelectFirearmsCategoriesRangeWithTitleCheck();
      await pages.firearmsShootClubUseAnotherShootingRangePage.answerUseAnotherShootingRangeNo();
      await pages.firearmsShootClubFirearmsStorageAddressesPage.answerSelectStorageAddressWithTitleCheck();
      expect(await pages.firearmsShootClubAnotherAddressGunStoragePage.isFirearmsCategoriesAdded()).toBe(true);
      await pages.firearmsShootClubAnotherAddressGunStoragePage.assertPageTitle(pages.firearmsShootClubAnotherAddressGunStoragePage.page, await pages.firearmsShootClubAnotherAddressGunStoragePage.expectedPageTitle());
      await pages.firearmsShootClubAnotherAddressGunStoragePage.answerUseAnotherAddressYes();
      await pages.firearmsShootClubWhereElseWillGunBeStoredPage.answerEnterGunStorageAddressWithTitleCheck(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.firearmsShootClubAnotherAddressGunStoragePage.answerUseAnotherAddressNo();
      await pages.firearmsWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.firearmsWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsDoYouHavePurchaseOrderPage.assertPageTitle(pages.firearmsDoYouHavePurchaseOrderPage.page, await pages.firearmsDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.firearmsDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
      break;
    }
    case "Renew existing authority": {
      await pages.firearmsWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Renew an existing authority");
      await pages.firearmsUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.firearmsUploadAdditionalExistingDocsPage.assertPageTitle(pages.firearmsUploadAdditionalExistingDocsPage.page, await pages.firearmsUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.firearmsUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsShootClubUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.firearmsDoYouWantToUploadAdditionalDocsPage.page, await pages.firearmsDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsShootClubWhatIsTheNamePage.answerEnterClubNameWithTitleCheck(c.BUSINESS_OR_COMPANY_NAME);
      await pages.firearmsShootClubWhatIsClubAddressPage.answerEnterClubAddressWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubWhatIsTheClubSecNamePage.answerEnterClubSecNameWithTitleCheck(c.CLUB_SEC_NAME);
      await pages.firearmsShootClubSecContactAddressPage.answerClubSecretaryContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubSecContactDetailsPage.answerClubSecretaryContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsShootClubWhoToContactInAbsencePage.answerEnterClubNameWithTitleCheck(c.CLUB_SEC_DEPUTY_NAME);
      await pages.firearmsShootClubSecContactAddressPage.answerDeputyContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubSecContactDetailsPage.answerDeputyContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsShootClubShootingRangesToUsePage.answerShootingRangesAddressWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubFirearmsCategoriesToUsePage.answerSelectFirearmsCategoriesRangeWithTitleCheck();
      expect(await pages.firearmsShootClubUseAnotherShootingRangePage.isFirearmsCategoriesAdded()).toBe(true);
      await pages.firearmsShootClubUseAnotherShootingRangePage.assertPageTitle(pages.firearmsShootClubUseAnotherShootingRangePage.page, await pages.firearmsShootClubUseAnotherShootingRangePage.expectedPageTitle());
      await pages.firearmsShootClubUseAnotherShootingRangePage.answerUseAnotherShootingRangeNo();
      await pages.firearmsShootClubFirearmsStorageAddressesPage.answerSelectStorageAddressWithTitleCheck();
      expect(await pages.firearmsShootClubAnotherAddressGunStoragePage.isFirearmsCategoriesAdded()).toBe(true);
      await pages.firearmsShootClubAnotherAddressGunStoragePage.assertPageTitle(pages.firearmsShootClubAnotherAddressGunStoragePage.page, await pages.firearmsShootClubAnotherAddressGunStoragePage.expectedPageTitle());
      await pages.firearmsShootClubAnotherAddressGunStoragePage.answerUseAnotherAddressNo();
      await pages.firearmsWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.firearmsWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsDoYouHavePurchaseOrderPage.assertPageTitle(pages.firearmsDoYouHavePurchaseOrderPage.page, await pages.firearmsDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.firearmsDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    case "Renew existing authority - additional support doc - Yes": {
      await pages.firearmsWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Renew an existing authority");
      await pages.firearmsUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.firearmsUploadAdditionalExistingDocsPage.assertPageTitle(pages.firearmsUploadAdditionalExistingDocsPage.page, await pages.firearmsUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.firearmsUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.firearmsUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.firearmsUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsShootClubUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.firearmsDoYouWantToUploadAdditionalDocsPage.page, await pages.firearmsDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.firearmsShootClubUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsShootClubWhatIsTheNamePage.answerEnterClubNameWithTitleCheck(c.BUSINESS_OR_COMPANY_NAME);
      await pages.firearmsShootClubWhatIsClubAddressPage.answerEnterClubAddressWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubWhatIsTheClubSecNamePage.answerEnterClubSecNameWithTitleCheck(c.CLUB_SEC_NAME);
      await pages.firearmsShootClubSecContactAddressPage.answerClubSecretaryContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubSecContactDetailsPage.answerClubSecretaryContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsShootClubWhoToContactInAbsencePage.answerEnterClubNameWithTitleCheck(c.CLUB_SEC_DEPUTY_NAME);
      await pages.firearmsShootClubSecContactAddressPage.answerDeputyContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubSecContactDetailsPage.answerDeputyContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsShootClubShootingRangesToUsePage.answerShootingRangesAddressWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubFirearmsCategoriesToUsePage.answerSelectFirearmsCategoriesRangeWithTitleCheck();
      expect(await pages.firearmsShootClubUseAnotherShootingRangePage.isFirearmsCategoriesAdded()).toBe(true);
      await pages.firearmsShootClubUseAnotherShootingRangePage.assertPageTitle(pages.firearmsShootClubUseAnotherShootingRangePage.page, await pages.firearmsShootClubUseAnotherShootingRangePage.expectedPageTitle());
      await pages.firearmsShootClubUseAnotherShootingRangePage.answerUseAnotherShootingRangeNo();
      await pages.firearmsShootClubFirearmsStorageAddressesPage.answerSelectStorageAddressWithTitleCheck();
      expect(await pages.firearmsShootClubAnotherAddressGunStoragePage.isFirearmsCategoriesAdded()).toBe(true);
      await pages.firearmsShootClubAnotherAddressGunStoragePage.assertPageTitle(pages.firearmsShootClubAnotherAddressGunStoragePage.page, await pages.firearmsShootClubAnotherAddressGunStoragePage.expectedPageTitle());
      await pages.firearmsShootClubAnotherAddressGunStoragePage.answerUseAnotherAddressNo();
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
      await pages.firearmsShootClubUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.firearmsDoYouWantToUploadAdditionalDocsPage.page, await pages.firearmsDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsShootClubWhatIsTheNamePage.answerEnterClubNameWithTitleCheck(c.BUSINESS_OR_COMPANY_NAME);
      await pages.firearmsShootClubWhatIsClubAddressPage.answerEnterClubAddressWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubWhatIsTheClubSecNamePage.answerEnterClubSecNameWithTitleCheck(c.CLUB_SEC_NAME);
      await pages.firearmsShootClubSecContactAddressPage.answerClubSecretaryContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubSecContactDetailsPage.answerClubSecretaryContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsShootClubWhoToContactInAbsencePage.answerEnterClubNameWithTitleCheck(c.CLUB_SEC_DEPUTY_NAME);
      await pages.firearmsShootClubSecContactAddressPage.answerDeputyContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubSecContactDetailsPage.answerDeputyContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsShootClubShootingRangesToUsePage.answerShootingRangesAddressWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubFirearmsCategoriesToUsePage.answerSelectFirearmsCategoriesRangeWithTitleCheck();
      expect(await pages.firearmsShootClubUseAnotherShootingRangePage.isFirearmsCategoriesAdded()).toBe(true);
      await pages.firearmsShootClubUseAnotherShootingRangePage.assertPageTitle(pages.firearmsShootClubUseAnotherShootingRangePage.page, await pages.firearmsShootClubUseAnotherShootingRangePage.expectedPageTitle());
      await pages.firearmsShootClubUseAnotherShootingRangePage.answerUseAnotherShootingRangeNo();
      await pages.firearmsShootClubFirearmsStorageAddressesPage.answerSelectStorageAddressWithTitleCheck();
      expect(await pages.firearmsShootClubAnotherAddressGunStoragePage.isFirearmsCategoriesAdded()).toBe(true);
      await pages.firearmsShootClubAnotherAddressGunStoragePage.assertPageTitle(pages.firearmsShootClubAnotherAddressGunStoragePage.page, await pages.firearmsShootClubAnotherAddressGunStoragePage.expectedPageTitle());
      await pages.firearmsShootClubAnotherAddressGunStoragePage.answerUseAnotherAddressYes();
      await pages.firearmsShootClubWhereElseWillGunBeStoredPage.answerEnterGunStorageAddressWithTitleCheck(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
      await pages.firearmsShootClubAnotherAddressGunStoragePage.answerUseAnotherAddressNo();
      await pages.firearmsWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.firearmsWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsDoYouHavePurchaseOrderPage.assertPageTitle(pages.firearmsDoYouHavePurchaseOrderPage.page, await pages.firearmsDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.firearmsDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
      break;
    }
    case "Amend existing authority - additional support doc - Yes": {
      await pages.firearmsWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo("Amend an existing authority");
      await pages.firearmsUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.firearmsUploadAdditionalExistingDocsPage.assertPageTitle(pages.firearmsUploadAdditionalExistingDocsPage.page, await pages.firearmsUploadAdditionalExistingDocsPage.expectedPageTitle());
      await pages.firearmsUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.firearmsUploadExistingAuthDocsPage.uploadExistingAuthorityFile(c.UPLOAD_FILE);
      await pages.firearmsUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsShootClubUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.assertPageTitle(pages.firearmsDoYouWantToUploadAdditionalDocsPage.page, await pages.firearmsDoYouWantToUploadAdditionalDocsPage.expectedPageTitle());
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await pages.firearmsShootClubUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
      await pages.firearmsDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
      await pages.firearmsShootClubWhatIsTheNamePage.answerEnterClubNameWithTitleCheck(c.BUSINESS_OR_COMPANY_NAME);
      await pages.firearmsShootClubWhatIsClubAddressPage.answerEnterClubAddressWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubWhatIsTheClubSecNamePage.answerEnterClubSecNameWithTitleCheck(c.CLUB_SEC_NAME);
      await pages.firearmsShootClubSecContactAddressPage.answerClubSecretaryContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubSecContactDetailsPage.answerClubSecretaryContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsShootClubWhoToContactInAbsencePage.answerEnterClubNameWithTitleCheck(c.CLUB_SEC_DEPUTY_NAME);
      await pages.firearmsShootClubSecContactAddressPage.answerDeputyContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubSecContactDetailsPage.answerDeputyContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
      await pages.firearmsShootClubShootingRangesToUsePage.answerShootingRangesAddressWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsShootClubFirearmsCategoriesToUsePage.answerSelectFirearmsCategoriesRangeWithTitleCheck();
      expect(await pages.firearmsShootClubUseAnotherShootingRangePage.isFirearmsCategoriesAdded()).toBe(true);
      await pages.firearmsShootClubUseAnotherShootingRangePage.assertPageTitle(pages.firearmsShootClubUseAnotherShootingRangePage.page, await pages.firearmsShootClubUseAnotherShootingRangePage.expectedPageTitle());
      await pages.firearmsShootClubUseAnotherShootingRangePage.answerUseAnotherShootingRangeNo();
      await pages.firearmsShootClubFirearmsStorageAddressesPage.answerSelectStorageAddressWithTitleCheck();
      expect(await pages.firearmsShootClubAnotherAddressGunStoragePage.isFirearmsCategoriesAdded()).toBe(true);
      await pages.firearmsShootClubAnotherAddressGunStoragePage.assertPageTitle(pages.firearmsShootClubAnotherAddressGunStoragePage.page, await pages.firearmsShootClubAnotherAddressGunStoragePage.expectedPageTitle());
      await pages.firearmsShootClubAnotherAddressGunStoragePage.answerUseAnotherAddressNo();
      await pages.firearmsWhoShouldWeContactAbtTheInvoicePage.answerContactDetailsWithTitleCheck(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
      await pages.firearmsWhatIsTheirInvoiceAddressPage.answerInvoiceDetailsWithTitleCheck(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
      await pages.firearmsDoYouHavePurchaseOrderPage.assertPageTitle(pages.firearmsDoYouHavePurchaseOrderPage.page, await pages.firearmsDoYouHavePurchaseOrderPage.expectedPageTitle());
      await pages.firearmsDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
      break;
    }
    default:
      throw new Error(`Unknown Firearms scenario description: FARShootingClub/journey/${JSON.stringify(scenario)}`);
  }
}

When('I change the club name to {string} and club address number to {string} and continue', async ({ pages }, clubName: string, clubAddress: string) => {
  await pages.firearmsShootClubCheckYourAnswersPage.changeClubDetails();
  await pages.firearmsShootClubWhatIsTheNamePage.answerEnterClubNameWithTitleCheck(clubName);
  await pages.firearmsShootClubCheckYourAnswersPage.changeClubAddressNumb();
  await pages.firearmsShootClubWhatIsClubAddressPage.answerEnterClubAddressWithTitleCheck(clubAddress, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
});

When('I enter the club name and click continue', async ({ pages }) => {
  await pages.firearmsShootClubWhatIsTheNamePage.answerEnterClubName(c.BUSINESS_OR_COMPANY_NAME);
});

When('I select No for a new club and click continue', async ({ pages }) => {
  await pages.firearmsShootClubIsTheClubNewPage.answerClubIsNewNo();
});

When('I enter the name of the club secretary and click continue', async ({ pages }) => {
  await pages.firearmsShootClubWhatIsTheClubSecNamePage.answerEnterClubSecName(c.CLUB_SEC_NAME);
});

When('I enter the club secretary address and click continue', async ({ pages }) => {
  await pages.firearmsShootClubSecContactAddressPage.answerClubSecContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
});

When('I enter the club email and click continue', async ({ pages }) => {
  await pages.firearmsShootClubSecContactDetailsPage.answerClubSecContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
});

When('I enter the second person name and click continue', async ({ pages }) => {
  await pages.firearmsShootClubWhoToContactInAbsencePage.answerEnterClubName(c.CLUB_SEC_DEPUTY_NAME);
});

When('I enter the second person contact address and click continue', async ({ pages }) => {
  await pages.firearmsShootClubSecContactAddressPage.answerClubSecContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
});

When('I enter the second person email and click continue', async ({ pages }) => {
  await pages.firearmsWhatAreContactDetailsPage.answerHoldersContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
});

When('I enter the club shooting ranges address and click continue', async ({ pages }) => {
  await pages.firearmsShootClubShootingRangesToUsePage.answerShootingRangesAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
});

When('I select firearms category to use and click continue', async ({ pages }) => {
  await pages.firearmsShootClubFirearmsCategoriesToUsePage.answerSelectFirearmsCategoriesRange();
});

When('I select No to use another shooting range and click continue', async ({ pages }) => {
  await pages.firearmsShootClubUseAnotherShootingRangePage.answerUseAnotherShootingRangeNo();
});

When('I select No to use another address for gun storage and click continue', async ({ pages }) => {
  await pages.firearmsShootClubAnotherAddressGunStoragePage.answerUseAnotherAddressNo();
});

Then('I check the club details changes {string} and {string} are updated on the Check your answers page', async ({ pages }, name: string, address: string) => {
  const details = await pages.firearmsShootClubCheckYourAnswersPage.getUpdatedSClubDetails();
  expect(details['Club name']).toBe(name);
  expect(details.Address.split(',')[0]).toBe(address);
});