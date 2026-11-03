import { FarUploadDocs } from './far-upload-docs.page';
import type { Locator, Page } from '@playwright/test';

export class FarS5UploadSupportingDocsPage extends FarUploadDocs {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Upload your supporting documents which must include a cover letter to explain the reason you need to possess weapons from the Secretary of State.";
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

  async uploadSupportingFile(filePath: string): Promise<void> {
    await this.uploadFile(filePath);
  }

  async uploadSupportingFileWithTitleCheck(filePath: string): Promise<void> {
    await this.assertPageTitle();
    await this.uploadSupportingFile(filePath);
  }

}
