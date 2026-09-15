'use strict';

const checkEmail = require('../../../../apps/supporting-documents/behaviours/check-email');
const config = require('../../../../config');

class ValidationError extends Error {
  constructor(field, details) {
    super(details.type);
    this.field = field;
  }
}

class BaseController {
  constructor() {
    this.ValidationError = ValidationError;
    this.superValidate = sinon.stub();
  }

  validate(req, res, next) {
    this.superValidate(req, res, next);
  }
}

const createRequest = (originalEmail, email) => ({
  form: {values: {email}},
  sessionModel: {get: sinon.stub().withArgs('original-email').returns(originalEmail)}
});

describe('Supporting documents check-email behaviour', () => {
  let skipEmail;

  beforeEach(() => {
    skipEmail = config.upload.skipEmail;
    config.upload.skipEmail = 'acceptance@example.com';
  });

  afterEach(() => {
    config.upload.skipEmail = skipEmail;
  });

  it('continues when the email matches the original application', () => {
    const Controller = checkEmail(BaseController);
    const controller = new Controller();
    const req = createRequest('test@example.com', 'test@example.com');
    const next = sinon.stub();

    controller.validate(req, {}, next);

    expect(controller.superValidate).to.have.been.calledWithExactly(req, {}, next);
  });

  it('continues when the acceptance override email matches', () => {
    const Controller = checkEmail(BaseController);
    const controller = new Controller();

    controller.validate(createRequest('other@example.com', 'acceptance@example.com'), {}, sinon.stub());

    expect(controller.superValidate).to.have.been.calledOnce;
  });

  it('returns an incorrect-email validation error otherwise', () => {
    const Controller = checkEmail(BaseController);
    const controller = new Controller();
    const next = sinon.stub();

    controller.validate(createRequest('original@example.com', 'wrong@example.com'), {}, next);

    expect(controller.superValidate).not.to.have.been.called;
    expect(next).to.have.been.calledWith(sinon.match(value => {
      return value.email.field === 'email' && value.email.message === 'incorrect';
    }));
  });
});
