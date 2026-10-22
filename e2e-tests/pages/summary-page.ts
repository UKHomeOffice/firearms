import { expect } from '@playwright/test';
import { BasePage } from './base-page';

export class SummaryPage extends BasePage {
  async sectionValues(heading: string): Promise<Record<string, string>> {
    await this.assertPageTitle();
    const sectionHeading = this.page.getByRole('heading', { name: heading, exact: true });
    await expect(sectionHeading).toBeVisible();
    const table = this.page.locator('div:has(> h2)').filter({ has: sectionHeading }).locator('+ table');
    await expect(table).toBeVisible();
    const rows = table.locator('tbody tr');
    const values: Record<string, string> = {};
    for (const row of await rows.all()) {
      const cells = row.locator('td');
      values[(await cells.nth(0).innerText()).trim()] = (await cells.nth(1).innerText()).trim();
    }
    return values;
  }

  async assertSection(heading: string, expected: Record<string, string>): Promise<void> {
    expect(await this.sectionValues(heading)).toEqual(expected);
  }

  async change(fieldId: string): Promise<void> {
    await this.assertPageTitle();
    await this.page.locator(`#${fieldId}-change`).click();
  }

  async deleteMuseumAddress(): Promise<void> {
    await this.page.locator('a.button-delete').click();
  }
}