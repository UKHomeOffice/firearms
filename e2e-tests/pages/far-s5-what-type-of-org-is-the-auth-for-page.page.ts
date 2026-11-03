import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarS5WhatTypeOfOrgIsTheAuthForPage extends BasePage {
  readonly companyName: Locator;
  readonly companyHouseNo: Locator;
  readonly soleTraderName: Locator;
  readonly shootingClubName: Locator;
  readonly charityName: Locator;
  readonly charityNo: Locator;
  readonly museumName: Locator;
  readonly otherName: Locator;

  constructor(page: Page) {
    super(page);
    this.companyName = page.locator("input#company-name");
    this.companyHouseNo = page.locator("input#company-house-number");
    this.soleTraderName = page.locator("input#sole-trader-name");
    this.shootingClubName = page.locator("input#shooting-club-name");
    this.charityName = page.locator("input#charity-name");
    this.charityNo = page.locator("input#charity-number");
    this.museumName = page.locator("input#museum-name");
    this.otherName = page.locator("input#other-name");
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "What type of organisation is the authority for?";
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

  async answerSelectCompany(org: string, compName: string, compHouseNo: string): Promise<void> {
    await this.getRadioOrCheckBox2(org).click();
    await this.typeInto(this.companyName, compName);
    await this.typeInto(this.companyHouseNo, compHouseNo);
    await this.clickContinueButton();
  }

  async answerSelectSoleTrader(org: string, traderName: string): Promise<void> {
    await this.getRadioOrCheckBox2(org).click();
    await this.typeInto(this.soleTraderName, traderName);
    await this.clickContinueButton();
  }

  async answerSelectShootingClub(org: string, shootClubName: string): Promise<void> {
    await this.getRadioOrCheckBox2(org).click();
    await this.typeInto(this.shootingClubName, shootClubName);
    await this.clickContinueButton();
  }

  async answerSelectOrgCharity(org: string, charityNam: string, charityNumb: string): Promise<void> {
    await this.getRadioOrCheckBox2(org).click();
    await this.typeInto(this.charityName, charityNam);
    await this.typeInto(this.charityNo, charityNumb);
    await this.clickContinueButton();
  }

  async answerSelectMuseum(org: string, museum: string): Promise<void> {
    await this.getRadioOrCheckBox2(org).click();
    await this.typeInto(this.museumName, museum);
    await this.clickContinueButton();
  }

  async answerSelectOther(org: string, otherNam: string): Promise<void> {
    await this.getRadioOrCheckBox2(org).click();
    await this.typeInto(this.otherName, otherNam);
    await this.clickContinueButton();
  }

  async answerSelectCompanyWithTitleCheck(org: string, compName: string, compHouseNo: string): Promise<void> {
    await this.assertPageTitle();
    await this.answerSelectCompany(org, compName, compHouseNo);
  }

}
