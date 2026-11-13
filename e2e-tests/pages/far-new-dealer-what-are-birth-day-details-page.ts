import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarNewDealerWhatAreBirthDayDetailsPage extends BasePage {
  readonly townBirth: Locator;
  readonly countryBirth: Locator;

  constructor(page: Page) {
    super(page);
    this.townBirth = page.locator("input[id*=authority-town-birth]");
    this.countryBirth = page.getByRole('combobox', { name: 'Country of birth', exact: true });
  }

  async expectedPageTitle(): Promise<string> {
    const baseMessage = "What are the %s authority's birth details?";
    const title = await this.page.title();
    const isFirstAuthority = title.includes("first");
    return baseMessage.replace('%s', isFirstAuthority ? "first" : "second");
  }

  async answerDateOfBirthDetails(dob: string, townOfBirth: string, countryOfBirth: string): Promise<void> {
    await this.enterDateOrDob(dob);
    await this.typeInto(this.townBirth, townOfBirth);
    await this.selectAutocompleteOption(this.countryBirth, countryOfBirth);
    await this.clickContinueButton();
  }

  async answerAuthorityBirthDetails(dob: string, townOfBirth: string, countryOfBirth: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.answerDateOfBirthDetails(dob, townOfBirth, countryOfBirth);
  }

}
