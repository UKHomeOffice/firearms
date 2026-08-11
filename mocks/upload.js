'use strict';

const router = require('express').Router();
const busboy = require('../utils/body-parser');
const config = require('../config');

router.use(busboy(config.upload));

router.post('/', (req, res, next) => {
  if (req.files.document) {
    res.json({url: `http://s3.com/foo/${Math.random()}`});
  } else {
    next(new Error('No file uploaded'));
  }
});

module.exports = router;
