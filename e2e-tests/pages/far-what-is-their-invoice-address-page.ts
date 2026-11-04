import { BasePage } from './base-page';

export class FarWhatIsTheirInvoiceAddressPage extends BasePage {

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "What is their invoice address?";
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
  async answerInvoiceDetails(addressLine1: string, addressLine2: string, town: string, postcode: string): Promise<void> {
    await this.enterYourAddressNoCountry(addressLine1, addressLine2, town, postcode);
  }

  async answerInvoiceDetailsWithTitleCheck(addressLine1: string, addressLine2: string, town: string, postcode: string): Promise<void> {
    await this.assertPageTitle();
    await this.answerInvoiceDetails(addressLine1, addressLine2, town, postcode);
  }

}
