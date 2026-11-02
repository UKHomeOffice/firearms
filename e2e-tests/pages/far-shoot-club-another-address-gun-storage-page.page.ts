import { BasePage } from './base-page';
import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class FarShootClubAnotherAddressGunStoragePage extends BasePage {
  readonly storageAddressAdded: Locator;
  readonly deleteBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.storageAddressAdded = page.locator("//table/*[contains(.,'Storage addresses added')]").first();
    this.deleteBtn = page.getByRole('main').getByRole('link', { name: 'Delete', exact: true }).first();
  }

  async expectedPageTitle(): Promise<string> {
    return "Is there another address where the guns will be stored? – Apply for shooting club approval";
  }

  async answerUseAnotherAddressYes(): Promise<void> {
    await this.getRadioOrCheckBox2("Yes").click();
    await this.clickContinueButton();
  }

  async answerUseAnotherAddressNo(): Promise<void> {
    await this.getRadioOrCheckBox2("No").click();
    await this.clickContinueButton();
  }

  async isFirearmsCategoriesAdded(): Promise<boolean> {
    await expect(this.deleteBtn).toBeVisible();
    await expect(this.storageAddressAdded).toBeVisible();
    return true;
  }

}
