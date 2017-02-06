'use strict';

const Controller = require('../../../apps/new-dealer/controllers/supporting-documents');
const Base = require('../../../apps/common/controllers/base');

const UploadModel = require('../../../apps/common/models/file-upload');

const request = require('../../helpers/request');

const uuid = require('node-uuid');

describe('Supporting Documents Controller', () => {

  beforeEach(function() {
    this.stub(UploadModel.prototype, 'save').returns(new Promise((resolve) => {
      resolve({'url': 'http://example.com/file/upload'});
    }));
    this.spy(UploadModel.prototype, 'set');
  });

  it('extends the base controller', () => {
    const controller = new Controller({});
    expect(controller).to.be.an.instanceOf(Base);
  });

  describe('process', () => {

    it('saves uploaded file to upload model', () => {
      const controller = new Controller({});
      const next = sinon.stub();
      const files = {
        'supporting-document-upload': {
          data: 'foobar',
          name: 'myfile.png',
          mimetype: 'image/png'
        }
      };
      controller.process(request({files}), {}, next);
      expect(UploadModel.prototype.set).to.have.been.calledOnce;
      expect(UploadModel.prototype.set).to.have.been.calledWith(files['supporting-document-upload']);
      expect(UploadModel.prototype.save).to.have.been.calledOnce;
    });

    it('saves api response to form values', (done) => {
      const controller = new Controller({});
      const files = {
        'supporting-document-upload': {
          data: 'foobar',
          name: 'myfile.png',
          mimetype: 'image/png'
        }
      };
      const req = request({files});
      controller.process(req, {}, () => {
        expect(req.form.values['supporting-document-upload']).to.equal('http://example.com/file/upload');
        done();
      });
    });

    it('saves file name to form values', (done) => {
      const controller = new Controller({});
      const files = {
        'supporting-document-upload': {
          data: 'foobar',
          name: 'myfile.png',
          mimetype: 'image/png'
        }
      };
      const req = request({files});
      controller.process(req, {}, () => {
        expect(req.form.values['supporting-document-filename']).to.equal('myfile.png');
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
        'supporting-document-upload': {
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

    it('calls next with error if model errors', (done) => {
      const err = new Error('test error');
      UploadModel.prototype.save.returns(new Promise((resolve, reject) => {
        reject(err);
      }));
      const controller = new Controller({});
      const files = {
        'supporting-document-upload': {
          data: 'foobar',
          name: 'myfile.png',
          mimetype: 'image/png'
        }
      };
      controller.process(request({files}), {}, (e) => {
        expect(e).to.equal(err);
        done();
      });
    });

  });

  describe('saveValues', () => {

    beforeEach(function() {
      this.stub(uuid, 'v1').returns('abc123');
    });

    it('creates an array of supporting documents', (done) => {
      const controller = new Controller({});
      const req = request({session: null});
      req.form.values['supporting-document-upload'] = 'url';
      req.form.values['supporting-document-description'] = 'desc';
      req.form.values['supporting-document-filename'] = 'file.png';
      controller.saveValues(req, {}, () => {
        expect(req.sessionModel.get('supporting-documents')).to.deep.equal([
          {id: 'abc123', url: 'url', description: 'desc'}
        ]);
        done();
      });
    });

    it('uses the file name for the description if none is provided', (done) => {
      const controller = new Controller({});
      const req = request({session: null});
      req.form.values['supporting-document-upload'] = 'url';
      req.form.values['supporting-document-description'] = '';
      req.form.values['supporting-document-filename'] = 'file.png';
      controller.saveValues(req, {}, () => {
        expect(req.sessionModel.get('supporting-documents')).to.deep.equal([
          {id: 'abc123', url: 'url', description: 'file.png'}
        ]);
        done();
      });
    });

    it('adds to array of supporting documents if previous docs exist', (done) => {
      const controller = new Controller({});
      const req = request({
        session: {
          'supporting-documents': [
            {id: 'def456', url: 'url2', description: 'desc2'}
          ]
        }
      });
      req.form.values['supporting-document-upload'] = 'url';
      req.form.values['supporting-document-description'] = 'desc';
      controller.saveValues(req, {}, () => {
        expect(req.sessionModel.get('supporting-documents')).to.deep.equal([
          {id: 'def456', url: 'url2', description: 'desc2'},
          {id: 'abc123', url: 'url', description: 'desc'}
        ]);
        done();
      });
    });

    it('resets "add another" field', (done) => {
      const controller = new Controller({});
      const req = request({
        session: {
          'supporting-document-add-another': true
        }
      });
      req.form.values['supporting-document-upload'] = 'url';
      req.form.values['supporting-document-description'] = 'desc';
      controller.saveValues(req, {}, () => {
        expect(req.sessionModel.get('supporting-document-add-another')).to.equal(undefined);
        done();
      });
    });

    it('does not save "description", "filename", or "upload" fields', (done) => {
      const controller = new Controller({});
      const req = request({
        session: null
      });
      req.form.values['supporting-document-upload'] = 'url';
      req.form.values['supporting-document-description'] = 'desc';
      req.form.values['supporting-document-filename'] = 'name';
      controller.saveValues(req, {}, () => {
        expect(req.sessionModel.get('supporting-document-upload')).to.equal(undefined);
        expect(req.sessionModel.get('supporting-document-description')).to.equal(undefined);
        expect(req.sessionModel.get('supporting-document-filename')).to.equal(undefined);
        done();
      });
    });

  });

});
