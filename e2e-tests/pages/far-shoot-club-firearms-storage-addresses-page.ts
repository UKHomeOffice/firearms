import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarShootClubFirearmsStorageAddressesPage extends BasePage {
  readonly shootingRangeAddress2: Locator;
  readonly shootingRangeAddress1 = "//*[normalize-space()='Shooting ranges']/following::input[1]";
  readonly clubSecContactAddress = "//*[normalize-space()=\"Club secretary's contact address\"]/following::input[1]";

  constructor(page: Page) {
    super(page);
    this.shootingRangeAddress2 = page.locator("//*[normalize-space()='Shooting ranges']/following::input[2]");
  }

  async expectedPageTitle(): Promise<string> {
    return "At which of these addresses, if any, will the firearms be stored? – Apply for shooting club approval";
  }

  getCheckBox(loc: string): Locator {
    return this.page.locator(loc);
  }

  async answerSelectStorageAddress(): Promise<void> {
    await this.getCheckBox(this.shootingRangeAddress1).click();
    await this.getCheckBox(this.clubSecContactAddress).click();
    await this.clickContinueButton();
  }

  async answerSelectStorageAddressWithTitleCheck(): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerSelectStorageAddress();
  }

}
