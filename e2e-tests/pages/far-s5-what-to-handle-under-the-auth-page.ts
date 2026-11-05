import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarS5WhatToHandleUnderTheAuthPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "What will be handled under the authority?";
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

  async answerSelectAllWeapons(): Promise<void> {
    await this.getRadioOrCheckBox2("Weapons or components").click();
    await this.getRadioOrCheckBox2("Ammunition").click();
    await this.clickContinueButton();
  }

  async answerSelectAllWeaponsWithTitleCheck(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerSelectAllWeapons();
  }

}
