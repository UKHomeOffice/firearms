'use strict';

const crypto = require('crypto');
const Documents = require('../../../../apps/common/models/i-casework-documents');
const config = require('../../../../config');

describe('iCasework documents model', () => {
  let original;
  let clock;

  beforeEach(() => {
    original = Object.assign({}, config.icasework);
    Object.assign(config.icasework, {
      url: 'https://casework.example.test',
      uploadpath: '/uploaddocuments',
      dbName: 'Firearms database',
      secret: 'casework-secret'
    });
    clock = sinon.useFakeTimers(new Date('2026-09-15T12:00:00Z'));
  });

  afterEach(() => {
    Object.assign(config.icasework, original);
    clock.restore();
  });

  it('builds an encoded upload URL and reference signature', () => {
    const model = new Documents({'reference-number': 'case-1'});
    const signature = crypto.createHash('md5')
      .update('case-12026-09-15casework-secret')
      .digest('hex');

    expect(model.url()).to.equal('https://casework.example.test/uploaddocuments?db=Firearms%20database');
    expect(model.sign()).to.equal(signature);
  });

  it('maps the upload response to the create-case response shape', () => {
    const model = new Documents();

    expect(model.parse({uploaddocumentsresponse: {caseid: 'case-1'}})).to.deep.equal({
      createcaseresponse: {caseid: 'case-1'}
    });
  });
});
