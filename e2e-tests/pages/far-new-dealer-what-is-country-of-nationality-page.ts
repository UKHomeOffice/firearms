import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarNewDealerWhatIsCountryOfNationalityPage extends BasePage {
  readonly holdersNationality: Locator;

  constructor(page: Page) {
    super(page);
    this.holdersNationality = page.getByRole('combobox', { name: 'Country of nationality', exact: true });
  }

  async expectedPageTitle(): Promise<string> {
    const baseMessage = "What is the %s authority's country of nationality?";
    const title = await this.page.title();
    const isFirstAuthority = title.includes("first");
    return baseMessage.replace('%s', isFirstAuthority ? "first" : "second");
  }

  async answerEnterCountryOfNationality(countryOfNationality: string): Promise<void> {
    await this.selectAutocompleteOption(this.holdersNationality, countryOfNationality);
    await this.clickContinueButton();
  }

  async answerAuthorityNationality(countryOfNationality: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerEnterCountryOfNationality(countryOfNationality);
  }

}
