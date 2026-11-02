import { BasePage } from './base-page';

export class RangeCategoriesPage extends BasePage {
  async complete(): Promise<void> {
    await this.assertPageTitle();
    for (const label of ['Full', 'Small']) await this.chooseMatching(label);
    await this.page.locator('.govuk-checkboxes__item')
      .filter({ hasText: 'Muzzle-loading pistols' })
      .getByRole('checkbox')
      .check();
    await this.continue();
  }
}