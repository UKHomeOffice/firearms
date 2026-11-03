export function getFarApplicant(product: string, description: string, context = 'journey'): Record<string, string> {
  if (product !== 'FARS5' && product !== 'FARMuseum' && product !== 'FARShootingClub') {
    throw new Error(`Unknown FAR product: ${product}`);
  }
  if (context !== 'journey' && !(context === 'validation' && product === 'FARMuseum')) {
    throw new Error(`Unsupported FAR data context: ${product}/${context}`);
  }

  // Museums validation originally used the new-authority data for its renewal scenario.
  if (context === 'validation') {
    switch (description) {
      case "Apply for a new authority":
        return {
          whatYouWantToDo: "Apply for a new authority",
          uploadAdditionalExistingDoc: "Yes",
          whatIsTheMuseumName: "Museum1",
          anotherAddressToStoreFirearms: "No",
          whoShouldWeContact: "MuseumTest",
          contactSameAsPreviousAddress: "Yes",
          purchaseOrder: "No",
        };
      case "Renew existing authority":
        return {
          whatYouWantToDo: "Apply for a new authority",
          uploadAdditionalExistingDoc: "Yes",
          whatIsTheMuseumName: "Museum1",
          anotherAddressToStoreFirearms: "Yes",
          whoShouldWeContact: "MuseumTester",
          contactSameAsPreviousAddress: "No",
          purchaseOrder: "Yes",
        };
      default:
        throw new Error(`Unknown FAR scenario description: ${product}/${context}/${JSON.stringify(description)}`);
    }
  }

  switch (product) {
    case 'FARS5':
      switch (description) {
        case "Apply for a new authority":
          return {
            whatYouWantToDo: "Apply for a new authority",
            uploadAdditionalExistingDoc: "N/A",
            uploadAdditionalDoc: "No",
            typeOfOrganisation: "Company",
            prohibitedItemsBeImported: "Yes",
            willProhibitedItemsBeStoredOnBusinessPremises: "Yes",
            anotherAddressToStoreProhibitedItems: "Yes",
            weaponsOrComponentsSections: "Unspecified sections and quantities, Text input",
            ammunitionSection: "Unspecified sections and quantities, Text input",
            individualNamedOnTheAuthority: "One",
            nameOfFirstAuthorityHolder: "N/A",
            nameOfAuthorityHolder: "Test",
            nameOfSecondAuthorityHolder: "N/A",
            whoToContactAbtApplication: "Test",
            testContactAddress: "address already provided",
            purchaseOrder: "Yes",
          };
        case "Renew existing authority":
          return {
            whatYouWantToDo: "Renew an existing authority",
            uploadAdditionalExistingDoc: "No",
            uploadAdditionalDoc: "No",
            typeOfOrganisation: "Charity",
            prohibitedItemsBeImported: "No",
            willProhibitedItemsBeStoredOnBusinessPremises: "No",
            anotherAddressToStoreProhibitedItems: "N/A",
            weaponsOrComponentsSections: "Fully automatic or burst-fire weapons - Section 5(1)(a), Text input",
            ammunitionSection: "Actual missiles (projectiles) for all the above ammunition - Section 5(1A)(g), Text input",
            individualNamedOnTheAuthority: "One",
            nameOfFirstAuthorityHolder: "N/A",
            nameOfAuthorityHolder: "Test",
            nameOfSecondAuthorityHolder: "N/A",
            whoToContactAbtApplication: "Test",
            testContactAddress: "address already provided",
            purchaseOrder: "No",
          };
        case "Renew existing authority - additional Supporting doc - Yes":
          return {
            whatYouWantToDo: "Renew an existing authority",
            uploadAdditionalExistingDoc: "Yes",
            uploadAdditionalDoc: "Yes",
            typeOfOrganisation: "Museum",
            prohibitedItemsBeImported: "Yes",
            willProhibitedItemsBeStoredOnBusinessPremises: "Yes",
            anotherAddressToStoreProhibitedItems: "Yes",
            weaponsOrComponentsSections: "Unspecified sections and quantities, Text input",
            ammunitionSection: "Unspecified sections and quantities, Text input",
            individualNamedOnTheAuthority: "One",
            nameOfFirstAuthorityHolder: "N/A",
            nameOfAuthorityHolder: "Test",
            nameOfSecondAuthorityHolder: "N/A",
            whoToContactAbtApplication: "Someone",
            testContactAddress: "address already provided",
            purchaseOrder: "Yes",
          };
        case "Amend existing authority":
          return {
            whatYouWantToDo: "Amend an existing authority",
            uploadAdditionalExistingDoc: "No",
            uploadAdditionalDoc: "No",
            typeOfOrganisation: "Other",
            prohibitedItemsBeImported: "Yes",
            willProhibitedItemsBeStoredOnBusinessPremises: "No",
            anotherAddressToStoreProhibitedItems: "Yes",
            weaponsOrComponentsSections: "Launchers or projecting apparatus for use with the rockets or ammunition detailed above - Section 5(1A)(c), Text input",
            ammunitionSection: "Cartridges designed to explode, noxious ammunition, grenades, bombs or rockets fired from firearms - Section 5(1)(c)\r\nText input-Maximum quantity (leave blank if unspecified)",
            individualNamedOnTheAuthority: "Two",
            nameOfFirstAuthorityHolder: "Test1",
            nameOfAuthorityHolder: "Test1",
            nameOfSecondAuthorityHolder: "Test2",
            whoToContactAbtApplication: "Test2",
            testContactAddress: "different address",
            purchaseOrder: "Yes",
          };
        case "Amend existing authority - additional Supporting doc - Yes":
          return {
            whatYouWantToDo: "Amend an existing authority",
            uploadAdditionalExistingDoc: "Yes",
            uploadAdditionalDoc: "Yes",
            typeOfOrganisation: "Shooting club (section 7(3))",
            prohibitedItemsBeImported: "Yes",
            willProhibitedItemsBeStoredOnBusinessPremises: "Yes",
            anotherAddressToStoreProhibitedItems: "Yes",
            weaponsOrComponentsSections: "Launchers or projecting apparatus for use with the rockets or ammunition detailed above - Section 5(1A)(c), Text input",
            ammunitionSection: "Cartridges designed to explode, noxious ammunition, grenades, bombs or rockets fired from firearms - Section 5(1)(c)",
            individualNamedOnTheAuthority: "Two",
            nameOfFirstAuthorityHolder: "Test1",
            nameOfAuthorityHolder: "Test1",
            nameOfSecondAuthorityHolder: "Test2",
            whoToContactAbtApplication: "Test2",
            testContactAddress: "different address",
            purchaseOrder: "Yes",
          };
        case "Max character":
          return {
            whatYouWantToDo: "Apply for a new authority",
            uploadAdditionalExistingDoc: "N/A",
            uploadAdditionalDoc: "No",
            typeOfOrganisation: "Sole trader",
            prohibitedItemsBeImported: "No",
            willProhibitedItemsBeStoredOnBusinessPremises: "Yes",
            anotherAddressToStoreProhibitedItems: "No",
            weaponsOrComponentsSections: "Unspecified sections and quantities, Max Characters 15000",
            ammunitionSection: "Unspecified sections and quantities, Text input - Explain why you can't specify the section and quantities of prohibited items being handled, Max Characters 15000",
            individualNamedOnTheAuthority: "One",
            nameOfFirstAuthorityHolder: "N/A",
            nameOfAuthorityHolder: "Test",
            nameOfSecondAuthorityHolder: "N/A",
            whoToContactAbtApplication: "Test",
            testContactAddress: "address already provided",
            purchaseOrder: "No",
          };
      }
      break;
    case 'FARMuseum':
      switch (description) {
        case "Apply for a new authority":
          return {
            whatYouWantToDo: "Apply for a new authority",
            uploadAdditionalExistingDoc: "Yes",
            whatIsTheMuseumName: "Museum1",
            anotherAddressToStoreFirearms: "No",
            whoShouldWeContact: "MuseumTest",
            contactSameAsPreviousAddress: "Yes",
            purchaseOrder: "No",
          };
        case "Apply for a new authority - Another Storage address":
          return {
            whatYouWantToDo: "Apply for a new authority",
            uploadAdditionalExistingDoc: "Yes",
            whatIsTheMuseumName: "Museum1",
            anotherAddressToStoreFirearms: "Yes",
            whoShouldWeContact: "MuseumTester",
            contactSameAsPreviousAddress: "No",
            purchaseOrder: "Yes",
          };
        case "Renew existing authority":
          return {
            whatYouWantToDo: "Renew an existing authority",
            uploadAdditionalExistingDoc: "No",
            whatIsTheMuseumName: "Museum1",
            anotherAddressToStoreFirearms: "No",
            whoShouldWeContact: "Test",
            contactSameAsPreviousAddress: "Yes",
            purchaseOrder: "No",
          };
        case "Renew existing authority - additional Supporting doc - Yes":
          return {
            whatYouWantToDo: "Renew an existing authority",
            uploadAdditionalExistingDoc: "Yes",
            whatIsTheMuseumName: "Museum1",
            anotherAddressToStoreFirearms: "Yes",
            whoShouldWeContact: "Test",
            contactSameAsPreviousAddress: "No",
            purchaseOrder: "Yes",
          };
        case "Amend existing authority":
          return {
            whatYouWantToDo: "Amend an existing authority",
            uploadAdditionalExistingDoc: "No",
            whatIsTheMuseumName: "Museum1",
            anotherAddressToStoreFirearms: "No",
            whoShouldWeContact: "Test",
            contactSameAsPreviousAddress: "Yes",
            purchaseOrder: "No",
          };
        case "Amend existing authority - additional Supporting doc - Yes":
          return {
            whatYouWantToDo: "Amend an existing authority",
            uploadAdditionalExistingDoc: "Yes",
            whatIsTheMuseumName: "Museum1",
            anotherAddressToStoreFirearms: "Yes",
            whoShouldWeContact: "Test",
            contactSameAsPreviousAddress: "No",
            purchaseOrder: "Yes",
          };
      }
      break;
    case 'FARShootingClub':
      switch (description) {
        case "Apply for a new authority":
          return {
            whatYouWantToDo: "Apply for a new authority",
            uploadAdditionalExistingDoc: "N/A",
            uploadAdditionalDoc: "No",
            clubANewClub: "Yes",
            sourceFirstUseAnotherShootingRange: "Yes",
            useAnotherShootingRange: "No",
            atWhichOfAddressesWillFirearmsBeStored: "Shooting ranges",
            anotherGunStorageAddress: "No",
            purchaseOrder: "Yes",
          };
        case "Apply for a new authority - Another Gun Storage address":
          return {
            whatYouWantToDo: "Apply for a new authority",
            uploadAdditionalExistingDoc: "N/A",
            uploadAdditionalDoc: "No",
            clubANewClub: "No",
            sourceFirstUseAnotherShootingRange: "Yes",
            useAnotherShootingRange: "Yes",
            atWhichOfAddressesWillFirearmsBeStored: "Shooting ranges",
            anotherGunStorageAddress: "Yes",
            purchaseOrder: "No",
          };
        case "Renew existing authority":
          return {
            whatYouWantToDo: "Renew an existing authority",
            uploadAdditionalExistingDoc: "No",
            uploadAdditionalDoc: "No",
            clubANewClub: "N/A",
            sourceFirstUseAnotherShootingRange: "No",
            useAnotherShootingRange: "N/A",
            atWhichOfAddressesWillFirearmsBeStored: "Club secretary's contact address",
            anotherGunStorageAddress: "No",
            purchaseOrder: "Yes",
          };
        case "Renew existing authority - additional support doc - Yes":
          return {
            whatYouWantToDo: "Renew an existing authority",
            uploadAdditionalExistingDoc: "Yes",
            uploadAdditionalDoc: "Yes",
            clubANewClub: "N/A",
            sourceFirstUseAnotherShootingRange: "No",
            useAnotherShootingRange: "N/A",
            atWhichOfAddressesWillFirearmsBeStored: "Club secretary's contact address",
            anotherGunStorageAddress: "No",
            purchaseOrder: "Yes",
          };
        case "Amend existing authority":
          return {
            whatYouWantToDo: "Amend an existing authority",
            uploadAdditionalExistingDoc: "No",
            uploadAdditionalDoc: "No",
            clubANewClub: "N/A",
            sourceFirstUseAnotherShootingRange: "No",
            useAnotherShootingRange: "N/A",
            atWhichOfAddressesWillFirearmsBeStored: "Shooting ranges",
            anotherGunStorageAddress: "Yes",
            purchaseOrder: "No",
          };
        case "Amend existing authority - additional support doc - Yes":
          return {
            whatYouWantToDo: "Amend an existing authority",
            uploadAdditionalExistingDoc: "Yes",
            uploadAdditionalDoc: "yes",
            clubANewClub: "N/A",
            sourceFirstUseAnotherShootingRange: "No",
            useAnotherShootingRange: "N/A",
            atWhichOfAddressesWillFirearmsBeStored: "Shooting ranges",
            anotherGunStorageAddress: "No",
            purchaseOrder: "Yes",
          };
      }
      break;
  }
  throw new Error(`Unknown FAR scenario description: ${product}/${context}/${JSON.stringify(description)}`);
}
