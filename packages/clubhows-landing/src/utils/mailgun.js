const apiKey = process.env.MAILGUN_APIKEY;
const domain = 'clubhows.com';
const mailgun = require('mailgun-js')({ apiKey, domain });

const data = {
  from: 'ClubHows Friend<hello@mg.clubhows.com>',
  to: 'barry@landofhere.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!'
};

const list = mailgun.lists('hello@mg.clubhows.com');

export const sendMail = mailgun.messages().send(data, (err, body) => {
  if (err) {
    throw Error(`SendMail Error: ${err}`);
  } else {
    return {
      statusCode: 200,
      body
    };
  }
});

export const addMember = list.members().create(data, (err, succ) => {
  if (err) {
    throw Error(`SendMail Error: ${err}`);
  } else {
    return {
      statusCode: 200,
      succ
    };
  }
});

export default sendMail;
