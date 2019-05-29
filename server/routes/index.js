const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const nodemailer = require('nodemailer');
const Info = require('../models/Info')


let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
});

router.post('/kontakt', (req,res,next)=>{
  var mailOptions = {
    to: "deutges.ironhack@gmail.com",//'elvirasnaehspass@gmail.com',
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

router.post("/anmeldung/:type", (req,res,next)=>{
  var html = `<h1>Die Anfrage:</h1><hr>`
  var SendTo = "elvirasnaehspass@gmail.com"
  if(req.params.type==="kurs"){
    if(req.body.sharing){
      html += `<p>${req.body.name} (${req.body.email}) und ${req.body.shareName} (${req.body.shareEmail}) möchten gemeinsam diesem Kurs betreten:<br/>Wahlen: ${req.body.choice1}<br/>${req.body.choice2}<br/>${req.body.choice3}`
      html += `<br/>Die eingetragenen Infos:<br/>Person 1:<br/>Name: ${req.body.name}<br/>Email: ${req.body.email}<br/>Telefon: ${req.body.phone}<br/>Adresse: ${req.body.adress}<br/>Person 2:<br/>Name: ${req.body.shareName}<br/>Email: ${req.body.shareEmail}`
    } else {
      html += `<p>${req.body.name} (${req.body.email}) möchte diesem Kurs betreten:<br>Wahlen: ${req.body.choice1}<br/>${req.body.choice2}<br/>${req.body.choice3}`
      html += `<br/>Die eingetragenen Infos:<br/>Name: ${req.body.name}<br/>Email: ${req.body.email}<br/>Telefon: ${req.body.phone}<br/>Adresse: ${req.body.adress}`
    }
    html += `</p><p>Weitere Mitteilung: ${req.body.message}</p><br><hr><br>`
    transporter.sendMail({
      from: '"Elviras Naehspass Website"',
      to: SendTo,
      subject: "Eine neue "+req.params.type+ " Anmeldung",
      text: req.body.message,
      html: html
    })
    
    .then(sth => {console.log("sent")
    res.json( { success: true })})
    .catch(err => { console.log(err) })
  } else if(req.params.type="workshop"){
    Info.findById(req.body.choice)
      .then(course=>{
        html += `<p>${req.body.name} (${req.body.email}) möchte an diesem Workshop teilnehmen: ${course.header}<br/>Die eingetragenen Infos:<br/>Name: ${req.body.name}<br/>Email: ${req.body.email}<br/>Telefon: ${req.body.phone}<br/>Adresse: ${req.body.adress}`
        if(course.teacher==="Barbara"||course.teacher==="barbara"){
          SendTo += ", beckmannbarbara@web.de"
        }
        html += `</p><p>Weitere Mitteilung: ${req.body.message}</p><br><hr><br>`
        transporter.sendMail({
          from: '"Elviras Naehspass Website"',
          to: SendTo,
          subject: "Eine neue "+req.params.type+ " Anmeldung",
          text: req.body.message,
          html: html
        })
        
        .then(sth => {console.log("sent")
        res.json( { success: true })})
        .catch(err => { console.log(err) })
      })
      .catch(err=>console.log(err))
  }
 
})


module.exports = router;
