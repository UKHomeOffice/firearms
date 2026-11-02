import { BasePage } from './base-page';

export class HandlePage extends BasePage {
  async complete(): Promise<void> {
    await this.assertPageTitle();
    await this.choose('Weapons or components');
    await this.choose('Ammunition');
    await this.continue();
  }
}