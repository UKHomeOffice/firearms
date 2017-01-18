'use strict';

const proxyquire = require('proxyquire');
class StubBaseController {};

StubBaseController.prototype.locals = sinon.stub();

const BaseAddressController = proxyquire('../../../apps/common/controllers/base-address', {
  './base': StubBaseController
});

describe('BaseAddressController', function() {

  it('extends base-controller', ()=> {
    BaseAddressController.prototype.should.be.an.instanceOf(StubBaseController);
  });

  it('has a locals, translateCategories, mapAddress & hasCategories methods', ()=> {
    BaseAddressController.prototype.should.have.property('locals').that.is.a('function');
    BaseAddressController.prototype.should.have.property('translateCategories').that.is.a('function');
    BaseAddressController.prototype.should.have.property('mapAddress').that.is.a('function');
    BaseAddressController.prototype.should.have.property('hasCategories').that.is.a('function');
  });

  describe('instance', ()=> {
    let baseAddressController;
    const options = {
      addressKey: 'foo'
    };
    const expectedVal = {
      hasAddresses: false,
      hasCategories: false,
      items: []
    };

    beforeEach(()=> {
      StubBaseController.prototype.locals = sinon.stub();
      baseAddressController = new BaseAddressController(options);
      baseAddressController.options = options;
    });

    describe('locals', () => {
      let req = {
        sessionModel: {
          get: sinon.stub()
        }
      };
      let res = {};

      it('retuns its locals', () => {
        baseAddressController.locals(req, res).should.deep.equal(expectedVal);
      });

      it('calls base locals', () => {
        StubBaseController.prototype.locals.should.not.have.been.called;

        baseAddressController.locals(req, res);

        StubBaseController.prototype.locals.should.have.been.called;
      });

      it('extends base.locals', () => {
        const superLocalsVal = {foo: 'bar'};
        StubBaseController.prototype.locals.returns(superLocalsVal);

        baseAddressController.locals(req, res).should.have.property('foo')
            .and.equal('bar');
      });

      it('sets addresses to something if addressKey is locationAddresses', () => {
      });

      describe('getAddresses', () => {
        const fooValue = 'London';
        let anotherReq = {
          sessionModel: {
            foo: fooValue,
            get: (id) => anotherReq.sessionModel[id]
          }
        };
        it('returns an expected address from the sessionModel', ()=> {
          baseAddressController.getAddresses(anotherReq).should.equal(fooValue);
        });

        it('returns undefined if the options cannot be found in the sessionModel', () => {
          const otherOptions = {
            addressKey: 'blah'
          };
          baseAddressController.options = otherOptions;
          should.equal(baseAddressController.getAddresses(anotherReq), undefined);
        });
      });
    });
  });
});

