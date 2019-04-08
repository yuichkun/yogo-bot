const {sendEmail} = require('./utils');

async function testEmail() {
  console.log("sending");
  await sendEmail('テストtesting email 😄');
  console.log("done");
}

testEmail();