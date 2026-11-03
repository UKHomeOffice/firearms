import { BasePage } from './base-page';

export class FarShootClubWhatIsClubAddressPage extends BasePage {

  async expectedPageTitle(): Promise<string> {
    return "What is the club's address? – Apply for shooting club approval";
  }
  async answerEnterClubAddress(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    await this.enterYourAddressNoCountry(addressLine1, addressLine2, townOrCity, postcode);
  }

  async answerEnterClubAddressWithTitleCheck(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    await this.assertPageTitle();
    await this.answerEnterClubAddress(addressLine1, addressLine2, townOrCity, postcode);
  }

}
