import { BasePage } from './base-page';
import { FarContactDetails } from './far-contact-details';
import type { Page } from '@playwright/test';

export class FarMuseumWhatAreTheirContactDetailsPage extends BasePage {
  private readonly farTheirContactDetails: FarContactDetails;

  constructor(page: Page) {
    super(page);
    this.farTheirContactDetails = new FarContactDetails(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "What are their contact details? – Apply for museum firearms licence";
  }

  async answerTheirContactDetails(email: string, phoneNo: string): Promise<void> {
    await this.farTheirContactDetails.answerTheirContactDetails(email, phoneNo);
  }

  async answerTheirContactDetailsWithTitleCheck(email: string, phoneNo: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerTheirContactDetails(email, phoneNo);
  }

}
