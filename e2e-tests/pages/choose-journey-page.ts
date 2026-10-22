import { BasePage } from './base-page';

export class ChooseJourneyPage extends BasePage {
  async open(acceptCookies = false): Promise<void> {
    await this.page.goto('/');
    await this.assertPageTitle();
    if (acceptCookies) await this.page.locator('#accept-cookies-button').click();
  }

  async select(journey: string): Promise<void> {
    await this.answer(journey);
  }
}