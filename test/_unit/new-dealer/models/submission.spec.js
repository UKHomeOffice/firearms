'use strict';

const prepare = require('../../../../apps/new-dealer/models/submission');

describe('S5 Submission Model', () => {
  describe('Authority Type', () => {
    const defaults = {
      'weapons-ammunition': [],
      'weapons-type': [],
      obtain: [],
      'supporting-documents': [{
        url: 'Supporting_Documents_URL',
        description: 'Supporting_Documents_Description',
        type: '.pdf',
        URLLoadContent: true
      }],
      'existing-authority-documents': [{
        url: 'Existing_Authority_Documents_URL',
        description: 'Existing_Authority_Documents_Description',
        type: '.pdf',
        URLLoadContent: true
      }]
    };

    it('sets authority type to `Maritime Guards` if usage is to arm guards', () => {
      const input = Object.assign({}, defaults, {
        usage: 'arm-guards'
      });

      const output = prepare(input);
      expect(output.AuthorityType).to.equal('Maritime Guards');
    });

    it('sets authority type to `Maritime Guards` if usage is to arm guards and any other usage', () => {
      const input = Object.assign({}, defaults, {
        usage: [
          'transport',
          'arm-guards'
        ]
      });

      const output = prepare(input);
      expect(output.AuthorityType).to.equal('Maritime Guards');
    });

    it('sets authority type to `Carriers` if usage is to transport', () => {
      const input = Object.assign({}, defaults, {
        usage: 'transport'
      });

      const output = prepare(input);

      expect(output.AuthorityType).to.equal('Carriers');
    });

    it('sets authority type to `Carriers` if usage is to transfer', () => {
      const input = Object.assign({}, defaults, {
        usage: 'transfer'
      });

      const output = prepare(input);
      expect(output.AuthorityType).to.equal('Carriers');
    });

    it('sets authority type to `Carriers and Dealers` if usage is to transfer and any other usage', () => {
      const input = Object.assign({}, defaults, {
        usage: [
          'sell',
          'transfer'
        ]
      });

      const output = prepare(input);
      expect(output.AuthorityType).to.equal('Carriers and Dealers');
    });

    it('sets authority type to `Carriers and Dealers` if usage is to transport, sell and transfer', () => {
      const input = Object.assign({}, defaults, {
        usage: [
          'sell',
          'transport',
          'transfer'
        ]
      });

      const output = prepare(input);
      expect(output.AuthorityType).to.equal('Carriers and Dealers');
    });

    it('sets authority type to `Carriers and Dealers` if usage is to transport and any other usage', () => {
      const input = Object.assign({}, defaults, {
        usage: [
          'deactivation',
          'transport'
        ]
      });

      const output = prepare(input);
      expect(output.AuthorityType).to.equal('Carriers and Dealers');
    });

    it('sets authority type to `Dealer` if usage is any other usage', () => {
      const input = Object.assign({}, defaults, {
        usage: [
          'sell',
          'deactivation'
        ]
      });

      const output = prepare(input);
      expect(output.AuthorityType).to.equal('Dealer');
    });

    it('usage can be a string', () => {
      const input = Object.assign({}, defaults, {
        usage: 'transfer'
      });

      const output = prepare(input);
      expect(output.AuthorityType).to.equal('Carriers');
    });

    it('sets the supporting documents to include the existing authority documents', () => {
      const input = Object.assign({}, defaults, {
        usage: 'transfer',
        activity: null
      });

      const output = prepare(input);
      expect(output['Document2.URL']).to.equal('Supporting_Documents_URL');
      expect(output['Document2.Name']).to.equal('Supporting_Documents_Description');
      expect(output['Document2.MimeType']).to.equal('.pdf');
      expect(output['Document2.URLLoadContent']).to.equal(true);
      expect(output['Document3.URL']).to.equal('Existing_Authority_Documents_URL');
      expect(output['Document3.Name']).to.equal('Existing_Authority_Documents_Description');
      expect(output['Document3.MimeType']).to.equal('.pdf');
      expect(output['Document3.URLLoadContent']).to.equal(true);
    });
  });
});
