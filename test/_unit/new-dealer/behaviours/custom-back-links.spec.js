'use strict';

/* eslint max-len: 0 */
const reqres = require('reqres');
const Behaviour = require('../../../../apps/new-dealer/behaviours/custom-back-links');

describe('Custom New Dealer Back Link Behaviours', () => {
  it('exports a function', () => {
    expect(Behaviour).to.be.a('function');
  });

  class Base {
    getBackLink() {
    }
  }

  let req;
  let res;
  let sessionModel;
  let instance;
  let BackLinks;

  describe('Checks Supporting and Existing Authority Uploaders on All Routes', () => {
    beforeEach(() => {
      sessionModel = {
        get: sinon.stub(),
        set: sinon.stub(),
        reset: sinon.stub()
      };
      req = reqres.req({sessionModel});
      res = reqres.res();
      sinon.stub(Base.prototype, 'getBackLink');
    });

    afterEach(() => {
      Base.prototype.getBackLink.restore();
    });

    const outputsNonEdit = [
      { currentForm: 'supporting-documents', route: 'renew', action: 'null', resultLink: '/existing-authority-add-another' },
      { currentForm: 'supporting-documents', route: 'renew', action: 'edit', resultLink: '/confirm' },
      { currentForm: 'supporting-documents', route: 'vary', action: 'null', resultLink: '/existing-authority-add-another' },
      { currentForm: 'supporting-documents', route: 'vary', action: 'edit', resultLink: '/confirm' },
      { currentForm: 'supporting-documents', route: 'new', action: 'null', resultLink: '/activity' },
      { currentForm: 'supporting-documents', route: 'new', action: 'edit', resultLink: '/confirm' },
      { currentForm: 'supporting-documents-add-another', route: 'renew', action: 'null', resultLink: '/supporting-documents' },
      { currentForm: 'supporting-documents-add-another', route: 'renew', action: 'edit', resultLink: '/confirm' },
      { currentForm: 'supporting-documents-add-another', route: 'vary', action: 'null', resultLink: '/supporting-documents' },
      { currentForm: 'supporting-documents-add-another', route: 'vary', action: 'edit', resultLink: '/confirm' },
      { currentForm: 'supporting-documents-add-another', route: 'new', action: 'null', resultLink: '/supporting-documents' },
      { currentForm: 'supporting-documents-add-another', route: 'new', action: 'edit', resultLink: '/confirm' },
      { currentForm: 'existing-authority', route: 'renew', action: 'null', resultLink: '/activity' },
      { currentForm: 'existing-authority', route: 'renew', action: 'edit', resultLink: '/confirm' },
      { currentForm: 'existing-authority', route: 'vary', action: 'null', resultLink: '/activity' },
      { currentForm: 'existing-authority', route: 'vary', action: 'edit', resultLink: '/confirm' },
      { currentForm: 'existing-authority-add-another', route: 'renew', action: 'null', resultLink: '/existing-authority' },
      { currentForm: 'existing-authority-add-another', route: 'renew', action: 'edit', resultLink: '/confirm' },
      { currentForm: 'existing-authority-add-another', route: 'vary', action: 'null', resultLink: '/existing-authority' },
      { currentForm: 'existing-authority-add-another', route: 'vary', action: 'edit', resultLink: '/confirm' }
    ];

    outputsNonEdit.forEach(i => {
      it('Checks for when route is ' + i.route + ' on ' + i.currentForm + ' page when action is ' + i.action, async () => {
        BackLinks = Behaviour(i.currentForm)(Base);
        instance = new BackLinks();
        req.sessionModel.get.withArgs('activity').returns(i.route);
        req.params = { action: i.action };
        const output = await instance.getBackLink(req, res);
        expect(output).to.equal(i.resultLink);
      });
    });
  });
});
