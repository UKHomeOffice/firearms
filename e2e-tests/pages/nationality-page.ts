import { BirthDetailsPage } from './birth-details-page';

export class NationalityPage extends BirthDetailsPage {
  async completeNationality(country: string): Promise<void> {
    await this.assertPageTitle();
    await this.selectCountry(this.page.locator('input[id$="authority-holders-nationality"]'), country);
    await this.continue();
  }
}