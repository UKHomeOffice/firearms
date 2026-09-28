'use strict';

const proxyquire = require('proxyquire');

const sendEmail = sinon.stub();
const logger = {
  log: sinon.stub(),
  error: sinon.stub()
};
const notifyEmail = proxyquire.noCallThru()('../../../../apps/common/emails/notify-email', {
  'notifications-node-client': {
    NotifyClient: class NotifyClient {
      sendEmail(...args) {
        return sendEmail(...args);
      }
    }
  },
  'hof/lib/logger': () => logger
});

describe('Notify email', () => {
  beforeEach(() => {
    sendEmail.reset();
    logger.log.resetHistory();
    logger.error.resetHistory();
  });

  it('sends the expected Notify request and logs success', async () => {
    sendEmail.resolves({id: 'notification-1'});

    await notifyEmail.sendEmail(
      'template-1',
      'test@example.com',
      {caseid: 'case-1'},
      'reply-to-1'
    );

    expect(sendEmail).to.have.been.calledWithExactly('template-1', 'test@example.com', {
      personalisation: {caseid: 'case-1'},
      emailReplyToId: 'reply-to-1'
    });
    expect(logger.log).to.have.been.calledWith(
      'info',
      sinon.match('email sent to test@example.com'),
      {id: 'notification-1'}
    );
  });

  it('logs Notify failures without rejecting the workflow', async () => {
    sendEmail.rejects(new Error('Notify unavailable'));

    await notifyEmail.sendEmail('template-1', 'test@example.com', {}, 'reply-to-1');

    expect(logger.error).to.have.been.calledWith(sinon.match('Notify unavailable'));
  });
});
