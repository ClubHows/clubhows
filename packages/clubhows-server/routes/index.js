var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var Mailgun = require('mailgun-js');

//Your sending email address
var who = 'ClubHows Website'
var from = 'hello@clubhows.com';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/contact', function(req, res){
  // console.log(process.env);
  var transporter = nodemailer.createTransport({
    host: process.env.MAIL_SMTP,
    port: process.env.MAIL_PORT,
    secure: true, // use SSL
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
  });

  ejs.renderFile("./templates/contact/html.ejs", {
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  }, function (err, data) {
  if (err) {
      console.log('renderfile: ' + err);
      res.status(500);
      res.json('oops! something broke' + err);
  } else {
      var mainOptions = {
          from: '"' + who + '" <' + from + '>',
          to: from,
          subject: 'Message from' + req.body.name + ' (' +req.body.email + ')',
          html: data
      };
      // console.log("html data ======================>", mainOptions.html);
      transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
              console.log('sendmail: ' + err);
              res.status(500);
              res.json('oops! something broke' + err);
          } else {
            res.status(200);
            res.json({ message: 'Success.' });
          }
      });
  }

  });

});

router.post('/subscribe', function(req, res){
  var api_key = process.env.MAILGUN_APIKEY;
  var domain = 'clubhows.com';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

  var email = [ req.body.email ];
  return mailgun.lists('hello@clubhows.com').members().add({ members: email, subscribed: true, upsert: true },
    function (err, body) {
      if (err) {
          console.log('subscribe: ' + err);
          res.status(500);
          res.json('oops! something broke' + err);
      } else {
        res.status(200);
        res.json({ message: 'Success.' });
      }
    }
  );
});

module.exports = router;
