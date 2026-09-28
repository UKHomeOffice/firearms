'use strict';

const crypto = require('crypto');
const GetCase = require('../../../../apps/common/models/i-casework-getcase');
const config = require('../../../../config');

describe('iCasework get-case model', () => {
  let original;
  let sandbox;

  beforeEach(() => {
    original = Object.assign({}, config.icasework);
    Object.assign(config.icasework, {
      url: 'https://casework.example.test',
      getcasepath: '/getcasedetails',
      dbName: 'Firearms database',
      key: 'casework-key',
      secret: 'casework-secret'
    });
    sandbox = sinon.createSandbox();
    sandbox.useFakeTimers(new Date('2026-09-15T12:00:00Z'));
  });

  afterEach(() => {
    Object.assign(config.icasework, original);
    sandbox.restore();
  });

  it('builds the lookup URL, signature and case parameters', () => {
    const model = new GetCase({'reference-number': 'case-1'});
    const signature = crypto.createHash('md5')
      .update('case-12026-09-15casework-secret')
      .digest('hex');

    expect(model.url()).to.equal('https://casework.example.test/getcasedetails');
    expect(model.sign()).to.equal(signature);
    expect(model.prepare()).to.deep.include({CaseId: 'case-1', Key: 'casework-key'});
  });

  it('maps party details', () => {
    expect(new GetCase().parse({
      'MainParty.FullName': 'Test Person',
      'MainParty.EmailAddress': 'test@example.com'
    })).to.deep.equal({name: 'Test Person', email: 'test@example.com'});
  });

  it('fetches and parses case details', async () => {
    const model = new GetCase({'reference-number': 'case-1'});
    sandbox.stub(model, '_request').resolves({
      data: {
        'MainParty.FullName': 'Test Person',
        'MainParty.EmailAddress': 'test@example.com'
      }
    });

    expect(await model.fetch()).to.deep.equal({
      name: 'Test Person',
      email: 'test@example.com'
    });
    expect(model._request).to.have.been.calledWith(sinon.match({
      url: 'https://casework.example.test/getcasedetails',
      method: 'GET',
      params: sinon.match({CaseId: 'case-1'})
    }));
  });

  it('preserves provider timeout codes', async () => {
    const model = new GetCase({'reference-number': 'case-1'});
    const error = Object.assign(new Error('Request timed out'), {code: 'ETIMEDOUT'});
    sandbox.stub(model, '_request').rejects(error);

    await expect(model.fetch()).to.be.rejected.then(caught => {
      expect(caught.code).to.equal('ETIMEDOUT');
      expect(caught.message).to.include('Request timed out');
    });
  });
});
