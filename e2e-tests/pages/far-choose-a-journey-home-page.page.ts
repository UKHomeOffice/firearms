import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarChooseAJourneyHomePage extends BasePage {
  readonly acceptCookiesLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.acceptCookiesLocator = page.locator("button#accept-cookies-button");
  }

  async expectedPageTitle(): Promise<string> {
    return "Choose A Journey – Choose A Journey";
  }

  async openFirearmsHomePage(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async answerSelectAJourney(journey: string): Promise<void> {
    await this.getRadioOrCheckBox2(journey).click();
    await this.clickContinueButton();
  }

  async acceptCookies(): Promise<void> {
    await this.acceptCookiesLocator.click();
  }

}
