import { test as base } from 'playwright-bdd';
import { type Page } from '@playwright/test';
import { BasePage } from '../pages/base-page';
import { AddressPage } from '../pages/address-page';
import { TextPage } from '../pages/text-page';
import { ContactDetailsPage } from '../pages/contact-details-page';
import { UploadPage } from '../pages/upload-page';
import { ChooseJourneyPage } from '../pages/choose-journey-page';
import { InvoiceContactPage } from '../pages/invoice-contact-page';
import { PurchaseOrderPage } from '../pages/purchase-order-page';
import { ImportantInformationPage } from '../pages/important-information-page';
import { SubmissionPage } from '../pages/submission-page';
import { OrganisationPage } from '../pages/organisation-page';
import { HandlePage } from '../pages/handle-page';
import { ObtainPage } from '../pages/obtain-page';
import { ImportPage } from '../pages/import-page';
import { BusinessStoragePage } from '../pages/business-storage-page';
import { BusinessActivitiesPage } from '../pages/business-activities-page';
import { WeaponsSectionsPage } from '../pages/weapons-sections-page';
import { AmmunitionSectionsPage } from '../pages/ammunition-sections-page';
import { BirthDetailsPage } from '../pages/birth-details-page';
import { NationalityPage } from '../pages/nationality-page';
import { WhoToContactPage } from '../pages/who-to-contact-page';
import { SummaryPage } from '../pages/summary-page';
import { StorageAddressesPage } from '../pages/storage-addresses-page';
import { RangeCategoriesPage } from '../pages/range-categories-page';
import { AddedItemsPage } from '../pages/added-items-page';
import { SelectContactAddressPage } from '../pages/select-contact-address-page';
import { ScenarioData } from '../test-data/far-data';

