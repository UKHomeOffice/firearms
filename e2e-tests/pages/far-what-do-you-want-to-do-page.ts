import { BasePage } from './base-page';
import type { Page } from '@playwright/test';

export class FarWhatDoYouWantToDoPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "What do you want to do?";
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

  async answerSelectWhatYouWantToDo(option: string): Promise<void> {
    await this.getRadioOrCheckBox2(option).click();
    await this.clickContinueButton();
  }

}
