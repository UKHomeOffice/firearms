'use strict';

const proxyquire = require('proxyquire');

const sendEmail = sinon.stub();
const SendEmail = proxyquire.noCallThru()('../../../../apps/common/behaviours/send-email', {
  '../../common/emails/notify-email': {sendEmail}
});

class BaseController {
  saveValues(req, res, next) {
    next(this.saveError);
  }
}

const options = {
  templateId: 'template-1',
  recipient: 'email',
  nameKey: 'name',
  replyTo: 'reply-to-1'
};

describe('Send email behaviour', () => {
  beforeEach(() => sendEmail.resetHistory());

  it('sends confirmation details after values are saved', done => {
    const Controller = SendEmail(options)(BaseController);
    const req = {
      sessionModel: {
        get: sinon.stub()
      }
    };
    req.sessionModel.get.withArgs('caseid').returns('case-1');
    req.sessionModel.get.withArgs('name').returns('Test Person');
    req.sessionModel.get.withArgs('email').returns('test@example.com');

    new Controller().saveValues(req, {}, error => {
      expect(error).to.equal(undefined);
      expect(sendEmail).to.have.been.calledWith(
        'template-1',
        'test@example.com',
        sinon.match({caseid: 'case-1', user: 'Test Person'}),
        'reply-to-1'
      );
      done();
    });
  });

  it('does not send confirmation when saving values fails', done => {
    const Controller = SendEmail(options)(BaseController);
    const controller = new Controller();
    controller.saveError = new Error('Save failed');
    const req = {sessionModel: {get: sinon.stub()}};

    controller.saveValues(req, {}, error => {
      expect(error.message).to.equal('Save failed');
      expect(sendEmail).not.to.have.been.called;
      done();
    });
  });
});
