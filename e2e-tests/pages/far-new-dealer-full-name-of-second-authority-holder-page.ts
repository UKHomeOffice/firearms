import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarNewDealerFullNameOfSecondAuthorityHolderPage extends BasePage {
  readonly secondHoldersName: Locator;

  constructor(page: Page) {
    super(page);
    this.secondHoldersName = page.locator("input#second-authority-holders-name");
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "What's the full name of the second authority holder?";
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

  async answerSecondAuthorityHolder(holder: string): Promise<void> {
    await this.typeInto(this.secondHoldersName, holder);
    await this.clickContinueButton();
  }

  async answerSecondAuthorityHolderWithTitleCheck(holder: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerSecondAuthorityHolder(holder);
  }

}
