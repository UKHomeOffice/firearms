import { BasePage } from './base-page';

export class FarShootClubSecContactAddressPage extends BasePage {
  private deputyContactExpected = false;

  async expectedPageTitle(): Promise<string> {
    const baseMessage = "What is %s contact address? – Apply for shooting club approval";
    return baseMessage.replace('%s', this.deputyContactExpected ? "clubSecDeputyName's" : "clubSecName's");
  }

  async expectClubSecretaryContactAddress(): Promise<void> {
    this.deputyContactExpected = false;
  }

  async expectDeputyContactAddress(): Promise<void> {
    this.deputyContactExpected = true;
  }

  async answerClubSecContactAddress(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    await this.enterYourAddressNoCountry(addressLine1, addressLine2, townOrCity, postcode);
  }

}
