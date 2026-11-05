import { FarContactDetails } from './far-contact-details';
import type { Page } from '@playwright/test';

export class FarWhatAreContactDetailsPage extends FarContactDetails {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    if(title.includes("clubSecName's")) {
        return "What are clubSecName's contact details? – Apply for shooting club approval";
    } else if(title.includes("clubSecDeputyName's")) {
        return "What are clubSecDeputyName's contact details? – Apply for shooting club approval";
    } else {
        return "What are their contact details?";
    }
  }

  async answerHoldersContactDetails(email: string, phoneNo: string): Promise<void> {
    await this.answerTheirContactDetails(email, phoneNo);
  }

  async answerHoldersContactDetailsWithTitleCheck(email: string, phoneNo: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerHoldersContactDetails(email, phoneNo);
  }

}
