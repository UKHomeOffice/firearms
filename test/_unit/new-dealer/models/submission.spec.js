'use strict';

const prepare = require('../../../../apps/new-dealer/models/submission');

describe('S5 Submission Model', () => {
  describe('Authority Type', () => {
    const defaults = {
      'weapons-ammunition': [],
      'weapons-type': [],
      obtain: [],
      'supporting-documents': [{
        url: 'domain.com/file?id=supporting_docs',
        description: 'Supporting_Documents_Description',
        type: '.pdf',
        URLLoadContent: true
      }],
      'existing-authority-documents': [{
        url: 'domain.com/file?id=existing_docs',
        description: 'Existing_Authority_Documents_Description',
        type: '.pdf',
        URLLoadContent: true
      }]
    };

    it('sets authority type to `Maritime Guards` if usage is to arm guards', () => {
      const input = Object.assign({}, defaults, {
        usage: 'arm-guards'
      });

      const output = prepare(input, { bearer: 'token123' });
      expect(output.AuthorityType).to.equal('Maritime Guards');
    });

    it('sets authority type to `Maritime Guards` if usage is to arm guards and any other usage', () => {
      const input = Object.assign({}, defaults, {
        usage: [
          'transport',
          'arm-guards'
        ]
      });

      const output = prepare(input, { bearer: 'token123' });
      expect(output.AuthorityType).to.equal('Maritime Guards');
    });

    it('sets authority type to `Carriers` if usage is to transport', () => {
      const input = Object.assign({}, defaults, {
        usage: 'transport'
      });

      const output = prepare(input, { bearer: 'token123' });

      expect(output.AuthorityType).to.equal('Carriers');
    });

    it('sets authority type to `Carriers` if usage is to transfer', () => {
      const input = Object.assign({}, defaults, {
        usage: 'transfer'
      });

      const output = prepare(input, { bearer: 'token123' });
      expect(output.AuthorityType).to.equal('Carriers');
    });

    it('sets authority type to `Carriers and Dealers` if usage is to transfer and any other usage', () => {
      const input = Object.assign({}, defaults, {
        usage: [
          'sell',
          'transfer'
        ]
      });

      const output = prepare(input, { bearer: 'token123' });
      expect(output.AuthorityType).to.equal('Carriers and Dealers');
    });

    it('sets authority type to `Carriers and Dealers` if usage is to transfer, sell and transfer', () => {
      const input = Object.assign({}, defaults, {
        usage: [
          'sell',
          'transport',
          'transfer'
        ]
      });

      const output = prepare(input, { bearer: 'token123' });
      expect(output.AuthorityType).to.equal('Carriers and Dealers');
    });

    it('sets authority type to `Carriers and Dealers` if usage is to transport and any other usage', () => {
      const input = Object.assign({}, defaults, {
        usage: [
          'deactivation',
          'transport'
        ]
      });

      const output = prepare(input, { bearer: 'token123' });
      expect(output.AuthorityType).to.equal('Carriers and Dealers');
    });

    it('sets authority type to `Dealer` if usage is any other usage', () => {
      const input = Object.assign({}, defaults, {
        usage: [
          'sell',
          'deactivation'
        ]
      });

      const output = prepare(input, { bearer: 'token123' });
      expect(output.AuthorityType).to.equal('Dealer');
    });

    it('usage can be a string', () => {
      const input = Object.assign({}, defaults, {
        usage: 'transfer'
      });

      const output = prepare(input, { bearer: 'token123' });
      expect(output.AuthorityType).to.equal('Carriers');
    });

    it('sets the supporting documents to include the existing authority documents', () => {
      const input = Object.assign({}, defaults, {
        usage: 'transfer',
        activity: null
      });

      const output = prepare(input, { bearer: 'token123' });
      expect(output['Document2.URL']).to.equal('domain.com/vault?id=supporting_docs&token=token123');
      expect(output['Document2.Name']).to.equal('Supporting_Documents_Description');
      expect(output['Document2.MimeType']).to.equal('.pdf');
      expect(output['Document2.URLLoadContent']).to.equal(true);
      expect(output['Document3.URL']).to.equal('domain.com/vault?id=existing_docs&token=token123');
      expect(output['Document3.Name']).to.equal('Existing_Authority_Documents_Description');
      expect(output['Document3.MimeType']).to.equal('.pdf');
      expect(output['Document3.URLLoadContent']).to.equal(true);
    });

    it('maps all specified and unspecified weapon and ammunition authorities', () => {
      const weaponTypes = [
        'unspecified',
        'fully-automatic',
        'self-loading',
        'short-pistols',
        'short-self-loading',
        'large-revolvers',
        'rocket-launchers',
        'air-rifles',
        'fire-noxious-substance',
        'disguised-firearms',
        'military-use-rockets',
        'projecting-launchers'
      ];
      const ammunitionTypes = [
        'unspecified',
        'explosive-cartridges',
        'incendiary-missile',
        'armour-piercing',
        'expanding-missile',
        'missiles-for-above'
      ];
      const input = Object.assign({}, defaults, {
        usage: ['sell', 'transport', 'transfer', 'arm-guards', 'training', 'research', 'deactivation', 'other'],
        activity: 'new',
        organisation: 'company',
        'company-name': 'Test Company',
        'first-authority-holders-name': 'First Holder',
        'first-authority-holders-address-manual': '1 Test Road',
        'contact-holder': 'first',
        'contact-email': 'test@example.com',
        'contact-phone': '01234567890',
        'weapons-ammunition': ['weapons', 'ammunition'],
        'weapons-types': weaponTypes,
        'weapons-unspecified-details': 'Other weapons',
        'ammunition-types': ammunitionTypes,
        'ammunition-unspecified-details': 'Other ammunition',
        obtain: ['buy', 'temporary-possession', 'manufacture', 'wont-take-possession', 'other-means'],
        import: 'yes',
        'import-country': 'France'
      });
      weaponTypes.concat(ammunitionTypes).forEach(type => {
        input[`${type}-quantity`] = 2;
      });

      const output = prepare(input, {bearer: 'token123'});

      expect(output).to.deep.include({
        AuthorityCoversWeapons: 'Yes',
        WeaponsUnspecified: 'Yes',
        WeaponsUnspecifiedReason: 'Other weapons',
        'WeaponsS1-a': 'Yes',
        'WeaponsS1-aQuantity': 2,
        'WeaponsS1A-c': 'Yes',
        'WeaponsS1A-cQuantity': 2,
        AuthorityCoversAmmunition: 'Yes',
        AmmunitionUnspecified: 'Yes',
        AmmunitionUnspecifiedReason: 'Other ammunition',
        'AmmunitionS1-c': 'Yes',
        'AmmunitionS1-cQuantity': 2,
        'AmmunitionS1A-g': 'Yes',
        'AmmunitionS1A-gQuantity': 2,
        AcquiredBuy: 'Yes',
        AcquiredTemporaryPossession: 'Yes',
        AcquiredManufacture: 'Yes',
        AcquiredNoPossesion: 'Yes',
        AcquiredOtherMeans: 'Yes',
        CountryOfImport: 'France',
        ActivitySelling: 'Yes',
        ActivityTransport: 'Yes',
        ActivityTransfer: 'Yes',
        ActivityArmedGuardsToProtectShips: 'Yes',
        ActivityTrainingAndDemonstration: 'Yes',
        ActivityResearchForensicsTesting: 'Yes',
        ActivityDeactivation: 'Yes',
        ActivityOther: 'Yes'
      });
    });

    it('maps a second authority holder and lookup address', () => {
      const output = prepare(Object.assign({}, defaults, {
        usage: 'sell',
        activity: 'renew',
        'contact-holder': 'second',
        'second-authority-holders-name': 'Second Holder',
        'second-authority-holders-address-lookup': '2 Test Road'
      }), {bearer: 'token123'});

      expect(output['Agent.Name']).to.equal('Second Holder');
      expect(output['Agent.Address']).to.equal('2 Test Road');
      expect(output.AuthorityCoversWeapons).to.equal(undefined);
      expect(output.AuthorityCoversAmmunition).to.equal(undefined);
      expect(output.CountryOfImport).to.equal(undefined);
      expect(output.AcquiredBuy).to.equal('No');
    });

    it('maps another contact and manual address', () => {
      const output = prepare(Object.assign({}, defaults, {
        usage: 'sell',
        activity: 'vary',
        'contact-holder': 'other',
        'someone-else-name': 'Other Contact',
        'contact-address-manual': '3 Test Road'
      }), {bearer: 'token123'});

      expect(output['Agent.Name']).to.equal('Other Contact');
      expect(output['Agent.Address']).to.equal('3 Test Road');
    });
  });
});
