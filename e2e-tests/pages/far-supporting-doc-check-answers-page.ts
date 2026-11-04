import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarSupportingDocCheckAnswersPage extends BasePage {
  readonly changeRefNumb: Locator;
  readonly applicationDetailsFields: Locator;
  readonly applicationDetailsValues: Locator;

  constructor(page: Page) {
    super(page);
    this.changeRefNumb = page.locator("a#reference-number-change");
    this.applicationDetailsFields = page.locator("//h2[.='Application details']/parent::div/following-sibling::table[1]/tbody/tr/td[1]");
    this.applicationDetailsValues = page.locator("//h2[.='Application details']/parent::div/following-sibling::table[1]/tbody/tr/td[2]");
  }

  async expectedPageTitle(): Promise<string> {
    return "Check your answers – Apply for museum firearms licence";
  }

  async getApplicationDetails(): Promise<Record<string, string>> {
    const applicationDetails: Record<string, string> = {};
    for (let i = 0; i < await this.applicationDetailsFields.count(); i++) {
        applicationDetails[await this.applicationDetailsFields.nth(i).innerText()] = await this.applicationDetailsValues.nth(i).innerText();
    }
    return applicationDetails;
  }

}
