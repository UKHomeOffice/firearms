import { BasePage } from './base-page';
import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class FarPrivacyNoticePage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const journey = new URL(this.page.url()).pathname.split('/')[1];
    switch (journey) {
      case 's5':
        return 'Privacy Notice – Prohibited weapons and ammunition licensing';
      case 'museums':
        return 'Privacy Notice – Apply for museum firearms licence';
      case 'shooting-clubs':
        return 'Privacy Notice – Apply for shooting club approval';
      default:
        throw new Error(`Unsupported privacy notice journey: ${this.page.url()}`);
    }
  }

  async continueWithTitleCheck(): Promise<void> {
    await expect(this.page).toHaveTitle(
      /^(?:Privacy Notice – Apply for museum firearms licence – GOV\.UK|Privacy Notice – Prohibited weapons and ammunition licensing – GOV\.UK|Privacy Notice – Apply for shooting club approval – GOV\.UK)$/,
    );
    await this.clickContinueButton();
  }

}
