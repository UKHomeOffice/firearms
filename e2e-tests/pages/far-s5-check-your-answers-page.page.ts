import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarS5CheckYourAnswersPage extends BasePage {
  readonly changeCompanyName: Locator;
  readonly changeCompanyHouseNumb: Locator;
  readonly businessDetailsFields: Locator;
  readonly businessDetailsValues: Locator;
  readonly authorityHolderFields: Locator;
  readonly authorityHolderValues: Locator;
  readonly firstAuthHolderFields: Locator;
  readonly firstAuthHolderValues: Locator;
  readonly secondAuthHolderFields: Locator;
  readonly secondAuthHolderValues: Locator;
  readonly contactDetailsFields: Locator;
  readonly contactDetailsValues: Locator;
  readonly invoiceDetailsFields: Locator;
  readonly invoiceDetailsValues: Locator;

  constructor(page: Page) {
    super(page);
    this.changeCompanyName = page.locator("a#company-name-change");
    this.changeCompanyHouseNumb = page.locator("a#company-house-number-change");
    this.businessDetailsFields = page.locator("//h2[.='Business details']/parent::div/following-sibling::table[1]/tbody/tr/td[1]");
    this.businessDetailsValues = page.locator("//h2[.='Business details']/parent::div/following-sibling::table[1]/tbody/tr/td[2]");
    this.authorityHolderFields = page.locator("//h2[.='Authority holder']/parent::div/following-sibling::table[1]/tbody/tr/td[1]");
    this.authorityHolderValues = page.locator("//h2[.='Authority holder']/parent::div/following-sibling::table[1]/tbody/tr/td[2]");
    this.firstAuthHolderFields = page.locator("//h2[.='First authority holder']/parent::div/following-sibling::table[1]/tbody/tr/td[1]");
    this.firstAuthHolderValues = page.locator("//h2[.='First authority holder']/parent::div/following-sibling::table[1]/tbody/tr/td[2]");
    this.secondAuthHolderFields = page.locator("//h2[.='Second authority holder']/parent::div/following-sibling::table[1]/tbody/tr/td[1]");
    this.secondAuthHolderValues = page.locator("//h2[.='Second authority holder']/parent::div/following-sibling::table[1]/tbody/tr/td[2]");
    this.contactDetailsFields = page.locator("//h2[.='Contact details']/parent::div/following-sibling::table[1]/tbody/tr/td[1]");
    this.contactDetailsValues = page.locator("//h2[.='Contact details']/parent::div/following-sibling::table[1]/tbody/tr/td[2]");
    this.invoiceDetailsFields = page.locator("//h2[.='Invoice details']/parent::div/following-sibling::table[1]/tbody/tr/td[1]");
    this.invoiceDetailsValues = page.locator("//h2[.='Invoice details']/parent::div/following-sibling::table[1]/tbody/tr/td[2]");
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
        case "Authority holder":
            return await this.getAuthorityHolder();
        case "Contact details":
            return await this.getContactDetails();
        case "Invoice details":
            return await this.getInvoiceDetails();
        default:
            throw new Error(`Unsupported section-5 check-answers section: ${header}`);
    }
  }

  async getAmendActualSectionValues(header: string): Promise<Record<string, string>> {
    switch (header) {
        case "First authority holder":
            return await this.getFirstAuthorityHolder();
        case "Second authority holder":
            return await this.getSecondAuthorityHolder();
        case "Contact details":
            return await this.getContactDetails();
        case "Invoice details":
            return await this.getInvoiceDetails();
        default:
            throw new Error(`Unsupported amended section-5 check-answers section: ${header}`);
    }
  }

  private async getBusinessDetails(): Promise<Record<string, string>> {
    const businessDetails: Record<string, string> = {};
    for (let i = 0; i < await this.businessDetailsFields.count(); i++) {
        businessDetails[await this.businessDetailsFields.nth(i).innerText()] = await this.businessDetailsValues.nth(i).innerText();
    }
    return businessDetails;
  }

  private async getAuthorityHolder(): Promise<Record<string, string>> {
    const authorityHolderDetails: Record<string, string> = {};
    for (let i = 0; i < await this.authorityHolderFields.count(); i++) {
        authorityHolderDetails[await this.authorityHolderFields.nth(i).innerText()] = await this.authorityHolderValues.nth(i).innerText();
    }
    return authorityHolderDetails;
  }

  private async getFirstAuthorityHolder(): Promise<Record<string, string>> {
    const firstAuthHolderDetails: Record<string, string> = {};
    for (let i = 0; i < await this.firstAuthHolderFields.count(); i++) {
        firstAuthHolderDetails[await this.firstAuthHolderFields.nth(i).innerText()] = await this.firstAuthHolderValues.nth(i).innerText();
    }
    return firstAuthHolderDetails;
  }

  private async getSecondAuthorityHolder(): Promise<Record<string, string>> {
    const secondAuthHolderDetails: Record<string, string> = {};
    for (let i = 0; i < await this.secondAuthHolderFields.count(); i++) {
        secondAuthHolderDetails[await this.secondAuthHolderFields.nth(i).innerText()] = await this.secondAuthHolderValues.nth(i).innerText();
    }
    return secondAuthHolderDetails;
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

  async getUpdatedBusinessDetails(): Promise<Record<string, string>> {
    return await this.getBusinessDetails();
  }

  async clickToChangeBusinessDetails(): Promise<void> {
    await this.changeCompanyName.click();
  }

}
