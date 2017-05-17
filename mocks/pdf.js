'use strict';

const router = require('express').Router();

router.post('/', (req, res, next) => {
  if (req.body.template) {
    res.setHeader('Content-Type', 'octet-stream');
    res.status(201).send(Buffer(100));
  } else {
    next(new Error('Template required'));
  }
});

module.exports = router;
