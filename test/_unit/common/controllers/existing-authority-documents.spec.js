'use strict';

const Base = require('../../../../apps/common/controllers/base');
const UploadModel = require('../../../../apps/common/models/file-upload');
const Controller = proxyquire('../apps/common/controllers/existing-authority-documents', {
  uuid: { v1: () => 'abc123' }
});

const request = reqres.req;

describe('Existing Authority Documents Controller', () => {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.createSandbox();
    sandbox.stub(UploadModel.prototype, 'save').returns(new Promise(resolve => {
      resolve({url: 'http://example.com/file/upload'});
    }));
    sandbox.stub(UploadModel.prototype, 'set').returns();
  });

  afterEach(() => sandbox.restore());

  it('extends the base controller', () => {
    const controller = new Controller({});
    expect(controller).to.be.an.instanceOf(Base);
  });

  describe('process', () => {
    it('saves uploaded file to upload model', () => {
      const controller = new Controller({});
      const next = sinon.stub();
      const files = {
        'existing-authority-upload': {
          data: 'foobar',
          name: 'file.png',
          mimetype: 'image/png'
        }
      };
      controller.process(request({files}), {}, next);
      expect(UploadModel.prototype.set).to.have.been.calledOnce;
      expect(UploadModel.prototype.set).to.have.been.calledWith(files['existing-authority-upload']);
      expect(UploadModel.prototype.save).to.have.been.calledOnce;
    });

    it('saves api response to form values', done => {
      const controller = new Controller({});
      const files = {
        'existing-authority-upload': {
          data: 'foobar',
          name: 'file.png',
          mimetype: 'image/png'
        }
      };
      const req = request({files});
      controller.process(req, {}, () => {
        expect(req.form.values['existing-authority-upload']).to.equal('http://example.com/file/upload');
        done();
      });
    });

    it('saves file name to form values', done => {
      const controller = new Controller({});
      const files = {
        'existing-authority-upload': {
          data: 'foobar',
          name: 'file.png',
          mimetype: 'image/png'
        }
      };
      const req = request({files});
      controller.process(req, {}, () => {
        expect(req.form.values['existing-authority-filename']).to.equal('file.png');
        done();
      });
    });

    it('calls next immediately without hitting file API if no file is uploaded - no file', () => {
      const controller = new Controller({});
      const next = sinon.stub();
      const files = {};
      controller.process(request({files}), {}, next);
      expect(UploadModel.prototype.set).to.not.have.been.called;
      expect(UploadModel.prototype.save).to.not.have.been.called;
      expect(next).to.have.been.calledOnce;
      expect(next).to.have.been.calledWithExactly();
    });

    it('calls next immediately without hitting file API if no file is uploaded - null file', () => {
      const controller = new Controller({});
      const next = sinon.stub();
      const files = {
        'existing-authority-upload': {
          data: null,
          name: null,
          mimetype: null
        }
      };
      controller.process(request({files}), {}, next);
      expect(UploadModel.prototype.set).to.not.have.been.called;
      expect(UploadModel.prototype.save).to.not.have.been.called;
      expect(next).to.have.been.calledOnce;
      expect(next).to.have.been.calledWithExactly();
    });

    it('calls next with error if model errors', done => {
      const err = new Error('test error');
      UploadModel.prototype.save.returns(new Promise((resolve, reject) => {
        reject(err);
      }));
      const controller = new Controller({});
      const files = {
        'existing-authority-upload': {
          data: 'foobar',
          name: 'file.png',
          mimetype: 'image/png'
        }
      };
      controller.process(request({files}), {}, e => {
        expect(e).to.equal(err);
        done();
      });
    });
  });

  describe('saveValues', () => {
    it('creates an array of supporting documents', done => {
      const controller = new Controller({});
      const req = request({session: null});
      req.form.values['existing-authority-upload'] = 'url';
      req.form.values['existing-authority-description'] = 'desc';
      req.form.values['existing-authority-filename'] = 'file.png';
      req.form.values['existing-authority-type'] = 'image/png';

      controller.saveValues(req, {}, () => {
        expect(req.sessionModel.get('existing-authority-documents')).to.deep.equal([{
          id: 'abc123',
          url: 'url',
          description: 'desc',
          type: 'image/png'
        }]);
        done();
      });
    });

    it('uses the file name for the description if none is provided', done => {
      const controller = new Controller({});
      const req = request({session: null});
      req.form.values['existing-authority-upload'] = 'url';
      req.form.values['existing-authority-description'] = '';
      req.form.values['existing-authority-filename'] = 'file.png';
      req.form.values['existing-authority-type'] = 'image/png';
      controller.saveValues(req, {}, () => {
        expect(req.sessionModel.get('existing-authority-documents')).to.deep.equal([{
          id: 'abc123',
          url: 'url',
          description: 'file.png',
          type: 'image/png'
        }]);
        done();
      });
    });

    it('adds to array of existing-authority documents if previous docs exist', done => {
      const controller = new Controller({});
      const req = request({
        session: {
          'existing-authority-documents': [
            {id: 'def456', url: 'url2', description: 'desc2', type: 'image/png'}
          ]
        }
      });
      req.form.values['existing-authority-upload'] = 'url';
      req.form.values['existing-authority-description'] = 'desc';
      req.form.values['existing-authority-type'] = 'image/png';
      controller.saveValues(req, {}, () => {
        expect(req.sessionModel.get('existing-authority-documents')).to.deep.equal([
          {id: 'def456', url: 'url2', description: 'desc2', type: 'image/png'},
          {id: 'abc123', url: 'url', description: 'desc', type: 'image/png'}
        ]);
        done();
      });
    });

    it('resets "add another" field', done => {
      const controller = new Controller({});
      const req = request({
        session: {
          'existing-authority-document-add-another': true
        }
      });
      req.form.values['existing-authority-upload'] = 'url';
      req.form.values['existing-authority-description'] = 'desc';
      controller.saveValues(req, {}, () => {
        expect(req.sessionModel.get('existing-authority-add-another')).to.equal(undefined);
        done();
      });
    });

    it('does not save "description", "filename", or "upload" fields', done => {
      const controller = new Controller({});
      const req = request({
        session: null
      });
      req.form.values['existing-authority-upload'] = 'url';
      req.form.values['existing-authority-description'] = 'desc';
      req.form.values['existing-authority-filename'] = 'name';
      controller.saveValues(req, {}, () => {
        expect(req.sessionModel.get('existing-authority-upload')).to.equal(undefined);
        expect(req.sessionModel.get('existing-authority-description')).to.equal(undefined);
        expect(req.sessionModel.get('existing-authority-filename')).to.equal(undefined);
        done();
      });
    });
  });
});
