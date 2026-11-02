import { readFileSync } from 'node:fs';
import { expect, Page } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { test, Pages } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';
import { FarApplicant, FarField, FarProduct, getFarApplicant } from '../test-data/far-applicant';

export const { Given, When, Then, After } = createBdd(test);

After(async ({ page, $testInfo: testInfo }) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await testInfo.attach('failure-route', {
      body: Buffer.from(page.url()),
      contentType: 'text/plain',
    });
  }
});

export class FarStepLib {
  product?: FarProduct;
  applicant?: FarApplicant;
  applicationRef?: string;

  constructor(readonly pages: Pages, readonly page: Page) {}

  data(field: FarField): string {
    const value = this.applicant?.[field];
    if (value === undefined) throw new Error(`Missing FAR applicant field: ${field}`);
    return value;
  }

  selectApplicant(scenarioId: string) {
    if (!this.product) throw new Error('Select a FAR product before selecting an applicant');
    this.applicant = getFarApplicant(this.product, scenarioId);
  }

  isYes(field: FarField): boolean {
    return this.data(field).toLowerCase() === 'yes';
  }

  async openFireArmsHomePage() {
    await this.pages.farChooseAJourneyHomePage.openFirearmsHomePage('/');
  }

  async acceptCookies() {
    await this.pages.farChooseAJourneyHomePage.acceptCookies();
  }

  async answerChooseAJourney(journey: string) {
    await this.pages.farChooseAJourneyHomePage.assertPageTitle();
    await this.pages.farChooseAJourneyHomePage.answerSelectAJourney(journey);
    if (journey.toLowerCase() !== 'supporting documents') {
      await this.pages.farPrivacyNoticePage.assertPageTitle();
      await this.selectContinueBtn();
      if (journey.toLowerCase() === 'new dealer') {
        await this.pages.farBeforeYouStartPage.assertPageTitle();
        await this.pages.farBeforeYouStartPage.clickContinueBtn();
      }
    }
  }

  async answerUploadExistingDoc() {
    await this.pages.farUploadExistingAuthDocsPage.assertPageTitle();
    await this.pages.farUploadExistingAuthDocsPage.uploadExistingFile(c.UPLOAD_FILE);
  }

  async answerUploadAdditionalExistingDocs() {
    await this.pages.farUploadAdditionalExistingDocsPage.assertPageTitle();
    if (this.isYes('uploadAdditionalExistingDoc')) {
      await this.pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await this.answerUploadExistingDoc();
    }
    await this.pages.farUploadAdditionalExistingDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
  }

  async answerContactDetails() {
    await this.pages.farWhatAreContactDetailsPage.assertPageTitle();
    await this.enterContactEmailAddress();
  }

