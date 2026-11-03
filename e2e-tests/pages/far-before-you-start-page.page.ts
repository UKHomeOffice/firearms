import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarBeforeYouStartPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Before you start";
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

  async clickContinueBtnWithTitleCheck(): Promise<void> {
    await this.assertPageTitle();
    await this.clickContinueButton();
  }
}
