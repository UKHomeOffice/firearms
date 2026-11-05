import { createBdd, test as base } from 'playwright-bdd';
import { BasePage } from '../pages/base-page';
import { FarBeforeYouStartPage } from '../pages/far-before-you-start-page';
import { FarCheckYourAnswersPage } from '../pages/far-check-your-answers-page';
import { FarChooseAJourneyHomePage } from '../pages/far-choose-a-journey-home-page';
import { FarDoYouHavePurchaseOrderPage } from '../pages/far-do-you-have-purchase-order-page';
import { FarDoYouWantToUploadAdditionalDocsPage } from '../pages/far-do-you-want-to-upload-additional-docs-page';
import { FarImportantInformationPage } from '../pages/far-important-information-page';
import { FarMuseumAnotherAddressForStoragePage } from '../pages/far-museum-another-address-for-storage-page';
import { FarMuseumCheckYourAnswersPage } from '../pages/far-museum-check-your-answers-page';
import { FarMuseumContactAddressSameAsPreviousPage } from '../pages/far-museum-contact-address-same-as-previous-page';
import { FarMuseumSelectTheContactAddressPage } from '../pages/far-museum-select-the-contact-address-page';
import { FarMuseumTheMuseumNamePage } from '../pages/far-museum-the-museum-name-page';
import { FarMuseumWhatAreTheirContactDetailsPage } from '../pages/far-museum-what-are-their-contact-details-page';
import { FarMuseumWhatIsTheirContactAddressPage } from '../pages/far-museum-what-is-their-contact-address-page';
import { FarMuseumWhereWillFirearmsBeStoredPage } from '../pages/far-museum-where-will-firearms-be-stored-page';
import { FarMuseumWhoShouldWeContactAbtThisApplicationPage } from '../pages/far-museum-who-should-we-contact-abt-this-application-page';
import { FarPrivacyNoticePage } from '../pages/far-privacy-notice-page';
import { FarSupportDocUploadSupportingDocsPage } from '../pages/far-support-doc-upload-supporting-docs-page';
import { FarNewDealerAmmunitionSectionsPage } from '../pages/far-new-dealer-ammunition-sections-page';
import { FarNewDealerAnotherAddressForStoragePage } from '../pages/far-new-dealer-another-address-for-storage-page';
import { FarNewDealerCheckYourAnswersPage } from '../pages/far-new-dealer-check-your-answers-page';
import { FarNewDealerFullNameOfFirstAuthorityHolderPage } from '../pages/far-new-dealer-full-name-of-first-authority-holder-page';
import { FarNewDealerFullNameOfSecondAuthorityHolderPage } from '../pages/far-new-dealer-full-name-of-second-authority-holder-page';
import { FarNewDealerHowManyIndividualsToBeNamedPage } from '../pages/far-new-dealer-how-many-individuals-to-be-named-page';
import { FarNewDealerHowWillProhibitedItemsBeObtainedPage } from '../pages/far-new-dealer-how-will-prohibited-items-be-obtained-page';
import { FarNewDealerProhibitedItemsStoredOnBusinessPremisesPage } from '../pages/far-new-dealer-prohibited-items-stored-on-business-premises-page';
import { FarNewDealerUploadSupportingDocsPage } from '../pages/far-new-dealer-upload-supporting-docs-page';
import { FarNewDealerWeaponsAndComponentsSectionPage } from '../pages/far-new-dealer-weapons-and-components-section-page';
import { FarNewDealerWhatAreBirthDayDetailsPage } from '../pages/far-new-dealer-what-are-birth-day-details-page';
import { FarNewDealerWhatBusinessActivitiesToCarryOutPage } from '../pages/far-new-dealer-what-business-activities-to-carry-out-page';
import { FarNewDealerWhatIsCountryOfNationalityPage } from '../pages/far-new-dealer-what-is-country-of-nationality-page';
import { FarNewDealerWhatIsHolderMainBusinessPage } from '../pages/far-new-dealer-what-is-holder-main-business-page';
import { FarNewDealerWhatIsSomeOneElseAddressPage } from '../pages/far-new-dealer-what-is-some-one-else-address-page';
import { FarNewDealerWhatToHandleUnderTheAuthPage } from '../pages/far-new-dealer-what-to-handle-under-the-auth-page';
import { FarNewDealerWhatTypeOfOrgIsTheAuthForPage } from '../pages/far-new-dealer-what-type-of-org-is-the-auth-for-page';
import { FarNewDealerWhatsTheFullNameOfAuthorityHolderPage } from '../pages/far-new-dealer-whats-the-full-name-of-authority-holder-page';
import { FarNewDealerWhereWillProhibitedItemsBeStoredPage } from '../pages/far-new-dealer-where-will-prohibited-items-be-stored-page';
import { FarNewDealerWhichAddressToContactYouPage } from '../pages/far-new-dealer-which-address-to-contact-you-page';
import { FarNewDealerWhoDoWeContactAbtThisApplicationPage } from '../pages/far-new-dealer-who-do-we-contact-abt-this-application-page';
import { FarNewDealerWillProhibitedBeImportedPage } from '../pages/far-new-dealer-will-prohibited-be-imported-page';
import { FarShootClubAnotherAddressGunStoragePage } from '../pages/far-shoot-club-another-address-gun-storage-page';
import { FarShootClubCheckYourAnswersPage } from '../pages/far-shoot-club-check-your-answers-page';
import { FarShootClubFirearmsCategoriesToUsePage } from '../pages/far-shoot-club-firearms-categories-to-use-page';
import { FarShootClubFirearmsStorageAddressesPage } from '../pages/far-shoot-club-firearms-storage-addresses-page';
import { FarShootClubIsTheClubNewPage } from '../pages/far-shoot-club-is-the-club-new-page';
import { FarShootClubSecContactAddressPage } from '../pages/far-shoot-club-sec-contact-address-page';
import { FarShootClubSecContactDetailsPage } from '../pages/far-shoot-club-sec-contact-details-page';
import { FarShootClubShootingRangesToUsePage } from '../pages/far-shoot-club-shooting-ranges-to-use-page';
import { FarShootClubUploadSupportingDocsPage } from '../pages/far-shoot-club-upload-supporting-docs-page';
import { FarShootClubUseAnotherShootingRangePage } from '../pages/far-shoot-club-use-another-shooting-range-page';
import { FarShootClubWhatIsClubAddressPage } from '../pages/far-shoot-club-what-is-club-address-page';
import { FarShootClubWhatIsTheClubSecNamePage } from '../pages/far-shoot-club-what-is-the-club-sec-name-page';
import { FarShootClubWhatIsTheNamePage } from '../pages/far-shoot-club-what-is-the-name-page';
import { FarShootClubWhereElseWillGunBeStoredPage } from '../pages/far-shoot-club-where-else-will-gun-be-stored-page';
import { FarShootClubWhoToContactInAbsencePage } from '../pages/far-shoot-club-who-to-contact-in-absence-page';
import { FarSubmissionNotificationsPage } from '../pages/far-submission-notifications-page';
import { FarSupportDocAppRefNumberPage } from '../pages/far-support-doc-app-ref-number-page';
import { FarSupportingDocCheckAnswersPage } from '../pages/far-supporting-doc-check-answers-page';
import { FarSupportingDocEnterEmailInOriginalAppPage } from '../pages/far-supporting-doc-enter-email-in-original-app-page';
import { FarUploadAdditionalExistingDocsPage } from '../pages/far-upload-additional-existing-docs-page';
import { FarUploadExistingAuthDocsPage } from '../pages/far-upload-existing-auth-docs-page';
import { FarWhatAreContactDetailsPage } from '../pages/far-what-are-contact-details-page';
import { FarWhatDoYouWantToDoPage } from '../pages/far-what-do-you-want-to-do-page';
import { FarWhatIsTheirInvoiceAddressPage } from '../pages/far-what-is-their-invoice-address-page';
import { FarWhoShouldWeContactAbtTheInvoicePage } from '../pages/far-who-should-we-contact-abt-the-invoice-page';

