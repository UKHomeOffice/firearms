'use strict';

const proxyquire = require('proxyquire');

class BaseController {
  constructor(options) {
    this.options = options;
  }

  get(req, res, callback) {
    callback(null, 'get');
  }

  getValues(req, res, callback) {
    callback(this.getValuesError, this.values || {});
  }

  locals() {
    return {base: true};
  }

  saveValues(req, res, callback) {
    callback(this.saveValuesError);
  }

  _configure(req, res, callback) {
    callback();
  }
}

const router = {
  use: sinon.stub(),
  handle: sinon.stub()
};
const express = {
  Router: sinon.stub().returns(router)
};
const uuid = {
  v1: sinon.stub().returns('generated-id')
};
const Loop = proxyquire('../../../../apps/common/controllers/loop', {
  './base': BaseController,
  express,
  uuid
});

const options = () => ({
  returnTo: '/entry',
  aggregateTo: 'addresses',
  aggregateFields: ['building', 'postcode'],
  route: '/addresses',
  fields: {},
  fieldSettings: {className: 'test-class'}
});

const createRequest = overrides => {
  const values = {};
  const req = {
    query: {},
    params: {},
    baseUrl: '/journey',
    form: {
      options: options(),
      values
    },
    sessionModel: {
      options: {key: 'other-journey'},
      get: sinon.stub(),
      set: sinon.stub(),
      unset: sinon.stub(),
      toJSON: sinon.stub().returns({building: '1 Test Road', postcode: 'AA1 1AA'})
    }
  };
  return Object.assign(req, overrides);
};

