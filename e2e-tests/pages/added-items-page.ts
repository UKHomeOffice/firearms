import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class AddedItemsPage extends BasePage {
  constructor(page: Page, title: string, readonly addedHeading: RegExp) {
    super(page, title);
  }

  async assertAdded(): Promise<void> {
    await this.assertPageTitle();
    await expect(this.page.getByText(this.addedHeading).first()).toBeVisible();
  }

  async answer(option: string, expectAdded = true): Promise<void> {
    if (expectAdded) await this.assertAdded();
    await super.answer(option);
  }
}