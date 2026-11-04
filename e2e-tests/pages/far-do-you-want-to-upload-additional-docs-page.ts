import { FarUploadDocs } from './far-upload-docs';
import type { Locator, Page } from '@playwright/test';

export class FarDoYouWantToUploadAdditionalDocsPage extends FarUploadDocs {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Do you want to upload any additional documents to support your application?";
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

  async answerUploadAdditionalDoc(response: string): Promise<void> {
    await this.isPreviousDocAdded();
    await this.getRadioOrCheckBox2(response).click();
    await this.clickContinueButton();
  }

}
