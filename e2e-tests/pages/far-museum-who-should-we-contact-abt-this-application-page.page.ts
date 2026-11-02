import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarMuseumWhoShouldWeContactAbtThisApplicationPage extends BasePage {
  readonly whoToContact: Locator;

  constructor(page: Page) {
    super(page);
    this.whoToContact = page.locator("input#contact-name");
  }

  async expectedPageTitle(): Promise<string> {
    return "Who should we contact about this application? – Apply for museum firearms licence";
  }

  async answerWhoToContact(contact: string): Promise<void> {
    await this.typeInto(this.whoToContact, contact);
    await this.clickContinueButton();
  }

}
