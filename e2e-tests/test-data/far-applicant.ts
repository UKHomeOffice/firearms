export type FarProduct = 'FARS5' | 'FARMuseum' | 'FARShootingClub';
export type FarField =
  | 'whatYouWantToDo' | 'uploadAdditionalExistingDoc' | 'uploadAdditionalDoc'
  | 'typeOfOrganisation' | 'prohibitedItemsBeImported'
  | 'willProhibitedItemsBeStoredOnBusinessPremises' | 'anotherAddressToStoreProhibitedItems'
  | 'weaponsOrComponentsSections' | 'ammunitionSection' | 'individualNamedOnTheAuthority'
  | 'nameOfFirstAuthorityHolder' | 'nameOfAuthorityHolder' | 'nameOfSecondAuthorityHolder'
  | 'whoToContactAbtApplication' | 'testContactAddress' | 'purchaseOrder'
  | 'whatIsTheMuseumName' | 'anotherAddressToStoreFirearms' | 'whoShouldWeContact'
  | 'contactSameAsPreviousAddress' | 'clubANewClub' | 'useAnotherShootingRange'
  | 'atWhichOfAddressesWillFirearmsBeStored' | 'anotherGunStorageAddress'
  | 'sourceFirstUseAnotherShootingRange';

export type FarApplicant = Partial<Record<FarField, string>>;

const newAuthority = 'Apply for a new authority';
const renewAuthority = 'Renew an existing authority';
const amendAuthority = 'Amend an existing authority';
const unspecified = 'Unspecified sections and quantities, Text input';
const launchers = 'Launchers or projecting apparatus for use with the rockets or ammunition detailed above - Section 5(1A)(c), Text input';
const cartridges = 'Cartridges designed to explode, noxious ammunition, grenades, bombs or rockets fired from firearms - Section 5(1)(c)';

function row(fields: readonly FarField[], values: readonly string[]): FarApplicant {
  if (fields.length !== values.length) throw new Error('FAR data row does not match source columns');
  return Object.fromEntries(fields.map((field, index) => [field, values[index]]));
}

const s5Fields: readonly FarField[] = [
  'whatYouWantToDo', 'uploadAdditionalExistingDoc', 'uploadAdditionalDoc', 'typeOfOrganisation',
  'prohibitedItemsBeImported', 'willProhibitedItemsBeStoredOnBusinessPremises',
  'anotherAddressToStoreProhibitedItems', 'weaponsOrComponentsSections', 'ammunitionSection',
  'individualNamedOnTheAuthority', 'nameOfFirstAuthorityHolder', 'nameOfAuthorityHolder',
  'nameOfSecondAuthorityHolder', 'whoToContactAbtApplication', 'testContactAddress', 'purchaseOrder',
];
const museumFields: readonly FarField[] = [
  'whatYouWantToDo', 'uploadAdditionalExistingDoc', 'whatIsTheMuseumName', 'anotherAddressToStoreFirearms',
  'whoShouldWeContact', 'contactSameAsPreviousAddress', 'purchaseOrder',
];
const clubFields: readonly FarField[] = [
  'whatYouWantToDo', 'uploadAdditionalExistingDoc', 'uploadAdditionalDoc', 'clubANewClub',
  'sourceFirstUseAnotherShootingRange', 'useAnotherShootingRange',
  'atWhichOfAddressesWillFirearmsBeStored', 'anotherGunStorageAddress', 'purchaseOrder',
];

