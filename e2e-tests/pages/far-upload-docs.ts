import { BasePage } from './base-page';
import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class FarUploadDocs extends BasePage {
  readonly docAddedMessage: Locator;
  readonly chooseFile: Locator;
  readonly descriptionTextarea = "Description";

  constructor(page: Page) {
    super(page);
    this.docAddedMessage = page.getByRole('main').getByRole('heading', { name: 'Documents added', exact: true }).first();
    this.chooseFile = page.locator("input#supporting-document-upload, input#existing-authority-upload");
  }

  async uploadFile(filePath: string, description = 'File uploaded successfully'): Promise<void> {
    await this.chooseFile.setInputFiles(filePath);
    await this.getTextArea2(this.descriptionTextarea).fill(description);
            await this.clickUploadFileButton();
  }

  async isPreviousDocAdded(): Promise<boolean> {
    await expect(this.deleteBtn).toBeVisible();
    await expect(this.docAddedMessage).toBeVisible();
    return true;
  }

}
