import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarS5WhoDoWeContactAbtThisApplicationPage extends BasePage {
  readonly contactHolderFirst: Locator;
  readonly contactHolderSecond: Locator;
  readonly contactHolderOther: Locator;
  readonly someoneElseName: Locator;

  constructor(page: Page) {
    super(page);
    this.contactHolderFirst = page.locator("//label[@for='contact-holder-first']");
    this.contactHolderSecond = page.locator("//label[@for='contact-holder-second']");
    this.contactHolderOther = page.locator("//label[@for='contact-holder-other']");
    this.someoneElseName = page.locator("input#someone-else-name");
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Who do we contact about this application?";
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

  async answerContactHolderFirst(): Promise<void> {
    await this.contactHolderFirst.click();
    await this.clickContinueButton();
  }

  async answerContactHolderSecond(): Promise<void> {
    await this.contactHolderSecond.click();
    await this.clickContinueButton();
  }

  async answerContactSomeoneElse(contact: string): Promise<void> {
    await this.contactHolderOther.click();
    await this.typeInto(this.someoneElseName, contact);
    await this.clickContinueButton();
  }

}