function createPages(page: Page) {
  return {
    basePage: new BasePage(page),
    chooseJourney: new ChooseJourneyPage(page, 'Choose A Journey'),
    privacy: new BasePage(page, 'Privacy Notice'),
    beforeYouStart: new BasePage(page, 'Before you start'),
    activity: new BasePage(page, 'What do you want to do?'),
    existingUpload: new UploadPage(page, 'Upload existing authority documents'),
    additionalExisting: new AddedItemsPage(page, 'Do you want to upload any additional existing authority documents to support your application?', /^Documents added$/),
    additional: new AddedItemsPage(page, 'Do you want to upload any additional documents to support your application?', /^Documents added$/),
    s5Upload: new UploadPage(page, 'Upload your supporting documents which must include a cover letter to explain the reason you need to possess weapons from the Secretary of State.'),
    clubUpload: new UploadPage(page, 'Upload your supporting documents which must include a cover letter to explain the reasons you are applying for an approval'),
    supportingUpload: new UploadPage(page, 'Upload supporting documents'),
    invoiceContact: new InvoiceContactPage(page, 'Who should we contact about the invoice?'),
    invoiceAddress: new AddressPage(page, 'What is their invoice address?'),
    purchaseOrder: new PurchaseOrderPage(page, 'Do you have a purchase order?'),
    summary: new SummaryPage(page, 'Check your answers'),
    importantInformation: new ImportantInformationPage(page, 'Important information'),
    submission: new SubmissionPage(page, /^(?:Application|Upload) complete/),
    museumName: new TextPage(page, "What is the museum's name?", '#name'),
    museumStorage: new AddressPage(page, 'Where will the firearms be exhibited or stored?'),
    museumAnotherStorage: new AddedItemsPage(page, 'Is there another address where the firearms will be exhibited or stored?', /^(?:Addresses added|Storage addresses)$/),
    museumContactName: new TextPage(page, 'Who should we contact about this application?', '#contact-name'),
    museumContact: new ContactDetailsPage(page, 'What are their contact details?'),
    museumSameContact: new BasePage(page, 'Is the contact address the same as an address previously given?'),
    museumSelectContact: new SelectContactAddressPage(page, 'Select the contact address'),
    museumContactAddress: new AddressPage(page, 'What is their contact address?'),
    organisation: new OrganisationPage(page, 'What type of organisation is the authority for?'),
    handle: new HandlePage(page, 'What will be handled under the authority?'),
    obtain: new ObtainPage(page, 'How will the prohibited items be obtained?'),
    imported: new ImportPage(page, 'Will any of the prohibited items be imported?'),
    businessStorage: new BusinessStoragePage(page, "Will the prohibited items be stored on the business's premises in the UK?"),
    s5Storage: new AddressPage(page, 'Where will the prohibited items be stored?'),
    s5AnotherStorage: new AddedItemsPage(page, 'Is there another address where the prohibited items will be stored?', /^(?:Addresses added|Storage addresses)$/),
    businessActivities: new BusinessActivitiesPage(page, 'What business activities will be carried out with the prohibited items?'),
    weapons: new WeaponsSectionsPage(page, 'Weapons or Components Sections'),
    ammunition: new AmmunitionSectionsPage(page, 'Ammunition Sections'),
    individuals: new BasePage(page, 'How many individuals will be named on the authority?'),
    holderName: new TextPage(page, "What's the full name of the authority holder?", '#first-authority-holders-name'),
    firstHolderName: new TextPage(page, "What's the full name of the first authority holder?", '#first-authority-holders-name'),
    secondHolderName: new TextPage(page, "What's the full name of the second authority holder?", '#second-authority-holders-name'),
    birth: new BirthDetailsPage(page, /^What are .+'s birth details\?/),
    nationality: new NationalityPage(page, /^What is .+'s country of nationality\?/),
    holderBusinessAddress: new AddressPage(page, /^What is .+'s main business address\?/),
    whoToContact: new WhoToContactPage(page, 'Who do we contact about this application?'),
    s5Contact: new ContactDetailsPage(page, /^What are (?:their|.+'s) contact details\?/),
    s5ContactAddressChoice: new BasePage(page, /^Which address should we use to contact .+\?/),
    s5ContactAddress: new AddressPage(page, /^(?:Which address should we use to contact .+|What is (?:their|.+'s) address)\?/),
    newClub: new BasePage(page, 'Is the club a new club?'),
    clubName: new TextPage(page, "What is the club's name?", '#club-name'),
    clubAddress: new AddressPage(page, "What is the club's address?"),
    secretaryName: new TextPage(page, "What is the club secretary's name?", '#club-secretary-name'),
    secretaryAddress: new AddressPage(page, /^What is .+'s contact address\?/),
    secretaryContact: new ContactDetailsPage(page, /^What are .+'s contact details\?/),
    deputyName: new TextPage(page, /^Who should we contact in .+'s absence\?/, '#second-contact-name'),
    deputyAddress: new AddressPage(page, /^What is .+'s contact address\?/),
    deputyContact: new ContactDetailsPage(page, /^What are .+'s contact details\?/),
    rangeAddress: new AddressPage(page, 'Which shooting ranges will the club use?'),
    rangeCategories: new RangeCategoriesPage(page, 'Which categories of firearms will be used at this range?'),
    anotherRange: new AddedItemsPage(page, 'Will the club use another shooting range?', /Categories of firearms/),
    storageAddresses: new StorageAddressesPage(page, 'At which of these addresses, if any, will the firearms be stored?'),
    clubAnotherStorage: new AddedItemsPage(page, 'Is there another address where the guns will be stored?', /^Storage addresses added$/),
    clubStorage: new AddressPage(page, 'Where else will the guns be stored?'),
    reference: new TextPage(page, 'Enter the reference number for your application:', '#reference-number'),
    originalEmail: new TextPage(page, 'Enter the email address used for your original application:', '#email'),
  };
}

export type Pages = ReturnType<typeof createPages>;

export const test = base.extend<{ pages: Pages; data: ScenarioData }>({
  pages: async ({ page }, use) => { await use(createPages(page)); },
  data: async ({}, use) => { await use(new ScenarioData()); },
});

export const expect = test.expect;