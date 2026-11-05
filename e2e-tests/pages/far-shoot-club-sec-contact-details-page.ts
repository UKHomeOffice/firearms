import { FarContactDetails } from './far-contact-details';
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

  async answerClubSecretaryContactDetails(email: string, phoneNo: string): Promise<void> {
    this.deputyContactExpected = false;
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerClubSecContactDetails(email, phoneNo);
  }

  async answerDeputyContactDetails(email: string, phoneNo: string): Promise<void> {
    this.deputyContactExpected = true;
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerClubSecContactDetails(email, phoneNo);
  }

  async answerClubSecContactDetails(email: string, phoneNo: string): Promise<void> {
    await this.answerTheirContactDetails(email, phoneNo);
  }

}
