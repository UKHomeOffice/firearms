import { createBdd, test as base } from 'playwright-bdd';
import { BasePage } from '../pages/base-page';
import { FarAnotherAddressForStorage } from '../pages/far-another-address-for-storage.page';
import { FarBeforeYouStartPage } from '../pages/far-before-you-start-page.page';
import { FarCheckYourAnswersPage } from '../pages/far-check-your-answers-page.page';
import { FarChooseAJourneyHomePage } from '../pages/far-choose-a-journey-home-page.page';
import { FarContactDetails } from '../pages/far-contact-details.page';
import { FarDoYouHavePurchaseOrderPage } from '../pages/far-do-you-have-purchase-order-page.page';
import { FarDoYouWantToUploadAdditionalDocsPage } from '../pages/far-do-you-want-to-upload-additional-docs-page.page';
import { FarImportantInformationPage } from '../pages/far-important-information-page.page';
import { FarMuseumAnotherAddressForStoragePage } from '../pages/far-museum-another-address-for-storage-page.page';
import { FarMuseumCheckYourAnswersPage } from '../pages/far-museum-check-your-answers-page.page';
import { FarMuseumContactAddressSameAsPreviousPage } from '../pages/far-museum-contact-address-same-as-previous-page.page';
import { FarMuseumSelectTheContactAddressPage } from '../pages/far-museum-select-the-contact-address-page.page';
import { FarMuseumTheMuseumNamePage } from '../pages/far-museum-the-museum-name-page.page';
import { FarMuseumWhatAreTheirContactDetailsPage } from '../pages/far-museum-what-are-their-contact-details-page.page';
import { FarMuseumWhatIsTheirContactAddressPage } from '../pages/far-museum-what-is-their-contact-address-page.page';
import { FarMuseumWhereWillFirearmsBeStoredPage } from '../pages/far-museum-where-will-firearms-be-stored-page.page';
import { FarMuseumWhoShouldWeContactAbtThisApplicationPage } from '../pages/far-museum-who-should-we-contact-abt-this-application-page.page';
import { FarPrivacyNoticePage } from '../pages/far-privacy-notice-page.page';
import { FarSDocUploadSupportingDocsPage } from '../pages/far-s-doc-upload-supporting-docs-page.page';
import { FarS5AmmunitionSectionsPage } from '../pages/far-s5-ammunition-sections-page.page';
import { FarS5AnotherAddressForStoragePage } from '../pages/far-s5-another-address-for-storage-page.page';
import { FarS5CheckYourAnswersPage } from '../pages/far-s5-check-your-answers-page.page';
import { FarS5FullNameOfFirstAuthorityHolderPage } from '../pages/far-s5-full-name-of-first-authority-holder-page.page';
import { FarS5FullNameOfSecondAuthorityHolderPage } from '../pages/far-s5-full-name-of-second-authority-holder-page.page';
import { FarS5HowManyIndividualsToBeNamedPage } from '../pages/far-s5-how-many-individuals-to-be-named-page.page';
import { FarS5HowWillProhibitedItemsBeObtainedPage } from '../pages/far-s5-how-will-prohibited-items-be-obtained-page.page';
import { FarS5ProhibitedItemsStoredOnBusinessPremisesPage } from '../pages/far-s5-prohibited-items-stored-on-business-premises-page.page';
import { FarS5UploadSupportingDocsPage } from '../pages/far-s5-upload-supporting-docs-page.page';
import { FarS5WeaponsAndComponentsSectionPage } from '../pages/far-s5-weapons-and-components-section-page.page';
import { FarS5WhatAreBirthDayDetailsPage } from '../pages/far-s5-what-are-birth-day-details-page.page';
import { FarS5WhatBusinessActivitiesToCarryOutPage } from '../pages/far-s5-what-business-activities-to-carry-out-page.page';
import { FarS5WhatIsCountryOfNationalityPage } from '../pages/far-s5-what-is-country-of-nationality-page.page';
import { FarS5WhatIsHolderMainBusinessPage } from '../pages/far-s5-what-is-holder-main-business-page.page';
import { FarS5WhatIsSomeOneElseAddressPage } from '../pages/far-s5-what-is-some-one-else-address-page.page';
import { FarS5WhatToHandleUnderTheAuthPage } from '../pages/far-s5-what-to-handle-under-the-auth-page.page';
import { FarS5WhatTypeOfOrgIsTheAuthForPage } from '../pages/far-s5-what-type-of-org-is-the-auth-for-page.page';
import { FarS5WhatsTheFullNameOfAuthorityHolderPage } from '../pages/far-s5-whats-the-full-name-of-authority-holder-page.page';
import { FarS5WhereWillProhibitedItemsBeStoredPage } from '../pages/far-s5-where-will-prohibited-items-be-stored-page.page';
import { FarS5WhichAddressToContactYouPage } from '../pages/far-s5-which-address-to-contact-you-page.page';
import { FarS5WhoDoWeContactAbtThisApplicationPage } from '../pages/far-s5-who-do-we-contact-abt-this-application-page.page';
import { FarS5WillProhibitedBeImportedPage } from '../pages/far-s5-will-prohibited-be-imported-page.page';
import { FarShootClubAnotherAddressGunStoragePage } from '../pages/far-shoot-club-another-address-gun-storage-page.page';
import { FarShootClubCheckYourAnswersPage } from '../pages/far-shoot-club-check-your-answers-page.page';
import { FarShootClubFirearmsCategoriesToUsePage } from '../pages/far-shoot-club-firearms-categories-to-use-page.page';
import { FarShootClubFirearmsStorageAddressesPage } from '../pages/far-shoot-club-firearms-storage-addresses-page.page';
import { FarShootClubIsTheClubNewPage } from '../pages/far-shoot-club-is-the-club-new-page.page';
import { FarShootClubSecContactAddressPage } from '../pages/far-shoot-club-sec-contact-address-page.page';
import { FarShootClubSecContactDetailsPage } from '../pages/far-shoot-club-sec-contact-details-page.page';
import { FarShootClubShootingRangesToUsePage } from '../pages/far-shoot-club-shooting-ranges-to-use-page.page';
import { FarShootClubUploadSupportingDocsPage } from '../pages/far-shoot-club-upload-supporting-docs-page.page';
import { FarShootClubUseAnotherShootingRangePage } from '../pages/far-shoot-club-use-another-shooting-range-page.page';
import { FarShootClubWhatIsClubAddressPage } from '../pages/far-shoot-club-what-is-club-address-page.page';
import { FarShootClubWhatIsTheClubSecNamePage } from '../pages/far-shoot-club-what-is-the-club-sec-name-page.page';
import { FarShootClubWhatIsTheNamePage } from '../pages/far-shoot-club-what-is-the-name-page.page';
import { FarShootClubWhereElseWillGunBeStoredPage } from '../pages/far-shoot-club-where-else-will-gun-be-stored-page.page';
import { FarShootClubWhoToContactInAbsencePage } from '../pages/far-shoot-club-who-to-contact-in-absence-page.page';
import { FarSubmissionNotificationsPage } from '../pages/far-submission-notifications-page.page';
import { FarSupportDocAppRefNumberPage } from '../pages/far-support-doc-app-ref-number-page.page';
import { FarSupportingDocCheckAnswersPage } from '../pages/far-supporting-doc-check-answers-page.page';
import { FarSupportingDocEnterEmailInOriginalAppPage } from '../pages/far-supporting-doc-enter-email-in-original-app-page.page';
import { FarUploadAdditionalExistingDocsPage } from '../pages/far-upload-additional-existing-docs-page.page';
import { FarUploadDocs } from '../pages/far-upload-docs.page';
import { FarUploadExistingAuthDocsPage } from '../pages/far-upload-existing-auth-docs-page.page';
import { FarWhatAreContactDetailsPage } from '../pages/far-what-are-contact-details-page.page';
import { FarWhatDoYouWantToDoPage } from '../pages/far-what-do-you-want-to-do-page.page';
import { FarWhatIsTheirInvoiceAddressPage } from '../pages/far-what-is-their-invoice-address-page.page';
import { FarWhoShouldWeContactAbtTheInvoicePage } from '../pages/far-who-should-we-contact-abt-the-invoice-page.page';

