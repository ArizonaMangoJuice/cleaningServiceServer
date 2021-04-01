require('dotenv').config();
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.SERVEREMAIL,
    pass: process.env.SERVERPASSWORD
  }
});

console.log(process.env.SERVEREMAIL, process.env.SERVERPASSWORD)

/* GET users listing. */
router.get('/', async function (req, res, next) {
  var mailOptions = {
    from: process.env.SERVEREMAIL,
    to: 'isaellizama@gmail.com',
    subject: 'Sending Email using node .js',
    text: 'THAT WAS EASY!'
  }

  let email = await transporter.sendMail(mailOptions);

  console.log(email);

  res.json(email.response);

  res.send('respond with a resource');
});

module.exports = router;
