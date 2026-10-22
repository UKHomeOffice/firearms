import { expect, type Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class BirthDetailsPage extends BasePage {
  async selectCountry(field: Locator, country: string): Promise<void> {
    await field.focus();
    await field.press('ControlOrMeta+A');
    await field.pressSequentially(country);
    const option = this.page.getByRole('option', { name: country, exact: true });
    await expect(option).toBeVisible();
    await option.click();
    await field.press('Tab');
  }

  async complete(date: { day: string; month: string; year: string }, town: string, country: string): Promise<void> {
    await this.assertPageTitle();
    await this.type(this.page.getByLabel('Day', { exact: true }), date.day);
    await this.type(this.page.getByLabel('Month', { exact: true }), date.month);
    await this.type(this.page.getByLabel('Year', { exact: true }), date.year);
    await this.type(this.page.locator('input[id$="authority-town-birth"]'), town);
    await this.selectCountry(this.page.locator('input[id$="authority-country-birth"]'), country);
    await this.continue();
  }
}