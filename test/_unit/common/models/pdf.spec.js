/* eslint-disable node/no-deprecated-api */
'use strict';

const config = require('../../../../config');
const isPdf = sinon.stub();
const Model = proxyquire('../apps/common/models/pdf', {
  'is-pdf': isPdf
});

describe('PDF Model', () => {
  describe('url', () => {
    it('returns the pdf url', () => {
      const model = new Model();
      const url = model.url();
      expect(url).to.equal(config.pdf.url);
    });
  });

  describe('handleResponse', () => {
    beforeEach(() => {
      sinon.stub(Model.prototype, 'parseResponse');
    });

    afterEach(() => {
      Model.prototype.parseResponse.restore();
    });

    it('proxies the successful responses to model.parseResponse', () => {
      const model = new Model();
      isPdf.returns(true);
      const res = {
        status: 200,
        data: Buffer(100)
      };
      const callback = sinon.stub();
      model.handleResponse(res, callback);
      expect(Model.prototype.parseResponse).to.have.been.calledWith(res.status, res.data, callback);
    });

    it('passes errors to the callback', done => {
      const model = new Model();
      isPdf.returns(false);
      const res = {
        status: 500,
        data: JSON.stringify({
          title: 'Error',
          message: 'There is an error'
        })
      };
      model.handleResponse(res, (err, body, statusCode) => {
        expect(err).to.be.an('error');
        expect(body).to.be.null;
        expect(statusCode).to.equal(res.status);
        done();
      });
    });

    it('decorate 400 client errors with a title and message', done => {
      const model = new Model();
      isPdf.returns(false);
      const res = {
        status: 400,
        data: JSON.stringify({
          code: 'ClientError',
          message: 'There is an error'
        })
      };
      model.handleResponse(res, (err, body, statusCode) => {
        expect(err).to.be.an('error');
        expect(err.title).to.equal(res.data.code);
        expect(err.message).to.equal(res.data.message);
        expect(body).to.be.null;
        expect(statusCode).to.equal(400);
        done();
      });
    });
  });
});
