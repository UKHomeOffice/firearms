import { BasePage } from './base-page';
import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class FarNewDealerAnotherAddressForStoragePage extends BasePage {

  readonly storageAddresses: Locator;

  constructor(page: Page) {
    super(page);
    this.storageAddresses = page.locator("//*[.='Addresses added'] | //*[.='Storage addresses']").first();
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Is there another address where the prohibited items will be stored?";
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

  async answerProhibitedInAnotherAddressYes(): Promise<void> {
    await this.getRadioOrCheckBox2("Yes").click();
    await this.clickContinueButton();
  }

  async answerProhibitedInAnotherAddressNo(): Promise<void> {
    await this.getRadioOrCheckBox2("No").click();
    await this.clickContinueButton();
  }

  async isStorageAddressAdded(): Promise<boolean> {
    await expect(this.deleteBtn).toBeVisible();
    await expect(this.storageAddresses).toBeVisible();
    return true;
  }
}
