/* eslint no-unused-vars: 1 */
const Base = require('../../../../apps/common/controllers/base');
const UploadModel = require('../../../../apps/common/models/file-upload');
const Controller = proxyquire('../apps/common/controllers/existing-authority-documents', {
  uuid: { v1: () => 'abc123' }
});

const request = reqres.req;
const response = reqres.res;

describe('Existing Authority Documents Controller', () => {
  let sandbox;

  it('extends the base controller', () => {
    controller = new Controller({});
    expect(controller).to.be.an.instanceOf(Base);
  });

  beforeEach(function () {
    sandbox = sinon.createSandbox();
    sandbox.stub(UploadModel.prototype, 'save').returns(new Promise(resolve => {
      resolve({url: 'http://example.com/file/upload'});
    }));
    sandbox.stub(UploadModel.prototype, 'set').returns();
    sandbox.stub(Controller.prototype, 'process').returns();
  });

  afterEach(() => sandbox.restore());

  describe('process', () => {
    it('calls base controllers `process` method by default', () => {
      controller = new Controller({});
      const req = request();
      const res = response();
      const next = sinon.stub();
      controller.process(req, res, next);

      expect(Controller.prototype.process).to.have.been.calledOnce;
      expect(Controller.prototype.process).to.have.been.calledWithExactly(req, res, next);
      expect(Controller.prototype.process).to.have.been.calledOn(controller);
    });

    it('errors when the file is too big i.e. truncated', () => {
      controller = new Controller({});
      const req = request();
      const res = response();
      const files = {
        'existing-authority-document-upload': {
          truncated: true
        }
      };
      controller.process(request({files}), {}, () => {
        Controller.prototype.ValidationError.should.have.been.calledOnce;
        Controller.prototype.ValidationError.should.have.been.calledWith(req, res);
        Controller.prototype.ValidationError.should.have.been.calledWith('existing-authority-document-upload', {
          type: 'filesize', arguments: ['50mb']
        });
      });
    });

    it('calls next without hitting the upload API when the file is too big', () => {
      const controller = new Controller({});
      const files = {
        'existing-authority-document-upload': {
          truncated: true
        }
      };

      controller.process(request({files}), {}, next => {
        Controller.prototype.save.should.have.been.called;
        next.should.not.have.been.calledWithExactly();
        next.should.have.been.calledOnce;
      });
    });

    it('calls next immediately & does NOT hit the upload API if no file is uploaded', () => {
      const controller = new Controller({});
      const files = {
        'existing-authority-document-upload': {
          data: null
        }
      };

      controller.process(request({files}), {}, next => {
        Controller.prototype.save.should.not.been.called;
        next.should.have.been.calledWithExactly();
        next.should.have.been.calledOnce;
      });
    });

    it('saves the file to the uploaded model', () => {
      const controller = new Controller({});
      const req = request();
      const res = response();
      const result = {
        url: 'www.s3.com/foo'
      };
      UploadModel.prototype.save.resolves(result);

      req.files = {
        'existing-authority-document-upload': {
          data: 'picture',
          name: 'myfile.png',
          mimetype: 'image/png'
        }
      };
      controller.process(req, res, () => {
        Controller.prototype.save.should.been.called;
      });
    });

    it('saves the file data to form values', () => {
      const controller = new Controller({});
      const req = request();
      const res = response();
      const result = {
        url: 'www.s3.com/foo'
      };
      UploadModel.prototype.save.resolves(result);

      req.files = {
        'existing-authority-document-upload': {
          data: 'picture',
          name: 'myfile.png',
          mimetype: 'image/png'
        }
      };
      controller.process(req, res, () => {
        req.form.values['existing-authority-document-upload'].should.equal(result.url);
      });
    });


    it('calls next with an error if the model errors', () => {
      const controller = new Controller({});
      const req = request();
      const res = response();
      const err = new Error('oh noes!');
      UploadModel.prototype.save.rejects(err);

      req.files = {
        'existing-authority-document-upload': {
          data: 'some picture',
          name: 'myPhoto.jpg',
          mimetype: 'image/jpg'
        }
      };

      controller.process(req, res, e => {
        e.should.equal(err);
      });
    });
  });
});
