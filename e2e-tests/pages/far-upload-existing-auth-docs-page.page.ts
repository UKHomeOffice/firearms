import { FarUploadDocs } from './far-upload-docs.page';
import type { Locator, Page } from '@playwright/test';

export class FarUploadExistingAuthDocsPage extends FarUploadDocs {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Upload existing authority documents";
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

  async uploadExistingFile(filePath: string): Promise<void> {
    await this.uploadFile(filePath);
  }

}
