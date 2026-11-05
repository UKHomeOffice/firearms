import { expect } from '@playwright/test';
import type { Pages } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

type SectionAnswers = Record<string, string>;
type ExpectedSections = Record<string, SectionAnswers>;

const primaryAddress = [
  c.ADDRESS_LINE_1,
  c.ADDRESS_LINE_2,
  c.TOWN_OR_CITY,
  c.POSTCODE.replaceAll(' ', ''),
].join(', ');

const additionalAddress = [
  c.B_ADDRESS_LINE_1,
  c.B_ADDRESS_LINE_2,
  c.B_TOWN_OR_CITY,
  c.B_POSTCODE.replaceAll(' ', ''),
].join(', ');

const contactDetails = {
  'Email address': c.CONTACT_EMAIL_ADDRESS,
  'Phone number': c.CONTACT_TELEPHONE,
};

function invoiceDetails(hasPurchaseOrder: boolean): SectionAnswers {
  const invoice: SectionAnswers = {
    'Contact name': c.CONTACT_NAME,
    'Contact email address': c.CONTACT_EMAIL_ADDRESS,
    'Contact phone number': c.CONTACT_TELEPHONE,
    Address: primaryAddress,
  };
  if (hasPurchaseOrder) {
    invoice['Purchase order number'] = c.ORDER_NUMBER;
  }
  return invoice;
}

const holderBirthDetails = {
  'Date of birth': '1988-11-11',
  'Town/city of birth': c.TOWN_OR_CITY,
  'Country of birth': c.COUNTRY_OF_BIRTH,
  'Country of nationality': c.COUNTRY_UK,
};

function authorityHolderDetails(name: string): SectionAnswers {
  return {
    Name: name,
    'Home address': primaryAddress,
    ...holderBirthDetails,
  };
}

async function checkNewDealerAnswers(
  pages: Pages,
  options: { contactName: string; hasPurchaseOrder: boolean; hasSecondHolder?: boolean },
): Promise<void> {
  const { contactName, hasPurchaseOrder, hasSecondHolder = false } = options;
  const expected: ExpectedSections = {};

  if (hasSecondHolder) {
    expected['First authority holder'] = authorityHolderDetails('Test1');
    expected['Second authority holder'] = {
      'Second authority holder': 'Test2',
      'Home Address': primaryAddress,
      ...holderBirthDetails,
    };
  } else {
    expected['Authority holder'] = authorityHolderDetails('Test');
  }

  expected['Contact details'] = {
    Name: contactName,
    'Contact address': primaryAddress,
    ...contactDetails,
  };
  expected['Invoice details'] = invoiceDetails(hasPurchaseOrder);

  for (const [section, values] of Object.entries(expected)) {
    const actual = hasSecondHolder
      ? await pages.farNewDealerCheckYourAnswersPage.getAmendActualSectionValues(section)
      : await pages.farNewDealerCheckYourAnswersPage.getActualSectionValues(section);
    expect(actual, section).toEqual(values);
  }
}

async function checkMuseumAnswers(
  pages: Pages,
  options: { contactName: string; contactAddress: string; hasPurchaseOrder: boolean },
): Promise<void> {
  const { contactName, contactAddress, hasPurchaseOrder } = options;
  const museum = await pages.farMuseumCheckYourAnswersPage.getActualSectionValues('Museum details');
  if (!museum) {
    throw new Error('Museum details section is missing from Check your answers');
  }

  const museumAddress = museum.Address.includes('\n')
    ? `${primaryAddress}\n${additionalAddress}`
    : primaryAddress;
  const expected: ExpectedSections = {
    'Museum details': { Name: c.MUSEUM_NAME, Address: museumAddress },
    'Contact details': {
      'Full name': contactName,
      'Select the contact address': contactAddress,
      ...contactDetails,
    },
    'Invoice details': invoiceDetails(hasPurchaseOrder),
  };
  for (const [section, values] of Object.entries(expected)) {
    expect(await pages.farMuseumCheckYourAnswersPage.getActualSectionValues(section), section).toEqual(values);
  }
}

