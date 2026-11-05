import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarMuseumTheMuseumNamePage extends BasePage {
  readonly museumName: Locator;

  constructor(page: Page) {
    super(page);
    this.museumName = page.locator("input#name");
  }

  async expectedPageTitle(): Promise<string> {
    return "What is the museum's name? – Apply for museum firearms licence";
  }

  async answerEnterMuseumName(name: string): Promise<void> {
    await this.typeInto(this.museumName, name);
    await this.clickContinueButton();
  }

  async answerEnterMuseumNameWithTitleCheck(name: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerEnterMuseumName(name);
  }

}
