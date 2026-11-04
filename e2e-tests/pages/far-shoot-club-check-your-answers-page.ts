import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarShootClubCheckYourAnswersPage extends BasePage {
  readonly checkYourAnsText: Locator;
  readonly clubNameChange: Locator;
  readonly clubAddressNumbChange: Locator;
  readonly clubDetailsFields: Locator;
  readonly clubDetailsValues: Locator;
  readonly clubSecretaryFields: Locator;
  readonly clubSecretaryValues: Locator;
  readonly secondContactDetailsFields: Locator;
  readonly secondContactDetailsValues: Locator;
  readonly invoiceDetailsFields: Locator;
  readonly invoiceDetailsValues: Locator;

  constructor(page: Page) {
    super(page);
    this.checkYourAnsText = page.locator("//p[contains(normalize-space(),'Check your answers')]");
    this.clubNameChange = page.locator("a#club-name-change");
    this.clubAddressNumbChange = page.locator("a#club-address-change");
    this.clubDetailsFields = page.locator("//h2[.='Club details']/parent::div/following-sibling::table[1]/tbody/tr/td[1]");
    this.clubDetailsValues = page.locator("//h2[.='Club details']/parent::div/following-sibling::table[1]/tbody/tr/td[2]");
    this.clubSecretaryFields = page.locator("//h2[contains(.,'Club secretary')]/parent::div/following-sibling::table[1]/tbody/tr/td[1]");
    this.clubSecretaryValues = page.locator("//h2[contains(.,'Club secretary')]/parent::div/following-sibling::table[1]/tbody/tr/td[2]");
    this.secondContactDetailsFields = page.locator("//h2[.='Secondary contact details']/parent::div/following-sibling::table[1]/tbody/tr/td[1]");
    this.secondContactDetailsValues = page.locator("//h2[.='Secondary contact details']/parent::div/following-sibling::table[1]/tbody/tr/td[2]");
    this.invoiceDetailsFields = page.locator("//h2[.='Who should we contact about the invoice?']/parent::div/following-sibling::table[1]/tbody/tr/td[1]");
    this.invoiceDetailsValues = page.locator("//h2[.='Who should we contact about the invoice?']/parent::div/following-sibling::table[1]/tbody/tr/td[2]");
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Check your answers";
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

  async getActualSectionValues(header: string): Promise<Record<string, string>> {
    switch (header) {
      case "Club details":
        return await this.getClubDetails();
      case "Club secretary's details":
        return await this.getClubSecDetails();
      case "Secondary contact details":
        return await this.getSecondaryContactDetails();
      case "Invoice details":
        return await this.getInvoiceDetails();
      default:
        throw new Error(`Unsupported shooting-club check-answers section: ${header}`);
    }
  }

  private async getClubDetails(): Promise<Record<string, string>> {
    const clubDetails: Record<string, string> = {};
    for (let i = 0; i < await this.clubDetailsFields.count(); i++) {
      clubDetails[await this.clubDetailsFields.nth(i).innerText()] = await this.clubDetailsValues.nth(i).innerText();
    }
    return clubDetails;
  }

  private async getClubSecDetails(): Promise<Record<string, string>> {
    const clubSecretaryDetails: Record<string, string> = {};
    for (let i = 0; i < await this.clubSecretaryFields.count(); i++) {
      clubSecretaryDetails[await this.clubSecretaryFields.nth(i).innerText()] = await this.clubSecretaryValues.nth(i).innerText();
    }
    return clubSecretaryDetails;
  }

  private async getSecondaryContactDetails(): Promise<Record<string, string>> {
    const secondContactDetails: Record<string, string> = {};
    for (let i = 0; i < await this.secondContactDetailsFields.count(); i++) {
      secondContactDetails[await this.secondContactDetailsFields.nth(i).innerText()] = await this.secondContactDetailsValues.nth(i).innerText();
    }
    return secondContactDetails;
  }

  private async getInvoiceDetails(): Promise<Record<string, string>> {
    const InvoiceDetails: Record<string, string> = {};
    for (let i = 0; i < await this.invoiceDetailsFields.count(); i++) {
      InvoiceDetails[await this.invoiceDetailsFields.nth(i).innerText()] = await this.invoiceDetailsValues.nth(i).innerText();
    }
    return InvoiceDetails;
  }

  async getUpdatedClubDetails(): Promise<Record<string, string>> {
    return await this.getClubDetails();
  }

  async changeClubDetails(): Promise<void> {
    await this.clubNameChange.click();
  }

  async changeClubAddressNumb(): Promise<void> {
    await this.clubAddressNumbChange.click();
  }

  async getUpdatedSClubDetails() {
    await this.assertPageTitle();
    return this.getUpdatedClubDetails();
  }

}
