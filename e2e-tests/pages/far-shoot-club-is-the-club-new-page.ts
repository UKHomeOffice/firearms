import { BasePage } from './base-page';
import type { Page } from '@playwright/test';

export class FarShootClubIsTheClubNewPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Is the club a new club? – Apply for shooting club approval";
  }

  async answerClubIsNewYes(): Promise<void> {
    await this.getRadioOrCheckBox2("Yes").click();
    await this.clickContinueButton();
  }

  async answerClubIsNewNo(): Promise<void> {
    await this.getRadioOrCheckBox2("No").click();
    await this.clickContinueButton();
  }

}
