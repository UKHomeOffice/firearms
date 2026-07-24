const express = require('express');
const app = express();
app.use(express.json());

app.post('/token', (req, res) => {
  res.json({ access_token: 'mocked-access-token' });
});

app.post('/createcase', (req, res) => {
  res.json({ createcaseresponse: { caseid: '10000001' } });
});

app.listen(4000, () => {
  console.log('iCasework mock server running on port 4000');
});
