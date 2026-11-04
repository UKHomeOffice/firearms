import { FarAnotherAddressForStoragePage } from './far-another-address-for-storage';
import type { Locator, Page } from '@playwright/test';

export class FarMuseumAnotherAddressForStoragePage extends FarAnotherAddressForStoragePage {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Is there another address where the firearms will be exhibited or stored? – Apply for museum firearms licence";
  }

  async answerFirearmsInAnotherAddressYes(): Promise<void> {
    await this.itemsInAnotherAddressYes();
  }

  async answerFirearmsInAnotherAddressNo(): Promise<void> {
    await this.itemsInAnotherAddressNo();
  }

  async isStorageAddressAdded(): Promise<boolean> {
    return await super.isStorageAddressAdded();
  }

}
