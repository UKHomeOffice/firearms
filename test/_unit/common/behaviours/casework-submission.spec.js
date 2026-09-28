'use strict';

const proxyquire = require('proxyquire');

const increment = sinon.stub();
const auth = sinon.stub().resolves({bearer: 'access-token'});

class AuthToken {
  auth() {
    return auth();
  }
}

class CaseworkModel {
  constructor(attributes) {
    this.attributes = attributes;
    CaseworkModel.instances.push(this);
  }

  toJSON() {
    return this.attributes;
  }

  url() {
    return 'https://casework.example.test/create';
  }

  prepare(token) {
    this.preparedToken = token;
    return Promise.resolve({base: true});
  }

  async save(sessionId) {
    this.sessionId = sessionId;
    this.prepared = await this.prepare();
    if (CaseworkModel.error) {
      throw CaseworkModel.error;
    }
    return {createcaseresponse: {caseid: 'case-1'}};
  }
}

CaseworkModel.instances = [];

const Submission = proxyquire('../../../../apps/common/behaviours/casework-submission', {
  '../models/auth-token': AuthToken,
  '../models/i-casework': CaseworkModel,
  'hot-shots': class StatsD {
    increment(metric) {
      increment(metric);
    }
  }
});

class BaseController {
  constructor() {
    this.superSave = sinon.stub().callsFake((req, res, next) => next());
  }

  saveValues(req, res, next) {
    return this.superSave(req, res, next);
  }
}

const createRequest = () => ({
  sessionID: 'session-id',
  log: sinon.stub(),
  session: {},
  sessionModel: {
    toJSON: sinon.stub().returns({activity: 'new'}),
    get: sinon.stub(),
    set: sinon.stub()
  }
});

describe('Casework submission behaviour', () => {
  beforeEach(() => {
    CaseworkModel.instances = [];
    CaseworkModel.error = undefined;
    auth.resetHistory();
    increment.resetHistory();
  });

  it('merges custom preparation with base data and an auth token', async () => {
    const customPrepare = sinon.stub().returns({journey: true});
    const Controller = Submission({
      Model: CaseworkModel,
      prepare: customPrepare
    })(BaseController);
    const controller = new Controller();
    const req = createRequest();

    await controller.saveValues(req, {}, sinon.stub());

    expect(auth).to.have.been.calledOnce;
    expect(customPrepare).to.have.been.calledWithExactly({activity: 'new'}, {bearer: 'access-token'});
    expect(CaseworkModel.instances[0].prepared).to.deep.equal({base: true, journey: true});
  });

  it('uses the model preparation unchanged without a custom function', async () => {
    const Controller = Submission({Model: CaseworkModel})(BaseController);
    const controller = new Controller();

    await controller.saveValues(createRequest(), {}, sinon.stub());

    expect(auth).not.to.have.been.called;
    expect(CaseworkModel.instances[0].prepared).to.deep.equal({base: true});
  });

  it('stores the case ID, records success and delegates to the superclass', async () => {
    const Controller = Submission({Model: CaseworkModel})(BaseController);
    const controller = new Controller();
    const req = createRequest();
    const next = sinon.stub();

    await controller.saveValues(req, {}, next);

    expect(CaseworkModel.instances[0].sessionId).to.equal('session-id');
    expect(req.sessionModel.set).to.have.been.calledWithExactly('caseid', 'case-1');
    expect(increment).to.have.been.calledWithExactly('casework.submission.success');
    expect(controller.superSave).to.have.been.calledOnce;
    expect(next).to.have.been.calledOnce;
  });

  [
    {description: 'request session ID', expected: 'request-session', configure: req => {
      req.sessionID = undefined;
      req.session.id = 'request-session';
    }},
    {description: 'session-model ID', expected: 'model-session', configure: req => {
      req.sessionID = undefined;
      req.session = undefined;
      req.sessionModel.get.withArgs('sessionId').returns('model-session');
    }},
    {description: 'unknown fallback', expected: 'unknown', configure: req => {
      req.sessionID = undefined;
      req.session = undefined;
      req.sessionModel.get.withArgs('sessionId').returns(undefined);
    }}
  ].forEach(testCase => {
    it(`uses the ${testCase.description}`, async () => {
      const Controller = Submission({Model: CaseworkModel})(BaseController);
      const req = createRequest();
      testCase.configure(req);

      await new Controller().saveValues(req, {}, sinon.stub());

      expect(CaseworkModel.instances[0].sessionId).to.equal(testCase.expected);
    });
  });

  it('records provider errors and application details without delegating', async () => {
    const providerError = Object.assign(new Error('Provider failed'), {
      body: 'Case submission failed',
      response: {
        status: 500,
        headers: {'x-application-error-info': 'Invalid case'},
        data: {error: true}
      }
    });
    CaseworkModel.error = providerError;
    const Controller = Submission({Model: CaseworkModel})(BaseController);
    const controller = new Controller();
    const req = createRequest();
    const next = sinon.stub();

    await controller.saveValues(req, {}, next);

    expect(increment).to.have.been.calledWithExactly('casework.submission.failed');
    expect(req.log).to.have.been.calledWith(
      'error',
      sinon.match('x-application-error-info: Invalid case')
    );
    expect(controller.superSave).not.to.have.been.called;
    expect(next).to.have.been.calledWith(sinon.match.has('message', 'Case submission failed'));
  });

  it('uses an unknown public error when provider details are absent', async () => {
    CaseworkModel.error = new Error('Provider failed');
    const Controller = Submission({Model: CaseworkModel})(BaseController);
    const next = sinon.stub();

    await new Controller().saveValues(createRequest(), {}, next);

    expect(next).to.have.been.calledWith(
      sinon.match.has('message', 'An unknown error occurred during casework submission.')
    );
  });
});
