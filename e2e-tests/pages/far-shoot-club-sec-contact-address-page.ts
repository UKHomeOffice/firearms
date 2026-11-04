import { BasePage } from './base-page';

export class FarShootClubSecContactAddressPage extends BasePage {
  private deputyContactExpected = false;

  async expectedPageTitle(): Promise<string> {
    const baseMessage = "What is %s contact address? – Apply for shooting club approval";
    return baseMessage.replace('%s', this.deputyContactExpected ? "clubSecDeputyName's" : "clubSecName's");
  }

  async answerClubSecretaryContactAddress(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    this.deputyContactExpected = false;
    await this.assertPageTitle();
    await this.answerClubSecContactAddress(addressLine1, addressLine2, townOrCity, postcode);
  }

  async answerDeputyContactAddress(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    this.deputyContactExpected = true;
    await this.assertPageTitle();
    await this.answerClubSecContactAddress(addressLine1, addressLine2, townOrCity, postcode);
  }

  async answerClubSecContactAddress(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    await this.enterYourAddressNoCountry(addressLine1, addressLine2, townOrCity, postcode);
  }

}
