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

// console.log(process.env.SERVEREMAIL, process.env.SERVERPASSWORD)

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const { firstName, lastName, email } = req.body

  var mailOptions = {
    from: process.env.SERVEREMAIL,
    to: email,
    subject: `${firstName} ${lastName} has an enquiry`,
    text: 'THAT WAS EASY!'
  }

  try {
    let emailResponse = await transporter.sendMail(mailOptions);
    res.json(emailResponse.response);
  } catch(err){
    res.json(err);
  }

  console.log(emailResponse);
});

module.exports = router;
