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
router.get('/', async function (req, res, next) {
  const { firstName, lastName, email } = req.body

  var mailOptions = {
    from: process.env.SERVEREMAIL,
    to: email,
    subject: `${firstName} ${lastName} has an enquiry`,
    html: `<style>
    .package-card-container{
      border: none;
      display: -webkit-flex;
      display: flex;
      -webkit-flex-direction: column;
      flex-direction: column;
      background-color: #f8f5f1;
      width: 21%;
      margin: 0 2%;
      height: 360px;
      text-align: center;
      border-radius: 5px;
      transition: .2s;
      cursor: pointer;
    }
    
    .package-card-title {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      font-weight: 400;
      padding: 20px 15px;
      margin: 0;
      border-bottom: 1px solid rgba(88,119,146,.2);
    }
    
    .package-card-price {
      font-size: 32px;
      margin: 15px 0 0;
      font-weight: 700;
      transition: .2s;
    }
    
    .packages-cards-container .package-card-terms {
      font-weight: 300;
      font-size: 14px;
    }
  </style>
  
    <div class='package-card-container'>
      <h3 class="package-card-title ">COMPLETE PACK</h3>
      <p class="package-card-price ">$215.00</p>
      <span class="package-card-terms">Per Month</span>
      <p class="package-card-desc">Extra charges are based on extra work taken.</p>
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
