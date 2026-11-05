import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarImportantInformationPage extends BasePage {
  readonly importantInfoText: Locator;
  readonly submitApplication: Locator;

  constructor(page: Page) {
    super(page);
    this.importantInfoText = page.locator("//p[contains(normalize-space(),'Your authority could be revoked if you fail to comply with the:')]");
    this.submitApplication = page.locator("input[value='Submit application']");
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Important information";
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

  async submitApplicationWithConfirmation(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.submitApplication.click();
  }

}
