import type { Pages } from '../fixture/fixtures';
import type { Applicant, Journey } from '../test-data/far-data';
import { isYes } from '../test-data/far-data';
import { ConstantsLib } from './constants-lib';
import type { Address } from '../pages/base-page';

function formatAddress(address: Address): string {
  return [address.line1, address.line2, address.town, address.postcode.replaceAll(' ', '')].join(', ');
}

export async function checkAnswers(pages: Pages, applicant: Applicant, journey: Journey, activity: string): Promise<void> {
  const address = formatAddress(ConstantsLib.address);
  const secondAddress = formatAddress(ConstantsLib.secondAddress);
  const contact = { 'Email address': ConstantsLib.email, 'Phone number': ConstantsLib.phone };
  const invoice: Record<string, string> = {
    'Contact name': ConstantsLib.contactName,
    'Contact email address': ConstantsLib.email,
    'Contact phone number': ConstantsLib.phone,
    Address: address,
  };
  if (isYes(applicant.purchaseOrder)) invoice['Purchase order number'] = ConstantsLib.orderNumber;
  if (journey === 'Museums') {
    await pages.summary.assertSection('Museum details', {
      Name: ConstantsLib.museumName,
      Address: isYes(applicant.anotherStorage) ? `${address}\n${secondAddress}` : address,
    });
    await pages.summary.assertSection('Contact details', {
      'Full name': applicant.museumContact!,
      'Select the contact address': isYes(applicant.anotherStorage) ? secondAddress : address,
      ...contact,
    });
  } else if (journey === 'Shooting Clubs') {
    const club: Record<string, string> = { 'Club name': ConstantsLib.clubName, Address: address };
    if (!activity.includes('Renew') && !activity.includes('Amend')) club['Is the club a new club?'] = applicant.newClub!;
    await pages.summary.assertSection('Club details', club);
    await pages.summary.assertSection("Club secretary's details", { 'Full name': ConstantsLib.secretary, Address: address, ...contact });
    await pages.summary.assertSection('Secondary contact details', { 'Full name': ConstantsLib.deputy, Address: address, ...contact });
  } else {
    const birth = {
      'Date of birth': `${ConstantsLib.birthDate.year}-${ConstantsLib.birthDate.month}-${ConstantsLib.birthDate.day}`,
      'Town/city of birth': ConstantsLib.address.town,
      'Country of birth': ConstantsLib.countryOfBirth,
      'Country of nationality': ConstantsLib.nationality,
    };
    if (activity.includes('Amend')) {
      await pages.summary.assertSection('First authority holder', { Name: applicant.firstHolder!, 'Home address': address, ...birth });
      await pages.summary.assertSection('Second authority holder', { 'Second authority holder': applicant.secondHolder!, 'Home Address': address, ...birth });
    } else {
      await pages.summary.assertSection('Authority holder', { Name: applicant.holder!, 'Home address': address, ...birth });
    }
    await pages.summary.assertSection('Contact details', { Name: applicant.contact!, 'Contact address': address, ...contact });
  }
  await pages.summary.assertSection(journey === 'New Dealer' ? 'Invoice details' : 'Who should we contact about the invoice?', invoice);
}