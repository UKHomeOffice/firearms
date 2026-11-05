import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarNewDealerWeaponsAndComponentsSectionPage extends BasePage {
  readonly fullyAutomatic: Locator;
  readonly projectingLauncher: Locator;

  constructor(page: Page) {
    super(page);
    this.fullyAutomatic = page.locator("input#fully-automatic-quantity");
    this.projectingLauncher = page.locator("input#projecting-launchers-quantity");
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Weapons or Components Sections";
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

  answerSelectUnspecifiedSection(text?: string): Promise<void>;
  answerSelectUnspecifiedSection(text: string): Promise<void>;
  async answerSelectUnspecifiedSection(text = 'input Text'): Promise<void> {
    await this.getRadioOrCheckBox2("Unspecified").click();
    await this.getTextArea2("quantities of prohibited").fill(text);
    await this.clickContinueButton();
  }

  async answerSelectFullyAutomaticSection(quantity = '111'): Promise<void> {
    await this.getRadioOrCheckBox2("Fully automatic").click();
    await this.typeInto(this.fullyAutomatic, quantity);
    await this.clickContinueButton();
  }

  async answerSelectFullyLaunchersSection(quantity = '20'): Promise<void> {
    await this.getRadioOrCheckBox2("Launchers or projecting").click();
    await this.typeInto(this.projectingLauncher, quantity);
    await this.clickContinueButton();
  }

}
