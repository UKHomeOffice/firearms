'use strict';

const proxyquire = require('proxyquire');

class BaseController {
  getValues(req, res, callback) {
    callback(this.loadError, this.loadedValues);
  }

  saveValues(req, res, callback) {
    this.saved = true;
    callback(this.saveError);
  }
}

const uuid = {v1: sinon.stub()};
const StorageAddress = proxyquire('../../../../apps/shooting-clubs/controllers/storage-address', {
  '../../common/controllers/base': BaseController,
  uuid
});

const createRequest = () => ({
  form: {
    options: {
      fields: {
        'storage-address-range': {},
        'storage-address-secretary': {}
      }
    },
    values: {}
  },
  sessionModel: {get: sinon.stub()}
});

describe('Shooting clubs storage address controller', () => {
  beforeEach(() => {
    uuid.v1.reset();
    uuid.v1.onFirstCall().returns('id-1');
    uuid.v1.onSecondCall().returns('id-2');
  });

  it('configures range and secretary address options', () => {
    const controller = new StorageAddress();
    const req = createRequest();
    req.sessionModel.get.withArgs('location-addresses').returns({
      first: {address: '1 Range Road'},
      second: {address: '2 Range Road'}
    });
    req.sessionModel.get.withArgs('club-secretary-address').returns('3 Secretary Road');
    const callback = sinon.stub();

    controller.configure(req, {}, callback);

    expect(req.form.options.fields['storage-address-range'].options).to.deep.equal([
      {value: '1 Range Road', label: '1 Range Road'},
      {value: '2 Range Road', label: '2 Range Road'}
    ]);
    expect(req.form.options.fields['storage-address-secretary'].options).to.deep.equal([
      {value: '3 Secretary Road', label: '3 Secretary Road'}
    ]);
    expect(callback).to.have.been.calledOnce;
  });

  it('keeps only addresses still present in the aggregate', done => {
    const controller = new StorageAddress();
    controller.loadedValues = {
      'storage-address-range': ['1 Range Road', 'Removed Road'],
      'storage-address-secretary': '3 Secretary Road',
      'all-storage-addresses': [{address: '1 Range Road'}, {address: '3 Secretary Road'}]
    };

    controller.getValues(createRequest(), {}, (error, values) => {
      expect(error).to.equal(undefined);
      expect(values['storage-address-range']).to.deep.equal(['1 Range Road']);
      expect(values['storage-address-secretary']).to.deep.equal(['3 Secretary Road']);
      done();
    });
  });

  it('handles absent selections and forwards loading errors', done => {
    const controller = new StorageAddress();
    controller.loadError = new Error('Load failed');
    controller.loadedValues = {'all-storage-addresses': []};

    controller.getValues(createRequest(), {}, (error, values) => {
      expect(error.message).to.equal('Load failed');
      expect(values['storage-address-range']).to.deep.equal([]);
      expect(values['storage-address-secretary']).to.deep.equal([]);
      done();
    });
  });

  it('replaces pre-entered addresses with the current selections', done => {
    const controller = new StorageAddress();
    const req = createRequest();
    req.form.values = {
      'storage-address-range': ['1 Range Road'],
      'storage-address-secretary': '3 Secretary Road'
    };
    req.sessionModel.get.withArgs('all-storage-addresses').returns([
      {id: 'manual', address: 'Manual Road'},
      {id: 'old', preentered: true, address: 'Old Road'}
    ]);

    controller.saveValues(req, {}, error => {
      expect(error).to.equal(undefined);
      expect(req.form.values['storage-addresses']).to.deep.equal(['1 Range Road', '3 Secretary Road']);
      expect(req.form.values['all-storage-addresses']).to.deep.equal([
        {id: 'manual', address: 'Manual Road'},
        {id: 'id-1', preentered: true, address: '1 Range Road'},
        {id: 'id-2', preentered: true, address: '3 Secretary Road'}
      ]);
      expect(controller.saved).to.equal(true);
      done();
    });
  });

  it('handles empty selections and an absent aggregate', done => {
    const controller = new StorageAddress();
    const req = createRequest();
    req.form.values = {};
    req.sessionModel.get.returns(undefined);

    controller.saveValues(req, {}, error => {
      expect(error).to.equal(undefined);
      expect(req.form.values['storage-addresses']).to.deep.equal([]);
      expect(req.form.values['all-storage-addresses']).to.deep.equal([]);
      expect(uuid.v1).not.to.have.been.called;
      done();
    });
  });
});
