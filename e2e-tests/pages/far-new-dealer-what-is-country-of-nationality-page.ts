import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarNewDealerWhatIsCountryOfNationalityPage extends BasePage {
  readonly holdersNationality: Locator;
  readonly holdersNationalitySecond: Locator;
  readonly holdersNationalityThird: Locator;

  constructor(page: Page) {
    super(page);
    this.holdersNationality = page.getByRole('combobox', { name: 'Country of nationality', exact: true });
    this.holdersNationalitySecond = page.getByRole('combobox', { name: 'Second nationality (optional)', exact: true });
    this.holdersNationalityThird = page.getByRole('combobox', { name: 'Third nationality (optional)', exact: true });
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

  async answerAddAnotherNationality(secondNationality = 'Panama', thirdNationality = 'Hungary'): Promise<void> {
    await this.page.getByRole('checkbox', { name: 'Add another nationality', exact: true }).check();
    await this.selectAutocompleteOption(this.holdersNationalitySecond, secondNationality);
    await this.selectAutocompleteOption(this.holdersNationalityThird, thirdNationality);
    await this.clickContinueButton();
  }

}
