import { Pages } from '../fixture/fixtures';
import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarSupportDocAppRefNumberPage extends BasePage {
  readonly refNumber: Locator;

  constructor(page: Page) {
    super(page);
    this.refNumber = page.locator("input#reference-number");
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Enter the reference number for your application:";
    if (title.includes("Apply for museum firearms licence")) {
      return subTitle + " – Apply for museum firearms licence";
    }
    if (title.includes("Prohibited weapons and ammunition licensing")) {
      return subTitle + " – Prohibited weapons and ammunition licensing";
    }
    if (title.includes("Apply for shooting club approval")) {
      return subTitle + " – Apply for shooting club approval";
    }
    if (title.includes("Firearms licensing supporting documents")) {
      return subTitle + " – Firearms licensing supporting documents";
    }

    throw new Error("Unexpected page title: " + title);
  }

  async answerEnterAppRefNumber(refNumb: string): Promise<void> {
    await this.typeInto(this.refNumber, refNumb);
    await this.clickContinueButton();
  }
}
