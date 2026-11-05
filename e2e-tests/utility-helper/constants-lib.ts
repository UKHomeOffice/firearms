import path from 'node:path';

export const ConstantsLib = {
  FULL_NAME: 'HOF TEST',
  DOB_11_11_1988: '11/11/1988',
  ADDRESS_LINE_1: '100',
  ADDRESS_LINE_2: 'Tenth St',
  TOWN_OR_CITY: 'HULL',
  POSTCODE: 'M11 1HH',
  B_ADDRESS_LINE_1: '89',
  B_ADDRESS_LINE_2: 'HOF St',
  B_TOWN_OR_CITY: 'Leeds',
  B_POSTCODE: 'L22 2LL',
  BUSINESS_OR_COMPANY_NAME: 'HOF LTD',
  CONTACT_NAME: 'TLT HOF',
  TELEPHONE: '01616699548',
  CONTACT_TELEPHONE: '01616699548',
  CONTACT_EMAIL_ADDRESS: requiredEnv('SAS_HOF_EMAIL'),
  SAS_HOF_EMAIL: requiredEnv('SAS_HOF_EMAIL'),
  COUNTRY_UK: 'United Kingdom',
  COUNTRY_OF_BIRTH: 'France',
  CLUB_SEC_NAME: 'clubSecName',
  CLUB_SEC_DEPUTY_NAME: 'clubSecDeputyName',
  COMPANY_NAME: 'Test UK Ltd',
  COMPANY_HOUSE_NUMBER: '45',
  TRADER_NAME: 'Test Trading Ltd',
  SHOOT_CLUB_NAME: 'Testing Club',
  CHARITY_NAME: 'Test Charity',
  CHARITY_NUMBER: '555',
  MUSEUM_NAME: 'Test Museum',
  OTHER_ORG_NAME: 'Other Org Name',
  ORDER_NUMBER: '682',
  RESPONSE_YES: 'Yes',
  RESPONSE_NO: 'No',
  UPLOAD_FILE: path.resolve(__dirname, '..', 'test-data', 'testData.pdf'),
  MAX_TEXT_FILE: path.resolve(__dirname, '..', 'test-data', 'largeText.txt'),
} as const;


function requiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not configured`);
    }
    return value;
}