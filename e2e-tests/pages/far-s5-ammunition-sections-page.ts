import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarS5AmmunitionSectionsPage extends BasePage {
  readonly cartridgeQty: Locator;
  readonly armourPiercing: Locator;
  readonly incendiaryMissile: Locator;
  readonly expandingMissile: Locator;
  readonly actualMissilesForAll: Locator;

  constructor(page: Page) {
    super(page);
    this.cartridgeQty = page.locator("input#explosive-cartridges-quantity");
    this.armourPiercing = page.locator("input#armour-piercing-quantity");
    this.incendiaryMissile = page.locator("input#incendiary-missile-quantity");
    this.expandingMissile = page.locator("input#expanding-missile-quantity");
    this.actualMissilesForAll = page.locator("input#missiles-for-above-quantity");
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Ammunition Sections";
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

  answerSelectUnspecifiedSections(text?: string): Promise<void>;
  answerSelectUnspecifiedSections(text: string): Promise<void>;
  async answerSelectUnspecifiedSections(text = 'input Text'): Promise<void> {
    await this.getRadioOrCheckBox2("Unspecified").click();
    await this.getTextArea2("Explain why").fill(text);
    await this.clickContinueButton();
  }

  async answerSelectCartridges(quantity = '226'): Promise<void> {
    await this.getRadioOrCheckBox2("Cartridges").click();
    await this.typeInto(this.cartridgeQty, quantity);
    await this.clickContinueButton();
  }

  async answerSelectActualMissiles(
    incendiaryQuantity = '344',
    armourPiercingQuantity = '144',
    expandingQuantity = '123',
    actualMissilesQuantity = '235',
  ): Promise<void> {
    await this.getRadioOrCheckBox2("incendiary").click();
    await this.typeInto(this.incendiaryMissile, incendiaryQuantity);
    await this.getRadioOrCheckBox2("armour-piercing").click();
    await this.typeInto(this.armourPiercing, armourPiercingQuantity);
    await this.getRadioOrCheckBox2("expanding missile").click();
    await this.typeInto(this.expandingMissile, expandingQuantity);
    await this.getRadioOrCheckBox2("Actual missiles").click();
    await this.typeInto(this.actualMissilesForAll, actualMissilesQuantity);
    await this.clickContinueButton();
  }

}
