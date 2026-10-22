import { type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class TextPage extends BasePage {
  constructor(page: Page, title: string | RegExp, readonly selector: string) {
    super(page, title);
  }

  async complete(value: string): Promise<void> {
    await this.assertPageTitle();
    await this.type(this.page.locator(this.selector), value);
    await this.continue();
  }
}