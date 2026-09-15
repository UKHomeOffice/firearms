'use strict';

const clearSession = require('../../../../apps/common/behaviours/clear-session');
const customBackLinks = require('../../../../apps/common/behaviours/custom-back-links');
const resetOnChange = require('../../../../apps/common/behaviours/reset-on-change');
const renewVaryWarning = require('../../../../apps/new-dealer/behaviours/renew-vary-warning');

class BaseController {
  constructor() {
    this.processCall = sinon.stub();
  }

  process(req, res, callback) {
    this.processCall(req, res, callback);
  }

  getValues(req, res, callback) {
    callback(this.getValuesError, {loaded: true});
  }
}

describe('Session and navigation behaviours', () => {
  it('resets the session after values are loaded', done => {
    const Controller = clearSession(BaseController);
    const req = {sessionModel: {reset: sinon.stub()}};

    new Controller().getValues(req, {}, (error, values) => {
      expect(error).to.equal(undefined);
      expect(values).to.deep.equal({loaded: true});
      expect(req.sessionModel.reset).to.have.been.calledOnce;
      done();
    });
  });

  it('preserves superclass value-loading errors while resetting', done => {
    const Controller = clearSession(BaseController);
    const controller = new Controller();
    controller.getValuesError = new Error('Load failed');
    const req = {sessionModel: {reset: sinon.stub()}};

    controller.getValues(req, {}, error => {
      expect(error.message).to.equal('Load failed');
      expect(req.sessionModel.reset).to.have.been.calledOnce;
      done();
    });
  });

  it('links edit actions back to confirmation', () => {
    const Controller = customBackLinks('activity')(BaseController);

    expect(new Controller().getBackLink({
      params: {action: 'edit'},
      baseUrl: '/museums'
    })).to.equal('/museums/confirm');
  });

  it('links normal actions back to the configured page', () => {
    const Controller = customBackLinks('activity')(BaseController);
    const controller = new Controller();

    expect(controller.getBackLink({baseUrl: '/museums'})).to.equal('/museums/activity');
    expect(controller.getBackLink({params: {}, baseUrl: '/museums'})).to.equal('/museums/activity');
    expect(controller.getBackLink({params: {action: 'new'}, baseUrl: '/museums'}))
      .to.equal('/museums/activity');
  });

  it('removes configured fields when the route value changes', () => {
    const Controller = resetOnChange({
      currentField: 'activity',
      fieldsForRemoval: ['name', 'address']
    })(BaseController);
    const req = {
      form: {values: {activity: 'new'}},
      sessionModel: {
        get: sinon.stub().withArgs('activity').returns('renew'),
        unset: sinon.stub()
      }
    };
    const controller = new Controller();

    controller.process(req, {}, sinon.stub());

    expect(req.sessionModel.unset).to.have.been.calledWith('name');
    expect(req.sessionModel.unset).to.have.been.calledWith('address');
    expect(controller.processCall).to.have.been.calledOnce;
  });

  it('keeps fields when the current value is absent or unchanged', () => {
    const Controller = resetOnChange({
      currentField: 'activity',
      fieldsForRemoval: ['name']
    })(BaseController);
    const req = {
      form: {values: {activity: 'new'}},
      sessionModel: {get: sinon.stub(), unset: sinon.stub()}
    };
    const controller = new Controller();

    controller.process(req, {}, sinon.stub());
    req.sessionModel.get.returns('new');
    controller.process(req, {}, sinon.stub());

    expect(req.sessionModel.unset).not.to.have.been.called;
    expect(controller.processCall).to.have.been.calledTwice;
  });

  ['renew', 'vary'].forEach(activity => {
    it(`marks ${activity} fields as warnings`, () => {
      const Controller = renewVaryWarning(BaseController);
      const req = {
        sessionModel: {get: sinon.stub().returns(activity)},
        form: {options: {fields: {first: {}, second: {}}}}
      };
      const next = sinon.stub();

      new Controller().configure(req, {}, next);

      expect(req.form.options.fields.first.isWarning).to.equal(true);
      expect(req.form.options.fields.second.isWarning).to.equal(true);
      expect(next).to.have.been.calledOnce;
    });
  });

  it('does not mark new application fields as warnings', () => {
    const Controller = renewVaryWarning(BaseController);
    const req = {
      sessionModel: {get: sinon.stub().returns('new')},
      form: {options: {fields: {first: {}}}}
    };

    new Controller().configure(req, {}, sinon.stub());

    expect(req.form.options.fields.first.isWarning).to.equal(undefined);
  });
});
