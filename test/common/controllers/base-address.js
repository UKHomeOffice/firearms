'use strict';

const proxyquire = require('proxyquire');
class StubBaseController {}

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

        beforeEach(function() {
          this.stub(BaseAddressController.prototype, 'mapAddress').returns([]);
          this.stub(BaseAddressController.prototype, 'hasCategories').returns(false);
        });

        it('returns an empty address list if no addresses exist on the session', () => {
          const expectedVal = {
            hasAddresses: false,
            hasCategories: false,
            items: []
          };
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

        it('includes the result of mapAddress as `items`', () => {
          const mapped = [{id: 'abc123', address: '1 Some Road'}];
          baseAddressController.mapAddress.returns(mapped);
          const result = baseAddressController.locals(req, res);
          result.should.have.property('items');
          result.items.should.deep.equal(mapped);
        });

        it('includes the result of hasCategories', () => {
          const categories = true;
          baseAddressController.hasCategories.returns(categories);
          const result = baseAddressController.locals(req, res);
          result.should.have.property('hasCategories');
          result.hasCategories.should.equal(categories);
        });
      });
      describe('getAddresses', () => {
        const fooValue = 'London';
        let req = {
          sessionModel: {
            foo: fooValue,
            get: (id) => req.sessionModel[id]
          }
        };
        it('returns an expected address from the sessionModel', ()=> {
          baseAddressController.getAddresses(req).should.equal(fooValue);
        });

        it('returns undefined if the options cannot be found in the sessionModel', () => {
          const otherOptions = {
            addressKey: 'blah'
          };
          baseAddressController.options = otherOptions;
          should.equal(baseAddressController.getAddresses(req), undefined);
          });
        });
      describe('translateCategories', () => {
        let translate;
        beforeEach(() => {
          translate = sinon.stub();
        });
        it('returns expected categories in the request', () => {
        const values = ['cow', 'dog'];
        translate.withArgs('fields.location-address-category.options.cow.label').returns('moo');
        translate.withArgs('fields.location-address-category.options.dog.label').returns('woof');
        const req = {translate};

        const act = baseAddressController.translateCategories(req, values);
        const expected = ['moo', 'woof'].join('\n');

        act.should.equal(expected);
        });
        it('returns all inputs if a category cannot be found in the request', () => {
          const values = ['car', 'melon'];
          const req = {translate};

          const act = baseAddressController.translateCategories(req, values);
          const expected = ['', ''].join('\n');
          should.equal(act, expected);
        });
      });
      describe('mapAddress', () => {
        beforeEach(function() {
          this.stub(BaseAddressController.prototype, 'translateCategories').returns('NOT MATCHED');
        });
        const req = {};
        it('returns a list of addresses with the corresponding categories', () => {
          baseAddressController.translateCategories.withArgs(req, ['a', 'b']).returns('a\nb');
          baseAddressController.translateCategories.withArgs(req, ['a', 'b', 'c']).returns('a\nb\nc');
          const addresses = [{address: 'London', postcode: '', categories: ['a', 'b']},
            {address: 'Paris', postcode: '', categories: ['a', 'b', 'c']}];
          const expected = [{id: 0, address: 'London', categories: 'a\nb'},
            {id: 1, address: 'Paris', categories: 'a\nb\nc'}];
          const act = baseAddressController.mapAddress(addresses, req);
          act.should.deep.equal(expected);
        });
      });
  });
});

