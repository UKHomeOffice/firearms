import { BasePage } from './base-page';

export class FarMuseumWhereWillFirearmsBeStoredPage extends BasePage {

  async expectedPageTitle(): Promise<string> {
    return "Where will the firearms be exhibited or stored? – Apply for museum firearms licence";
  }
  async answerFirearmsStorage(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    await this.enterYourAddressNoCountry(addressLine1, addressLine2, townOrCity, postcode);
  }

  async answerFirearmsStorageWithTitleCheck(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerFirearmsStorage(addressLine1, addressLine2, townOrCity, postcode);
  }

}
