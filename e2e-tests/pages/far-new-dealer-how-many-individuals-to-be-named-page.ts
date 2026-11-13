import { BasePage } from './base-page';
import type { Page } from '@playwright/test';

export class FarNewDealerHowManyIndividualsToBeNamedPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "How many individuals will be named on the authority?";
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

  async answerHowManyAuthorityHolder(authHolder: string): Promise<void> {
    await this.getRadioOrCheckBox2(authHolder).click();
    await this.clickContinueButton();
  }

}
