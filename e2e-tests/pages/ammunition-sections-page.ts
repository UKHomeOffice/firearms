import { BasePage } from './base-page';

export class AmmunitionSectionsPage extends BasePage {
  async complete(section: string, details: string, quantities: Record<string, string>): Promise<void> {
    await this.assertPageTitle();
    if (section.includes('Unspecified')) {
      await this.chooseMatching('Unspecified');
      await this.type(this.page.locator('#ammunition-unspecified-details'), details);
    } else if (section.includes('Actual missiles')) {
      for (const option of ['incendiary', 'armour-piercing', 'expanding missile', 'Actual missiles']) {
        await this.chooseMatching(option);
      }
      for (const [fieldId, quantity] of Object.entries(quantities)) {
        await this.type(this.page.locator(`#${fieldId}`), quantity);
      }
    } else if (section.includes('Cartridges')) {
      await this.chooseMatching('Cartridges');
      await this.type(this.page.locator('#explosive-cartridges-quantity'), quantities['explosive-cartridges-quantity']);
    } else {
      throw new Error(`Unknown source ammunition section: ${section}`);
    }
    await this.continue();
  }
}