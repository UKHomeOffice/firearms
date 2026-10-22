import { BasePage } from './base-page';

export class BusinessActivitiesPage extends BasePage {
  async complete(details: string): Promise<void> {
    await this.assertPageTitle();
    for (const label of ['Selling', 'Transporting', 'Transferring', 'armed guards', 'Training', 'Research', 'Deactivation', 'Other']) {
      await this.chooseMatching(label);
    }
    await this.type(this.page.locator('#other-details'), details);
    await this.continue();
  }
}