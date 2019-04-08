// CommonJS
require('dotenv');
const line = require('@line/bot-sdk');
const app = require('express')();
const { sendEmail } = require('./utils');
const { channelAccessToken, channelSecret } = process.env;
const config = {
  channelAccessToken,
  channelSecret
};

console.log("App started");
app.post('/webhook', line.middleware(config), async (req, res) => {
  await Promise
    .all(req.body.events.map(handleEvent))
    .then(() => {
      console.log('writing http header');
      res.writeHead(200);
      res.end();
      console.log('sent http response');
    })
    .catch(console.error)
});

const client = new line.Client(config);
function handleEvent(event) {
  return new Promise((resolve, reject) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
      resolve(null);
    }
    console.log("Message received: ", event.message.text);

    console.log('event', event);
    client.getProfile(event.source.userId)
      .then(user => {
        console.log('user', user);
        const userName = user.displayName;
        return sendEmail(userName, event.message.text)
      })
      .then(resolve)
      .catch(reject);
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT);