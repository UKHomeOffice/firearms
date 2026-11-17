import { createBdd, test as base } from 'playwright-bdd';
import { BasePage } from '../pages/base-page';
import { FirearmsBeforeYouStartPage } from '../pages/firearms-before-you-start-page';
import { FirearmsCheckYourAnswersPage } from '../pages/firearms-check-your-answers-page';
import { FirearmsChooseAJourneyHomePage } from '../pages/firearms-choose-a-journey-home-page';
import { FirearmsDoYouHavePurchaseOrderPage } from '../pages/firearms-do-you-have-purchase-order-page';
import { FirearmsDoYouWantToUploadAdditionalDocsPage } from '../pages/firearms-do-you-want-to-upload-additional-docs-page';
import { FirearmsImportantInformationPage } from '../pages/firearms-important-information-page';
import { FirearmsMuseumAnotherAddressForStoragePage } from '../pages/firearms-museum-another-address-for-storage-page';
import { FirearmsMuseumCheckYourAnswersPage } from '../pages/firearms-museum-check-your-answers-page';
import { FirearmsMuseumContactAddressSameAsPreviousPage } from '../pages/firearms-museum-contact-address-same-as-previous-page';
import { FirearmsMuseumSelectTheContactAddressPage } from '../pages/firearms-museum-select-the-contact-address-page';
import { FirearmsMuseumTheMuseumNamePage } from '../pages/firearms-museum-the-museum-name-page';
import { FirearmsMuseumWhatAreTheirContactDetailsPage } from '../pages/firearms-museum-what-are-their-contact-details-page';
import { FirearmsMuseumWhatIsTheirContactAddressPage } from '../pages/firearms-museum-what-is-their-contact-address-page';
import { FirearmsMuseumWhereWillFirearmsBeStoredPage } from '../pages/firearms-museum-where-will-firearms-be-stored-page';
import { FirearmsMuseumWhoShouldWeContactAbtThisApplicationPage } from '../pages/firearms-museum-who-should-we-contact-abt-this-application-page';
import { FirearmsPrivacyNoticePage } from '../pages/firearms-privacy-notice-page';
import { FirearmsSupportDocUploadSupportingDocsPage } from '../pages/firearms-support-doc-upload-supporting-docs-page';
import { FirearmsNewDealerAmmunitionSectionsPage } from '../pages/firearms-new-dealer-ammunition-sections-page';
import { FirearmsNewDealerAnotherAddressForStoragePage } from '../pages/firearms-new-dealer-another-address-for-storage-page';
import { FirearmsNewDealerCheckYourAnswersPage } from '../pages/firearms-new-dealer-check-your-answers-page';
import { FirearmsNewDealerFullNameOfFirstAuthorityHolderPage } from '../pages/firearms-new-dealer-full-name-of-first-authority-holder-page';
import { FirearmsNewDealerFullNameOfSecondAuthorityHolderPage } from '../pages/firearms-new-dealer-full-name-of-second-authority-holder-page';
import { FirearmsNewDealerHowManyIndividualsToBeNamedPage } from '../pages/firearms-new-dealer-how-many-individuals-to-be-named-page';
import { FirearmsNewDealerHowWillProhibitedItemsBeObtainedPage } from '../pages/firearms-new-dealer-how-will-prohibited-items-be-obtained-page';
import { FirearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage } from '../pages/firearms-new-dealer-prohibited-items-stored-on-business-premises-page';
import { FirearmsNewDealerUploadSupportingDocsPage } from '../pages/firearms-new-dealer-upload-supporting-docs-page';
import { FirearmsNewDealerWeaponsAndComponentsSectionPage } from '../pages/firearms-new-dealer-weapons-and-components-section-page';
import { FirearmsNewDealerWhatAreBirthDayDetailsPage } from '../pages/firearms-new-dealer-what-are-birth-day-details-page';
import { FirearmsNewDealerWhatBusinessActivitiesToCarryOutPage } from '../pages/firearms-new-dealer-what-business-activities-to-carry-out-page';
import { FirearmsNewDealerWhatIsCountryOfNationalityPage } from '../pages/firearms-new-dealer-what-is-country-of-nationality-page';
import { FirearmsNewDealerWhatIsHolderMainBusinessPage } from '../pages/firearms-new-dealer-what-is-holder-main-business-page';
import { FirearmsNewDealerWhatIsSomeOneElseAddressPage } from '../pages/firearms-new-dealer-what-is-some-one-else-address-page';
import { FirearmsNewDealerWhatToHandleUnderTheAuthPage } from '../pages/firearms-new-dealer-what-to-handle-under-the-auth-page';
import { FirearmsNewDealerWhatTypeOfOrgIsTheAuthForPage } from '../pages/firearms-new-dealer-what-type-of-org-is-the-auth-for-page';
import { FirearmsNewDealerWhatsTheFullNameOfAuthorityHolderPage } from '../pages/firearms-new-dealer-whats-the-full-name-of-authority-holder-page';
import { FirearmsNewDealerWhereWillProhibitedItemsBeStoredPage } from '../pages/firearms-new-dealer-where-will-prohibited-items-be-stored-page';
import { FirearmsNewDealerWhichAddressToContactYouPage } from '../pages/firearms-new-dealer-which-address-to-contact-you-page';
import { FirearmsNewDealerWhoDoWeContactAbtThisApplicationPage } from '../pages/firearms-new-dealer-who-do-we-contact-abt-this-application-page';
import { FirearmsNewDealerWillProhibitedBeImportedPage } from '../pages/firearms-new-dealer-will-prohibited-be-imported-page';
import { FirearmsShootClubAnotherAddressGunStoragePage } from '../pages/firearms-shoot-club-another-address-gun-storage-page';
import { FirearmsShootClubCheckYourAnswersPage } from '../pages/firearms-shoot-club-check-your-answers-page';
import { FirearmsShootClubFirearmsCategoriesToUsePage } from '../pages/firearms-shoot-club-firearms-categories-to-use-page';
import { FirearmsShootClubFirearmsStorageAddressesPage } from '../pages/firearms-shoot-club-firearms-storage-addresses-page';
import { FirearmsShootClubIsTheClubNewPage } from '../pages/firearms-shoot-club-is-the-club-new-page';
import { FirearmsShootClubSecContactAddressPage } from '../pages/firearms-shoot-club-sec-contact-address-page';
import { FirearmsShootClubSecContactDetailsPage } from '../pages/firearms-shoot-club-sec-contact-details-page';
import { FirearmsShootClubShootingRangesToUsePage } from '../pages/firearms-shoot-club-shooting-ranges-to-use-page';
import { FirearmsShootClubUploadSupportingDocsPage } from '../pages/firearms-shoot-club-upload-supporting-docs-page';
import { FirearmsShootClubUseAnotherShootingRangePage } from '../pages/firearms-shoot-club-use-another-shooting-range-page';
import { FirearmsShootClubWhatIsClubAddressPage } from '../pages/firearms-shoot-club-what-is-club-address-page';
import { FirearmsShootClubWhatIsTheClubSecNamePage } from '../pages/firearms-shoot-club-what-is-the-club-sec-name-page';
import { FirearmsShootClubWhatIsTheNamePage } from '../pages/firearms-shoot-club-what-is-the-name-page';
import { FirearmsShootClubWhereElseWillGunBeStoredPage } from '../pages/firearms-shoot-club-where-else-will-gun-be-stored-page';
import { FirearmsShootClubWhoToContactInAbsencePage } from '../pages/firearms-shoot-club-who-to-contact-in-absence-page';
import { FirearmsSubmissionNotificationsPage } from '../pages/firearms-submission-notifications-page';
import { FirearmsSupportDocAppRefNumberPage } from '../pages/firearms-support-doc-app-ref-number-page';
import { FirearmsSupportingDocCheckAnswersPage } from '../pages/firearms-supporting-doc-check-answers-page';
import { FirearmsSupportingDocEnterEmailInOriginalAppPage } from '../pages/firearms-supporting-doc-enter-email-in-original-app-page';
import { FirearmsUploadAdditionalExistingDocsPage } from '../pages/firearms-upload-additional-existing-docs-page';
import { FirearmsUploadExistingAuthDocsPage } from '../pages/firearms-upload-existing-auth-docs-page';
import { FirearmsWhatAreContactDetailsPage } from '../pages/firearms-what-are-contact-details-page';
import { FirearmsWhatDoYouWantToDoPage } from '../pages/firearms-what-do-you-want-to-do-page';
import { FirearmsWhatIsTheirInvoiceAddressPage } from '../pages/firearms-what-is-their-invoice-address-page';
import { FirearmsWhoShouldWeContactAbtTheInvoicePage } from '../pages/firearms-who-should-we-contact-abt-the-invoice-page';

