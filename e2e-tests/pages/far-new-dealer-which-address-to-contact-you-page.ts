import { BasePage } from './base-page';

export class FarNewDealerWhichAddressToContactYouPage extends BasePage {

  async expectedPageTitle(): Promise<string> {
    return "Which address should we use to contact the authority holder?";
  }
  async answerSelectAddress(address: string): Promise<void> {
    await this.getRadioOrCheckBox2(address).click();
    await this.clickContinueButton();
  }

  async answerSomeoneElseContact(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    await this.enterYourAddressNoCountry(addressLine1, addressLine2, townOrCity, postcode);
  }

  async answerSelectAddressWithTitleCheck(address: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerSelectAddress(address);
  }

}
