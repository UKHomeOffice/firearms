import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarShootClubWhatIsTheNamePage extends BasePage {
  readonly clubName: Locator;

  constructor(page: Page) {
    super(page);
    this.clubName = page.locator("input#club-name");
  }

  async expectedPageTitle(): Promise<string> {
    return "What is the club's name? – Apply for shooting club approval";
  }

  async answerEnterClubName(name: string): Promise<void> {
    await this.typeInto(this.clubName, name);
    await this.clickContinueButton();
  }

  async answerEnterClubNameWithTitleCheck(name: string): Promise<void> {
    await this.assertPageTitle();
    await this.answerEnterClubName(name);
  }

}