describe('Loop controller', () => {
  beforeEach(() => {
    router.use.resetHistory();
    router.handle.resetHistory();
    express.Router.resetHistory();
    uuid.v1.resetHistory();
  });

  describe('constructor', () => {
    it('requires returnTo', () => {
      expect(() => new Loop({
        aggregateTo: 'addresses',
        aggregateFields: ['building']
      })).to.throw('options.returnTo is required for loops');
    });

    it('requires aggregateTo', () => {
      expect(() => new Loop({
        returnTo: '/entry',
        aggregateFields: ['building']
      })).to.throw('options.aggregateTo is required for loops');
    });

    it('requires non-empty aggregateFields', () => {
      expect(() => new Loop({
        returnTo: '/entry',
        aggregateTo: 'addresses',
        aggregateFields: []
      })).to.throw('options.aggregateField is required for loops');
    });

    it('accepts complete loop options', () => {
      expect(new Loop(options())).to.be.an.instanceOf(BaseController);
    });
  });

  describe('get and delete', () => {
    it('delegates a normal get request', done => {
      const controller = new Loop(options());

      controller.get(createRequest(), {}, (error, value) => {
        expect(error).to.equal(null);
        expect(value).to.equal('get');
        expect(express.Router).not.to.have.been.called;
        done();
      });
    });

    it('builds the delete middleware chain', () => {
      const controller = new Loop(options());
      const req = createRequest({query: {delete: 'item-1'}});
      const res = {};
      const callback = sinon.stub();

      controller.get(req, res, callback);

      expect(express.Router).to.have.been.calledWith({mergeParams: true});
      expect(router.use).to.have.been.calledOnce;
      expect(router.use.firstCall.args[0]).to.have.length(3);
      expect(router.handle).to.have.been.calledWithExactly(req, res, callback);
    });

    it('removes the requested aggregate item', () => {
      const controller = new Loop(options());
      const req = createRequest({query: {delete: 'item-1'}});
      req.sessionModel.get.returns([{id: 'item-1'}, {id: 'item-2'}]);
      const callback = sinon.stub();

      controller.removeItem(req, {}, callback);

      expect(req.sessionModel.set).to.have.been.calledWithExactly('addresses', [{id: 'item-2'}]);
      expect(callback).to.have.been.calledOnce;
    });

    it('reloads the aggregate route when items remain', () => {
      const controller = new Loop(options());
      const req = createRequest({params: {action: 'edit'}});
      req.sessionModel.get.returns([{id: 'item-1'}]);
      const res = {redirect: sinon.stub()};

      controller.reload(req, res);

      expect(res.redirect).to.have.been.calledWithExactly('/journey/addresses/edit');
      expect(req.sessionModel.unset).not.to.have.been.called;
    });

    it('clears loop fields and returns to entry when no items remain', () => {
      const controller = new Loop(options());
      const req = createRequest();
      req.sessionModel.get.returns([]);
      const res = {redirect: sinon.stub()};

      controller.reload(req, res);

      expect(req.sessionModel.set).to.have.been.calledWithExactly('addresses-saved', false);
      expect(req.sessionModel.unset).to.have.been.calledWith('building');
      expect(req.sessionModel.unset).to.have.been.calledWith('postcode');
      expect(res.redirect).to.have.been.calledWithExactly('/journey/entry');
    });
  });

  describe('configure', () => {
    it('adds the add-another field and fork', () => {
      const controller = new Loop(options());
      const req = createRequest();
      const callback = sinon.stub();

      controller.configure(req, {}, callback);

      expect(req.form.options.fields['addresses-add-another']).to.deep.include({
        mixin: 'radio-group',
        validate: ['required'],
        options: ['yes', 'no'],
        className: 'test-class'
      });
      expect(req.form.options.forks[0]).to.deep.equal({
        target: '/entry',
        continueOnEdit: true,
        condition: {field: 'addresses-add-another', value: 'yes'}
      });
      expect(callback).to.have.been.calledOnce;
    });

    ['renew', 'vary'].forEach(activity => {
      it(`marks new-dealer ${activity} fields as warnings`, () => {
        const controller = new Loop(options());
        const req = createRequest();
        req.sessionModel.options.key = 'hof-wizard-new-dealer';
        req.sessionModel.get.withArgs('activity').returns(activity);

        controller.configure(req, {}, sinon.stub());

        expect(req.form.options.fields['addresses-add-another'].isWarning).to.equal(true);
      });
    });

    it('does not add warnings for a new application', () => {
      const controller = new Loop(options());
      const req = createRequest();
      req.sessionModel.options.key = 'hof-wizard-new-dealer';
      req.sessionModel.get.withArgs('activity').returns('new');

      controller.configure(req, {}, sinon.stub());

      expect(req.form.options.fields['addresses-add-another'].isWarning).to.equal(undefined);
    });

    it('appends to existing forks', () => {
      const controller = new Loop(options());
      const req = createRequest();
      req.form.options.forks = [{target: '/existing'}];

      controller.configure(req, {}, sinon.stub());

      expect(req.form.options.forks).to.have.length(2);
    });
  });

  describe('values and locals', () => {
    it('returns superclass errors', done => {
      const controller = new Loop(options());
      controller.getValuesError = new Error('Could not load values');

      controller.getValues(createRequest(), {}, error => {
        expect(error.message).to.equal('Could not load values');
        done();
      });
    });

    it('adds loop fields to a new aggregate', done => {
      const controller = new Loop(options());
      controller.values = {existing: true};
      const req = createRequest();
      req.sessionModel.get.withArgs('addresses').returns(undefined);
      req.sessionModel.get.withArgs('addresses-saved').returns(false);

      controller.getValues(req, {}, (error, values) => {
        expect(error).to.equal(null);
        expect(values.addresses).to.deep.equal([{
          id: 'generated-id',
          building: '1 Test Road',
          postcode: 'AA1 1AA'
        }]);
        expect(req.sessionModel.set).to.have.been.calledWith('addresses', values.addresses);
        expect(req.sessionModel.set).to.have.been.calledWith('addresses-saved', true);
        expect(req.sessionModel.unset).to.have.been.calledTwice;
        done();
      });
    });

    it('does not add empty loop fields', done => {
      const controller = new Loop(options());
      const req = createRequest();
      req.sessionModel.get.withArgs('addresses').returns([]);
      req.sessionModel.get.withArgs('addresses-saved').returns(false);
      req.sessionModel.toJSON.returns({unrelated: true});

      controller.getValues(req, {}, (error, values) => {
        expect(error).to.equal(null);
        expect(values.addresses).to.equal(undefined);
        expect(uuid.v1).not.to.have.been.called;
        done();
      });
    });

    it('does not add fields when the aggregate is already saved', done => {
      const controller = new Loop(options());
      const req = createRequest();
      req.sessionModel.get.withArgs('addresses').returns([{id: 'existing'}]);
      req.sessionModel.get.withArgs('addresses-saved').returns(true);

      controller.getValues(req, {}, (error, values) => {
        expect(error).to.equal(null);
        expect(values.addresses).to.equal(undefined);
        expect(uuid.v1).not.to.have.been.called;
        done();
      });
    });

    it('picks only configured loop fields', () => {
      const controller = new Loop(options());
      const req = createRequest();

      expect(controller.getLoopFields(req, {})).to.deep.equal({
        building: '1 Test Road',
        postcode: 'AA1 1AA'
      });
    });

    it('adds aggregate details to locals', () => {
      const controller = new Loop(options());
      const req = createRequest();
      req.form.values.addresses = [{id: 'item-1'}];

      expect(controller.locals(req, {})).to.deep.equal({
        base: true,
        items: [{id: 'item-1'}],
        hasItems: true,
        field: 'addresses'
      });
    });

    it('uses an empty aggregate in locals', () => {
      const controller = new Loop(options());

      expect(controller.locals(createRequest(), {}).hasItems).to.equal(false);
    });
  });

  describe('saveValues', () => {
    it('clears add-another state when yes is selected', done => {
      const controller = new Loop(options());
      const req = createRequest();
      req.form.values['addresses-add-another'] = 'yes';

      controller.saveValues(req, {}, error => {
        expect(error).to.equal(undefined);
        expect(req.sessionModel.unset).to.have.been.calledWithExactly('addresses-add-another');
        expect(req.sessionModel.set).to.have.been.calledWithExactly('addresses-saved', false);
        done();
      });
    });

    it('preserves state for no and forwards superclass errors', done => {
      const controller = new Loop(options());
      controller.saveValuesError = new Error('Could not save');
      const req = createRequest();
      req.form.values['addresses-add-another'] = 'no';

      controller.saveValues(req, {}, error => {
        expect(error.message).to.equal('Could not save');
        expect(req.sessionModel.unset).not.to.have.been.called;
        expect(req.sessionModel.set).not.to.have.been.called;
        done();
      });
    });
  });
});
