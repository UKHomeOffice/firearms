import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarMuseumSelectTheContactAddressPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Select the contact address – Apply for museum firearms licence";
  }

  async selectContactAddress(): Promise<Locator> {
    return this.page.locator("input[name='contact-address']");
  }

  async answerSelectContactAddress(): Promise<void> {
    await (await this.selectContactAddress()).click();
    await this.clickContinueButton();
  }

  async answerSelectContactAddressWithTitleCheck(): Promise<void> {
    await this.assertPageTitle();
    await this.answerSelectContactAddress();
  }

}
