import { BasePage } from './base-page';

export class FarS5WhereWillProhibitedItemsBeStoredPage extends BasePage {

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Where will the prohibited items be stored?";
    if (title.includes("Apply for museum firearms licence")) {
        return subTitle + " – Apply for museum firearms licence";
    }
    if (title.includes("Prohibited weapons and ammunition licensing")) {
        return subTitle + " – Prohibited weapons and ammunition licensing";
    }
    if (title.includes("Apply for shooting club approval")) {
        return subTitle + " – Apply for shooting club approval";
    }

    throw new Error("Unexpected page title: " + title);
  }
  async answerProhibitedItemBeStorage(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    await this.enterYourAddressNoCountry(addressLine1, addressLine2, townOrCity, postcode);
  }

}