async function checkShootingClubAnswers(
  pages: Pages,
  options: { hasPurchaseOrder: boolean; isNewClub?: 'Yes' | 'No' },
): Promise<void> {
  const { hasPurchaseOrder, isNewClub } = options;
  const expected: ExpectedSections = {
    'Club details': { 'Club name': c.BUSINESS_OR_COMPANY_NAME, Address: primaryAddress },
    "Club secretary's details": {
      'Full name': c.CLUB_SEC_NAME,
      Address: primaryAddress,
      ...contactDetails,
    },
    'Secondary contact details': {
      'Full name': c.CLUB_SEC_DEPUTY_NAME,
      Address: primaryAddress,
      ...contactDetails,
    },
    'Invoice details': invoiceDetails(hasPurchaseOrder),
  };
  if (isNewClub !== undefined) {
    expected['Club details']['Is the club a new club?'] = isNewClub;
  }
  for (const [section, values] of Object.entries(expected)) {
    expect(await pages.farShootClubCheckYourAnswersPage.getActualSectionValues(section), section).toEqual(values);
  }
}

export async function checkFarAnswers(pages: Pages, journey: string, scenario: string): Promise<void> {
  switch (journey) {
    case 'New Dealer':
      switch (scenario) {
        case 'Apply for a new authority':
          await checkNewDealerAnswers(pages, { contactName: 'Test', hasPurchaseOrder: true });
          return;
        case 'Renew existing authority':
        case 'Max character':
          await checkNewDealerAnswers(pages, { contactName: 'Test', hasPurchaseOrder: false });
          return;
        case 'Renew existing authority - additional Supporting doc - Yes':
          await checkNewDealerAnswers(pages, { contactName: 'Someone', hasPurchaseOrder: true });
          return;
        case 'Amend existing authority':
        case 'Amend existing authority - additional Supporting doc - Yes':
          await checkNewDealerAnswers(pages, {
            contactName: 'Test2',
            hasPurchaseOrder: true,
            hasSecondHolder: true,
          });
          return;
        default:
          throw new Error(`Unknown FAR scenario description: FARNewDealer/journey/${JSON.stringify(scenario)}`);
      }
    case 'Museums':
      switch (scenario) {
        case 'Apply for a new authority':
          await checkMuseumAnswers(pages, {
            contactName: 'MuseumTest',
            contactAddress: primaryAddress,
            hasPurchaseOrder: false,
          });
          return;
        case 'Apply for a new authority - Another Storage address':
          await checkMuseumAnswers(pages, {
            contactName: 'MuseumTester',
            contactAddress: additionalAddress,
            hasPurchaseOrder: true,
          });
          return;
        case 'Renew existing authority':
        case 'Amend existing authority':
          await checkMuseumAnswers(pages, {
            contactName: 'Test',
            contactAddress: primaryAddress,
            hasPurchaseOrder: false,
          });
          return;
        case 'Renew existing authority - additional Supporting doc - Yes':
        case 'Amend existing authority - additional Supporting doc - Yes':
          await checkMuseumAnswers(pages, {
            contactName: 'Test',
            contactAddress: additionalAddress,
            hasPurchaseOrder: true,
          });
          return;
        default:
          throw new Error(`Unknown FAR scenario description: FARMuseum/journey/${JSON.stringify(scenario)}`);
      }
    case 'Shooting Clubs':
      switch (scenario) {
        case 'Apply for a new authority':
          await checkShootingClubAnswers(pages, { hasPurchaseOrder: true, isNewClub: 'Yes' });
          return;
        case 'Apply for a new authority - Another Gun Storage address':
          await checkShootingClubAnswers(pages, { hasPurchaseOrder: false, isNewClub: 'No' });
          return;
        case 'Renew existing authority':
        case 'Renew existing authority - additional support doc - Yes':
        case 'Amend existing authority - additional support doc - Yes':
          await checkShootingClubAnswers(pages, { hasPurchaseOrder: true });
          return;
        case 'Amend existing authority':
          await checkShootingClubAnswers(pages, { hasPurchaseOrder: false });
          return;
        default:
          throw new Error(`Unknown FAR scenario description: FARShootingClub/journey/${JSON.stringify(scenario)}`);
      }
    default:
      throw new Error(`Unknown FAR check-answers journey: ${journey}`);
  }
}
