import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarMuseumContactAddressSameAsPreviousPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Is the contact address the same as an address previously given? – Apply for museum firearms licence";
  }

  async answerContactAddressTheSameYes(): Promise<void> {
    await this.getRadioOrCheckBox2("Yes").click();
    await this.clickContinueButton();
  }

  async answerContactAddressTheSameNo(): Promise<void> {
    await this.getRadioOrCheckBox2("No").click();
    await this.clickContinueButton();
  }

}
