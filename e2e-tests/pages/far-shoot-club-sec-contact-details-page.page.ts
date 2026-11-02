import { FarContactDetails } from './far-contact-details.page';
import type { Locator, Page } from '@playwright/test';

export class FarShootClubSecContactDetailsPage extends FarContactDetails {
  private deputyContactExpected = false;

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const baseMessage = "What are %s contact details? – Apply for shooting club approval";
    return baseMessage.replace('%s', this.deputyContactExpected ? "clubSecDeputyName's" : "clubSecName's");
  }

  async expectClubSecretaryContactDetails(): Promise<void> {
    this.deputyContactExpected = false;
  }

  async expectDeputyContactDetails(): Promise<void> {
    this.deputyContactExpected = true;
  }

  async answerClubSecContactDetails(email: string, phoneNo: string): Promise<void> {
    await this.answerTheirContactDetails(email, phoneNo);
  }

}