export type Pages = {
  basePage: BasePage;
  firearmsBeforeYouStartPage: FirearmsBeforeYouStartPage;
  firearmsCheckYourAnswersPage: FirearmsCheckYourAnswersPage;
  firearmsChooseAJourneyHomePage: FirearmsChooseAJourneyHomePage;
  firearmsDoYouHavePurchaseOrderPage: FirearmsDoYouHavePurchaseOrderPage;
  firearmsDoYouWantToUploadAdditionalDocsPage: FirearmsDoYouWantToUploadAdditionalDocsPage;
  firearmsImportantInformationPage: FirearmsImportantInformationPage;
  firearmsMuseumAnotherAddressForStoragePage: FirearmsMuseumAnotherAddressForStoragePage;
  firearmsMuseumCheckYourAnswersPage: FirearmsMuseumCheckYourAnswersPage;
  firearmsMuseumContactAddressSameAsPreviousPage: FirearmsMuseumContactAddressSameAsPreviousPage;
  firearmsMuseumSelectTheContactAddressPage: FirearmsMuseumSelectTheContactAddressPage;
  firearmsMuseumTheMuseumNamePage: FirearmsMuseumTheMuseumNamePage;
  firearmsMuseumWhatAreTheirContactDetailsPage: FirearmsMuseumWhatAreTheirContactDetailsPage;
  firearmsMuseumWhatIsTheirContactAddressPage: FirearmsMuseumWhatIsTheirContactAddressPage;
  firearmsMuseumWhereWillFirearmsBeStoredPage: FirearmsMuseumWhereWillFirearmsBeStoredPage;
  firearmsMuseumWhoShouldWeContactAbtThisApplicationPage: FirearmsMuseumWhoShouldWeContactAbtThisApplicationPage;
  firearmsPrivacyNoticePage: FirearmsPrivacyNoticePage;
  firearmsSDocUploadSupportingDocsPage: FirearmsSupportDocUploadSupportingDocsPage;
  firearmsNewDealerAmmunitionSectionsPage: FirearmsNewDealerAmmunitionSectionsPage;
  firearmsNewDealerAnotherAddressForStoragePage: FirearmsNewDealerAnotherAddressForStoragePage;
  firearmsNewDealerCheckYourAnswersPage: FirearmsNewDealerCheckYourAnswersPage;
  firearmsNewDealerFullNameOfFirstAuthorityHolderPage: FirearmsNewDealerFullNameOfFirstAuthorityHolderPage;
  firearmsNewDealerFullNameOfSecondAuthorityHolderPage: FirearmsNewDealerFullNameOfSecondAuthorityHolderPage;
  firearmsNewDealerHowManyIndividualsToBeNamedPage: FirearmsNewDealerHowManyIndividualsToBeNamedPage;
  firearmsNewDealerHowWillProhibitedItemsBeObtainedPage: FirearmsNewDealerHowWillProhibitedItemsBeObtainedPage;
  firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage: FirearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage;
  firearmsNewDealerUploadSupportingDocsPage: FirearmsNewDealerUploadSupportingDocsPage;
  firearmsNewDealerWeaponsAndComponentsSectionPage: FirearmsNewDealerWeaponsAndComponentsSectionPage;
  firearmsNewDealerWhatAreBirthDayDetailsPage: FirearmsNewDealerWhatAreBirthDayDetailsPage;
  firearmsNewDealerWhatBusinessActivitiesToCarryOutPage: FirearmsNewDealerWhatBusinessActivitiesToCarryOutPage;
  firearmsNewDealerWhatIsCountryOfNationalityPage: FirearmsNewDealerWhatIsCountryOfNationalityPage;
  firearmsNewDealerWhatIsHolderMainBusinessPage: FirearmsNewDealerWhatIsHolderMainBusinessPage;
  firearmsNewDealerWhatIsSomeOneElseAddressPage: FirearmsNewDealerWhatIsSomeOneElseAddressPage;
  firearmsNewDealerWhatToHandleUnderTheAuthPage: FirearmsNewDealerWhatToHandleUnderTheAuthPage;
  firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage: FirearmsNewDealerWhatTypeOfOrgIsTheAuthForPage;
  firearmsNewDealerWhatsTheFullNameOfAuthorityHolderPage: FirearmsNewDealerWhatsTheFullNameOfAuthorityHolderPage;
  firearmsNewDealerWhereWillProhibitedItemsBeStoredPage: FirearmsNewDealerWhereWillProhibitedItemsBeStoredPage;
  firearmsNewDealerWhichAddressToContactYouPage: FirearmsNewDealerWhichAddressToContactYouPage;
  firearmsNewDealerWhoDoWeContactAbtThisApplicationPage: FirearmsNewDealerWhoDoWeContactAbtThisApplicationPage;
  firearmsNewDealerWillProhibitedBeImportedPage: FirearmsNewDealerWillProhibitedBeImportedPage;
  firearmsShootClubAnotherAddressGunStoragePage: FirearmsShootClubAnotherAddressGunStoragePage;
  firearmsShootClubCheckYourAnswersPage: FirearmsShootClubCheckYourAnswersPage;
  firearmsShootClubFirearmsCategoriesToUsePage: FirearmsShootClubFirearmsCategoriesToUsePage;
  firearmsShootClubFirearmsStorageAddressesPage: FirearmsShootClubFirearmsStorageAddressesPage;
  firearmsShootClubIsTheClubNewPage: FirearmsShootClubIsTheClubNewPage;
  firearmsShootClubSecContactAddressPage: FirearmsShootClubSecContactAddressPage;
  firearmsShootClubSecContactDetailsPage: FirearmsShootClubSecContactDetailsPage;
  firearmsShootClubShootingRangesToUsePage: FirearmsShootClubShootingRangesToUsePage;
  firearmsShootClubUploadSupportingDocsPage: FirearmsShootClubUploadSupportingDocsPage;
  firearmsShootClubUseAnotherShootingRangePage: FirearmsShootClubUseAnotherShootingRangePage;
  firearmsShootClubWhatIsClubAddressPage: FirearmsShootClubWhatIsClubAddressPage;
  firearmsShootClubWhatIsTheClubSecNamePage: FirearmsShootClubWhatIsTheClubSecNamePage;
  firearmsShootClubWhatIsTheNamePage: FirearmsShootClubWhatIsTheNamePage;
  firearmsShootClubWhereElseWillGunBeStoredPage: FirearmsShootClubWhereElseWillGunBeStoredPage;
  firearmsShootClubWhoToContactInAbsencePage: FirearmsShootClubWhoToContactInAbsencePage;
  firearmsSubmissionNotificationsPage: FirearmsSubmissionNotificationsPage;
  firearmsSupportDocAppRefNumberPage: FirearmsSupportDocAppRefNumberPage;
  firearmsSupportingDocCheckAnswersPage: FirearmsSupportingDocCheckAnswersPage;
  firearmsSupportingDocEnterEmailInOriginalAppPage: FirearmsSupportingDocEnterEmailInOriginalAppPage;
  firearmsUploadAdditionalExistingDocsPage: FirearmsUploadAdditionalExistingDocsPage;
  firearmsUploadExistingAuthDocsPage: FirearmsUploadExistingAuthDocsPage;
  firearmsWhatAreContactDetailsPage: FirearmsWhatAreContactDetailsPage;
  firearmsWhatDoYouWantToDoPage: FirearmsWhatDoYouWantToDoPage;
  firearmsWhatIsTheirInvoiceAddressPage: FirearmsWhatIsTheirInvoiceAddressPage;
  firearmsWhoShouldWeContactAbtTheInvoicePage: FirearmsWhoShouldWeContactAbtTheInvoicePage;
};

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    const pageObjects = {
      basePage: new BasePage(page),
      firearmsBeforeYouStartPage: new FirearmsBeforeYouStartPage(page),
      firearmsCheckYourAnswersPage: new FirearmsCheckYourAnswersPage(page),
      firearmsChooseAJourneyHomePage: new FirearmsChooseAJourneyHomePage(page),
      firearmsDoYouHavePurchaseOrderPage: new FirearmsDoYouHavePurchaseOrderPage(page),
      firearmsDoYouWantToUploadAdditionalDocsPage: new FirearmsDoYouWantToUploadAdditionalDocsPage(page),
      firearmsImportantInformationPage: new FirearmsImportantInformationPage(page),
      firearmsMuseumAnotherAddressForStoragePage: new FirearmsMuseumAnotherAddressForStoragePage(page),
      firearmsMuseumCheckYourAnswersPage: new FirearmsMuseumCheckYourAnswersPage(page),
      firearmsMuseumContactAddressSameAsPreviousPage: new FirearmsMuseumContactAddressSameAsPreviousPage(page),
      firearmsMuseumSelectTheContactAddressPage: new FirearmsMuseumSelectTheContactAddressPage(page),
      firearmsMuseumTheMuseumNamePage: new FirearmsMuseumTheMuseumNamePage(page),
      firearmsMuseumWhatAreTheirContactDetailsPage: new FirearmsMuseumWhatAreTheirContactDetailsPage(page),
      firearmsMuseumWhatIsTheirContactAddressPage: new FirearmsMuseumWhatIsTheirContactAddressPage(page),
      firearmsMuseumWhereWillFirearmsBeStoredPage: new FirearmsMuseumWhereWillFirearmsBeStoredPage(page),
      firearmsMuseumWhoShouldWeContactAbtThisApplicationPage: new FirearmsMuseumWhoShouldWeContactAbtThisApplicationPage(page),
      firearmsPrivacyNoticePage: new FirearmsPrivacyNoticePage(page),
      firearmsSDocUploadSupportingDocsPage: new FirearmsSupportDocUploadSupportingDocsPage(page),
      firearmsNewDealerAmmunitionSectionsPage: new FirearmsNewDealerAmmunitionSectionsPage(page),
      firearmsNewDealerAnotherAddressForStoragePage: new FirearmsNewDealerAnotherAddressForStoragePage(page),
      firearmsNewDealerCheckYourAnswersPage: new FirearmsNewDealerCheckYourAnswersPage(page),
      firearmsNewDealerFullNameOfFirstAuthorityHolderPage: new FirearmsNewDealerFullNameOfFirstAuthorityHolderPage(page),
      firearmsNewDealerFullNameOfSecondAuthorityHolderPage: new FirearmsNewDealerFullNameOfSecondAuthorityHolderPage(page),
      firearmsNewDealerHowManyIndividualsToBeNamedPage: new FirearmsNewDealerHowManyIndividualsToBeNamedPage(page),
      firearmsNewDealerHowWillProhibitedItemsBeObtainedPage: new FirearmsNewDealerHowWillProhibitedItemsBeObtainedPage(page),
      firearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage: new FirearmsNewDealerProhibitedItemsStoredOnBusinessPremisesPage(page),
      firearmsNewDealerUploadSupportingDocsPage: new FirearmsNewDealerUploadSupportingDocsPage(page),
      firearmsNewDealerWeaponsAndComponentsSectionPage: new FirearmsNewDealerWeaponsAndComponentsSectionPage(page),
      firearmsNewDealerWhatAreBirthDayDetailsPage: new FirearmsNewDealerWhatAreBirthDayDetailsPage(page),
      firearmsNewDealerWhatBusinessActivitiesToCarryOutPage: new FirearmsNewDealerWhatBusinessActivitiesToCarryOutPage(page),
      firearmsNewDealerWhatIsCountryOfNationalityPage: new FirearmsNewDealerWhatIsCountryOfNationalityPage(page),
      firearmsNewDealerWhatIsHolderMainBusinessPage: new FirearmsNewDealerWhatIsHolderMainBusinessPage(page),
      firearmsNewDealerWhatIsSomeOneElseAddressPage: new FirearmsNewDealerWhatIsSomeOneElseAddressPage(page),
      firearmsNewDealerWhatToHandleUnderTheAuthPage: new FirearmsNewDealerWhatToHandleUnderTheAuthPage(page),
      firearmsNewDealerWhatTypeOfOrgIsTheAuthForPage: new FirearmsNewDealerWhatTypeOfOrgIsTheAuthForPage(page),
      firearmsNewDealerWhatsTheFullNameOfAuthorityHolderPage: new FirearmsNewDealerWhatsTheFullNameOfAuthorityHolderPage(page),
      firearmsNewDealerWhereWillProhibitedItemsBeStoredPage: new FirearmsNewDealerWhereWillProhibitedItemsBeStoredPage(page),
      firearmsNewDealerWhichAddressToContactYouPage: new FirearmsNewDealerWhichAddressToContactYouPage(page),
      firearmsNewDealerWhoDoWeContactAbtThisApplicationPage: new FirearmsNewDealerWhoDoWeContactAbtThisApplicationPage(page),
      firearmsNewDealerWillProhibitedBeImportedPage: new FirearmsNewDealerWillProhibitedBeImportedPage(page),
      firearmsShootClubAnotherAddressGunStoragePage: new FirearmsShootClubAnotherAddressGunStoragePage(page),
      firearmsShootClubCheckYourAnswersPage: new FirearmsShootClubCheckYourAnswersPage(page),
      firearmsShootClubFirearmsCategoriesToUsePage: new FirearmsShootClubFirearmsCategoriesToUsePage(page),
      firearmsShootClubFirearmsStorageAddressesPage: new FirearmsShootClubFirearmsStorageAddressesPage(page),
      firearmsShootClubIsTheClubNewPage: new FirearmsShootClubIsTheClubNewPage(page),
      firearmsShootClubSecContactAddressPage: new FirearmsShootClubSecContactAddressPage(page),
      firearmsShootClubSecContactDetailsPage: new FirearmsShootClubSecContactDetailsPage(page),
      firearmsShootClubShootingRangesToUsePage: new FirearmsShootClubShootingRangesToUsePage(page),
      firearmsShootClubUploadSupportingDocsPage: new FirearmsShootClubUploadSupportingDocsPage(page),
      firearmsShootClubUseAnotherShootingRangePage: new FirearmsShootClubUseAnotherShootingRangePage(page),
      firearmsShootClubWhatIsClubAddressPage: new FirearmsShootClubWhatIsClubAddressPage(page),
      firearmsShootClubWhatIsTheClubSecNamePage: new FirearmsShootClubWhatIsTheClubSecNamePage(page),
      firearmsShootClubWhatIsTheNamePage: new FirearmsShootClubWhatIsTheNamePage(page),
      firearmsShootClubWhereElseWillGunBeStoredPage: new FirearmsShootClubWhereElseWillGunBeStoredPage(page),
      firearmsShootClubWhoToContactInAbsencePage: new FirearmsShootClubWhoToContactInAbsencePage(page),
      firearmsSubmissionNotificationsPage: new FirearmsSubmissionNotificationsPage(page),
      firearmsSupportDocAppRefNumberPage: new FirearmsSupportDocAppRefNumberPage(page),
      firearmsSupportingDocCheckAnswersPage: new FirearmsSupportingDocCheckAnswersPage(page),
      firearmsSupportingDocEnterEmailInOriginalAppPage: new FirearmsSupportingDocEnterEmailInOriginalAppPage(page),
      firearmsUploadAdditionalExistingDocsPage: new FirearmsUploadAdditionalExistingDocsPage(page),
      firearmsUploadExistingAuthDocsPage: new FirearmsUploadExistingAuthDocsPage(page),
      firearmsWhatAreContactDetailsPage: new FirearmsWhatAreContactDetailsPage(page),
      firearmsWhatDoYouWantToDoPage: new FirearmsWhatDoYouWantToDoPage(page),
      firearmsWhatIsTheirInvoiceAddressPage: new FirearmsWhatIsTheirInvoiceAddressPage(page),
      firearmsWhoShouldWeContactAbtTheInvoicePage: new FirearmsWhoShouldWeContactAbtTheInvoicePage(page),
    };
    await use(pageObjects);
  },
});

export const expect = test.expect;
export const { Given, When, Then } = createBdd(test);
