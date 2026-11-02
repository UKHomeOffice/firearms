export type Product = 'FARMuseum' | 'FARS5' | 'FARShootingClub';
export type Journey = 'Museums' | 'New Dealer' | 'Shooting Clubs' | 'Supporting Documents';
export type Answer = 'Yes' | 'No' | 'N/A' | 'yes';
export type Activity = 'Apply for a new authority' | 'Renew an existing authority' | 'Amend an existing authority';

export interface Applicant {
  id: string;
  activity: Activity;
  additionalExisting: Answer;
  additional: Answer;
  museumName?: string;
  anotherStorage?: Answer;
  museumContact?: string;
  sameContactAddress?: Answer;
  organisation?: string;
  imported?: Answer;
  businessStorage?: Answer;
  weapons?: string;
  ammunition?: string;
  individuals?: 'One' | 'Two';
  firstHolder?: string;
  holder?: string;
  secondHolder?: string;
  contact?: string;
  contactAddress?: string;
  newClub?: Answer;
  anotherRange?: Answer;
  firstRangeAnswer?: Answer;
  secondRangeAnswer?: Answer;
  storageAddress?: string;
  purchaseOrder: Answer;
}

const newAuthority: Activity = 'Apply for a new authority';
const renewAuthority: Activity = 'Renew an existing authority';
const amendAuthority: Activity = 'Amend an existing authority';
const unspecified = 'Unspecified sections and quantities, Text input';
const launchers = 'Launchers or projecting apparatus for use with the rockets or ammunition detailed above - Section 5(1A)(c), Text input';
const cartridges = 'Cartridges designed to explode, noxious ammunition, grenades, bombs or rockets fired from firearms - Section 5(1)(c)';