export type Pages = {
  basePage: BasePage;
  farBeforeYouStartPage: FarBeforeYouStartPage;
  farCheckYourAnswersPage: FarCheckYourAnswersPage;
  farChooseAJourneyHomePage: FarChooseAJourneyHomePage;
  farDoYouHavePurchaseOrderPage: FarDoYouHavePurchaseOrderPage;
  farDoYouWantToUploadAdditionalDocsPage: FarDoYouWantToUploadAdditionalDocsPage;
  farImportantInformationPage: FarImportantInformationPage;
  farMuseumAnotherAddressForStoragePage: FarMuseumAnotherAddressForStoragePage;
  farMuseumCheckYourAnswersPage: FarMuseumCheckYourAnswersPage;
  farMuseumContactAddressSameAsPreviousPage: FarMuseumContactAddressSameAsPreviousPage;
  farMuseumSelectTheContactAddressPage: FarMuseumSelectTheContactAddressPage;
  farMuseumTheMuseumNamePage: FarMuseumTheMuseumNamePage;
  farMuseumWhatAreTheirContactDetailsPage: FarMuseumWhatAreTheirContactDetailsPage;
  farMuseumWhatIsTheirContactAddressPage: FarMuseumWhatIsTheirContactAddressPage;
  farMuseumWhereWillFirearmsBeStoredPage: FarMuseumWhereWillFirearmsBeStoredPage;
  farMuseumWhoShouldWeContactAbtThisApplicationPage: FarMuseumWhoShouldWeContactAbtThisApplicationPage;
  farPrivacyNoticePage: FarPrivacyNoticePage;
  farSDocUploadSupportingDocsPage: FarSupportDocUploadSupportingDocsPage;
  farNewDealerAmmunitionSectionsPage: FarNewDealerAmmunitionSectionsPage;
  farNewDealerAnotherAddressForStoragePage: FarNewDealerAnotherAddressForStoragePage;
  farNewDealerCheckYourAnswersPage: FarNewDealerCheckYourAnswersPage;
  farNewDealerFullNameOfFirstAuthorityHolderPage: FarNewDealerFullNameOfFirstAuthorityHolderPage;
  farNewDealerFullNameOfSecondAuthorityHolderPage: FarNewDealerFullNameOfSecondAuthorityHolderPage;
  farNewDealerHowManyIndividualsToBeNamedPage: FarNewDealerHowManyIndividualsToBeNamedPage;
  farNewDealerHowWillProhibitedItemsBeObtainedPage: FarNewDealerHowWillProhibitedItemsBeObtainedPage;
  farNewDealerProhibitedItemsStoredOnBusinessPremisesPage: FarNewDealerProhibitedItemsStoredOnBusinessPremisesPage;
  farNewDealerUploadSupportingDocsPage: FarNewDealerUploadSupportingDocsPage;
  farNewDealerWeaponsAndComponentsSectionPage: FarNewDealerWeaponsAndComponentsSectionPage;
  farNewDealerWhatAreBirthDayDetailsPage: FarNewDealerWhatAreBirthDayDetailsPage;
  farNewDealerWhatBusinessActivitiesToCarryOutPage: FarNewDealerWhatBusinessActivitiesToCarryOutPage;
  farNewDealerWhatIsCountryOfNationalityPage: FarNewDealerWhatIsCountryOfNationalityPage;
  farNewDealerWhatIsHolderMainBusinessPage: FarNewDealerWhatIsHolderMainBusinessPage;
  farNewDealerWhatIsSomeOneElseAddressPage: FarNewDealerWhatIsSomeOneElseAddressPage;
  farNewDealerWhatToHandleUnderTheAuthPage: FarNewDealerWhatToHandleUnderTheAuthPage;
  farNewDealerWhatTypeOfOrgIsTheAuthForPage: FarNewDealerWhatTypeOfOrgIsTheAuthForPage;
  farNewDealerWhatsTheFullNameOfAuthorityHolderPage: FarNewDealerWhatsTheFullNameOfAuthorityHolderPage;
  farNewDealerWhereWillProhibitedItemsBeStoredPage: FarNewDealerWhereWillProhibitedItemsBeStoredPage;
  farNewDealerWhichAddressToContactYouPage: FarNewDealerWhichAddressToContactYouPage;
  farNewDealerWhoDoWeContactAbtThisApplicationPage: FarNewDealerWhoDoWeContactAbtThisApplicationPage;
  farNewDealerWillProhibitedBeImportedPage: FarNewDealerWillProhibitedBeImportedPage;
  farShootClubAnotherAddressGunStoragePage: FarShootClubAnotherAddressGunStoragePage;
  farShootClubCheckYourAnswersPage: FarShootClubCheckYourAnswersPage;
  farShootClubFirearmsCategoriesToUsePage: FarShootClubFirearmsCategoriesToUsePage;
  farShootClubFirearmsStorageAddressesPage: FarShootClubFirearmsStorageAddressesPage;
  farShootClubIsTheClubNewPage: FarShootClubIsTheClubNewPage;
  farShootClubSecContactAddressPage: FarShootClubSecContactAddressPage;
  farShootClubSecContactDetailsPage: FarShootClubSecContactDetailsPage;
  farShootClubShootingRangesToUsePage: FarShootClubShootingRangesToUsePage;
  farShootClubUploadSupportingDocsPage: FarShootClubUploadSupportingDocsPage;
  farShootClubUseAnotherShootingRangePage: FarShootClubUseAnotherShootingRangePage;
  farShootClubWhatIsClubAddressPage: FarShootClubWhatIsClubAddressPage;
  farShootClubWhatIsTheClubSecNamePage: FarShootClubWhatIsTheClubSecNamePage;
  farShootClubWhatIsTheNamePage: FarShootClubWhatIsTheNamePage;
  farShootClubWhereElseWillGunBeStoredPage: FarShootClubWhereElseWillGunBeStoredPage;
  farShootClubWhoToContactInAbsencePage: FarShootClubWhoToContactInAbsencePage;
  farSubmissionNotificationsPage: FarSubmissionNotificationsPage;
  farSupportDocAppRefNumberPage: FarSupportDocAppRefNumberPage;
  farSupportingDocCheckAnswersPage: FarSupportingDocCheckAnswersPage;
  farSupportingDocEnterEmailInOriginalAppPage: FarSupportingDocEnterEmailInOriginalAppPage;
  farUploadAdditionalExistingDocsPage: FarUploadAdditionalExistingDocsPage;
  farUploadExistingAuthDocsPage: FarUploadExistingAuthDocsPage;
  farWhatAreContactDetailsPage: FarWhatAreContactDetailsPage;
  farWhatDoYouWantToDoPage: FarWhatDoYouWantToDoPage;
  farWhatIsTheirInvoiceAddressPage: FarWhatIsTheirInvoiceAddressPage;
  farWhoShouldWeContactAbtTheInvoicePage: FarWhoShouldWeContactAbtTheInvoicePage;
};

