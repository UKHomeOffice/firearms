'use strict';

module.exports = (data, token) => {
  const response = {};

  response.CaseId = data['reference-number'];

  const docs = data['supporting-documents'] || [];

  docs.forEach((doc, i) => {
    response[`Document${i + 1}.URL`] = `${doc.url.replace('/file', '/vault')}&token=${token.bearer}`;
    response[`Document${i + 1}.Name`] = doc.description;
    response[`Document${i + 1}.MimeType`] = doc.type;
    response[`Document${i + 1}.URLLoadContent`] = true;
  });
  console.log('***********Submission response:', response);
  return response;
};
