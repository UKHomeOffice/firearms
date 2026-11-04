import { expect } from '@playwright/test';
import type { Pages } from '../fixture/fixtures';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

const address = [c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE.replaceAll(' ', '')].join(', ');
const address2 = [c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE.replaceAll(' ', '')].join(', ');

function invoiceDetails(purchaseOrder: boolean): Record<string, string> {
  const invoice: Record<string, string> = {
    'Contact name': c.CONTACT_NAME,
    'Contact email address': c.CONTACT_EMAIL_ADDRESS,
    'Contact phone number': c.CONTACT_TELEPHONE,
    Address: address,
  };
  if (purchaseOrder) invoice['Purchase order number'] = c.ORDER_NUMBER;
  return invoice;
}

const contact = { 'Email address': c.CONTACT_EMAIL_ADDRESS, 'Phone number': c.CONTACT_TELEPHONE };
const holder = (name: string, second: boolean): Record<string, string> => ({
  [second ? 'Second authority holder' : 'Name']: name,
  [second ? 'Home Address' : 'Home address']: address,
  'Date of birth': '1988-11-11',
  'Town/city of birth': c.TOWN_OR_CITY,
  'Country of birth': c.COUNTRY_OF_BIRTH,
  'Country of nationality': c.COUNTRY_UK,
});

async function checkS5Answers(
  pages: Pages, contactName: string, purchaseOrder: boolean, secondHolder = false,
): Promise<void> {
  const expected: Record<string, Record<string, string>> = secondHolder
    ? {
      'First authority holder': holder('Test1', false),
      'Second authority holder': holder('Test2', true),
    }
    : { 'Authority holder': holder('Test', false) };
  expected['Contact details'] = { Name: contactName, 'Contact address': address, ...contact };
  expected['Invoice details'] = invoiceDetails(purchaseOrder);
  for (const [section, values] of Object.entries(expected)) {
    const actual = secondHolder
      ? await pages.farS5CheckYourAnswersPage.getAmendActualSectionValues(section)
      : await pages.farS5CheckYourAnswersPage.getActualSectionValues(section);
    expect(actual, section).toEqual(values);
  }
}

async function checkMuseumAnswers(
  pages: Pages, contactName: string, contactAddress: string, purchaseOrder: boolean,
): Promise<void> {
  const museum = await pages.farMuseumCheckYourAnswersPage.getActualSectionValues('Museum details');
  if (!museum) throw new Error('Museum details section is missing from Check your answers');
  const expected: Record<string, Record<string, string>> = {
    'Museum details': { Name: c.MUSEUM_NAME, Address: museum.Address.includes('\n') ? `${address}\n${address2}` : address },
    'Contact details': { 'Full name': contactName, 'Select the contact address': contactAddress, ...contact },
    'Invoice details': invoiceDetails(purchaseOrder),
  };
  for (const [section, values] of Object.entries(expected)) {
    expect(await pages.farMuseumCheckYourAnswersPage.getActualSectionValues(section), section).toEqual(values);
  }
}

async function checkShootingClubAnswers(pages: Pages, purchaseOrder: boolean, newClub?: string): Promise<void> {
  const expected: Record<string, Record<string, string>> = {
    'Club details': { 'Club name': c.BUSINESS_OR_COMPANY_NAME, Address: address },
    "Club secretary's details": { 'Full name': c.CLUB_SEC_NAME, Address: address, ...contact },
    'Secondary contact details': { 'Full name': c.CLUB_SEC_DEPUTY_NAME, Address: address, ...contact },
    'Invoice details': invoiceDetails(purchaseOrder),
  };
  if (newClub !== undefined) expected['Club details']['Is the club a new club?'] = newClub;
  for (const [section, values] of Object.entries(expected)) {
    expect(await pages.farShootClubCheckYourAnswersPage.getActualSectionValues(section), section).toEqual(values);
  }
}

export async function checkFarAnswers(pages: Pages, journey: string, scenario: string): Promise<void> {
  switch (journey) {
    case 'New Dealer':
      switch (scenario) {
        case 'Apply for a new authority':
          await checkS5Answers(pages, 'Test', true);
          return;
        case 'Renew existing authority':
        case 'Max character':
          await checkS5Answers(pages, 'Test', false);
          return;
        case 'Renew existing authority - additional Supporting doc - Yes':
          await checkS5Answers(pages, 'Someone', true);
          return;
        case 'Amend existing authority':
        case 'Amend existing authority - additional Supporting doc - Yes':
          await checkS5Answers(pages, 'Test2', true, true);
          return;
        default:
          throw new Error(`Unknown FAR scenario description: FARS5/journey/${JSON.stringify(scenario)}`);
      }
    case 'Museums':
      switch (scenario) {
        case 'Apply for a new authority':
          await checkMuseumAnswers(pages, 'MuseumTest', address, false);
          return;
        case 'Apply for a new authority - Another Storage address':
          await checkMuseumAnswers(pages, 'MuseumTester', address2, true);
          return;
        case 'Renew existing authority':
        case 'Amend existing authority':
          await checkMuseumAnswers(pages, 'Test', address, false);
          return;
        case 'Renew existing authority - additional Supporting doc - Yes':
        case 'Amend existing authority - additional Supporting doc - Yes':
          await checkMuseumAnswers(pages, 'Test', address2, true);
          return;
        default:
          throw new Error(`Unknown FAR scenario description: FARMuseum/journey/${JSON.stringify(scenario)}`);
      }
    case 'Shooting Clubs':
      switch (scenario) {
        case 'Apply for a new authority':
          await checkShootingClubAnswers(pages, true, 'Yes');
          return;
        case 'Apply for a new authority - Another Gun Storage address':
          await checkShootingClubAnswers(pages, false, 'No');
          return;
        case 'Renew existing authority':
        case 'Renew existing authority - additional support doc - Yes':
        case 'Amend existing authority - additional support doc - Yes':
          await checkShootingClubAnswers(pages, true);
          return;
        case 'Amend existing authority':
          await checkShootingClubAnswers(pages, false);
          return;
        default:
          throw new Error(`Unknown FAR scenario description: FARShootingClub/journey/${JSON.stringify(scenario)}`);
      }
    default: throw new Error(`Unknown FAR check-answers journey: ${journey}`);
  }
}
