const bodyparserReal = require('../../../utils/body-parser.js');
const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const Readable = require('stream').Readable;
const EventEmitter = require('events');
const config = require('../../../config.js');
const MAX_FILE_SIZE = config.upload.maxFileSizeInBytes;

chai.use(require('sinon-chai'));

function multipartBody(boundary, content) {
  return Buffer.from(
    '--' + boundary + '\r\n' +
    'Content-Disposition: form-data; name="file"; filename="testing.png"\r\n' +
    'Content-Type: image/png\r\n\r\n' +
    content + '\r\n' +
    '--' + boundary + '--\r\n'
  );
}


describe('multipart form parser', () => {
  let req;
  let res;
  let next;
  let bodyparser;
  let busboyStub;
  let parserInstance;

  beforeEach(() => {
    parserInstance = {
      on: sinon.stub().returnsThis()
    };

    next = sinon.stub();

    busboyStub = sinon.stub().returns(parserInstance);

    bodyparser = proxyquire('../../../utils/body-parser.js', {
      busboy: busboyStub
    });

    req = {
      headers: {
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
      },
      is: sinon.stub().returns(true),
      pipe: sinon.stub(),
      log: sinon.stub().returns(true)
    };

    res = {};
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call busboy with the correct headers', () => {
    const parser = bodyparser({ maxFileSizeInBytes: MAX_FILE_SIZE });
    parser(req, res, next);
    expect(busboyStub).to.have.been.calledWith({
      headers: req.headers,
      limits: {
        fileSize: 104857600
      }
    });
  });

  it('calls callback if not a multipart/form-data request', () => {
    req.is = sinon.stub().returns(false);
    const parser = bodyparser({ maxFileSizeInBytes: MAX_FILE_SIZE });
    parser(req, res, next);
    expect(next).to.have.been.called;
  });

  it('pipes request to busboy instance', () => {
    const parser = bodyparser({ maxFileSizeInBytes: MAX_FILE_SIZE });
    parser(req, res, next);
    req.pipe.should.have.been.calledOnce;
    expect(req.pipe).to.have.been.calledOnceWithExactly(parserInstance);
  });

  it('handles a busboy error if payload invalid', done => {
    const busboyErr = new Error('Invalid payload');
    const parser = bodyparser({ maxFileSizeInBytes: MAX_FILE_SIZE });
    parserInstance.on.withArgs('error').yields(busboyErr);
    parser(req, res, function (err) {
      err.should.equal(busboyErr);
      done();
    });
  });

  it('handles busboy error if headers invalid', done => {
    const parser = bodyparser({ maxFileSizeInBytes: MAX_FILE_SIZE });
    req.headers = {
      'content-type': 'multipart/form-data'
    };
    busboyStub.throws(new Error('Invalid content-type header'));
    parser(req, res, function (error) {
      error.should.be.instanceOf(Error);
      done();
    });
  });

  it('creates req.body and req.files as empty obj if not existing', done => {
    const parser = bodyparser({ maxFileSizeInBytes: MAX_FILE_SIZE });
    parserInstance.on.withArgs('finish').yieldsAsync();
    parser(req, res, () => {
      req.body.should.eql({});
      req.files.should.eql({});
      done();
    });
  });

  it('sets fields on req.body', done => {
    const parser = bodyparser({ maxFileSizeInBytes: MAX_FILE_SIZE });
    parserInstance.on.withArgs('field').yieldsAsync('key', 'value');
    parserInstance.on.withArgs('finish').yieldsAsync();

    parser(req, res, () => {
      req.body.should.eql({ key: 'value' });
      done();
    });
  });

  it('sets files on req.files', done => {
    const parser = bodyparser({ maxFileSizeInBytes: MAX_FILE_SIZE });
    const file = {
      pipe: function (s) {
        s.end('abcdef123456');
        process.nextTick(() => {
          parserInstance.on.withArgs('finish').should.have.been.called;
        });
      },
      truncated: false
    };
    parserInstance.on.withArgs('file').
      yieldsAsync('key', file, { filename: 'testing.png', encoding: 'binary', mimeType: 'image/png' });
    parserInstance.on.withArgs('finish').yieldsAsync();
    parser(req, res, () => {
      req.files.should.have.property('key');
      req.files.key.should.eql({
        data: Buffer.from('abcdef123456'),
        name: 'testing.png',
        encoding: 'binary',
        mimetype: 'image/png',
        truncated: false,
        size: 12
      });
      done();
    });
  });

  it('sets truncated prop and null data if file exceeds max limit (real busboy instance)', done => {
    const boundary = '----testBoundary';
    const payload = multipartBody(boundary, 'abcdef123456'); // 12 bytes

    req = {
      headers: {
        'content-type': 'multipart/form-data; boundary=' + boundary,
        'content-length': String(payload.length)
      },
      is: sinon.stub().returns(true),
      pipe: function (dest) {
        return Readable.from([payload]).pipe(dest);
      },
      log: sinon.stub().returns(true)
    };

    const parser = bodyparserReal({ maxFileSizeInBytes: 4 });

    parser(req, res, err => {
      if (err) { return done(err); }

      req.files.should.have.property('file');
      req.files.file.truncated.should.equal(true);
      chai.expect(req.files.file.data).to.equal(null);
      chai.expect(req.files.file.size).to.equal(null);
      return done();
    });
  });

  it('sets files as an array to handle multi attachment', done => {
    parserInstance = new EventEmitter();
    busboyStub = sinon.stub().returns(parserInstance);

    bodyparser = proxyquire('../../../utils/body-parser.js', {
      busboy: busboyStub
    });

    const parser = bodyparser({ multi: true, maxFileSizeInBytes: MAX_FILE_SIZE });

    const file1 = { pipe: s => s.end('abcdef123456'), truncated: false };
    const file2 = { pipe: s => s.end('uvwxyz789012'), truncated: false };

    req.pipe = sinon.stub().callsFake(() => {
      parserInstance.emit('file', 'key', file1,
        { filename: 'testing1.png', encoding: 'binary', mimeType: 'image/png' });
      parserInstance.emit('file', 'key', file2,
        { filename: 'testing2.png', encoding: 'binary', mimeType: 'image/png' });
      parserInstance.emit('finish');
    });

    parser(req, res, () => {
      req.files.key.should.have.length(2);
      req.files.key[0].name.should.equal('testing1.png');
      req.files.key[1].name.should.equal('testing2.png');
      done();
    });
  });

  it('can handle empty payloads', done => {
    const parser = bodyparser({ maxFileSizeInBytes: MAX_FILE_SIZE });

    parserInstance.on.withArgs('finish').yieldsAsync();

    parser(req, res, () => {
      req.files.should.eql({});
      done();
    });
  });

  it('can handle empty files', done => {
    const parser = bodyparser({ maxFileSizeInBytes: MAX_FILE_SIZE });
    const file = {
      pipe: function (s) {
        s.end();
        process.nextTick(() => { parserInstance.on.withArgs('finish').should.have.been.called; });
      },
      truncated: false
    };
    parserInstance.on.withArgs('file').
      yieldsAsync('key', file, { filename: '', encoding: 'binary', mimeType: 'image/png' });
    parserInstance.on.withArgs('finish').yieldsAsync();
    parser(req, res, () => {
      req.files.should.eql({});
      done();
    });
  });

  it('can handle files without a filename', done => {
    const parser = bodyparser({ maxFileSizeInBytes: MAX_FILE_SIZE });
    const file = {
      pipe: function (s) {
        s.end('abcdef123456');
        process.nextTick(() => { parserInstance.on.withArgs('finish').should.have.been.called; });
      },
      truncated: true
    };
    parserInstance.on.withArgs('file').
      yieldsAsync('key', file, { filename: undefined, encoding: '7bit', mimeType: 'application/octet-stream' });
    parserInstance.on.withArgs('finish').yieldsAsync();
    parser(req, res, () => {
      req.files.should.have.property('key');
      req.files.key.should.eql({
        data: null,
        name: null,
        encoding: '7bit',
        mimetype: 'application/octet-stream',
        truncated: true,
        size: null
      });
      done();
    });
  });

  it('passes file streaming errors to next', done => {
    const parser = bodyparser({ maxFileSizeInBytes: MAX_FILE_SIZE });

    const file = new EventEmitter();
    file.truncated = false;
    file.pipe = s => {
      s.emit('pipe', file); // allow bl to attach error listener
      process.nextTick(() => file.emit('error', new Error('interrupted stream')));
      return s;
    };

    parserInstance.on.withArgs('file').yieldsAsync(
      'key',
      file,
      { filename: 'testing.png', encoding: 'binary', mimeType: 'image/png' }
    );

    parser(req, res, err => {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.contain('Failed to process file during streaming operation');
      done();
    });
  });
});
