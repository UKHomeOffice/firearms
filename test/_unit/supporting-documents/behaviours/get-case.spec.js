'use strict';

const proxyquire = require('proxyquire');

const fetch = sinon.stub();

class GetCaseModel {
  fetch() {
    return fetch();
  }
}

const GetCase = proxyquire('../../../../apps/supporting-documents/behaviours/get-case', {
  '../../common/models/i-casework-getcase': GetCaseModel
});

class BaseController {
  constructor() {
    this.superSave = sinon.stub().callsFake((req, res, next) => next());
  }

  saveValues(req, res, next) {
    this.superSave(req, res, next);
  }
}

const createRequest = () => ({
  form: {values: {'reference-number': 'case-1'}},
  sessionModel: {set: sinon.stub()}
});

describe('Supporting documents get-case behaviour', () => {
  beforeEach(() => fetch.reset());

  it('stores original party details and continues', async () => {
    fetch.resolves({name: 'Test Person', email: 'test@example.com'});
    const Controller = GetCase(BaseController);
    const controller = new Controller();
    const req = createRequest();
    const next = sinon.stub();

    controller.saveValues(req, {}, next);
    await Promise.resolve();
    await Promise.resolve();

    expect(req.sessionModel.set).to.have.been.calledWith('original-email', 'test@example.com');
    expect(req.sessionModel.set).to.have.been.calledWith('original-name', 'Test Person');
    expect(controller.superSave).to.have.been.calledOnce;
  });

  it('continues with empty details when a case is not found', async () => {
    fetch.rejects(new Error('Not found'));
    const Controller = GetCase(BaseController);
    const controller = new Controller();
    const req = createRequest();

    controller.saveValues(req, {}, sinon.stub());
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(req.sessionModel.set).to.have.been.calledWith('original-email', undefined);
    expect(controller.superSave).to.have.been.calledOnce;
  });

  it('passes timeout errors to next without continuing', async () => {
    fetch.rejects(Object.assign(new Error('Timed out'), {code: 'ETIMEDOUT'}));
    const Controller = GetCase(BaseController);
    const controller = new Controller();
    const next = sinon.stub();

    controller.saveValues(createRequest(), {}, next);
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(controller.superSave).not.to.have.been.called;
    expect(next).to.have.been.calledWith(sinon.match.has('code', 'ETIMEDOUT'));
  });
});
