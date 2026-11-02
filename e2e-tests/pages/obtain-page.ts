import { BasePage } from './base-page';

export class ObtainPage extends BasePage {
  async complete(details: string): Promise<void> {
    await this.assertPageTitle();
    for (const label of ['Buy', 'temporary possession', 'Manufacture', 'The prohibited', 'Acquire through']) {
      await this.chooseMatching(label);
    }
    await this.type(this.page.locator('#other-means-details'), details);
    await this.continue();
  }
}