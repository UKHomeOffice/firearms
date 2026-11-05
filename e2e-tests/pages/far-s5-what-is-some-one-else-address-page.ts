import { BasePage } from './base-page';

export class FarS5WhatIsSomeOneElseAddressPage extends BasePage {

  async expectedPageTitle(): Promise<string> {
    return "What is their address?";
  }
  async answerSomeoneElseContact(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    await this.enterYourAddressNoCountry(addressLine1, addressLine2, townOrCity, postcode);
  }

  async answerSomeoneElseContactWithTitleCheck(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerSomeoneElseContact(addressLine1, addressLine2, townOrCity, postcode);
  }

}
