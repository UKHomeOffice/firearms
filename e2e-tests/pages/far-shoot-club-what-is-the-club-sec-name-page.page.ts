import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarShootClubWhatIsTheClubSecNamePage extends BasePage {
  readonly clubSecName: Locator;

  constructor(page: Page) {
    super(page);
    this.clubSecName = page.locator("input#club-secretary-name");
  }

  async expectedPageTitle(): Promise<string> {
    return "What is the club secretary's name? – Apply for shooting club approval";
  }

  async answerEnterClubSecName(name: string): Promise<void> {
    await this.typeInto(this.clubSecName, name);
    await this.clickContinueButton();
  }

}
