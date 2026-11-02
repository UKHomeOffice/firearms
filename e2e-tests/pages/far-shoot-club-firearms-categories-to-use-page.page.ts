import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarShootClubFirearmsCategoriesToUsePage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Which categories of firearms will be used at this range? – Apply for shooting club approval";
  }

  async answerSelectFirearmsCategoriesRange(): Promise<void> {
    await this.getRadioOrCheckBox2("Full").click();
    await this.getRadioOrCheckBox2("Small").click();
    await this.getRadioOrCheckBox2("Muzzle").click();
    await this.clickContinueButton();
  }

}
