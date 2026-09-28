'use strict';

const prepare = require('../../../../apps/shooting-clubs/models/submission');

describe('Shooting Clubs Submission Model', () => {
  describe('Authority Type', () => {
    const token = {bearer: 'token123'};
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
      const data = Object.assign({}, defaults, {activity: 'renew'});
      expect(prepare(data, token).ApplicationType).to.equal('Renewal');
    });

    it('sets application type to `Application` if data activity is set to new', () => {
      const data = Object.assign({}, defaults, {activity: 'new'});
      expect(prepare(data, token).ApplicationType).to.equal('Application');
    });

    it('sets application type to `Vary` if data activity is set to vary', () => {
      const data = Object.assign({}, defaults, {activity: 'vary'});
      expect(prepare(data, token).ApplicationType).to.equal('Vary');
    });

    it('sets application type to `Renewal` if data activity is null', () => {
      const data = Object.assign({}, defaults, {activity: null});
      expect(prepare(data, token).ApplicationType).to.equal('Renewal');
    });

    it('sets application type to `Renewal` if data activity is empty', () => {
      const data = Object.assign({}, defaults, {activity: ''});
      expect(prepare(data, token).ApplicationType).to.equal('Renewal');
    });

    it('sets document information into the response', () => {
      const output = prepare(Object.assign({}, defaults, {activity: null}), token);
      expect(output['Document2.URL']).to.equal('testURL&token=token123');
      expect(output['Document2.Name']).to.equal('test description');
      expect(output['Document2.MimeType']).to.equal('.pdf');
      expect(output['Document2.URLLoadContent']).to.equal(true);
    });
  });
});
