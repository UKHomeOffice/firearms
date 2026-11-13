import { FarUploadDocs } from './far-upload-docs';
import type { Page } from '@playwright/test';

export class FarSupportDocUploadSupportingDocsPage extends FarUploadDocs {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    const title = await this.page.title();
    const subTitle = "Upload supporting documents";
    if (title.includes("Apply for museum firearms licence")) {
        return subTitle + " – Apply for museum firearms licence";
    }
    if (title.includes("Prohibited weapons and ammunition licensing")) {
        return subTitle + " – Prohibited weapons and ammunition licensing";
    }
    if (title.includes("Apply for shooting club approval")) {
        return subTitle + " – Apply for shooting club approval";
    }
    if (title.includes("Firearms licensing supporting documents")) {
        return subTitle + " – Firearms licensing supporting documents";
    }

    throw new Error("Unexpected page title: " + title);
  }

  async uploadSupportingDoc(filePath: string): Promise<void> {
    await this.uploadFile(filePath);
  }

}
