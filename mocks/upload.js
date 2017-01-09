'use strict';

const router = require('express').Router();
const busboy = require('busboy-body-parser');

router.use(busboy());

router.post('/', (req, res, next) => {
  if (req.files.upload) {
    res.json({'upload-url': `http://s3.com/foo/${Math.random()}`});
  } else {
    next(new Error('No file uploaded'));
  }
});

module.exports = router;
