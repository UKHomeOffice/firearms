import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarContactDetails extends BasePage {
  readonly contactEmail: Locator;
  readonly contactPhone: Locator;

  constructor(page: Page) {
    super(page);
    this.contactEmail = page.locator("input[id*='-email']");
    this.contactPhone = page.locator("input[id*='-phone']");
  }

  async answerTheirContactDetails(email: string, phoneNo: string): Promise<void> {
    await this.typeInto(this.contactEmail, email);
    await this.typeInto(this.contactPhone, phoneNo);
    await this.clickContinueButton();
  }

}
