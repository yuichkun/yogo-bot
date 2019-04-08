const request = require('request');
const { iftttUrl } = process.env;

function sendEmail(userName, msg) {
  const postDataStr = JSON.stringify({
    value1: userName,
    value2: msg
  });
  console.log('sending ', postDataStr, ' to email');
  return new Promise((resolve,reject)=> {
    request.post({
      url: iftttUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      body: postDataStr
    }, (err, httpResponse, body) => {
        if (err) reject(err);
        console.log(body);
        console.log("sent!");
        resolve();
    });
  });
}

module.exports = {
  sendEmail
};
