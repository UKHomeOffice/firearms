import { expect } from '@playwright/test';
import { BasePage } from './base-page';

export class UploadPage extends BasePage {
  async clickUpload(): Promise<void> {
    await this.page.getByRole('button', { name: /^Upload file$/i })
      .and(this.page.locator('input[type="submit"], button[type="submit"]'))
      .click();
  }

  async complete(filePath: string, description: string): Promise<void> {
    await this.assertPageTitle();
    await this.uploadFile(filePath, description);
  }

  async uploadFile(filePath: string, description: string): Promise<void> {
    await this.page.locator('input[type="file"]').setInputFiles(filePath);
    await this.type(this.page.getByRole('textbox', { name: /^Description(?: \(optional\))?$/i }), description);
    await this.clickUpload();
    await expect(this.page.getByRole('heading', { name: 'Documents added', exact: true })).toBeVisible();
  }
}