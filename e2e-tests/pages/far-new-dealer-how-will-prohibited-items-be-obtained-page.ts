import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarNewDealerHowWillProhibitedItemsBeObtainedPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "How will the prohibited items be obtained?";
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

  async answerSelectAllProhibitedItems(reason = 'Input Text'): Promise<void> {
    await this.getRadioOrCheckBox2("Buy").click();
    await this.getRadioOrCheckBox2("temporary possession").click();
    await this.getRadioOrCheckBox2("Manufacture").click();
    await this.getRadioOrCheckBox2("The prohibited").click();
    await this.getRadioOrCheckBox2("Acquire through").click();
    await this.getTextArea2("prohibited").fill(reason);
    await this.clickContinueButton();
  }

  async answerSelectAllProhibitedItemsWithTitleCheck(reason = 'Input Text'): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerSelectAllProhibitedItems(reason);
  }

}
