'use strict';

const Model = require('../../../apps/common/models/pdf');
const config = require('../../../config');

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
      const res = {
        statusCode: 200,
        body: Buffer(100)
      };
      const callback = sinon.stub();
      model.handleResponse(res, callback);
      expect(Model.prototype.parseResponse).to.have.been.calledWith(res.statusCode, res.body, callback);
    });

    it('passes errors to the callback', (done) => {
      const model = new Model();
      const res = {
        statusCode: 400,
        body: JSON.stringify({
          code: 'error',
          message: 'error'
        })
      };
      model.handleResponse(res, (err, body, statusCode) => {
        expect(err).to.be.an('error');
        expect(body).to.be.null;
        expect(statusCode).to.equal(400);
        done();
      });
    });

  });

});
