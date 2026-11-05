import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarNewDealerFullNameOfFirstAuthorityHolderPage extends BasePage {
  readonly firstHoldersName: Locator;

  constructor(page: Page) {
    super(page);
    this.firstHoldersName = page.locator("input#first-authority-holders-name");
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "What's the full name of the first authority holder?";
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

  async answerFirstAuthorityHolder(holder: string): Promise<void> {
    await this.typeInto(this.firstHoldersName, holder);
    await this.clickContinueButton();
  }

  async answerFirstAuthorityHolderWithTitleCheck(holder: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerFirstAuthorityHolder(holder);
  }

}
