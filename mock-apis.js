'use strict';
const router = require('express').Router();

router.use('/api/postcode-test', require('./mocks/postcode'));
router.use('/api/file-upload', require('./mocks/upload'));

module.exports = router;