  async answerInvoiceContactAddressDetailsAndPurchaseOrder() {
    await this.pages.farWhoShouldWeContactAbtTheInvoicePage.assertPageTitle();
    await this.enterContactForInvoicing(c.CONTACT_EMAIL_ADDRESS);
    await this.pages.farWhatIsTheirInvoiceAddressPage.assertPageTitle();
    await this.pages.farWhatIsTheirInvoiceAddressPage.answerInvoiceDetails(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
    await this.answerPurchaseOrder();
  }

  async answerPurchaseOrder() {
    await this.pages.farDoYouHavePurchaseOrderPage.assertPageTitle();
    if (this.isYes('purchaseOrder')) {
      await this.pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderYes(c.ORDER_NUMBER);
    } else {
      await this.pages.farDoYouHavePurchaseOrderPage.answerHavePurchaseOrderNo();
    }
  }

  async checkYourAnswers() {
    await this.pages.farCheckYourAnswersPage.assertPageTitle();
    expect(await this.pages.farCheckYourAnswersPage.isAbleToCheckAnswers()).toBe(true);
  }

  async confirmSubmission(): Promise<string> {
    await this.pages.farImportantInformationPage.assertPageTitle();
    await this.pages.farImportantInformationPage.answerSubmitApplication();
    expect(await this.pages.farSubmissionNotificationsPage.isApplicationCompleteDisplayed()).toBe(true);
    expect(await this.pages.farSubmissionNotificationsPage.isApplicationRefDisplayed()).toBe(true);
    this.applicationRef = await this.getApplicationRefNumber();
    return this.pages.farSubmissionNotificationsPage.emailNotification();
  }

  async confirmSubmissionSupportingDoc(): Promise<string> {
    await this.pages.farImportantInformationPage.assertPageTitle();
    await this.pages.farImportantInformationPage.answerSubmitApplication();
    expect(await this.pages.farSubmissionNotificationsPage.isUploadCompleteDisplayed()).toBe(true);
    expect(await this.pages.farSubmissionNotificationsPage.isApplicationRefDisplayed()).toBe(true);
    return this.pages.farSubmissionNotificationsPage.isWillReviewYourApplicationDisplayed();
  }

  async getApplicationRefNumber() {
    return this.pages.farSubmissionNotificationsPage.getApplicationRef();
  }

  async answerEnterRefNumber() {
    await this.pages.farSupportDocAppRefNumberPage.assertPageTitle();
    await this.enterApplicationRefNo();
  }

  async answerEnterEmailUsedInOriginalApplication() {
    await this.pages.farSupportingDocEnterEmailInOriginalAppPage.assertPageTitle();
    await this.enterApplicationEmail(c.SAS_HOF_EMAIL);
  }

  async uploadAdditionalSupportingDoc() {
    await this.pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
  }

  async uploadSupportingDocs() {
    await this.pages.farSDocUploadSupportingDocsPage.uploadSupportingDoc(c.UPLOAD_FILE);
  }

  async getSupportingApplicationDetails() {
    return this.pages.farSupportingDocCheckAnswersPage.getApplicationDetails();
  }

  async chooseFirearmsJourneyToStart(journey: string) {
    await this.pages.farChooseAJourneyHomePage.answerSelectAJourney(journey);
    await this.selectContinueBtn();
    // Only the S5 journey has a before-you-start page.
    if (journey.toLowerCase() === 'new dealer') await this.pages.farBeforeYouStartPage.clickContinueBtn();
  }

  async getErrorSummaryHeaderText() {
    return this.page.locator('#error-summary-title').innerText();
  }

  async getErrorMessageDetailText() {
    return (await this.page.locator('.govuk-error-summary__list').innerText()).trim();
  }

  async getLinkByText(error: string) {
    return this.page.locator('.govuk-error-summary__list').getByRole('link', { name: error, exact: true }).innerText();
  }

  async selectWhatToDo(whatToDo: string) {
    await this.pages.farWhatDoYouWantToDoPage.answerSelectWhatYouWantToDo(whatToDo);
  }

  async selectUploadFileBtn() {
    await this.page.getByRole('button', { name: 'Upload file', exact: true })
      .and(this.page.locator('button, input[type="submit"]')).click();
  }

  async selectContinueBtn() {
    await this.pages.basePage.clickContinueButton();
  }

  async uploadAdditionalDoc(option: string) {
    await this.page.getByRole('radio', { name: option, exact: true }).check();
    await this.selectContinueBtn();
  }

  async enterContactEmailAddress() {
    await this.pages.farWhatAreContactDetailsPage.answerHoldersContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
  }

  async enterContactForInvoicing(email: string) {
    await this.pages.farWhoShouldWeContactAbtTheInvoicePage.answerContactDetails(email, c.CONTACT_NAME, c.CONTACT_TELEPHONE);
  }

  async enterApplicationEmail(email: string) {
    await this.pages.farSupportingDocEnterEmailInOriginalAppPage.answerEnterEmailInOriginalApplication(email);
  }

  async enterApplicationRefNo() {
    if (!this.applicationRef) throw new Error('No reference from a submitted application is available');
    await this.pages.farSupportDocAppRefNumberPage.answerEnterAppRefNumber(this.applicationRef);
  }

  async answerWhatYouWantToDoAndUploadDocs(journey: string) {
    await this.pages.farWhatDoYouWantToDoPage.assertPageTitle();
    const whatToDo = this.data('whatYouWantToDo');
    switch (whatToDo) {
      case 'Apply for a new authority':
        await this.selectWhatToDo(whatToDo);
        if (journey === 'New Dealer') {
          await this.answerUploadSupportingDocForSecretaryOfState();
          await this.answerUploadAdditionalDocs(journey);
        } else if (journey === 'Shooting Clubs') {
          await this.answerUploadSupportingDocForApproval_ShootClubs();
          await this.answerUploadAdditionalDocs_ShootClub();
        }
        break;
      case 'Renew an existing authority':
      case 'Amend an existing authority':
        await this.selectWhatToDo(whatToDo);
        await this.answerUploadExistingDoc();
        await this.answerUploadAdditionalExistingDocs();
        break;
      default: throw new Error(`Unknown FAR activity: ${whatToDo}`);
    }
  }

  async answerUploadSupportingDocForSecretaryOfState() {
    await this.pages.farS5UploadSupportingDocsPage.assertPageTitle();
    await this.pages.farS5UploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
  }

  async answerUploadAdditionalDocs(journey: string) {
    await this.pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle();
    if (this.isYes('uploadAdditionalDoc')) {
      await this.pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      if (journey === 'New Dealer' && this.data('whatYouWantToDo') !== 'Apply for a new authority') {
        await this.answerUploadSupportingDocForSecretaryOfState();
      }
      if (journey === 'Shooting Clubs') await this.answerUploadSupportingDocForApproval_ShootClubs();
    }
    await this.pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
  }

  async uploadSupportAndAdditionalDocs(journey: string) {
    if (this.data('whatYouWantToDo') !== 'Apply for a new authority') {
      if (journey === 'New Dealer') await this.answerUploadSupportingDocForSecretaryOfState();
      else await this.answerUploadSupportingDocForApproval_ShootClubs();
      await this.answerUploadAdditionalDocs(journey);
    }
  }

  async answerSelectAuthTypeOfOrgWhatToHandleAndHowtoObtainTheItems() {
    const organisation = this.pages.farS5WhatTypeOfOrgIsTheAuthForPage;
    await organisation.assertPageTitle();
    const type = this.data('typeOfOrganisation');
    switch (type) {
      case 'Company': await organisation.answerSelectCompany(type, c.COMPANY_NAME, c.COMPANY_HOUSE_NUMBER); break;
      case 'Sole trader': await organisation.answerSelectSoleTrader(type, c.TRADER_NAME); break;
      case 'Shooting club (section 7(3))': await organisation.answerSelectShootingClub(type, c.SHOOT_CLUB_NAME); break;
      case 'Charity': await organisation.answerSelectOrgCharity(type, c.CHARITY_NAME, c.CHARITY_NUMBER); break;
      case 'Museum': await organisation.answerSelectMuseum(type, c.MUSEUM_NAME); break;
      case 'Other': await organisation.answerSelectOther(type, c.OTHER_ORG_NAME); break;
      default: throw new Error(`Unknown FAR organisation: ${type}`);
    }
    await this.answerWhatToHandleHowtoObtainTheItems();
  }

  async answerWhatToHandleHowtoObtainTheItems() {
    await this.pages.farS5WhatToHandleUnderTheAuthPage.assertPageTitle();
    await this.selectWhatWillBeHandled();
    await this.pages.farS5HowWillProhibitedItemsBeObtainedPage.assertPageTitle();
    await this.selectHowProhibitedItemsWillBeObtained();
    await this.answerProhibitedItemBeImported();
  }

  async answerProhibitedItemBeImported() {
    const imported = this.pages.farS5WillProhibitedBeImportedPage;
    await imported.assertPageTitle();
    if (this.isYes('prohibitedItemsBeImported')) await imported.answerProhibitedItemBeImportedYes();
    else await imported.answerProhibitedItemBeImportedNo();
    await this.answerWillItemBeStoredInBusPremises();
  }

  async answerWillItemBeStoredInBusPremises() {
    const storage = this.pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage;
    await storage.assertPageTitle();
    if (this.isYes('willProhibitedItemsBeStoredOnBusinessPremises')) {
      await storage.answerItemsStoredOnBusPremisesYes();
      await this.answerWhereWillItemsBeStored();
      await this.answerAnotherAddressItemsWillBeStored();
    } else await storage.answerItemsStoredOnBusPremisesNo();
    await this.answerBusActivitiesAndWeaponsComponents();
  }

  async answerWhereWillItemsBeStored() {
    await this.pages.farS5WhereWillProhibitedItemsBeStoredPage.assertPageTitle();
    await this.pages.farS5WhereWillProhibitedItemsBeStoredPage.answerProhibitedItemBeStorage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  }

  async answerAnotherAddressItemsWillBeStored() {
    const storage = this.pages.farS5AnotherAddressForStoragePage;
    await storage.assertPageTitle();
    expect(await storage.isStorageAddressAdded()).toBe(true);
    if (this.isYes('anotherAddressToStoreProhibitedItems')) {
      await storage.answerProhibitedInAnotherAddressYes();
      await this.answerWhereWillItemsBeStored();
    }
    await storage.answerProhibitedInAnotherAddressNo();
  }

  async answerBusActivitiesAndWeaponsComponents() {
    await this.pages.farS5WhatBusinessActivitiesToCarryOutPage.assertPageTitle();
    await this.selectBusinessActivities();
    const weapons = this.pages.farS5WeaponsAndComponentsSectionPage;
    await weapons.assertPageTitle();
    const section = this.data('weaponsOrComponentsSections');
    if (section.includes('Unspecified')) {
      await weapons.answerSelectUnspecifiedSection(section.includes('Max Characters 15000') ? readFileSync(c.MAX_TEXT_FILE, 'utf8') : undefined);
    } else if (section.includes('Fully automatic')) await weapons.answerSelectFullyAutomaticSection();
    else if (section.includes('Launchers')) await weapons.answerSelectFullyLaunchersSection();
    else throw new Error(`Unknown FAR weapons section: ${section}`);
    await this.answerAmmunitionSections();
  }

  async answerAmmunitionSections() {
    const ammunition = this.pages.farS5AmmunitionSectionsPage;
    await ammunition.assertPageTitle();
    const section = this.data('ammunitionSection');
    if (section.includes('Unspecified')) {
      await ammunition.answerSelectUnspecifiedSections(section.includes('Max Characters 15000') ? readFileSync(c.MAX_TEXT_FILE, 'utf8') : undefined);
    } else if (section.includes('Actual missiles')) await ammunition.answerSelectActualMissiles();
    else if (section.includes('Cartridges')) await ammunition.answerSelectCartridges();
    else throw new Error(`Unknown FAR ammunition section: ${section}`);
    await this.pages.farS5HowManyIndividualsToBeNamedPage.assertPageTitle();
    const holders = this.data('individualNamedOnTheAuthority');
    await this.selectHowManyIndividualToBeNamed(holders);
    switch (holders) {
      case 'One':
        await this.answerFullNameOfTheAuthority();
        await this.answerBirthAndNationalDetails();
        break;
      case 'Two':
        await this.answerFullNameOfTheFirstAuthority();
        await this.answerBirthAndNationalDetails();
        await this.answerFullNameOfTheSecondAuthority();
        await this.answerBirthAndNationalDetails();
        break;
      default: throw new Error(`Unknown authority holder count: ${holders}`);
    }
  }

  async answerFullNameOfTheAuthority() {
    await this.pages.farS5WhatsTheFullNameOfAuthorityHolderPage.assertPageTitle();
    await this.pages.farS5WhatsTheFullNameOfAuthorityHolderPage.answerEnterNameOfAuthorityHolder(this.data('nameOfAuthorityHolder'));
  }

  async answerBirthAndNationalDetails() {
    await this.pages.farS5WhatAreBirthDayDetailsPage.assertPageTitle();
    await this.enterDateOfBirthDetails();
    await this.pages.farS5WhatIsCountryOfNationalityPage.assertPageTitle();
    await this.enterCountryOfNationality();
    await this.pages.farS5WhatIsHolderMainBusinessPage.assertPageTitle();
    await this.enterMainBusinessOrInvoiceAddress();
  }

  async answerFullNameOfTheSecondAuthority() {
    await this.pages.farS5FullNameOfSecondAuthorityHolderPage.assertPageTitle();
    await this.pages.farS5FullNameOfSecondAuthorityHolderPage.answerSecondAuthorityHolder(this.data('nameOfSecondAuthorityHolder'));
  }

  async answerFullNameOfTheFirstAuthority() {
    await this.pages.farS5FullNameOfFirstAuthorityHolderPage.assertPageTitle();
    await this.pages.farS5FullNameOfFirstAuthorityHolderPage.answerFirstAuthorityHolder(this.data('nameOfFirstAuthorityHolder'));
  }

  async answerWhoToContactAbtThisApplication() {
    const contact = this.pages.farS5WhoDoWeContactAbtThisApplicationPage;
    await contact.assertPageTitle();
    const name = this.data('whoToContactAbtApplication');
    switch (name.toLowerCase()) {
      case 'test': case 'test1':
        await contact.answerContactHolderFirst();
        await this.answerAddressToContact();
        break;
      case 'test2':
        await contact.answerContactHolderSecond();
        await this.answerAddressToContact();
        break;
      case 'someone':
        await contact.answerContactSomeoneElse(name);
        await this.answerContactDetails();
        await this.answerSecondContactOrSomeOneElseAddress();
        break;
      default: throw new Error(`Unknown FAR application contact: ${name}`);
    }
  }

  async answerSecondContactOrSomeOneElseAddress() {
    await this.pages.farS5WhatIsSomeOneElseAddressPage.assertPageTitle();
    await this.pages.farS5WhatIsSomeOneElseAddressPage.answerSomeoneElseContact(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  }

  async answerAddressToContact() {
    await this.answerContactDetails();
    const address = this.pages.farS5WhichAddressToContactYouPage;
    await address.assertPageTitle();
    const choice = this.data('testContactAddress');
    await address.answerSelectAddress(choice);
    if (choice === 'different address') {
      await address.answerSomeoneElseContact(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
    }
  }

  async changeYourAnsForS5(companyName: string, companyHouseNo: string) {
    await this.pages.farS5CheckYourAnswersPage.clickToChangeBusinessDetails();
    await this.pages.farS5WhatTypeOfOrgIsTheAuthForPage.assertPageTitle();
    await this.pages.farS5WhatTypeOfOrgIsTheAuthForPage.answerSelectCompany('Company', companyName, companyHouseNo);
  }

  async getUpdatedBusDetails() {
    await this.pages.farS5CheckYourAnswersPage.assertPageTitle();
    return this.pages.farS5CheckYourAnswersPage.getUpdatedBusinessDetails();
  }

  async answerWhatIsTheMuseumsName() {
    await this.pages.farMuseumTheMuseumNamePage.assertPageTitle();
    await this.enterMuseumName();
  }

  async answerWhereToStoreFirearms() {
    await this.pages.farMuseumWhereWillFirearmsBeStoredPage.assertPageTitle();
    await this.pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  }

  async answerAnotherAddressToStoreFirearms() {
    const storage = this.pages.farMuseumAnotherAddressForStoragePage;
    await storage.assertPageTitle();
    expect(await storage.isStorageAddressAdded()).toBe(true);
    if (this.isYes('anotherAddressToStoreFirearms')) {
      await storage.answerFirearmsInAnotherAddressYes();
      await this.pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
    }
    await storage.answerFirearmsInAnotherAddressNo();
  }

  async answerWhoToContactAndTheirContactDetails() {
    await this.pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.assertPageTitle();
    await this.selectContactName();
    await this.pages.farMuseumWhatAreTheirContactDetailsPage.assertPageTitle();
    await this.pages.farMuseumWhatAreTheirContactDetailsPage.answerTheirContactDetails(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
  }

  async answerIsContactAddressSameAsPrevious() {
    const address = this.pages.farMuseumContactAddressSameAsPreviousPage;
    await address.assertPageTitle();
    if (this.isYes('contactSameAsPreviousAddress')) {
      await address.answerContactAddressTheSameYes();
      await this.pages.farMuseumSelectTheContactAddressPage.assertPageTitle();
      await this.selectAddress();
    } else {
      await address.answerContactAddressTheSameNo();
      await this.pages.farMuseumWhatIsTheirContactAddressPage.assertPageTitle();
      await this.pages.farMuseumWhatIsTheirContactAddressPage.answerContactAddress(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
    }
  }

  async changeYourAnsForMuseum(museumName: string, museumAddressNo: string) {
    await this.pages.farMuseumCheckYourAnswersPage.clickToChangeMuseumName();
    await this.pages.farMuseumTheMuseumNamePage.assertPageTitle();
    await this.pages.farMuseumTheMuseumNamePage.answerEnterMuseumName(museumName);
    await this.pages.farMuseumCheckYourAnswersPage.changeMuseumAddressNum();
    await this.pages.farMuseumWhereWillFirearmsBeStoredPage.assertPageTitle();
    await this.pages.farMuseumWhereWillFirearmsBeStoredPage.answerFirearmsStorage(museumAddressNo, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
    await this.selectContinueBtn();
  }

  async getUpdatedMuseumDetails() {
    await this.pages.farMuseumCheckYourAnswersPage.assertPageTitle();
    return this.pages.farMuseumCheckYourAnswersPage.getUpdatedMuseumDetailsChanges();
  }

  async changeYourAnsForShootClub(clubName: string, clubAddress: string) {
    await this.pages.farShootClubCheckYourAnswersPage.changeClubDetails();
    await this.pages.farShootClubWhatIsTheNamePage.assertPageTitle();
    await this.pages.farShootClubWhatIsTheNamePage.answerEnterClubName(clubName);
    await this.pages.farShootClubCheckYourAnswersPage.changeClubAddressNumb();
    await this.pages.farShootClubWhatIsClubAddressPage.assertPageTitle();
    await this.pages.farShootClubWhatIsClubAddressPage.answerEnterClubAddress(clubAddress, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  }

  async getUpdatedSClubDetails() {
    await this.pages.farShootClubCheckYourAnswersPage.assertPageTitle();
    return this.pages.farShootClubCheckYourAnswersPage.getUpdatedClubDetails();
  }

  async answerUploadSupportingDocForApproval_ShootClubs() {
    await this.pages.farShootClubUploadSupportingDocsPage.assertPageTitle();
    await this.pages.farShootClubUploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
  }

  async answerUploadAdditionalDocs_ShootClub() {
    await this.pages.farDoYouWantToUploadAdditionalDocsPage.assertPageTitle();
    if (this.isYes('uploadAdditionalDoc')) {
      await this.pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_YES);
      await this.answerUploadSupportingDocForApproval_ShootClubs();
    }
    await this.pages.farDoYouWantToUploadAdditionalDocsPage.answerUploadAdditionalDoc(c.RESPONSE_NO);
    await this.answerIsClubNewClub();
  }

  async answerIsClubNewClub() {
    const club = this.pages.farShootClubIsTheClubNewPage;
    await club.assertPageTitle();
    if (this.isYes('clubANewClub')) await club.answerClubIsNewYes();
    else await club.answerClubIsNewNo();
  }

  async answerEnterClubName() {
    await this.pages.farShootClubWhatIsTheNamePage.assertPageTitle();
    await this.enterClubName();
  }

  async answerEnterClubAndSecAddressDetails() {
    await this.pages.farShootClubWhatIsClubAddressPage.assertPageTitle();
    await this.pages.farShootClubWhatIsClubAddressPage.answerEnterClubAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
    await this.pages.farShootClubWhatIsTheClubSecNamePage.assertPageTitle();
    await this.enterClubSecName();
    await this.pages.farShootClubSecContactAddressPage.expectClubSecretaryContactAddress();
    await this.pages.farShootClubSecContactAddressPage.assertPageTitle();
    await this.enterClubSecAddress();
    await this.pages.farShootClubSecContactDetailsPage.expectClubSecretaryContactDetails();
    await this.pages.farShootClubSecContactDetailsPage.assertPageTitle();
    await this.enterClubEmail();
    await this.pages.farShootClubWhoToContactInAbsencePage.assertPageTitle();
    await this.enterSecondPersonName();
    await this.pages.farShootClubSecContactAddressPage.expectDeputyContactAddress();
    await this.pages.farShootClubSecContactAddressPage.assertPageTitle();
    await this.enterSecondPersonContactAddress();
    await this.pages.farShootClubSecContactDetailsPage.expectDeputyContactDetails();
    await this.pages.farShootClubSecContactDetailsPage.assertPageTitle();
    await this.pages.farShootClubSecContactDetailsPage.answerClubSecContactDetails(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
    await this.shootingRangesAndFirearmsCategoriesToUse();
  }

  async shootingRangesAndFirearmsCategoriesToUse() {
    await this.pages.farShootClubShootingRangesToUsePage.assertPageTitle();
    await this.enterShootingRangesAddress();
    await this.pages.farShootClubFirearmsCategoriesToUsePage.assertPageTitle();
    await this.selectFirearmsCategory();
  }

  async answerClubUseAnotherShootingRange() {
    const ranges = this.pages.farShootClubUseAnotherShootingRangePage;
    expect(await ranges.isFirearmsCategoriesAdded()).toBe(true);
    await ranges.assertPageTitle();
    if (this.isYes('useAnotherShootingRange')) {
      await ranges.answerUseAnotherShootingRangeYes();
      await this.shootingRangesAndFirearmsCategoriesToUse();
    }
    await ranges.answerUseAnotherShootingRangeNo();
    await this.answerFirearmsStorageAddress();
  }

  async answerFirearmsStorageAddress() {
    await this.pages.farShootClubFirearmsStorageAddressesPage.assertPageTitle();
    await this.pages.farShootClubFirearmsStorageAddressesPage.answerSelectStorageAddress();
  }

  async answerAnotherAddressForGunStorage() {
    const storage = this.pages.farShootClubAnotherAddressGunStoragePage;
    expect(await storage.isFirearmsCategoriesAdded()).toBe(true);
    await storage.assertPageTitle();
    if (this.isYes('anotherGunStorageAddress')) {
      await storage.answerUseAnotherAddressYes();
      await this.answerWhereElseGunsBeStored();
    }
    await storage.answerUseAnotherAddressNo();
  }

  async answerWhereElseGunsBeStored() {
    await this.pages.farShootClubWhereElseWillGunBeStoredPage.assertPageTitle();
    await this.pages.farShootClubWhereElseWillGunBeStoredPage.answerEnterGunStorageAddress(c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE);
  }

  async uploadSupportingFile() {
    await this.pages.farS5UploadSupportingDocsPage.uploadSupportingFile(c.UPLOAD_FILE);
  }
  async selectOrgType(orgType: string) {
    await this.pages.farS5WhatTypeOfOrgIsTheAuthForPage.answerSelectCompany(orgType, c.COMPANY_NAME, c.COMPANY_HOUSE_NUMBER);
  }
  async selectWhatWillBeHandled() {
    await this.pages.farS5WhatToHandleUnderTheAuthPage.answerSelectAllWeapons();
  }
  async selectHowProhibitedItemsWillBeObtained() {
    await this.pages.farS5HowWillProhibitedItemsBeObtainedPage.answerSelectAllProhibitedItems();
  }
  async willProhibitedItemsBeImported() {
    await this.pages.farS5WillProhibitedBeImportedPage.answerProhibitedItemBeImportedNo();
  }
  async prohibitedItemsStoredInBusPremises() {
    await this.pages.farS5ProhibitedItemsStoredOnBusinessPremisesPage.answerItemsStoredOnBusPremisesNo();
  }
  async selectBusinessActivities() {
    await this.pages.farS5WhatBusinessActivitiesToCarryOutPage.answerSelectBusinessActivities();
  }
  async selectAmmunitionOrWeaponsSection() {
    await this.pages.farS5AmmunitionSectionsPage.answerSelectUnspecifiedSections();
  }
  async selectHowManyIndividualToBeNamed(holder: string) {
    await this.pages.farS5HowManyIndividualsToBeNamedPage.answerHowManyAuthorityHolder(holder);
  }
  async enterFullNameOfAuthHolder() {
    await this.pages.farS5WhatsTheFullNameOfAuthorityHolderPage.answerEnterNameOfAuthorityHolder(c.FULL_NAME);
  }
  async enterDateOfBirthDetails() {
    await this.pages.farS5WhatAreBirthDayDetailsPage.answerDateOfBirthDetails(c.DOB_11_11_1988, c.TOWN_OR_CITY, c.COUNTRY_OF_BIRTH);
  }
  async enterCountryOfNationality() {
    await this.pages.farS5WhatIsCountryOfNationalityPage.answerEnterCountryOfNationality(c.COUNTRY_UK);
  }
  async enterMainBusinessOrInvoiceAddress() {
    await this.pages.farS5WhatIsHolderMainBusinessPage.answerBusinessDetails(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  }
  async selectWhoToContact() {
    await this.pages.farS5WhoDoWeContactAbtThisApplicationPage.answerContactHolderFirst();
  }
  async selectAddressForContact() {
    await this.pages.farS5WhichAddressToContactYouPage.answerSelectAddress(this.data('testContactAddress'));
  }
  async enterMuseumName() {
    await this.pages.farMuseumTheMuseumNamePage.answerEnterMuseumName(c.MUSEUM_NAME);
  }
  async selectNoForAnotherAddress() {
    await this.pages.farMuseumAnotherAddressForStoragePage.answerFirearmsInAnotherAddressNo();
  }
  async selectYesForAnotherAddress() {
    await this.pages.farMuseumContactAddressSameAsPreviousPage.answerContactAddressTheSameYes();
  }
  async selectAddress() {
    await this.pages.farMuseumSelectTheContactAddressPage.answerSelectContactAddress();
  }
  async selectContactName() {
    await this.pages.farMuseumWhoShouldWeContactAbtThisApplicationPage.answerWhoToContact(this.data('whoShouldWeContact'));
  }
  async selectNoForNewClub() {
    await this.pages.farShootClubIsTheClubNewPage.answerClubIsNewNo();
  }
  async enterClubName() {
    await this.pages.farShootClubWhatIsTheNamePage.answerEnterClubName(c.BUSINESS_OR_COMPANY_NAME);
  }
  async enterClubEmail() {
    await this.pages.farShootClubSecContactDetailsPage.answerClubSecContactDetails(c.CONTACT_EMAIL_ADDRESS, c.TELEPHONE);
  }
  async enterClubSecName() {
    await this.pages.farShootClubWhatIsTheClubSecNamePage.answerEnterClubSecName(c.CLUB_SEC_NAME);
  }
  async enterClubSecAddress() {
    await this.pages.farShootClubSecContactAddressPage.answerClubSecContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  }
  async enterSecondPersonName() {
    await this.pages.farShootClubWhoToContactInAbsencePage.answerEnterClubName(c.CLUB_SEC_DEPUTY_NAME);
  }
  async enterSecondPersonContactAddress() {
    await this.pages.farShootClubSecContactAddressPage.answerClubSecContactAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  }
  async enterSecondPersonEmail() {
    await this.pages.farWhatAreContactDetailsPage.answerHoldersContactDetails(c.CONTACT_EMAIL_ADDRESS, c.CONTACT_TELEPHONE);
  }
  async enterShootingRangesAddress() {
    await this.pages.farShootClubShootingRangesToUsePage.answerShootingRangesAddress(c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE);
  }
  async selectFirearmsCategory() {
    await this.pages.farShootClubFirearmsCategoriesToUsePage.answerSelectFirearmsCategoriesRange();
  }
  async selectNoAnotherShootingRange() {
    await this.pages.farShootClubUseAnotherShootingRangePage.answerUseAnotherShootingRangeNo();
  }
  async selectNoAnotherAddressForGunStorage() {
    await this.pages.farShootClubAnotherAddressGunStoragePage.answerUseAnotherAddressNo();
  }
}

const scenarioSteps = new WeakMap<Page, FarStepLib>();
export function farSteps(pages: Pages, page: Page): FarStepLib {
  let steps = scenarioSteps.get(page);
  if (!steps) {
    steps = new FarStepLib(pages, page);
    scenarioSteps.set(page, steps);
  }
  return steps;
}
