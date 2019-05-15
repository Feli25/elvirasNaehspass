const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const nodemailer = require('nodemailer');



let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
});

router.post('/kontakt', (req,res,next)=>{
  var mailOptions = {
    to: 'elvirasnaehspass@gmail.com',
    from: '"Elviras Nähspass Website"',
    subject: 'Betreff: ' + req.body.subject,
    text: 'Jemand auf der neuen Website hat ein Kontaktformular geschickt!\n\n' +
      'Das Kontaktformular wurde von ' + req.body.name + ' gesendet.\n\n' +
      'Email: ' + req.body.email + '\n\n' +
      'Die Nachricht: ' + req.body.message + '\n'
  };
  transporter.sendMail(mailOptions)
    .then(sth => res.json( { success: true }))
    .catch(err => { console.log(err) })
})

router.post("/anmeldung", (req,res,next)=>{
  var html = `<h1>Die Anfrage:</h1><hr>`
  if(req.body.sharing){
    html += `<p>${req.body.name} (${req.body.email}) und ${req.body.shareName} (${req.body.shareEmail}) möchten gemeinsam diesem Kurs betreten:<br/>Wahlen: ${req.body.choice1}<br/>${req.body.choice2}<br/>${req.body.choice3}`
  } else {
    html += `<p>${req.body.name} (${req.body.email}) möchte diesem Kurs betreten:<br>Wahlen: ${req.body.choice1}<br/>${req.body.choice2}<br/>${req.body.choice3}`
  }
  html += `</p><p>Weitere Mitteilung: ${req.body.message}</p><br><hr><br>`
  transporter.sendMail({
    from: '"Elviras Naehspass Website"',
    to: "elvirasnaehspass@gmail.com",
    subject: "Eine neue Kurs Anmeldung",
    text: req.body.message,
    html: req.body.html
  })
  .then(sth => res.json( { success: true }))
  .catch(err => { console.log(err) })
})


module.exports = router;
