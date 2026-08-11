const Busboy = require('busboy');
const bl = require('bl');

module.exports = settings => {
  return function multipartBodyParser(req, res, next) {
    if (!Number.isInteger(settings?.maxFileSizeInBytes) || settings.maxFileSizeInBytes <= 0) {
      const errorMessage = 'Max file size limit value must be provided and be a positive integer.';
      req.log('error', errorMessage);
      return next(new Error(errorMessage));
    }

    if (!req.is('multipart/form-data')) {
      return next();
    }
    let busboy;
    try {
      busboy = Busboy({
        headers: req.headers,
        limits: {
          fileSize: settings.maxFileSizeInBytes
        }
      });
    } catch (err) {
      return next(err);
    }
    busboy.on('field', function (key, value) {
      req.log('debug', 'Received field %s: %s', key, value);
      req.body[key] = value;
    });
    busboy.on('file', function (key, file, info) {
      const { filename, encoding, mimeType } = info;
      file.pipe(bl(function (err, d) {
        if (!(d?.length || filename)) { return; } // if no file passed, do nothing
        if (err) {
          const errorMessage = `Failed to process file during streaming operation: ${err}`;
          req.log('error', errorMessage);
          next(new Error(errorMessage));
          return;
        }
        const fileData = {
          data: file.truncated ? null : d,
          name: filename || null,
          encoding: encoding,
          mimetype: mimeType,
          truncated: file.truncated,
          size: file.truncated ? null : Buffer.byteLength(d, 'binary')
        };

        req.log('debug', 'Received file %s', file);

        if (settings?.multi) {
          req.files[key] = req.files[key] || [];
          req.files[key].push(fileData);
        } else {
          req.files[key] = fileData;
        }
      }));
    });
    let error;
    busboy.on('error', err => {
      req.log('error', 'Error parsing form');
      req.log('error', err);
      error = err;
      next(err);
    });
    busboy.on('finish', () => {
      if (error) { return; }
      req.log('debug', 'Finished form parsing');
      req.log('debug', req.body);
      next();
    });
    req.files = req.files || {};
    req.body = req.body || {};
    return req.pipe(busboy);
  };
};
