import { BasePage } from './base-page';

export class FarNewDealerWhatIsHolderMainBusinessPage extends BasePage {

  async expectedPageTitle(): Promise<string> {
    const baseMessage = "What is the %s authority's main business address?";
    const title = await this.page.title();
    const isFirstAuthority = title.includes("first");
    return baseMessage.replace('%s', isFirstAuthority ? "first" : "second");
  }
  async answerBusinessDetails(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    await this.enterYourAddressNoCountry(addressLine1, addressLine2, townOrCity, postcode);
  }

  async answerAuthorityMainBusinessAddress(addressLine1: string, addressLine2: string, townOrCity: string, postcode: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerBusinessDetails(addressLine1, addressLine2, townOrCity, postcode);
  }

}
