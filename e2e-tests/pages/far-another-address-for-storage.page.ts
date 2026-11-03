import { BasePage } from './base-page';
import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class FarAnotherAddressForStoragePage extends BasePage {
  readonly storageAddresses: Locator;
  readonly deleteBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.storageAddresses = page.locator("//*[.='Addresses added'] | //*[.='Storage addresses']").first();
    this.deleteBtn = page.getByRole('main').getByRole('link', { name: 'Delete', exact: true }).first();
  }

  async itemsInAnotherAddressYes(): Promise<void> {
    await this.getRadioOrCheckBox2("Yes").click();
    await this.clickContinueButton();
  }

  async itemsInAnotherAddressNo(): Promise<void> {
    await this.getRadioOrCheckBox2("No").click();
    await this.clickContinueButton();
  }

  async isStorageAddressAdded(): Promise<boolean> {
    await expect(this.deleteBtn).toBeVisible();
    await expect(this.storageAddresses).toBeVisible();
    return true;
  }

}