export type Pages = {
  basePage: BasePage;
  farAnotherAddressForStorage: FarAnotherAddressForStorage;
  farBeforeYouStartPage: FarBeforeYouStartPage;
  farCheckYourAnswersPage: FarCheckYourAnswersPage;
  farChooseAJourneyHomePage: FarChooseAJourneyHomePage;
  farContactDetails: FarContactDetails;
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
  farSDocUploadSupportingDocsPage: FarSDocUploadSupportingDocsPage;
  farS5AmmunitionSectionsPage: FarS5AmmunitionSectionsPage;
  farS5AnotherAddressForStoragePage: FarS5AnotherAddressForStoragePage;
  farS5CheckYourAnswersPage: FarS5CheckYourAnswersPage;
  farS5FullNameOfFirstAuthorityHolderPage: FarS5FullNameOfFirstAuthorityHolderPage;
  farS5FullNameOfSecondAuthorityHolderPage: FarS5FullNameOfSecondAuthorityHolderPage;
  farS5HowManyIndividualsToBeNamedPage: FarS5HowManyIndividualsToBeNamedPage;
  farS5HowWillProhibitedItemsBeObtainedPage: FarS5HowWillProhibitedItemsBeObtainedPage;
  farS5ProhibitedItemsStoredOnBusinessPremisesPage: FarS5ProhibitedItemsStoredOnBusinessPremisesPage;
  farS5UploadSupportingDocsPage: FarS5UploadSupportingDocsPage;
  farS5WeaponsAndComponentsSectionPage: FarS5WeaponsAndComponentsSectionPage;
  farS5WhatAreBirthDayDetailsPage: FarS5WhatAreBirthDayDetailsPage;
  farS5WhatBusinessActivitiesToCarryOutPage: FarS5WhatBusinessActivitiesToCarryOutPage;
  farS5WhatIsCountryOfNationalityPage: FarS5WhatIsCountryOfNationalityPage;
  farS5WhatIsHolderMainBusinessPage: FarS5WhatIsHolderMainBusinessPage;
  farS5WhatIsSomeOneElseAddressPage: FarS5WhatIsSomeOneElseAddressPage;
  farS5WhatToHandleUnderTheAuthPage: FarS5WhatToHandleUnderTheAuthPage;
  farS5WhatTypeOfOrgIsTheAuthForPage: FarS5WhatTypeOfOrgIsTheAuthForPage;
  farS5WhatsTheFullNameOfAuthorityHolderPage: FarS5WhatsTheFullNameOfAuthorityHolderPage;
  farS5WhereWillProhibitedItemsBeStoredPage: FarS5WhereWillProhibitedItemsBeStoredPage;
  farS5WhichAddressToContactYouPage: FarS5WhichAddressToContactYouPage;
  farS5WhoDoWeContactAbtThisApplicationPage: FarS5WhoDoWeContactAbtThisApplicationPage;
  farS5WillProhibitedBeImportedPage: FarS5WillProhibitedBeImportedPage;
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
  farUploadDocs: FarUploadDocs;
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
      farAnotherAddressForStorage: new FarAnotherAddressForStorage(page),
      farBeforeYouStartPage: new FarBeforeYouStartPage(page),
      farCheckYourAnswersPage: new FarCheckYourAnswersPage(page),
      farChooseAJourneyHomePage: new FarChooseAJourneyHomePage(page),
      farContactDetails: new FarContactDetails(page),
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
      farSDocUploadSupportingDocsPage: new FarSDocUploadSupportingDocsPage(page),
      farS5AmmunitionSectionsPage: new FarS5AmmunitionSectionsPage(page),
      farS5AnotherAddressForStoragePage: new FarS5AnotherAddressForStoragePage(page),
      farS5CheckYourAnswersPage: new FarS5CheckYourAnswersPage(page),
      farS5FullNameOfFirstAuthorityHolderPage: new FarS5FullNameOfFirstAuthorityHolderPage(page),
      farS5FullNameOfSecondAuthorityHolderPage: new FarS5FullNameOfSecondAuthorityHolderPage(page),
      farS5HowManyIndividualsToBeNamedPage: new FarS5HowManyIndividualsToBeNamedPage(page),
      farS5HowWillProhibitedItemsBeObtainedPage: new FarS5HowWillProhibitedItemsBeObtainedPage(page),
      farS5ProhibitedItemsStoredOnBusinessPremisesPage: new FarS5ProhibitedItemsStoredOnBusinessPremisesPage(page),
      farS5UploadSupportingDocsPage: new FarS5UploadSupportingDocsPage(page),
      farS5WeaponsAndComponentsSectionPage: new FarS5WeaponsAndComponentsSectionPage(page),
      farS5WhatAreBirthDayDetailsPage: new FarS5WhatAreBirthDayDetailsPage(page),
      farS5WhatBusinessActivitiesToCarryOutPage: new FarS5WhatBusinessActivitiesToCarryOutPage(page),
      farS5WhatIsCountryOfNationalityPage: new FarS5WhatIsCountryOfNationalityPage(page),
      farS5WhatIsHolderMainBusinessPage: new FarS5WhatIsHolderMainBusinessPage(page),
      farS5WhatIsSomeOneElseAddressPage: new FarS5WhatIsSomeOneElseAddressPage(page),
      farS5WhatToHandleUnderTheAuthPage: new FarS5WhatToHandleUnderTheAuthPage(page),
      farS5WhatTypeOfOrgIsTheAuthForPage: new FarS5WhatTypeOfOrgIsTheAuthForPage(page),
      farS5WhatsTheFullNameOfAuthorityHolderPage: new FarS5WhatsTheFullNameOfAuthorityHolderPage(page),
      farS5WhereWillProhibitedItemsBeStoredPage: new FarS5WhereWillProhibitedItemsBeStoredPage(page),
      farS5WhichAddressToContactYouPage: new FarS5WhichAddressToContactYouPage(page),
      farS5WhoDoWeContactAbtThisApplicationPage: new FarS5WhoDoWeContactAbtThisApplicationPage(page),
      farS5WillProhibitedBeImportedPage: new FarS5WillProhibitedBeImportedPage(page),
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
      farUploadDocs: new FarUploadDocs(page),
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
