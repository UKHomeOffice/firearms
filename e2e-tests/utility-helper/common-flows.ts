import path from 'node:path';
import type { Pages } from '../fixture/fixtures';
import type { Applicant, Journey } from '../test-data/far-data';
import { isYes } from '../test-data/far-data';
import { ConstantsLib } from './constants-lib';

export function evidencePath(): string {
  return path.resolve('e2e-tests/test-data', ConstantsLib.evidenceFile);
}

export async function uploadSupporting(pages: Pages, journey: Journey): Promise<void> {
  const upload = journey === 'New Dealer' ? pages.s5Upload : pages.clubUpload;
  await upload.complete(evidencePath(), ConstantsLib.uploadDescription);
}

export async function supportingUploads(pages: Pages, applicant: Applicant, journey: Journey): Promise<void> {
  await uploadSupporting(pages, journey);
  if (isYes(applicant.additional)) {
    await pages.additional.answer('Yes');
    await uploadSupporting(pages, journey);
  }
  await pages.additional.answer('No');
  if (journey === 'Shooting Clubs' && applicant.activity === 'Apply for a new authority') {
    await pages.newClub.answer(isYes(applicant.newClub) ? 'Yes' : 'No');
  }
}

export async function chooseJourney(pages: Pages, journey: Journey): Promise<void> {
  await pages.chooseJourney.select(journey);
  if (journey !== 'Supporting Documents') {
    await pages.privacy.assertPageTitle();
    await pages.privacy.continue();
    if (journey === 'New Dealer') {
      await pages.beforeYouStart.assertPageTitle();
      await pages.beforeYouStart.continue();
    }
  }
}

export async function startApplication(pages: Pages, applicant: Applicant, journey: Journey): Promise<void> {
  await chooseJourney(pages, journey);
  await pages.activity.answer(applicant.activity);
  if (applicant.activity !== 'Apply for a new authority') {
    await pages.existingUpload.complete(evidencePath(), ConstantsLib.uploadDescription);
    if (isYes(applicant.additionalExisting)) {
      await pages.additionalExisting.answer('Yes');
      await pages.existingUpload.complete(evidencePath(), ConstantsLib.uploadDescription);
    }
    await pages.additionalExisting.answer('No');
  } else if (journey !== 'Museums') {
    await supportingUploads(pages, applicant, journey);
  }
}

export async function invoice(pages: Pages, applicant: Applicant): Promise<void> {
  await pages.invoiceContact.complete(ConstantsLib.email, ConstantsLib.contactName, ConstantsLib.phone);
  await pages.invoiceAddress.complete(ConstantsLib.address);
  await pages.purchaseOrder.complete(isYes(applicant.purchaseOrder), ConstantsLib.orderNumber);
}