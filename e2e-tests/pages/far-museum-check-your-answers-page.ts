import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarMuseumCheckYourAnswersPage extends BasePage {
  readonly museumName: Locator;
  readonly museumAddressNumb: Locator;
  readonly deleteButton: Locator;
  readonly museumDetailsFields: Locator;
  readonly museumDetailsValues: Locator;
  readonly invoiceDetailsFields: Locator;
  readonly invoiceDetailsValues: Locator;
  readonly contactDetailsFields: Locator;
  readonly contactDetailsValues: Locator;

  constructor(page: Page) {
    super(page);
    this.museumName = page.locator("a#name-change");
    this.museumAddressNumb = page.locator("a#exhibit-addresses-change");
    this.deleteButton = page.getByRole('main').locator("a.button-delete").first();
    this.museumDetailsFields = page.locator("//h2[.='Museum details']/parent::div/following-sibling::table[1]/tbody/tr/td[1]");
    this.museumDetailsValues = page.locator("//h2[.='Museum details']/parent::div/following-sibling::table[1]/tbody/tr/td[2]");
    this.invoiceDetailsFields = page.locator("//h2[.='Who should we contact about the invoice?']/parent::div/following-sibling::table[1]/tbody/tr/td[1]");
    this.invoiceDetailsValues = page.locator("//h2[.='Who should we contact about the invoice?']/parent::div/following-sibling::table[1]/tbody/tr/td[2]");
    this.contactDetailsFields = page.locator("//h2[.='Contact details']/parent::div/following-sibling::table[1]/tbody/tr/td[1]");
    this.contactDetailsValues = page.locator("//h2[.='Contact details']/parent::div/following-sibling::table[1]/tbody/tr/td[2]");
  }

  async expectedPageTitle(): Promise<string> {
    return "Check your answers – Apply for museum firearms licence";
  }

  async getActualSectionValues(header: string): Promise<Record<string, string>> {
    switch (header) {
        case "Museum details":
            return await this.getMuseumDetails();
        case "Contact details":
            return await this.getContactDetails();
        case "Invoice details":
            return await this.getInvoiceDetails();
        default:
            throw new Error(`Unsupported museum check-answers section: ${header}`);
    }
  }

  private async getMuseumDetails(): Promise<Record<string, string>> {
    const museumDetails: Record<string, string> = {};
    for (let i = 0; i < await this.museumDetailsFields.count(); i++) {
        museumDetails[await this.museumDetailsFields.nth(i).innerText()] = await this.museumDetailsValues.nth(i).innerText();
    }
    return museumDetails;
  }

  private async getContactDetails(): Promise<Record<string, string>> {
    const contactDetails: Record<string, string> = {};
    for (let i = 0; i < await this.contactDetailsFields.count(); i++) {
        contactDetails[await this.contactDetailsFields.nth(i).innerText()] = await this.contactDetailsValues.nth(i).innerText();
    }
    return contactDetails;
  }

  private async getInvoiceDetails(): Promise<Record<string, string>> {
    const InvoiceDetails: Record<string, string> = {};
    for (let i = 0; i < await this.invoiceDetailsFields.count(); i++) {
        InvoiceDetails[await this.invoiceDetailsFields.nth(i).innerText()] = await this.invoiceDetailsValues.nth(i).innerText();
    }
    return InvoiceDetails;
  }

  async getUpdatedMuseumDetailsChanges(): Promise<Record<string, string>> {
    return await this.getMuseumDetails();
  }

  async clickToChangeMuseumName(): Promise<void> {
    await this.museumName.click();
  }

  async changeMuseumAddressNum(): Promise<void> {
    await this.museumAddressNumb.click();
    await this.deleteButton.click();
  }

}