export function getApplicant(product: Product, id: string): Applicant {
  switch (product) {
    case 'FARMuseum': {
      const common = { id, additional: 'N/A' as const, museumName: 'Museum1' };
      switch (id) {
        case '1': return { ...common, activity: newAuthority, additionalExisting: 'Yes', anotherStorage: 'No', museumContact: 'MuseumTest', sameContactAddress: 'Yes', purchaseOrder: 'No' };
        case '2': return { ...common, activity: newAuthority, additionalExisting: 'Yes', anotherStorage: 'Yes', museumContact: 'MuseumTester', sameContactAddress: 'No', purchaseOrder: 'Yes' };
        case '3': return { ...common, activity: renewAuthority, additionalExisting: 'No', anotherStorage: 'No', museumContact: 'Test', sameContactAddress: 'Yes', purchaseOrder: 'No' };
        case '4': return { ...common, activity: renewAuthority, additionalExisting: 'Yes', anotherStorage: 'Yes', museumContact: 'Test', sameContactAddress: 'No', purchaseOrder: 'Yes' };
        case '5': return { ...common, activity: amendAuthority, additionalExisting: 'No', anotherStorage: 'No', museumContact: 'Test', sameContactAddress: 'Yes', purchaseOrder: 'No' };
        case '6': return { ...common, activity: amendAuthority, additionalExisting: 'Yes', anotherStorage: 'Yes', museumContact: 'Test', sameContactAddress: 'No', purchaseOrder: 'Yes' };
      }
      break;
    }
    case 'FARS5': {
      const oneHolder = { id, individuals: 'One' as const, firstHolder: 'N/A', holder: 'Test', secondHolder: 'N/A', contactAddress: 'address already provided' };
      const twoHolders = { id, individuals: 'Two' as const, firstHolder: 'Test1', holder: 'Test1', secondHolder: 'Test2', contact: 'Test2', contactAddress: 'different address' };
      switch (id) {
        case '1': return { ...oneHolder, activity: newAuthority, additionalExisting: 'N/A', additional: 'No', organisation: 'Company', imported: 'Yes', businessStorage: 'Yes', anotherStorage: 'Yes', weapons: unspecified, ammunition: unspecified, contact: 'Test', purchaseOrder: 'Yes' };
        case '2': return { ...oneHolder, activity: renewAuthority, additionalExisting: 'No', additional: 'No', organisation: 'Charity', imported: 'No', businessStorage: 'No', anotherStorage: 'N/A', weapons: 'Fully automatic or burst-fire weapons - Section 5(1)(a), Text input', ammunition: 'Actual missiles (projectiles) for all the above ammunition - Section 5(1A)(g), Text input', contact: 'Test', purchaseOrder: 'No' };
        case '3': return { ...oneHolder, activity: renewAuthority, additionalExisting: 'Yes', additional: 'Yes', organisation: 'Museum', imported: 'Yes', businessStorage: 'Yes', anotherStorage: 'Yes', weapons: unspecified, ammunition: unspecified, contact: 'Someone', purchaseOrder: 'Yes' };
        case '4': return { ...twoHolders, activity: amendAuthority, additionalExisting: 'No', additional: 'No', organisation: 'Other', imported: 'Yes', businessStorage: 'No', anotherStorage: 'Yes', weapons: launchers, ammunition: `${cartridges}\r\nText input-Maximum quantity (leave blank if unspecified)`, purchaseOrder: 'Yes' };
        case '5': return { ...twoHolders, activity: amendAuthority, additionalExisting: 'Yes', additional: 'Yes', organisation: 'Shooting club (section 7(3))', imported: 'Yes', businessStorage: 'Yes', anotherStorage: 'Yes', weapons: launchers, ammunition: cartridges, purchaseOrder: 'Yes' };
        case '6': return { ...oneHolder, activity: newAuthority, additionalExisting: 'N/A', additional: 'No', organisation: 'Sole trader', imported: 'No', businessStorage: 'Yes', anotherStorage: 'No', weapons: 'Unspecified sections and quantities, Max Characters 15000', ammunition: "Unspecified sections and quantities, Text input - Explain why you can't specify the section and quantities of prohibited items being handled, Max Characters 15000", contact: 'Test', purchaseOrder: 'No' };
      }
      break;
    }
    case 'FARShootingClub': {
      const common = { id };
      switch (id) {
        case '1': return { ...common, activity: newAuthority, additionalExisting: 'N/A', additional: 'No', newClub: 'Yes', firstRangeAnswer: 'Yes', anotherRange: 'No', secondRangeAnswer: 'No', storageAddress: 'Shooting ranges', anotherStorage: 'No', purchaseOrder: 'Yes' };
        case '2': return { ...common, activity: newAuthority, additionalExisting: 'N/A', additional: 'No', newClub: 'No', firstRangeAnswer: 'Yes', anotherRange: 'Yes', secondRangeAnswer: 'Yes', storageAddress: 'Shooting ranges', anotherStorage: 'Yes', purchaseOrder: 'No' };
        case '3': return { ...common, activity: renewAuthority, additionalExisting: 'No', additional: 'No', newClub: 'N/A', firstRangeAnswer: 'No', anotherRange: 'N/A', secondRangeAnswer: 'N/A', storageAddress: "Club secretary's contact address", anotherStorage: 'No', purchaseOrder: 'Yes' };
        case '4': return { ...common, activity: renewAuthority, additionalExisting: 'Yes', additional: 'Yes', newClub: 'N/A', firstRangeAnswer: 'No', anotherRange: 'N/A', secondRangeAnswer: 'N/A', storageAddress: "Club secretary's contact address", anotherStorage: 'No', purchaseOrder: 'Yes' };
        case '5': return { ...common, activity: amendAuthority, additionalExisting: 'No', additional: 'No', newClub: 'N/A', firstRangeAnswer: 'No', anotherRange: 'N/A', secondRangeAnswer: 'N/A', storageAddress: 'Shooting ranges', anotherStorage: 'Yes', purchaseOrder: 'No' };
        case '6': return { ...common, activity: amendAuthority, additionalExisting: 'Yes', additional: 'yes', newClub: 'N/A', firstRangeAnswer: 'No', anotherRange: 'N/A', secondRangeAnswer: 'N/A', storageAddress: 'Shooting ranges', anotherStorage: 'No', purchaseOrder: 'Yes' };
      }
    }
  }
  throw new Error(`Unknown source data row: ${product}/${id}`);
}

export function isYes(answer: Answer | undefined): boolean {
  return answer?.toLowerCase() === 'yes';
}

export class ScenarioData {
  product?: Product;
  private selected?: Applicant;
  description = '';
  applicationReference = '';

  select(id: string, description: string): void {
    if (!this.product) throw new Error('Select the source data family first');
    this.selected = getApplicant(this.product, id);
    this.description = description;
  }

  get applicant(): Applicant {
    if (!this.selected) throw new Error('Select a source scenario before accessing applicant data');
    return this.selected;
  }
}