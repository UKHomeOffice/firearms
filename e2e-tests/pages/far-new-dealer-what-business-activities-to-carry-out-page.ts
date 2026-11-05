import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarNewDealerWhatBusinessActivitiesToCarryOutPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "What business activities will be carried out with the prohibited items?";
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

  async answerSelectBusinessActivities(reason = 'input Text'): Promise<void> {
    await this.getRadioOrCheckBox2("Selling").click();
    await this.getRadioOrCheckBox2("Transporting").click();
    await this.getRadioOrCheckBox2("Transferring").click();
    await this.getRadioOrCheckBox2("armed guards").click();
    await this.getRadioOrCheckBox2("Training").click();
    await this.getRadioOrCheckBox2("Research").click();
    await this.getRadioOrCheckBox2("Deactivation").click();
    await this.getRadioOrCheckBox2("Other").click();
    await this.getTextArea2("TV film").fill(reason);
    await this.clickContinueButton();
  }

  async answerSelectBusinessActivitiesWithTitleCheck(reason = 'input Text'): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerSelectBusinessActivities(reason);
  }

}
