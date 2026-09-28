'use strict';

const crypto = require('crypto');
const Casework = require('../../../../apps/common/models/i-casework');
const config = require('../../../../config');

describe('iCasework model', () => {
  let original;
  let sandbox;

  beforeEach(() => {
    original = {
      env: config.env,
      icasework: Object.assign({}, config.icasework)
    };
    Object.assign(config.icasework, {
      url: 'https://casework.example.test',
      createpath: '/createcase',
      dbName: 'Firearms database',
      key: 'casework-key',
      secret: 'casework-secret',
      timeout: 1234
    });
    config.env = 'test';
    sandbox = sinon.createSandbox();
    sandbox.useFakeTimers(new Date('2026-09-15T12:00:00Z'));
  });

  afterEach(() => {
    config.env = original.env;
    Object.assign(config.icasework, original.icasework);
    sandbox.restore();
  });

  it('uses configured and explicit request timeouts', () => {
    expect(new Casework().options.timeout).to.equal(1234);
    expect(new Casework({}, {timeout: 500}).options.timeout).to.equal(500);
  });

  it('builds the encoded create-case URL and signature', () => {
    const model = new Casework();
    const signature = crypto.createHash('md5')
      .update('2026-09-15casework-secret')
      .digest('hex');

    expect(model.url()).to.equal('https://casework.example.test/createcase?db=Firearms%20database');
    expect(model.sign()).to.equal(signature);
  });

  it('prepares base case data without a PDF', () => {
    const result = new Casework().prepare({bearer: 'token'});

    expect(result).to.deep.include({
      Key: 'casework-key',
      Type: 'Firearms',
      Format: 'json',
      db: 'Firearms database',
      RequestMethod: 'Online form'
    });
    expect(result).not.to.have.property('Document1.URL');
  });

  it('prepares an authorised PDF document', () => {
    const result = new Casework({'pdf-upload': 'https://documents.test/file?id=1'}).prepare({bearer: 'token'});

    expect(result).to.deep.include({
      'Document1.Name': 'full application data',
      'Document1.URL': 'https://documents.test/vault?id=1&token=token',
      'Document1.MimeType': 'application/pdf',
      'Document1.URLLoadContent': true
    });
  });

  it('returns a mock response outside production when credentials are absent', async () => {
    config.icasework.key = undefined;
    config.icasework.secret = undefined;
    const model = new Casework();
    sandbox.stub(model, '_request');

    expect(await model.save('session-id')).to.deep.equal({
      createcaseresponse: {caseid: 'mock caseid'}
    });
    expect(model._request).not.to.have.been.called;
  });

  it('posts and parses a live response', async () => {
    const model = new Casework();
    sandbox.stub(model, 'prepare').returns({prepared: true});
    sandbox.stub(model, '_request').resolves({
      status: 200,
      data: {createcaseresponse: {caseid: 'case-1'}}
    });

    expect(await model.save('session-id')).to.deep.equal({
      createcaseresponse: {caseid: 'case-1'}
    });
    expect(model._request).to.have.been.calledWithExactly({
      url: 'https://casework.example.test/createcase?db=Firearms%20database',
      data: {prepared: true},
      timeout: 1234,
      method: 'POST'
    });
  });

  it('does not use the mock response in production', async () => {
    config.env = 'production';
    config.icasework.secret = undefined;
    const model = new Casework();
    sandbox.stub(model, 'prepare').returns({prepared: true});
    sandbox.stub(model, '_request').resolves({
      status: 200,
      data: {createcaseresponse: {caseid: 'live-case'}}
    });

    expect(await model.save('session-id')).to.deep.equal({
      createcaseresponse: {caseid: 'live-case'}
    });
    expect(model._request).to.have.been.calledOnce;
  });

  it('wraps provider failures with context', async () => {
    const model = new Casework();
    sandbox.stub(model, '_request').rejects(new Error('Provider unavailable'));

    await expect(model.save('session-id')).to.be.rejectedWith(
      'Failed to save data: Provider unavailable'
    );
  });
});
