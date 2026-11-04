import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarS5WillProhibitedBeImportedPage extends BasePage {
  readonly importCountry: Locator;

  constructor(page: Page) {
    super(page);
    this.importCountry = page.locator("input#import-country");
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Will any of the prohibited items be imported?";
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

  async answerProhibitedItemBeImportedYes(importCountry = 'Import Country'): Promise<void> {
    await this.getRadioOrCheckBox2("Yes").click();
    await this.typeInto(this.importCountry, importCountry);
    await this.clickContinueButton();
  }

  async answerProhibitedItemBeImportedNo(): Promise<void> {
    await this.getRadioOrCheckBox2("No").click();
    await this.clickContinueButton();
  }

}