export function getFarApplicant(product: FarProduct, scenarioId: string): FarApplicant {
  switch (product) {
    case 'FARS5':
      switch (scenarioId) {
        case '1': return row(s5Fields, [newAuthority, 'N/A', 'No', 'Company', 'Yes', 'Yes', 'Yes', unspecified, unspecified, 'One', 'N/A', 'Test', 'N/A', 'Test', 'address already provided', 'Yes']);
        case '2': return row(s5Fields, [renewAuthority, 'No', 'No', 'Charity', 'No', 'No', 'N/A', 'Fully automatic or burst-fire weapons - Section 5(1)(a), Text input', 'Actual missiles (projectiles) for all the above ammunition - Section 5(1A)(g), Text input', 'One', 'N/A', 'Test', 'N/A', 'Test', 'address already provided', 'No']);
        case '3': return row(s5Fields, [renewAuthority, 'Yes', 'Yes', 'Museum', 'Yes', 'Yes', 'Yes', unspecified, unspecified, 'One', 'N/A', 'Test', 'N/A', 'Someone', 'address already provided', 'Yes']);
        case '4': return row(s5Fields, [amendAuthority, 'No', 'No', 'Other', 'Yes', 'No', 'Yes', launchers, `${cartridges}\r\nText input-Maximum quantity (leave blank if unspecified)`, 'Two', 'Test1', 'Test1', 'Test2', 'Test2', 'different address', 'Yes']);
        case '5': return row(s5Fields, [amendAuthority, 'Yes', 'Yes', 'Shooting club (section 7(3))', 'Yes', 'Yes', 'Yes', launchers, cartridges, 'Two', 'Test1', 'Test1', 'Test2', 'Test2', 'different address', 'Yes']);
        case '6': return row(s5Fields, [newAuthority, 'N/A', 'No', 'Sole trader', 'No', 'Yes', 'No', 'Unspecified sections and quantities, Max Characters 15000', "Unspecified sections and quantities, Text input - Explain why you can't specify the section and quantities of prohibited items being handled, Max Characters 15000", 'One', 'N/A', 'Test', 'N/A', 'Test', 'address already provided', 'No']);
      }
      break;
    case 'FARMuseum':
      switch (scenarioId) {
        case '1': return row(museumFields, [newAuthority, 'Yes', 'Museum1', 'No', 'MuseumTest', 'Yes', 'No']);
        case '2': return row(museumFields, [newAuthority, 'Yes', 'Museum1', 'Yes', 'MuseumTester', 'No', 'Yes']);
        case '3': return row(museumFields, [renewAuthority, 'No', 'Museum1', 'No', 'Test', 'Yes', 'No']);
        case '4': return row(museumFields, [renewAuthority, 'Yes', 'Museum1', 'Yes', 'Test', 'No', 'Yes']);
        case '5': return row(museumFields, [amendAuthority, 'No', 'Museum1', 'No', 'Test', 'Yes', 'No']);
        case '6': return row(museumFields, [amendAuthority, 'Yes', 'Museum1', 'Yes', 'Test', 'No', 'Yes']);
      }
      break;
    case 'FARShootingClub':
      // The CSV repeats the range column. Jackson's last-column-wins mapping is preserved.
      switch (scenarioId) {
        case '1': return row(clubFields, [newAuthority, 'N/A', 'No', 'Yes', 'Yes', 'No', 'Shooting ranges', 'No', 'Yes']);
        case '2': return row(clubFields, [newAuthority, 'N/A', 'No', 'No', 'Yes', 'Yes', 'Shooting ranges', 'Yes', 'No']);
        case '3': return row(clubFields, [renewAuthority, 'No', 'No', 'N/A', 'No', 'N/A', "Club secretary's contact address", 'No', 'Yes']);
        case '4': return row(clubFields, [renewAuthority, 'Yes', 'Yes', 'N/A', 'No', 'N/A', "Club secretary's contact address", 'No', 'Yes']);
        case '5': return row(clubFields, [amendAuthority, 'No', 'No', 'N/A', 'No', 'N/A', 'Shooting ranges', 'Yes', 'No']);
        case '6': return row(clubFields, [amendAuthority, 'Yes', 'yes', 'N/A', 'No', 'N/A', 'Shooting ranges', 'No', 'Yes']);
      }
      break;
  }
  throw new Error(`Unknown FAR data variant: ${product}/${scenarioId}`);
}

export function parseFarProduct(value: string): FarProduct {
  switch (value) {
    case 'FARS5': case 'FARMuseum': case 'FARShootingClub': return value;
    default: throw new Error(`Unknown FAR product: ${value}`);
  }
}
