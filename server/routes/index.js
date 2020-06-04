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
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'elvirasnaehspass@gmail.com',
    from: 'elvirasnaehspass@gmail.com',
    reply_to:req.body.email,
    subject: 'Betreff: ' + req.body.subject,
    text: 'Jemand auf der neuen Website hat ein Kontaktformular geschickt!\n\n' +
      'Das Kontaktformular wurde von ' + req.body.name + ' gesendet.\n\n' +
      'Email: ' + req.body.email + '\n\n' +
      'Die Nachricht: ' + req.body.message + '\n'
  };
  sgMail.send(msg)
    .then(response=>{ res.json( { success: true })})
    .catch(err=>{console.log(err)})
})

router.post("/anmeldung/:type", (req,res,next)=>{
  var html = `<h1>Die Anfrage:</h1><hr>`
  var SendToTeacher = "elvirasnaehspass@gmail.com"
  // var SendToTeacher = "fee2599@gmail.com"

  if(req.params.type==="kurs"){
    //choice object is the course name string
    if(req.body.sharing){
      html += `<p>${req.body.name} (${req.body.email}) und ${req.body.shareName} (${req.body.shareEmail}) möchten gemeinsam diesem Kurs betreten:<br/>Wahlen: ${req.body.choice1}<br/>${req.body.choice2}<br/>${req.body.choice3}`
      html += `<br/>Die eingetragenen Infos:<br/>Person 1:<br/>Name: ${req.body.name}<br/>Email: ${req.body.email}<br/>Telefon: ${req.body.phone}<br/>Adresse: ${req.body.adress}<br/>Person 2:<br/>Name: ${req.body.shareName}<br/>Email: ${req.body.shareEmail}`
    } else {
      html += `<p>${req.body.name} (${req.body.email}) möchte diesem Kurs betreten:<br>Wahlen:<br/> ${req.body.choice1}<br/>${req.body.choice2}<br/>${req.body.choice3}`
      html += `<br/>Die eingetragenen Infos:<br/>Name: ${req.body.name}<br/>Email: ${req.body.email}<br/>Telefon: ${req.body.phone}<br/>Adresse: ${req.body.adress}`
    }
    html += `</p><p>Weitere Mitteilung: ${req.body.message}</p><br><hr><br>`
    transporter.sendMail({
      from: '"Elviras Naehspass Website"',
      to: SendToTeacher,
      subject: "Eine neue "+req.params.type+ " Anmeldung",
      text: req.body.message,
      html: html
    })
    .then(sth => {console.log("sent")
      var htmlThankYou = `Sehr geehrte/r ${req.body.name} <br/><br/>
                          Wir danken vielmals für Ihre Anmeldung für folgenden Kurs(e):<br/> 
                          1ste Wahl: ${req.body.choice1}<br/>`
      if(req.body.choice2!=="none"){
        htmlThankYou+="2te Wahl: "+req.body.choice2+"<br/>"
      }
      if(req.body.choice3!=="none"){
        htmlThankYou+="3te Wahl: "+req.body.choice3+"<br/>"
      }
      htmlThankYou+=`Folgende Person(en) wurden angemeldet: ${req.body.name}`
      if(req.body.sharing){
        htmlThankYou+=` und ${req.body.shareName}<br/>`
      } 
      htmlThankYou+=`In Kürze werden Sie eine Information erhalten, ob Sie erfolgreich aufgenommen worden sind, sowie alle weiteren benötigten Informationen!<br/><br/>
                          Mit lieben Grüßen<br/>
                          Ihr Team von Elviras Nähspass</p>`
      transporter.sendMail({
        from: '"Elviras Naehspass"',
        to: req.body.email,
        subject: "Vielen Dank für Ihre Anmeldung!",
        html: htmlThankYou
      })
      .then(sth2=>{
        console.log("sentstudent")
        if(req.body.shareName){
          var htmlThankYouShare = 
            `Sehr geehrte/r ${req.body.shareName} <br/><br/>
            Wir danken vielmals für Ihre Anmeldung für folgenden Kurs(e):<br/> 
            1ste Wahl: ${req.body.choice1}<br/>`
            if(req.body.choice2!=="none"){
              htmlThankYouShare+="2te Wahl: "+req.body.choice2+"<br/>"
            }
            if(req.body.choice3!=="none"){
              htmlThankYouShare+="3te Wahl: "+req.body.choice3+"<br/>"
            }
            htmlThankYouShare+=`Sie wurden von ${req.body.name} angemeldet.<br/>
            In Kürze werden Sie eine Information erhalten, ob Sie erfolgreich aufgenommen worden sind, sowie alle weiteren benötigten Informationen!<br/><br/>
            Mit lieben Grüßen<br/>
            Ihr Team von Elviras Nähspass</p>`
          transporter.sendMail({
            from: '"Elviras Naehspass"',
            to: req.body.shareEmail,
            subject: "Vielen Dank für Ihre Anmeldung!",
            html: htmlThankYouShare
          })
          .then(sth3=>{
            res.json( { success: true })
          })
          .catch(err => { console.log(err) })
        }
        else {
          res.json( { success: true })
        }
      })
      .catch(err => { console.log(err) })
    })
    .catch(err => { console.log(err) })
    
  } else if(req.params.type="workshop"){
    //choice object is the course id
    Info.findById(req.body.choice)
      .then(course=>{
        html += `<p>${req.body.name} (${req.body.email}) möchte an diesem Workshop teilnehmen: ${course.header}<br/>Die eingetragenen Infos:<br/>Name: ${req.body.name}<br/>Email: ${req.body.email}<br/>Telefon: ${req.body.phone}<br/>Adresse: ${req.body.adress}`
        if(course.category==="DESSOUS"){
          SendToTeacher += ", beckmannbarbara@web.de"
        }
        html += `</p><p>Weitere Mitteilung: ${req.body.message}</p><br><hr><br>`
        transporter.sendMail({
          from: '"Elviras Naehspass Website"',
          to: SendToTeacher,
          subject: "Eine neue "+req.params.type+ " Anmeldung",
          text: req.body.message,
          html: html
        })
        
        .then(sth => {console.log("sent")
          var htmlThankYou = 
            `Sehr geehrte/r ${req.body.name} <br/><br/>
            Wir danken vielmals für Ihre Anmeldung für folgenden Workshop:<br/> ${course.header}<br/>
            In Kürze werden Sie eine Information erhalten, ob Sie erfolgreich aufgenommen worden sind, sowie alle weiteren benötigten Informationen!<br/><br/>
            Mit lieben Grüßen<br/>
            Ihr Team von Elviras Nähspass</p>`
          transporter.sendMail({
          from: '"Elviras Naehspass"',
          to: req.body.email,
          subject: "Vielen Dank für Ihre Anmeldung!",
          html: htmlThankYou
          })
          .then(sth2=>{
            res.json( { success: true })})
          })
          .catch(err => { console.log(err) })
        .catch(err => { console.log(err) })
      })
      .catch(err=>console.log(err))
  }
 
})


module.exports = router;
