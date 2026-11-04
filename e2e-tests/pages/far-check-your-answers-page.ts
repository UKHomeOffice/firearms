import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarCheckYourAnswersPage extends BasePage {
  readonly checkYourAnsText: Locator;

  constructor(page: Page) {
    super(page);
    this.checkYourAnsText = page.locator("//p[contains(normalize-space(),'Check your answers')]");
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Check your answers";
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

  async isAbleToCheckAnswers(): Promise<boolean> {
    return await this.checkYourAnsText.isVisible();
  }

}