export const test = base.extend<{ pages: Pages }>({
  pages: async ({ page }, use) => {
    const pageObjects = {
      basePage: new BasePage(page),
      farBeforeYouStartPage: new FarBeforeYouStartPage(page),
      farCheckYourAnswersPage: new FarCheckYourAnswersPage(page),
      farChooseAJourneyHomePage: new FarChooseAJourneyHomePage(page),
      farDoYouHavePurchaseOrderPage: new FarDoYouHavePurchaseOrderPage(page),
      farDoYouWantToUploadAdditionalDocsPage: new FarDoYouWantToUploadAdditionalDocsPage(page),
      farImportantInformationPage: new FarImportantInformationPage(page),
      farMuseumAnotherAddressForStoragePage: new FarMuseumAnotherAddressForStoragePage(page),
      farMuseumCheckYourAnswersPage: new FarMuseumCheckYourAnswersPage(page),
      farMuseumContactAddressSameAsPreviousPage: new FarMuseumContactAddressSameAsPreviousPage(page),
      farMuseumSelectTheContactAddressPage: new FarMuseumSelectTheContactAddressPage(page),
      farMuseumTheMuseumNamePage: new FarMuseumTheMuseumNamePage(page),
      farMuseumWhatAreTheirContactDetailsPage: new FarMuseumWhatAreTheirContactDetailsPage(page),
      farMuseumWhatIsTheirContactAddressPage: new FarMuseumWhatIsTheirContactAddressPage(page),
      farMuseumWhereWillFirearmsBeStoredPage: new FarMuseumWhereWillFirearmsBeStoredPage(page),
      farMuseumWhoShouldWeContactAbtThisApplicationPage: new FarMuseumWhoShouldWeContactAbtThisApplicationPage(page),
      farPrivacyNoticePage: new FarPrivacyNoticePage(page),
      farSDocUploadSupportingDocsPage: new FarSupportDocUploadSupportingDocsPage(page),
      farNewDealerAmmunitionSectionsPage: new FarNewDealerAmmunitionSectionsPage(page),
      farNewDealerAnotherAddressForStoragePage: new FarNewDealerAnotherAddressForStoragePage(page),
      farNewDealerCheckYourAnswersPage: new FarNewDealerCheckYourAnswersPage(page),
      farNewDealerFullNameOfFirstAuthorityHolderPage: new FarNewDealerFullNameOfFirstAuthorityHolderPage(page),
      farNewDealerFullNameOfSecondAuthorityHolderPage: new FarNewDealerFullNameOfSecondAuthorityHolderPage(page),
      farNewDealerHowManyIndividualsToBeNamedPage: new FarNewDealerHowManyIndividualsToBeNamedPage(page),
      farNewDealerHowWillProhibitedItemsBeObtainedPage: new FarNewDealerHowWillProhibitedItemsBeObtainedPage(page),
      farNewDealerProhibitedItemsStoredOnBusinessPremisesPage: new FarNewDealerProhibitedItemsStoredOnBusinessPremisesPage(page),
      farNewDealerUploadSupportingDocsPage: new FarNewDealerUploadSupportingDocsPage(page),
      farNewDealerWeaponsAndComponentsSectionPage: new FarNewDealerWeaponsAndComponentsSectionPage(page),
      farNewDealerWhatAreBirthDayDetailsPage: new FarNewDealerWhatAreBirthDayDetailsPage(page),
      farNewDealerWhatBusinessActivitiesToCarryOutPage: new FarNewDealerWhatBusinessActivitiesToCarryOutPage(page),
      farNewDealerWhatIsCountryOfNationalityPage: new FarNewDealerWhatIsCountryOfNationalityPage(page),
      farNewDealerWhatIsHolderMainBusinessPage: new FarNewDealerWhatIsHolderMainBusinessPage(page),
      farNewDealerWhatIsSomeOneElseAddressPage: new FarNewDealerWhatIsSomeOneElseAddressPage(page),
      farNewDealerWhatToHandleUnderTheAuthPage: new FarNewDealerWhatToHandleUnderTheAuthPage(page),
      farNewDealerWhatTypeOfOrgIsTheAuthForPage: new FarNewDealerWhatTypeOfOrgIsTheAuthForPage(page),
      farNewDealerWhatsTheFullNameOfAuthorityHolderPage: new FarNewDealerWhatsTheFullNameOfAuthorityHolderPage(page),
      farNewDealerWhereWillProhibitedItemsBeStoredPage: new FarNewDealerWhereWillProhibitedItemsBeStoredPage(page),
      farNewDealerWhichAddressToContactYouPage: new FarNewDealerWhichAddressToContactYouPage(page),
      farNewDealerWhoDoWeContactAbtThisApplicationPage: new FarNewDealerWhoDoWeContactAbtThisApplicationPage(page),
      farNewDealerWillProhibitedBeImportedPage: new FarNewDealerWillProhibitedBeImportedPage(page),
      farShootClubAnotherAddressGunStoragePage: new FarShootClubAnotherAddressGunStoragePage(page),
      farShootClubCheckYourAnswersPage: new FarShootClubCheckYourAnswersPage(page),
      farShootClubFirearmsCategoriesToUsePage: new FarShootClubFirearmsCategoriesToUsePage(page),
      farShootClubFirearmsStorageAddressesPage: new FarShootClubFirearmsStorageAddressesPage(page),
      farShootClubIsTheClubNewPage: new FarShootClubIsTheClubNewPage(page),
      farShootClubSecContactAddressPage: new FarShootClubSecContactAddressPage(page),
      farShootClubSecContactDetailsPage: new FarShootClubSecContactDetailsPage(page),
      farShootClubShootingRangesToUsePage: new FarShootClubShootingRangesToUsePage(page),
      farShootClubUploadSupportingDocsPage: new FarShootClubUploadSupportingDocsPage(page),
      farShootClubUseAnotherShootingRangePage: new FarShootClubUseAnotherShootingRangePage(page),
      farShootClubWhatIsClubAddressPage: new FarShootClubWhatIsClubAddressPage(page),
      farShootClubWhatIsTheClubSecNamePage: new FarShootClubWhatIsTheClubSecNamePage(page),
      farShootClubWhatIsTheNamePage: new FarShootClubWhatIsTheNamePage(page),
      farShootClubWhereElseWillGunBeStoredPage: new FarShootClubWhereElseWillGunBeStoredPage(page),
      farShootClubWhoToContactInAbsencePage: new FarShootClubWhoToContactInAbsencePage(page),
      farSubmissionNotificationsPage: new FarSubmissionNotificationsPage(page),
      farSupportDocAppRefNumberPage: new FarSupportDocAppRefNumberPage(page),
      farSupportingDocCheckAnswersPage: new FarSupportingDocCheckAnswersPage(page),
      farSupportingDocEnterEmailInOriginalAppPage: new FarSupportingDocEnterEmailInOriginalAppPage(page),
      farUploadAdditionalExistingDocsPage: new FarUploadAdditionalExistingDocsPage(page),
      farUploadExistingAuthDocsPage: new FarUploadExistingAuthDocsPage(page),
      farWhatAreContactDetailsPage: new FarWhatAreContactDetailsPage(page),
      farWhatDoYouWantToDoPage: new FarWhatDoYouWantToDoPage(page),
      farWhatIsTheirInvoiceAddressPage: new FarWhatIsTheirInvoiceAddressPage(page),
      farWhoShouldWeContactAbtTheInvoicePage: new FarWhoShouldWeContactAbtTheInvoicePage(page),
    };
    await use(pageObjects);
  },
});

export const expect = test.expect;
export const { Given, When, Then } = createBdd(test);
