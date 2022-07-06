/* eslint-disable node/no-deprecated-api */
'use strict';

const Model = require('../../../../apps/common/models/file-upload');
const config = require('../../../../config');

describe('File Upload Model', () => {
  let sandbox;

  beforeEach(function () {
    config.upload.hostname = 'http://test.example.com/file/upload';
    sandbox = sinon.createSandbox();
    sandbox.stub(Model.prototype, 'request').yieldsAsync(null, {
      api: 'response',
      url: '/file/12341212132123?foo=bar'
    });
    sandbox.stub(Model.prototype, 'auth').returns(new Promise(resolve => {
      resolve({ bearer: 'myaccesstoken' });
    }));
  });

  afterEach(() => sandbox.restore());

  describe('save', () => {
    it('returns a promise', () => {
      const model = new Model();
      const response = model.save();
      expect(response).to.be.an.instanceOf(Promise);
    });

    it('makes a call to file upload api', () => {
      const model = new Model();
      const response = model.save();
      return response.then(() => {
        expect(model.request).to.have.been.calledOnce;
        expect(model.request).to.have.been.calledWith(sinon.match({
          method: 'POST',
          host: 'test.example.com',
          path: '/file/upload',
          protocol: 'http:'
        }));
      });
    });

    it('resolves with response from api endpoint', () => {
      const model = new Model();
      const response = model.save();
      return expect(response).to.eventually.deep.equal({
        api: 'response',
        url: '/vault/12341212132123?foo=bar&token=myaccesstoken'
      });
    });

    it('rejects if api call fails', () => {
      const model = new Model();
      const err = new Error('test error');
      model.request.yieldsAsync(err);
      const response = model.save();
      return expect(response).to.be.rejectedWith(err);
    });

    it('adds a formData property to api request with details of uploaded file', () => {
      const uploadedFile = new Model({
        data: 'foo',
        name: 'myfile.png',
        mimetype: 'image/png'
      });
      const response = uploadedFile.save();
      return response.then(() => {
        expect(uploadedFile.request).to.have.been.calledWith(sinon.match({
          formData: {
            document: {
              value: 'foo',
              options: {
                filename: 'myfile.png',
                contentType: 'image/png'
              }
            }
          }
        }));
      });
    });

    it('returns an error if there is an auth failure after retries attempted', async () => {
      const model = new Model();
      model.auth = sinon.stub();
      model.auth.rejects(new Error('Auth Error'));
      try {
        await model.save();
      } catch (e) {
        const msg = 'Failed to authenticate the upload. Please try again. Error: Error: Auth Error';
        e.should.be.instanceof(Error);
        expect(e.message).to.eql(msg);

        model.auth.should.have.been.calledThrice;
      }
    });

    it('calls the authentication endpoint with retry attempts specified in the config', async () => {
      config.keycloak.authTokenRetries = 2;
      const model = new Model();
      model.auth = sinon.stub();
      model.auth.rejects(new Error('Auth Error'));
      try {
        await model.save();
      } catch (e) {
        const msg = 'Failed to authenticate the upload. Please try again. Error: Error: Auth Error';
        e.should.be.instanceof(Error);
        expect(e.message).to.eql(msg);

        model.auth.should.have.been.calledTwice;
      }
    });
  });
});
