'use strict';

const Behaviour = require('../../../../apps/common/behaviours/format-address');
const Controller = require('hof').controller;

describe('Format Address Fields Behaviours', () => {
  let controller;
  let req;
  let res;
  const address = {'invoice-building': 'Test Building',
    'invoice-street': 'Test Street Name',
    'invoice-townOrCity': 'Test Town and City Name',
    'invoice-postcodeOrZIPCode': 'PO34 3AA'};

  beforeEach(done => {
    req = reqres.req();
    res = reqres.res();

    const BaseController = Behaviour('invoice', 'invoice-address')(Controller);
    controller = new BaseController({ template: 'index', route: '/index' });
    controller._configure(req, res, done);
  });

  describe('saveValues()', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      sandbox.stub(Controller.prototype, 'saveValues').yieldsAsync();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('updates invoice-address in the session model with all concatenated address fields', () => {
      req.sessionModel.set(address);
      controller.saveValues(req, res, err => {
        expect(err).not.to.exist;
        req.sessionModel.get('invoice-address').should.eql('Test Building, ' +
          'Test Street Name, Test Town and City Name, PO34 3AA');
      });
    });

    it('updates invoice-address in the session model with address fields, second address line missing', () => {
      req.sessionModel.set({
        'invoice-building': 'Test Building',
        'invoice-townOrCity': 'Test Town and City Name',
        'invoice-postcodeOrZIPCode': 'PO34 3AA'});
      controller.saveValues(req, res, err => {
        expect(err).not.to.exist;
        req.sessionModel.get('invoice-address').should.eql('Test Building, Test Town and City Name, PO34 3AA');
      });
    });

    it('throws and error when address fields are missing', () => {
      req.sessionModel.set({});
      controller.saveValues(req, res, err  => {
        expect(err).not.to.be.ok;
        req.sessionModel.get('invoice-address').should.not.eql('Test Building, Test Town and City Name, PO34 3AA');
      });
    });

    it('throws and error when address behaviour pageName parameter is missing', () => {
      const BaseController = Behaviour('', 'invoice-address')(Controller);
      controller = new BaseController({ template: 'index', route: '/index' });
      req.sessionModel.set(address);
      controller.saveValues(req, res, err  => {
        expect(err).not.to.be.ok;
        req.sessionModel.get('invoice-address').should.not.eql('Test Building, Test Town and City Name, PO34 3AA');
      });
    });

    it('throws and error when address behaviour concatenateName parameter is missing', () => {
      const BaseController = Behaviour('invoice', '')(Controller);
      controller = new BaseController({ template: 'index', route: '/index' });
      req.sessionModel.set(address);
      controller.saveValues(req, res, err  => {
        expect(err).not.to.be.ok;
        should.equal(req.sessionModel.get('invoice-address'), undefined);
      });
    });

    it('throws and error when both address behaviour parameters are missing', () => {
      const BaseController = Behaviour('', '')(Controller);
      controller = new BaseController({ template: 'index', route: '/index' });
      req.sessionModel.set(address);
      controller.saveValues(req, res, err  => {
        expect(err).not.to.be.ok;
        should.equal(req.sessionModel.get('invoice-address'), undefined);
      });
    });
  });
});
