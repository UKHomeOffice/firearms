import { BasePage } from './base-page';

export class FarMuseumWhatIsTheirContactAddressPage extends BasePage {

  async expectedPageTitle(): Promise<string> {
    return "What is their contact address? – Apply for museum firearms licence";
  }
  async answerContactAddress(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    await this.enterYourAddressNoCountry(addressLine1, addressLine2, townOrCity, postcode);
  }

  async answerContactAddressWithTitleCheck(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerContactAddress(addressLine1, addressLine2, townOrCity, postcode);
  }

}
