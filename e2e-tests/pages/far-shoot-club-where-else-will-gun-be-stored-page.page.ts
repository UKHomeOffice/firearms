import { BasePage } from './base-page';

export class FarShootClubWhereElseWillGunBeStoredPage extends BasePage {

  async expectedPageTitle(): Promise<string> {
    return "Where else will the guns be stored? – Apply for shooting club approval";
  }
  async answerEnterGunStorageAddress(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    await this.enterYourAddressNoCountry(addressLine1, addressLine2, townOrCity, postcode);
  }

}
