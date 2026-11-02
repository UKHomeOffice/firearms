import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarWhoShouldWeContactAbtTheInvoicePage extends BasePage {
  readonly contactNameTextBox: Locator;
  readonly contactEmailTextBox: Locator;
  readonly contactPhoneTextBox: Locator;

  constructor(page: Page) {
    super(page);
    this.contactNameTextBox = page.locator("input#invoice-contact-name");
    this.contactEmailTextBox = page.locator("input#invoice-contact-email");
    this.contactPhoneTextBox = page.locator("input#invoice-contact-phone");
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Who should we contact about the invoice?";
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

  async answerContactDetails(email: string, contactName: string, phoneNo: string): Promise<void> {
    await this.typeInto(this.contactEmailTextBox, email);
    await this.typeInto(this.contactNameTextBox, contactName);
    await this.typeInto(this.contactPhoneTextBox, phoneNo);
    await this.clickContinueButton();
  }

}
