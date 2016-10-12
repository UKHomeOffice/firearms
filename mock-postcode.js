'use strict';
const router = require('express').Router();

module.exports = router.use('/api/postcode-test', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  if (req.query.postcode === 'CR0 2EU') {
    // eslint-disable-next-line camelcase
    res.send(JSON.stringify([{formatted_address: '49 Sydenham Road\nCroydon\nCR0 2EU', postcode: 'CR0 2EU'}]));
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify([]));
  }
});
