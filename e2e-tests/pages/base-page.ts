import { expect, type Locator, type Page } from '@playwright/test';

export interface Address {
  line1: string;
  line2: string;
  town: string;
  postcode: string;
}

export class BasePage {
  constructor(readonly page: Page, readonly title: string | RegExp = /.+/) {}

  expectedPageTitle(): RegExp {
    if (this.title instanceof RegExp) {
      const source = this.title.source.replace(/^\^/, '');
      return new RegExp(`^(?:Error: )?(?:${source})`, this.title.flags);
    }
    const escapedTitle = this.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`^(?:Error: )?${escapedTitle}(?: \\u2013 .+)?$`, 'i');
  }

  async assertPageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(this.expectedPageTitle());
  }

  async type(field: Locator, value: string): Promise<void> {
    await field.focus();
    await field.press('ControlOrMeta+A');
    await field.pressSequentially(value);
    await field.press('Tab');
  }

  async continue(): Promise<void> {
    await this.page.getByRole('button', { name: /^(?:Save and continue|Continue)$/i }).click();
  }

  async choose(option: string): Promise<void> {
    await this.page.getByLabel(option, { exact: true }).check();
  }

  async chooseMatching(option: string): Promise<void> {
    await this.page.getByRole('checkbox', { name: new RegExp(option, 'i') }).check();
  }

  async answer(option: string): Promise<void> {
    await this.assertPageTitle();
    await this.choose(option);
    await this.continue();
  }

  async assertErrors(expected: string): Promise<void> {
    const messages = expected.trim().split(/\r?\n/).map(message => message.trim());
    await expect(this.page.locator('.govuk-error-summary__list li')).toHaveText(messages);
  }
}