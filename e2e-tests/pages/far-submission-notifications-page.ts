import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarSubmissionNotificationsPage extends BasePage {
  readonly applicationComplete: Locator;
  readonly uploadComplete: Locator;
  readonly emailNotificationLocator: Locator;
  readonly willReviewYourApplication: Locator;
  readonly applicationReference: Locator;
  readonly supportingDocLink: Locator;

  constructor(page: Page) {
    super(page);
    this.applicationComplete = page.locator("//h1[contains(normalize-space(),'Application complete')]");
    this.uploadComplete = page.locator("//h1[contains(normalize-space(),'Upload complete')]");
    this.emailNotificationLocator = page.locator("//p[contains(normalize-space(),'We have sent an email to')]");
    this.willReviewYourApplication = page.locator("//p[contains(normalize-space(),'We will review your application.')]");
    this.applicationReference = page.locator("//p[contains(normalize-space(),'Your reference number is')]/strong");
    this.supportingDocLink = page.locator("a#proposition-name");
  }

  async expectedPageTitle(): Promise<string> {
    const journey = new URL(this.page.url()).pathname.split('/')[1];
    switch (journey) {
      case 's5':
        return 'Application complete – Prohibited weapons and ammunition licensing';
      case 'museums':
        return 'Application complete – Apply for museum firearms licence';
      case 'shooting-clubs':
        return 'Application complete – Apply for shooting club approval';
      case 'supporting-documents':
        return 'Upload complete – Firearms licensing supporting documents';
      default:
        throw new Error(`Unsupported confirmation journey: ${this.page.url()}`);
    }
  }

  async emailNotification(): Promise<string> {
    return await this.emailNotificationLocator.innerText();
  }

  async isWillReviewYourApplicationDisplayed(): Promise<string> {
    return await this.willReviewYourApplication.innerText();
  }

  async getApplicationRef(): Promise<string> {
    return await this.applicationReference.innerText();
  }

  async isApplicationRefDisplayed(): Promise<boolean> {
    return await this.applicationReference.isVisible();
  }

  async isApplicationCompleteDisplayed(): Promise<boolean> {
    return await this.applicationComplete.isVisible();
  }

  async isUploadCompleteDisplayed(): Promise<boolean> {
    return await this.uploadComplete.isVisible();
  }

}
