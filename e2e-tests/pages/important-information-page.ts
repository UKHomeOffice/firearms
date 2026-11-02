import { BasePage } from './base-page';

export class ImportantInformationPage extends BasePage {
  async submit(): Promise<void> {
    await this.assertPageTitle();
    await this.page.getByRole('button', { name: 'Submit application', exact: true }).click();
  }
}