const express = require('express');
const router = express.Router();

// const { Client } = require('pg');
// const configs = {
//   connectionString: process.env.DATABASE_URL,
//   ssl: false,
// }

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
    .catch(err=>{
      if(err.response && 
        err.response.body && 
        err.response.body.errors && 
        err.response.body.errors[0] && 
        err.response.body.errors[0].field && 
        err.response.body.errors[0].field==="reply_to.email"){
        res.json({success:false, error:"reply_to.email"})
      } else {
        next(err)
      }
      // console.log(err)
      // console.log(err.response.body)
    })
})

function createHTML(body){
  let html = `<h1>Die Anfrage:</h1><hr>`
  html += `<p>${body.name} (${body.email}) möchte diesem Kurs betreten:<br>Wahlen:<br/> ${body.choice}`
  html += `<br/>Die eingetragenen Infos:<br/>Name: ${body.name}<br/>Email: ${body.email}<br/>Telefon: ${body.phone}<br/>Adresse: ${body.adress}`
  html += `</p><p>Weitere Mitteilung: ${body.message}</p><br><hr><br>`
  return html
}

function createHTMLThankYou(body){
  let htmlThankYou = `Sehr geehrte/r ${body.name} <br/><br/>
                          Wir danken vielmals für Ihre Anmeldung für folgenden Kurs/Workshop:<br/> 
                          Deine Wahl: ${body.choice}<br/>`
      htmlThankYou+=`<br/>In Kürze werden Sie eine Information erhalten, ob Sie erfolgreich aufgenommen worden sind, sowie alle weiteren benötigten Informationen!<br/><br/>
                          Mit lieben Grüßen<br/>
                          Ihr Team von Elviras Nähspass</p>`
  return htmlThankYou 
}

// req.body =    
// name: "",
// email: "",
// phone: "",
// address: "",
// message: "",
// choice: "none", //name of the course

router.post("/anmeldung", (req,res,next)=>{
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  let messageToTeachers = {
    to: "elvirasnaehspass@gmail.com",
    from: 'elvirasnaehspass@gmail.com',
    reply_to:req.body.email,
    subject: "Eine neue Anmeldung",
    html: createHTML(req.body)
  }
  let messageToStudents = {
    to: req.body.email,
    from: 'elvirasnaehspass@gmail.com',
    subject: "Vielen Dank für Ihre Anmeldung!",
    html: createHTMLThankYou(req.body)
  }

  sgMail.send(messageToTeachers)
    .then(sth => {
      console.log("sent")
      sgMail.send(messageToStudents)
        .then(sth2=>{
          console.log("sentstudent")
          res.json( { success: true })
        })
        .catch(err => { 
          next(err)
         })
    })
    .catch(err => {
      if(err.response && 
        err.response.body && 
        err.response.body.errors && 
        err.response.body.errors[0] && 
        err.response.body.errors[0].field && 
        err.response.body.errors[0].field==="reply_to.email"){
        res.json({success:false, error:"reply_to.email"})
      } else {
        next(err)
      }
    })
})


module.exports = router;
