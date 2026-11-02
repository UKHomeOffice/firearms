import { expect, type Locator, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly headerText: Locator;
  readonly continueButton: Locator;
  readonly thereIsAProblemText: Locator;
  readonly errorSummaryList: Locator;
  readonly navigateBackLink: Locator;
  readonly uploadFileButton: Locator;
  readonly deleteButton: Locator;
  readonly continueBtn: Locator;
  readonly uploadFileBtn: Locator;
  readonly deleteBtn: Locator;
  readonly dateDay: Locator;
  readonly dateMonth: Locator;
  readonly dateYear: Locator;
  readonly addressLine1: Locator;
  readonly addressLine2: Locator;
  readonly townOrCity: Locator;
  readonly county: Locator;
  readonly postcode: Locator;
  readonly fileUpload: Locator;
  readonly addressLine1TextField: Locator;
  readonly addressLine2TextField: Locator;
  readonly townOrCityTextField: Locator;
  readonly countryTextField: Locator;
  readonly postCodeField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerText = page.locator('h1');
    this.continueButton = page.locator("//*[@value='Continue'][@class='govuk-button']");
    this.thereIsAProblemText = page.locator('#error-summary-title');
    this.errorSummaryList = page.locator("[class='govuk-list govuk-error-summary__list']");
    this.navigateBackLink = page.locator("//a[.='Back']");
    this.uploadFileButton = page.locator("input[value='Upload file']");
    this.deleteButton = page.getByRole('main').getByRole('link', { name: 'Delete', exact: true }).first();
    this.continueBtn = page.locator("input[type='submit'][value='Continue']");
    this.uploadFileBtn = this.uploadFileButton;
    this.deleteBtn = this.deleteButton;
    this.dateDay = page.locator("//input[contains(@id,'day')]");
    this.dateMonth = page.locator("//input[contains(@id,'month')]");
    this.dateYear = page.locator("//input[contains(@id,'year')]");
    this.addressLine1 = page.locator("//input[contains(@id,'house-number')]");
    this.addressLine2 = page.locator("//input[contains(@id,'street')]");
    this.townOrCity = page.locator("//input[contains(@id,'town')]");
    this.county = page.locator("//input[contains(@id,'county')]");
    this.postcode = page.locator("//input[contains(@id,'postcode')]");
    this.fileUpload = page.locator("//input[contains(@id,'file-upload')]");
    this.addressLine1TextField = page.locator("input[id$=-address-line-1] , input[id$='building']");
    this.addressLine2TextField = page.locator("input[id$=-address-line-2] , input[id$='street']");
    this.townOrCityTextField = page.locator("input[id$=-town-or-city] , input[id$='townOrCity']");
    this.countryTextField = page.locator("input[id$=-county] , input[id$='countyOrState']");
    this.postCodeField = page.locator("input[id$='postcode'] , input[id$='postcodeOrZIPCode']");
  }

  async expectedPageTitle(): Promise<string> {
    throw new Error(`${this.constructor.name} must implement expectedPageTitle before asserting its title`);
  }

  async assertPageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(`${await this.expectedPageTitle()} – GOV.UK`);
  }

  async clickContinueButton(): Promise<void> {
    await this.continueButton.click();
  }

  getContinueButton(): Locator {
    return this.continueButton;
  }

  async clickContinue(): Promise<void> {
    await this.clickContinueButton();
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async type(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
    await this.page.keyboard.press('Tab');
  }

  async typeInto(locator: Locator, text: string): Promise<void> {
    await locator.fill(text);
  }

  async enterYourAddress(
    addressLine1: string,
    addressLine2: string,
    townOrCity: string,
    country: string,
    postcode: string,
  ): Promise<void> {
    await this.typeInto(this.addressLine1TextField, addressLine1);
    await this.typeInto(this.addressLine2TextField, addressLine2);
    await this.typeInto(this.townOrCityTextField, townOrCity);
    await this.typeInto(this.countryTextField, country);
    await this.typeInto(this.postCodeField, postcode);
  }

  async enterYourAddressNoCountry(
    addressLine1: string,
    addressLine2: string,
    townOrCity: string,
    postcode: string,
  ): Promise<void> {
    await this.typeInto(this.addressLine1TextField, addressLine1);
    await this.typeInto(this.addressLine2TextField, addressLine2);
    await this.typeInto(this.townOrCityTextField, townOrCity);
    await this.typeInto(this.postCodeField, postcode);
    await this.clickContinueButton();
  }

  async selectAutocompleteOption(locator: Locator, text: string): Promise<void> {
    await locator.focus();
    await locator.press('ControlOrMeta+A');
    await locator.press('Backspace');
    await locator.pressSequentially(text);
    await this.page.getByRole('option', { name: text, exact: true }).click();
    await expect(locator).toHaveValue(text);
    await locator.press('Tab');
  }

  openUrl(url: string): Promise<unknown> {
    return this.page.goto(url);
  }

  getRadioOrCheckBox(label: string): Locator {
    return this.page.locator(`//label[contains(., "${this.escapeXPathText(label)}")]`);
  }

  getRadioOrCheckBox2(label: string): Locator {
    return this.page.locator(`//label[contains(normalize-space(),'${this.escapeXPathText(label)}')]/preceding::input[1]`);
  }

  getTextArea2(label: string): Locator {
    return this.page.locator(`//label[contains(normalize-space(),'${this.escapeXPathText(label)}')]/following::textarea[1]`);
  }

  getInputTextForSelectedRadioBox(label: string): Locator {
    return this.page.locator(`//label[contains(normalize-space(),'${this.escapeXPathText(label)}')]/preceding::input[1]/following::input[1]`);
  }

  getHeaderTextForSection(text: string): Locator {
    return this.page.locator(`//h2[contains(.,'${this.escapeXPathText(text)}')]`);
  }

  getButton(label: string): Locator {
    return this.page.locator(`//button[contains(.,'${this.escapeXPathText(label)}')]`);
  }

  getPageLinkByText(text: string): Locator {
    return this.page.locator(`//a[.='${this.escapeXPathText(text)}']`);
  }

  async getPageLinkText(text: string): Promise<string> {
    return this.getPageLinkByText(text).innerText();
  }

  async enterDateOrDob(inputDate: string | null): Promise<void> {
    if (!inputDate?.trim()) return;

    const formattedDate = this.convertTextToDate(inputDate);
    if (!formattedDate) return;
    const dateParts = formattedDate.split('/');
    if (dateParts.length !== 3) {
      throw new Error('Invalid date format. Expected format: dd/MM/yyyy');
    }

    const [day, month, year] = dateParts;
    await this.typeInto(this.dateDay, day);
    await this.typeInto(this.dateMonth, month);
    await this.typeInto(this.dateYear, year);
  }

  convertTextToDate(dateValue: string | null): string | null {
    if (dateValue === null) return null;

    const normalized = dateValue.trim().toLowerCase();
    const today = new Date();
    const addDays = (date: Date, days: number) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };
    const addYears = (date: Date, years: number) => {
      const result = new Date(date);
      result.setFullYear(result.getFullYear() + years);
      return result;
    };
    const format = (date: Date) =>
      `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

    const dates: Record<string, () => Date> = {
      "yesterday's date": () => addDays(today, -1),
      "today's date": () => today,
      "tomorrow's date": () => addDays(today, 1),
      'more than one year in the future': () => addDays(addYears(today, 1), 1),
      'more than 100 years in the future': () => addDays(addYears(today, 100), 1),
      'more than one year in the past': () => addDays(addYears(today, -1), -1),
      'within the last 3 years': () => addDays(addYears(today, -3), 1),
      'more than 3 years ago': () => addYears(today, -3),
      'less than 16 years ago': () => addDays(addYears(today, -16), 1),
      'less than 18 years ago': () => addDays(addYears(today, -18), 1),
      '19 years ago': () => addYears(today, -20),
      'more than 50 years ago': () => addDays(addYears(today, -50), -1),
      'more than 100 years ago': () => addDays(addYears(today, -100), -1),
      'more than 120 years ago': () => addDays(addYears(today, -120), -1),
      'more than 127 years ago': () => addDays(addYears(today, -127), -1),
    };

    const dateForInput = dates[normalized];
    return dateForInput ? format(dateForInput()) : dateValue;
  }

  async clickUploadFileButton(): Promise<void> {
    await this.uploadFileButton.click();
  }

  async isTextOnPage(text: string): Promise<boolean> {
    return (await this.page.locator('body').innerText()).includes(text);
  }

  async getErrorSummaryTitle(): Promise<string> {
    return this.thereIsAProblemText.innerText();
  }

  async getErrorMessageDetail(): Promise<string> {
    return this.errorSummaryList.innerText();
  }

  async getPageHeaderText(): Promise<string> {
    return this.headerText.innerText();
  }

  private escapeXPathText(text: string): string {
    return text.replaceAll("'", "&apos;");
  }
}
