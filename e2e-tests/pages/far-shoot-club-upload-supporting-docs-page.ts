import { FarUploadDocs } from './far-upload-docs';
import type { Page } from '@playwright/test';

export class FarShootClubUploadSupportingDocsPage extends FarUploadDocs {

  constructor(page: Page) {
    super(page);
  }

  async expectedPageTitle(): Promise<string> {
    return "Upload your supporting documents which must include a cover letter to explain the reasons you are applying for an approval – Apply for shooting club approval";
  }

  async uploadSupportingFile(filePath: string): Promise<void> {
    await this.uploadFile(filePath);
  }

  async uploadSupportingFileWithTitleCheck(filePath: string): Promise<void> {
    await this.assertPageTitle(this.page, await this.expectedPageTitle());
    await this.uploadSupportingFile(filePath);
  }

}
