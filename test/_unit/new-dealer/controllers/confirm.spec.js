'use strict';

const proxyquire = require('proxyquire');

class LegacyConfirm {
  locals() {
    return {
      rows: this.rows || [],
      existing: true
    };
  }

  formatData() {
    return this.formattedData || [];
  }

  getValues(req, res, callback) {
    callback(null, 'get-values');
  }

  saveValues(req, res, callback) {
    callback(null, 'save-values');
  }
}

const Confirm = proxyquire('../../../../apps/new-dealer/controllers/confirm', {
  '../../common/controllers/legacy-confirm': LegacyConfirm
});

const translate = key => key;

describe('New dealer confirm controller', () => {
  let controller;

  beforeEach(() => {
    controller = new Confirm();
  });

  describe('locals', () => {
    it('adds content, removes empty rows and expands other usage', () => {
      controller.rows = [{
        fields: [{field: 'usage', value: 'Other'}]
      }, {
        fields: []
      }, {
        section: 'without-fields'
      }];
      const req = {
        rawTranslate: sinon.stub().withArgs('pages.confirm').returns('Confirm content'),
        sessionModel: {
          get: sinon.stub()
        }
      };
      req.sessionModel.get.withArgs('usage').returns(['other']);
      req.sessionModel.get.withArgs('other-details').returns('testing');

      const result = controller.locals(req, {});

      expect(result.existing).to.equal(true);
      expect(result.content).to.equal('Confirm content');
      expect(result.rows).to.have.length(2);
      expect(result.rows[0].fields[0].value).to.equal('Other (testing)');
    });

    it('leaves usage unchanged when other is not selected', () => {
      controller.rows = [{fields: [{field: 'usage', value: 'Sell'}]}];
      const req = {
        rawTranslate: sinon.stub().returns('Confirm content'),
        sessionModel: {get: sinon.stub().returns(['sell'])}
      };

      expect(controller.locals(req, {}).rows[0].fields[0].value).to.equal('Sell');
    });
  });

  describe('delegation', () => {
    it('delegates getValues to the legacy controller', done => {
      controller.getValues({}, {}, (error, value) => {
        expect(error).to.equal(null);
        expect(value).to.equal('get-values');
        done();
      });
    });

    it('delegates saveValues to the legacy controller', done => {
      controller.saveValues({}, {}, (error, value) => {
        expect(error).to.equal(null);
        expect(value).to.equal('save-values');
        done();
      });
    });
  });

  describe('summary helpers', () => {
    it('modifies matching fields and ignores sections without fields', () => {
      const output = [{section: 'empty'}, {
        fields: [{field: 'usage', value: 'Other'}, {field: 'name', value: 'Test'}]
      }];

      controller.modifyField(output, 'usage', value => `${value} details`);

      expect(output[1].fields[0].value).to.equal('Other details');
      expect(output[1].fields[1].value).to.equal('Test');
    });

    it('returns undefined when there are no storage addresses', () => {
      expect(controller.addAddressLoopSection({}, translate)).to.equal(undefined);
    });

    it('formats storage addresses', () => {
      const result = controller.addAddressLoopSection({
        storageAddresses: {
          first: {address: '1 Test Road'},
          second: {address: '2 Test Road'}
        }
      }, translate);

      expect(result.section).to.equal('pages.storage-address.summary');
      expect(result.step).to.equal('storage-add-another-address');
      expect(result.items.map(item => item.fields[0].value)).to.deep.equal([
        '1 Test Road',
        '2 Test Road'
      ]);
    });

    it('returns undefined when weapon types are absent', () => {
      expect(controller.getWeaponsAmmunitionQuantity({}, translate, 'weapons')).to.equal(undefined);
    });

    it('formats one or more specified weapon types', () => {
      const result = controller.getWeaponsAmmunitionQuantity({
        'weapons-types': ['rifle', 'shotgun'],
        'rifle-quantity': 2,
        'shotgun-quantity': 3
      }, translate, 'weapons');

      expect(result.items).to.have.length(2);
      expect(result.items[0].fields[0].value).to.equal(2);
      expect(result.items[0].fields[1].value).to.equal('fields.weapons-types.options.rifle.label');
      expect(result.headers).to.deep.equal([
        'fields.quantity-base.summary',
        'fields.weapons-types.summary'
      ]);
      expect(result.moreThanOneField).to.equal(true);
    });

    it('casts a single specified ammunition type to an array', () => {
      const result = controller.getWeaponsAmmunitionQuantity({
        'ammunition-types': 'rifle',
        'rifle-quantity': 4
      }, translate, 'ammunition');

      expect(result.items).to.have.length(1);
      expect(result.section).to.equal('pages.ammunition.summary');
    });

    it('formats unspecified weapon details', () => {
      const result = controller.getWeaponsAmmunitionQuantity({
        'weapons-types': 'unspecified',
        'weapons-unspecified-details': 'Unknown weapons'
      }, translate, 'weapons');

      expect(result.items.fields[0].value).to.equal('fields.weapons-types.options.unspecified.label');
      expect(result.items.fields[1].value).to.equal('Unknown weapons');
      expect(result.headers).to.deep.equal([
        'fields.weapons-types.summary',
        'fields.further-details.summary'
      ]);
    });

    it('adds first authority-holder addresses to either first-holder heading', () => {
      const result = [{
        section: 'pages.first-authority-holder.header.authority-holders.one',
        fields: []
      }, {
        section: 'pages.first-authority-holder.header.authority-holders.two',
        fields: []
      }, {
        section: 'other',
        fields: []
      }];

      controller.addFirstAuthorityAddressDetails({
        'first-authority-holders-address-manual': '1 Test Road'
      }, translate, result);

      expect(result[0].fields[0].value).to.equal('1 Test Road');
      expect(result[1].fields[0].step).to.equal('/first-authority-holders-address');
      expect(result[2].fields).to.deep.equal([]);
    });

    it('adds the second authority-holder address to its section', () => {
      const result = [{section: 'pages.second-authority-holder.header', fields: []}];

      controller.addSecondAuthorityAddressDetails({
        'second-authority-holders-address-manual': '2 Test Road'
      }, translate, result);

      expect(result[0].fields[0].value).to.equal('2 Test Road');
      expect(result[0].fields[0].step).to.equal('/second-authority-holders-address');
    });

    it('omits empty supporting and existing-authority document sections', () => {
      expect(controller.getSupportingDocuments({}, translate)).to.equal(null);
      expect(controller.getSupportingDocuments({'supporting-documents': []}, translate)).to.equal(null);
      expect(controller.getExistingAuthorityDocuments({}, translate)).to.equal(null);
      expect(controller.getExistingAuthorityDocuments({'existing-authority-documents': []}, translate))
        .to.equal(null);
    });

    it('formats supporting documents', () => {
      const result = controller.getSupportingDocuments({
        'supporting-documents': [{description: 'Document one'}, {description: 'Document two'}]
      }, translate);

      expect(result.items).to.have.length(2);
      expect(result.items[0].fields.value).to.equal('Document one');
      expect(result.step).to.equal('/supporting-documents-add-another');
    });

    it('formats existing-authority documents', () => {
      const result = controller.getExistingAuthorityDocuments({
        'existing-authority-documents': [{description: 'Existing document'}]
      }, translate);

      expect(result.items[0].fields.value).to.equal('Existing document');
      expect(result.step).to.equal('/existing-authority-add-another');
    });

    it('adds invoice contact name and address', () => {
      const result = [{
        section: 'pages.invoice-details.header',
        fields: [{field: 'contact-holder', value: 'Old name'}, {field: 'email', value: 'test@example.com'}]
      }, {section: 'other', fields: []}];

      controller.addInvoiceAddressDetails({
        'invoice-contact-name': 'New name',
        'invoice-address': '3 Test Road'
      }, translate, result);

      expect(result[0].fields[0].value).to.equal('New name');
      expect(result[0].fields[2].value).to.equal('3 Test Road');
      expect(result[0].fields[2].step).to.equal('/invoice-address-input');
    });
  });

  describe('contact details', () => {
    it('gets a selected authority holder name', () => {
      expect(controller.getContactHoldersName({
        'contact-holder': 'first',
        'first-authority-holders-name': 'First Holder'
      })).to.equal('First Holder');
    });

    it('gets the other contact name', () => {
      expect(controller.getContactHoldersName({
        'contact-holder': 'other',
        'someone-else-name': 'Another Contact'
      })).to.equal('Another Contact');
    });

    [
      {
        description: 'the authority holder manual address',
        data: {
          'contact-holder': 'first',
          'first-authority-holders-name': 'First Holder',
          'first-authority-holders-address-manual': '1 Test Road'
        },
        expected: '1 Test Road'
      },
      {
        description: 'a different lookup address',
        data: {
          'contact-holder': 'first',
          'first-authority-holders-name': 'First Holder',
          'use-different-address': 'true',
          'authority-holder-contact-address-lookup': '2 Test Road'
        },
        expected: '2 Test Road'
      },
      {
        description: 'the other contact address',
        data: {
          'contact-holder': 'other',
          'someone-else-name': 'Another Contact',
          'contact-address-manual': '3 Test Road'
        },
        expected: '3 Test Road'
      }
    ].forEach(testCase => {
      it(`adds ${testCase.description}`, () => {
        const result = [{
          section: 'pages.contacts-details.header',
          fields: [{field: 'contact-holder', value: 'Old name'}]
        }, {section: 'other', fields: []}];

        controller.addContactDetailsSection(testCase.data, translate, result);

        expect(result[0].fields[0].value).to.equal(
          testCase.data['first-authority-holders-name'] || testCase.data['someone-else-name']
        );
        expect(result[0].fields[1].value).to.equal(testCase.expected);
        expect(result[0].fields[1].step).to.equal('/contact');
      });
    });
  });

  it('inserts custom sections while formatting data', () => {
    controller.formattedData = [
      {section: 'one', fields: []},
      {section: 'two', fields: []},
      {section: 'pages.first-authority-holder.header.authority-holders.one', fields: []},
      {section: 'pages.second-authority-holder.header', fields: []},
      {section: 'pages.contacts-details.header', fields: [{field: 'contact-holder'}]},
      {section: 'pages.invoice-details.header', fields: [{field: 'contact-holder'}]}
    ];
    const data = {
      storageAddresses: {first: {address: '1 Test Road'}},
      'weapons-types': 'rifle',
      'rifle-quantity': 1,
      'ammunition-types': 'unspecified',
      'ammunition-unspecified-details': 'Unknown',
      'first-authority-holders-address-manual': '1 Test Road',
      'second-authority-holders-address-manual': '2 Test Road',
      'supporting-documents': [{description: 'Supporting'}],
      'existing-authority-documents': [{description: 'Existing'}],
      'invoice-contact-name': 'Invoice Contact',
      'invoice-address': '3 Test Road',
      'contact-holder': 'other',
      'someone-else-name': 'Other Contact',
      'contact-address-manual': '4 Test Road'
    };

    const result = controller.formatData(data, translate);

    expect(result.filter(Boolean)).to.have.length(11);
    expect(result.some(section => section && section.section === 'pages.storage-address.summary')).to.equal(true);
    expect(result.some(section => section && section.section === 'pages.weapons.summary')).to.equal(true);
    expect(result.some(section => section && section.section === 'pages.ammunition.summary')).to.equal(true);
  });
});
