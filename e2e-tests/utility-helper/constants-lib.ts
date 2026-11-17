import path from 'node:path';

export class ConstantsLib {
  static readonly FULL_NAME = 'HOF TEST';
  static readonly DOB_11_11_1988 = '11/11/1988';
  static readonly ADDRESS_LINE_1 = '100';
  static readonly ADDRESS_LINE_2 = 'Tenth St';
  static readonly TOWN_OR_CITY = 'HULL';
  static readonly POSTCODE = 'M11 1HH';
  static readonly B_ADDRESS_LINE_1 = '89';
  static readonly B_ADDRESS_LINE_2 = 'HOF St';
  static readonly B_TOWN_OR_CITY = 'Leeds';
  static readonly B_POSTCODE = 'L22 2LL';
  static readonly BUSINESS_OR_COMPANY_NAME = 'HOF LTD';
  static readonly CONTACT_NAME = 'TLT HOF';
  static readonly CONTACT_TELEPHONE = '01616699548';
  static readonly CONTACT_EMAIL_ADDRESS = requiredEnv('SAS_HOF_EMAIL');
  static readonly SAS_HOF_EMAIL = requiredEnv('SAS_HOF_EMAIL');
  static readonly COUNTRY_UK = 'United Kingdom';
  static readonly COUNTRY_OF_BIRTH = 'France';
  static readonly CLUB_SEC_NAME = 'clubSecName';
  static readonly CLUB_SEC_DEPUTY_NAME = 'clubSecDeputyName';
  static readonly COMPANY_NAME = 'Test UK Ltd';
  static readonly COMPANY_HOUSE_NUMBER = '45';
  static readonly TRADER_NAME = 'Test Trading Ltd';
  static readonly SHOOT_CLUB_NAME = 'Testing Club';
  static readonly CHARITY_NAME = 'Test Charity';
  static readonly CHARITY_NUMBER = '555';
  static readonly MUSEUM_NAME = 'Test Museum';
  static readonly OTHER_ORG_NAME = 'Other Org Name';
  static readonly ORDER_NUMBER = '682';
  static readonly RESPONSE_YES = 'Yes';
  static readonly RESPONSE_NO = 'No';
  static readonly UPLOAD_FILE = path.resolve(__dirname, '..', 'test-data', 'testData.pdf');
  static readonly MAX_TEXT_FILE = path.resolve(__dirname, '..', 'test-data', 'largeText.txt');
}


function requiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not configured`);
    }
    return value;
}