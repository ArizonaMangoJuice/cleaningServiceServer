require('dotenv').config();
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var inlineCss = require('nodemailer-juice');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.SERVEREMAIL,
    pass: process.env.SERVERPASSWORD
  }
});

transporter.use('compile', inlineCss());
// console.log(process.env.SERVEREMAIL, process.env.SERVERPASSWORD)

/* GET users listing. */
router.post('/', async function (req, res, next) {
  const { firstName, lastName, email, phone } = req.body

  var mailOptions = {
    from: process.env.SERVEREMAIL,
    to: email,
    subject: `${firstName} ${lastName} has an enquiry`,
    html: `
      <div>
        <h1>Please call ${firstName} ${lastName}</h1>
        <a href='555-555-5555'> </a>
        <p>The potential client also has an email </p>
        <h2>${email}</h2>
      </div>
    `
  }

  try {
    let emailResponse = await transporter.sendMail(mailOptions);
    res.json(emailResponse.response);
  } catch(err){
    res.json(err);
  }
});

module.exports = router;
