import { BasePage } from './base-page';
import { FarAnotherAddressForStorage } from './far-another-address-for-storage.page';
import type { Locator, Page } from '@playwright/test';

export class FarS5AnotherAddressForStoragePage extends BasePage {
  private readonly farAnotherAddress: FarAnotherAddressForStorage;

  constructor(page: Page) {
    super(page);
    this.farAnotherAddress = new FarAnotherAddressForStorage(page);
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
    await this.farAnotherAddress.itemsInAnotherAddressYes();
  }

  async answerProhibitedInAnotherAddressNo(): Promise<void> {
    await this.farAnotherAddress.itemsInAnotherAddressNo();
  }

  async isStorageAddressAdded(): Promise<boolean> {
    return this.farAnotherAddress.isStorageAddressAdded();
  }

}
