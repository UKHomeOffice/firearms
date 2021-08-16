'use strict';

const BaseController = require('../../../../apps/common/controllers/base');
const FormController = require('hof').controller;

const request = reqres.req;
const response = reqres.res;

describe('BaseController', () => {
  let req;
  let res;

  beforeEach(() => {
    req = request();
    res = response();
  });

  it('has a locals method', () => {
    BaseController.prototype.should.have.property('locals').that.is.a('function');
  });

  describe('instance', () => {
    let baseController;

    beforeEach(() => {
      // an instance of the basecontroller
      baseController = new BaseController({});
    });

    it('extends the hof-form-controller', () => {
      baseController.should.be.instanceof(FormController);
    });

    it('has a locals method', () => {
      baseController.should.have.property('locals').that.is.a('function');
    });
    describe('method(s)', () => {
      describe('locals', () => {
        beforeEach(() => {
          sinon.stub(FormController.prototype, 'locals').returns({
            fields: []
          });
          req.sessionModel.get = sinon.stub();
        });
        afterEach(() => {
          FormController.prototype.locals.restore();
        });

        it('calls super.locals', () => {
          baseController.locals(req, res);
          FormController.prototype.locals.should.have.been.calledOnce
            .and.calledWithExactly(req, res);
        });

        it('calls gets activity from the sessionModel', () => {
          baseController.locals(req, res);
          req.sessionModel.get.should.have.been.calledWithExactly('activity');
        });

        it('sets renew to true if activity is renew and super.locals.renew is true', () => {
          req.sessionModel.get.returns('renew');
          FormController.prototype.locals.returns({renew: true, fields: []});

          baseController.locals(req, res).renew.should.be.true;
        });

        it('sets renew to true if activity is vary and super.locals.renew is true', () => {
          req.sessionModel.get.returns('vary');
          FormController.prototype.locals.returns({renew: true, fields: []});

          baseController.locals(req, res).renew.should.be.true;
        });

        it('sets renew to false if activity is not true and super.locals.renew is true', () => {
          req.sessionModel.get.returns('foo');
          FormController.prototype.locals.returns({renew: true, fields: []});

          baseController.locals(req, res).renew.should.be.false;
        });

        it('sets renew to false if activity is renew and super.locals.renew is false', () => {
          req.sessionModel.get.returns('renew');
          FormController.prototype.locals.returns({renew: false, fields: []});

          baseController.locals(req, res).renew.should.be.false;
        });

        it('sets renew to false if activity is vary and super.locals.renew is false', () => {
          req.sessionModel.get.returns('vary');
          FormController.prototype.locals.returns({renew: false, fields: []});

          baseController.locals(req, res).renew.should.be.false;
        });

        it('extends super.locals', () => {
          const obj = {
            foo: 'bar',
            renew: true,
            fields: []
          };
          FormController.prototype.locals.returns(obj);
          baseController.locals(req, res).should.have.property('foo')
            .and.equal('bar');
        });
      });
    });
  });
});
