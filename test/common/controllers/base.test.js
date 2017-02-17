'use strict';

const proxyquire = require('proxyquire');

describe('BaseController', () => {
  const req = {
    sessionModel: {}
  };
  const res = {};
  // prototype or a class
  let BaseController;
  class StubBaseController {}

  beforeEach(() => {
    // stub is just a function that listens, it doesn't return anything
    StubBaseController.prototype.locals = sinon.stub();
    // this is pointing to the contoller that is being used and providing
    // it with ith with an object, in this case BaseController is extended from controllers.base
    BaseController = proxyquire('../../../apps/common/controllers/base', {
      'hof-form-controller': StubBaseController
    });
  });

  it('extends hof base-controller', () => {
    BaseController.prototype.should.be.an.instanceOf(StubBaseController);
  });

  it('has a locals method', () => {
    BaseController.prototype.should.have.property('locals').that.is.a('function');
  });

  describe('instance', () => {
    let baseController;

    beforeEach(() => {
      // an instance of the basecontroller
      baseController = new BaseController();
    });

    it('extends the StubBaseController', () => {
      baseController.should.be.instanceof(StubBaseController);
    });

    it('has a locals method', () => {
      baseController.should.have.property('locals').that.is.a('function');
    });
    describe('method(s)', () => {
      describe('locals', () => {
        beforeEach(() => {
          req.sessionModel.get = sinon.stub();
        });

        it('calls super.locals', () => {
          baseController.locals(req, res);
          StubBaseController.prototype.locals.should.have.been.calledOnce
            .and.calledWithExactly(req, res);
        });

        it('calls gets activity from the sessionModel', () => {
          baseController.locals(req, res);
          req.sessionModel.get.should.have.been.calledOnce
            .and.calledWithExactly('activity');
        });

        it('sets renew to true if activity is renew and super.locals.renew is true', () => {
          req.sessionModel.get.returns('renew');
          StubBaseController.prototype.locals.returns({renew: true});

          baseController.locals(req, res).renew.should.be.true;
        });

        it('sets renew to false if activity is not true and super.locals.renew is true', () => {
          req.sessionModel.get.returns('foo');
          StubBaseController.prototype.locals.returns({renew: true});

          baseController.locals(req, res).renew.should.be.false;
        });

        it('sets renew to true if activity is renew and super.locals.renew is true', () => {
          req.sessionModel.get.returns('renew');
          StubBaseController.prototype.locals.returns({renew: false});

          baseController.locals(req, res).renew.should.be.false;
        });

        it('extends super.locals', () => {
          const obj = {
            foo: 'bar',
            renew: true
          };
          StubBaseController.prototype.locals.returns(obj);
          baseController.locals(req, res).should.have.property('foo')
            .and.equal('bar');
        });
      });
    });
  });
});
