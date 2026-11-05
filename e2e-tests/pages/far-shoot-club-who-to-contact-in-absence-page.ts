import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarShootClubWhoToContactInAbsencePage extends BasePage {
  readonly secondContactName: Locator;

  constructor(page: Page) {
    super(page);
    this.secondContactName = page.locator("input#second-contact-name");
  }

  async expectedPageTitle(): Promise<string> {
    return "Who should we contact in "+ "clubSecName" +"'s absence? – Apply for shooting club approval";
  }

  async answerEnterClubName(name: string): Promise<void> {
    await this.typeInto(this.secondContactName, name);
    await this.clickContinueButton();
  }

  async answerEnterClubNameWithTitleCheck(name: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerEnterClubName(name);
  }

}
