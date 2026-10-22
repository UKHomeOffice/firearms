import { expect } from '@playwright/test';
import { BasePage } from './base-page';

export class SubmissionPage extends BasePage {
  async applicationComplete(email: string): Promise<string> {
    await expect(this.page.getByRole('heading', { name: 'Application complete', exact: true })).toBeVisible();
    await expect(this.page.getByText(`We have sent an email to ${email} to confirm receipt of your application.`, { exact: true })).toBeVisible();
    return this.reference();
  }

  async reference(): Promise<string> {
    const reference = this.page.getByText('Your reference number is', { exact: false }).locator('strong');
    await expect(reference).toBeVisible();
    const value = (await reference.innerText()).trim();
    expect(value).not.toBe('');
    return value;
  }

  async uploadComplete(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Upload complete', exact: true })).toBeVisible();
    await this.reference();
    await expect(this.page.getByText('We will review your application. If more information is required, we shall email the contact address provided with your original application.', { exact: true })).toBeVisible();
  }
}