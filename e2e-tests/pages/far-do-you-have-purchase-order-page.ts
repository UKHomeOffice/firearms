import { BasePage } from './base-page';
import type { Locator, Page } from '@playwright/test';

export class FarDoYouHavePurchaseOrderPage extends BasePage {
  readonly purchaseOrderNumb: Locator;

  constructor(page: Page) {
    super(page);
    this.purchaseOrderNumb = page.locator("input#purchase-order-number");
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Do you have a purchase order?";
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

  async answerHavePurchaseOrderYes(order: string): Promise<void> {
    await this.getRadioOrCheckBox2("Yes").click();
    await this.typeInto(this.purchaseOrderNumb, order);
    await this.clickContinueButton();
  }

  async answerHavePurchaseOrderNo(): Promise<void> {
    await this.getRadioOrCheckBox2("No").click();
    await this.clickContinueButton();
  }

}
