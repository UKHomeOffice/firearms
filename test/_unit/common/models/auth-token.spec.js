'use strict';

const AuthToken = require('../../../../apps/common/models/auth-token');
const config = require('../../../../config');

describe('Auth token model', () => {
  let keycloak;
  let sandbox;

  beforeEach(() => {
    keycloak = Object.assign({}, config.keycloak);
    sandbox = sinon.createSandbox();
    Object.assign(config.keycloak, {
      token: 'https://keycloak.example.test/token',
      username: 'username',
      password: 'password',
      clientId: 'client-id',
      secret: 'client-secret'
    });
  });

  afterEach(() => {
    Object.assign(config.keycloak, keycloak);
    sandbox.restore();
  });

  it('returns the local token when no token URL is configured', async () => {
    config.keycloak.token = undefined;
    const model = new AuthToken();
    sandbox.stub(model, '_request');

    expect(await model.auth()).to.deep.equal({bearer: 'abc123'});
    expect(model._request).not.to.have.been.called;
  });

  it('requests and maps a Keycloak access token', async () => {
    const model = new AuthToken();
    sandbox.stub(model, '_request').resolves({data: {access_token: 'access-token'}});

    expect(await model.auth()).to.deep.equal({bearer: 'access-token'});
    expect(model._request).to.have.been.calledWithExactly({
      url: 'https://keycloak.example.test/token',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      data: {
        username: 'username',
        password: 'password',
        grant_type: 'password',
        client_id: 'client-id',
        client_secret: 'client-secret'
      },
      method: 'POST'
    });
  });

  it('propagates authentication failures', async () => {
    const model = new AuthToken();
    sandbox.stub(model, '_request').rejects(new Error('Authentication failed'));

    await expect(model.auth()).to.be.rejectedWith('Authentication failed');
  });
});
