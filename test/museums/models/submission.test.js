'use strict';

const prepare = require('../../../apps/museums/models/submission');

describe('Museums Submission Model', () => {

  describe('Authority Type', () => {

    const defaults = {
      'location-addresses': [],
      'all-storage-addresses': [],
      'existing-authority-documents': [{
        url: 'testURL',
        description: 'test description',
        type: '.pdf',
        URLLoadContent: true
      }]
    };

    it('sets application type to `Renewal` if data activity is set to renew', () => {

      const data = Object.assign({}, defaults, {
        'activity': 'renew',
      });

      const output = prepare(data);
      expect(output.ApplicationType).to.equal('Renewal');
    });

    it('sets application type to `Application` if data activity is set to new', () => {

      const data = Object.assign({}, defaults, {
        'activity': 'new',
      });

      const output = prepare(data);
      expect(output.ApplicationType).to.equal('Application');
    });

    it('sets application type to `Vary` if data activity is set to vary', () => {

      const data = Object.assign({}, defaults, {
        'activity': 'vary',
      });

      const output = prepare(data);
      expect(output.ApplicationType).to.equal('Vary');
    });

    it('sets application type to `Renewal` if data activity is null', () => {

      const data = Object.assign({}, defaults, {
        'activity': null,
      });

      const output = prepare(data);
      expect(output.ApplicationType).to.equal('Renewal');
    });

    it('sets application type to `Renewal` if data activity is empty', () => {

      const data = Object.assign({}, defaults, {
        'activity': '',
      });

      const output = prepare(data);
      expect(output.ApplicationType).to.equal('Renewal');
    });

    it('sets document information into the response', () => {

      const data = Object.assign({}, defaults, {
        'activity': null
      });

      const output = prepare(data);
      expect(output['Document2.URL']).to.equal('testURL');
      expect(output['Document2.Name']).to.equal('test description');
      expect(output['Document2.MimeType']).to.equal('.pdf');
      expect(output['Document2.URLLoadContent']).to.equal(true);
    });
  });
});
