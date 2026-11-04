import { BasePage } from './base-page';

export class FarShootClubShootingRangesToUsePage extends BasePage {

  async expectedPageTitle(): Promise<string> {
    return "Which shooting ranges will the club use? – Apply for shooting club approval";
  }
  async answerShootingRangesAddress(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    await this.enterYourAddressNoCountry(addressLine1, addressLine2, townOrCity, postcode);
  }

  async answerShootingRangesAddressWithTitleCheck(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    await this.assertPageTitle();
    await this.answerShootingRangesAddress(addressLine1, addressLine2, townOrCity, postcode);
  }

}
