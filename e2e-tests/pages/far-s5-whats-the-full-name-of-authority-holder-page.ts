import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarS5WhatsTheFullNameOfAuthorityHolderPage extends BasePage {
  readonly holdersName: Locator;

  constructor(page: Page) {
    super(page);
    this.holdersName = page.locator("input#first-authority-holders-name");
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "What's the full name of the authority holder?";
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

  async answerEnterNameOfAuthorityHolder(name: string): Promise<void> {
    await this.typeInto(this.holdersName, name);
    await this.clickContinueButton();
  }

  async answerFullNameOfTheAuthority(name: string): Promise<void> {
    await this.assertPageTitle();
    await this.answerEnterNameOfAuthorityHolder(name);
  }

}
