import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarSupportingDocEnterEmailInOriginalAppPage extends BasePage {
  readonly emailAddress: Locator;

  constructor(page: Page) {
    super(page);
    this.emailAddress = page.locator("input#email");
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Enter the email address used for your original application:";
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

  async answerEnterEmailInOriginalApplication(email: string): Promise<void> {
    await this.typeInto(this.emailAddress, email);
    await this.clickContinueButton();
  }

  async answerEnterEmailInOriginalApplicationWithTitleCheck(email: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerEnterEmailInOriginalApplication(email);
  }

}
