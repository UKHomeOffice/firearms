import { BasePage, type Address } from './base-page';

export class AddressPage extends BasePage {
  async complete(address: Address): Promise<void> {
    await this.assertPageTitle();
    await this.type(this.page.locator('input[id$="-address-line-1"], input[id$="building"]'), address.line1);
    await this.type(this.page.locator('input[id$="-address-line-2"], input[id$="street"]'), address.line2);
    await this.type(this.page.locator('input[id$="-town-or-city"], input[id$="townOrCity"]'), address.town);
    await this.type(this.page.locator('input[id$="postcode"], input[id$="postcodeOrZIPCode"]'), address.postcode);
    await this.continue();
  }
}