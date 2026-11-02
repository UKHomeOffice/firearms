import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarS5ProhibitedItemsStoredOnBusinessPremisesPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Will the prohibited items be stored on the business's premises in the UK?";
    if (title.includes("Apply for museum firearms licence")) {
        return subTitle + " – Apply for museum firearms licence";
    }
    if (title.includes("Prohibited weapons and ammunition licensing")) {
        return subTitle + " – Prohibited weapons and ammunition licensing";
    }
    if (title.includes("Apply for shooting club approval")) {
        return subTitle + " – Apply for shooting club approval";
    }

    throw new Error("Unexpected page title: " + title);
  }

  async answerItemsStoredOnBusPremisesYes(): Promise<void> {
    await this.getRadioOrCheckBox2("Yes").click();
    await this.clickContinueButton();
  }

  async answerItemsStoredOnBusPremisesNo(
    reason = 'The Prohibited items will be stored in business premises',
  ): Promise<void> {
    await this.getRadioOrCheckBox2("No").click();
    await this.getTextArea2("prohibited items").fill(reason);
    await this.clickContinueButton();
  }

}
