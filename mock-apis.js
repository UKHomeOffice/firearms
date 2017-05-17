'use strict';
const router = require('express').Router();

router.use('/api/postcode-test', require('./mocks/postcode'));
router.use('/api/file-upload', require('./mocks/upload'));
router.use('/api/pdf-convert', require('./mocks/pdf'));

module.exports = router;
