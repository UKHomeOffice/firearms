import { BasePage } from './base-page';

export class WeaponsSectionsPage extends BasePage {
  async complete(section: string, details: string, quantity: string): Promise<void> {
    await this.assertPageTitle();
    if (section.includes('Unspecified')) {
      await this.chooseMatching('Unspecified');
      await this.type(this.page.locator('#weapons-unspecified-details'), details);
    } else if (section.includes('Fully automatic')) {
      await this.chooseMatching('Fully automatic');
      await this.type(this.page.locator('#fully-automatic-quantity'), quantity);
    } else if (section.includes('Launchers')) {
      await this.chooseMatching('Launchers or projecting');
      await this.type(this.page.locator('#projecting-launchers-quantity'), quantity);
    } else {
      throw new Error(`Unknown source weapons section: ${section}`);
    }
    await this.continue();
  }
}