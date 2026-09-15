'use strict';

const prepare = require('../../../../apps/supporting-documents/models/submission');

describe('Supporting documents submission model', () => {
  it('returns only the case ID without documents', () => {
    expect(prepare({'reference-number': 'case-1'}, {bearer: 'token'})).to.deep.equal({
      CaseId: 'case-1'
    });
  });

  it('formats and authorises every document', () => {
    const result = prepare({
      'reference-number': 'case-1',
      'supporting-documents': [{
        url: 'https://documents.test/file?id=1',
        description: 'First document',
        type: 'application/pdf'
      }, {
        url: 'https://documents.test/file?id=2',
        description: 'Second document',
        type: 'image/png'
      }]
    }, {bearer: 'token'});

    expect(result).to.deep.equal({
      CaseId: 'case-1',
      'Document1.URL': 'https://documents.test/vault?id=1&token=token',
      'Document1.Name': 'First document',
      'Document1.MimeType': 'application/pdf',
      'Document1.URLLoadContent': true,
      'Document2.URL': 'https://documents.test/vault?id=2&token=token',
      'Document2.Name': 'Second document',
      'Document2.MimeType': 'image/png',
      'Document2.URLLoadContent': true
    });
  });
});
