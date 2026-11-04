import { BasePage } from './base-page';
import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class FarShootClubUseAnotherShootingRangePage extends BasePage {
  readonly catOfFirearms: Locator;
  readonly deleteBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.catOfFirearms = page.locator("//th[contains(.,'Categories of firearms')]").first();
    this.deleteBtn = page.getByRole('main').getByRole('link', { name: 'Delete', exact: true }).first();
  }

  async expectedPageTitle(): Promise<string> {
    return "Will the club use another shooting range? – Apply for shooting club approval";
  }

  async answerUseAnotherShootingRangeYes(): Promise<void> {
    await this.getRadioOrCheckBox2("Yes").click();
    await this.clickContinueButton();
  }

  async answerUseAnotherShootingRangeNo(): Promise<void> {
    await this.getRadioOrCheckBox2("No").click();
    await this.clickContinueButton();
  }

  async isFirearmsCategoriesAdded(): Promise<boolean> {
    await expect(this.deleteBtn).toBeVisible();
    await expect(this.catOfFirearms).toBeVisible();
    return true;
  }

}
