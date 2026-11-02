import { expect } from '@playwright/test';
import { FarStepLib } from './far.step';
import { ConstantsLib as c } from '../utility-helper/constants-lib';

const address = [c.ADDRESS_LINE_1, c.ADDRESS_LINE_2, c.TOWN_OR_CITY, c.POSTCODE.replaceAll(' ', '')].join(', ');
const address2 = [c.B_ADDRESS_LINE_1, c.B_ADDRESS_LINE_2, c.B_TOWN_OR_CITY, c.B_POSTCODE.replaceAll(' ', '')].join(', ');

export async function checkFarAnswers(steps: FarStepLib, journey: string, activity: string) {
  const invoice: Record<string, string> = {
    'Contact name': c.CONTACT_NAME,
    'Contact email address': c.CONTACT_EMAIL_ADDRESS,
    'Contact phone number': c.CONTACT_TELEPHONE,
    Address: address,
  };
  if (steps.isYes('purchaseOrder')) invoice['Purchase order number'] = c.ORDER_NUMBER;
  const contact = { 'Email address': c.CONTACT_EMAIL_ADDRESS, 'Phone number': c.CONTACT_TELEPHONE };
  const holder = (name: string, second: boolean): Record<string, string> => ({
    [second ? 'Second authority holder' : 'Name']: name,
    [second ? 'Home Address' : 'Home address']: address,
    'Date of birth': '1988-11-11',
    'Town/city of birth': c.TOWN_OR_CITY,
    'Country of birth': c.COUNTRY_OF_BIRTH,
    'Country of nationality': c.COUNTRY_UK,
  });

  switch (journey) {
    case 'New Dealer': {
      const expected: Record<string, Record<string, string>> = activity.includes('Amend')
        ? {
          'First authority holder': holder(steps.data('nameOfFirstAuthorityHolder'), false),
          'Second authority holder': holder(steps.data('nameOfSecondAuthorityHolder'), true),
        }
        : { 'Authority holder': holder(steps.data('nameOfAuthorityHolder'), false) };
      expected['Contact details'] = { Name: steps.data('whoToContactAbtApplication'), 'Contact address': address, ...contact };
      expected['Invoice details'] = invoice;
      for (const [section, values] of Object.entries(expected)) {
        const actual = activity.includes('Amend')
          ? await steps.pages.farS5CheckYourAnswersPage.getAmendActualSectionValues(section)
          : await steps.pages.farS5CheckYourAnswersPage.getActualSectionValues(section);
        expect(actual, section).toEqual(values);
      }
      break;
    }
    case 'Museums': {
      const museum = await steps.pages.farMuseumCheckYourAnswersPage.getActualSectionValues('Museum details');
      if (!museum) throw new Error('Museum details section is missing from Check your answers');
      const expected: Record<string, Record<string, string>> = {
        'Museum details': { Name: c.MUSEUM_NAME, Address: museum.Address.includes('\n') ? `${address}\n${address2}` : address },
        'Contact details': {
          'Full name': steps.data('whoShouldWeContact'),
          'Select the contact address': steps.isYes('anotherAddressToStoreFirearms') ? address2 : address,
          ...contact,
        },
        'Invoice details': invoice,
      };
      for (const [section, values] of Object.entries(expected)) {
        expect(await steps.pages.farMuseumCheckYourAnswersPage.getActualSectionValues(section), section).toEqual(values);
      }
      break;
    }
    case 'Shooting Clubs': {
      const expected: Record<string, Record<string, string>> = {
        'Club details': { 'Club name': c.BUSINESS_OR_COMPANY_NAME, Address: address },
        "Club secretary's details": { 'Full name': c.CLUB_SEC_NAME, Address: address, ...contact },
        'Secondary contact details': { 'Full name': c.CLUB_SEC_DEPUTY_NAME, Address: address, ...contact },
        'Invoice details': invoice,
      };
      if (!activity.includes('Renew') && !activity.includes('Amend')) {
        expected['Club details']['Is the club a new club?'] = steps.data('clubANewClub');
      }
      for (const [section, values] of Object.entries(expected)) {
        expect(await steps.pages.farShootClubCheckYourAnswersPage.getActualSectionValues(section), section).toEqual(values);
      }
      break;
    }
    default: throw new Error(`Unknown FAR check-answers journey: ${journey}`);
  }
}
