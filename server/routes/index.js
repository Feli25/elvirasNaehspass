const express = require('express');
const router = express.Router();
const Info = require('../models/Info')

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

function createHTML(body){
  let html = `<h1>Die Anfrage:</h1><hr>`
  if(body.sharing){
    html += `<p>${body.name} (${body.email}) und ${body.shareName} (${body.shareEmail}) möchten gemeinsam diesem Kurs betreten:<br/>Wahlen: ${body.choice1}<br/>${body.choice2}<br/>${body.choice3}`
    html += `<br/>Die eingetragenen Infos:<br/>Person 1:<br/>Name: ${body.name}<br/>Email: ${body.email}<br/>Telefon: ${body.phone}<br/>Adresse: ${body.adress}<br/>Person 2:<br/>Name: ${body.shareName}<br/>Email: ${body.shareEmail}`
  } else {
    html += `<p>${body.name} (${body.email}) möchte diesem Kurs betreten:<br>Wahlen:<br/> ${body.choice1}<br/>${body.choice2}<br/>${body.choice3}`
    html += `<br/>Die eingetragenen Infos:<br/>Name: ${body.name}<br/>Email: ${body.email}<br/>Telefon: ${body.phone}<br/>Adresse: ${body.adress}`
  }
  html += `</p><p>Weitere Mitteilung: ${body.message}</p><br><hr><br>`
  return html
}

function createHTMLThankYou(body){
  let htmlThankYou = `Sehr geehrte/r ${body.name} <br/><br/>
                          Wir danken vielmals für Ihre Anmeldung für folgenden Kurs(e):<br/> 
                          1ste Wahl: ${body.choice1}<br/>`
      if(body.choice2!=="none"){
        htmlThankYou+="2te Wahl: "+body.choice2+"<br/>"
      }
      if(body.choice3!=="none"){
        htmlThankYou+="3te Wahl: "+body.choice3+"<br/>"
      }
      htmlThankYou+=`Folgende Person(en) wurden angemeldet: ${body.name}`
      if(body.sharing){
        htmlThankYou+=` und ${body.shareName}`
      } 
      htmlThankYou+=`<br/>In Kürze werden Sie eine Information erhalten, ob Sie erfolgreich aufgenommen worden sind, sowie alle weiteren benötigten Informationen!<br/><br/>
                          Mit lieben Grüßen<br/>
                          Ihr Team von Elviras Nähspass</p>`
  return htmlThankYou 
}

function createHTMLThankYouShare(body){
  let htmlThankYouShare = 
            `Sehr geehrte/r ${body.shareName} <br/><br/>
            Wir danken vielmals für Ihre Anmeldung für folgenden Kurs(e):<br/> 
            1ste Wahl: ${body.choice1}<br/>`
            if(body.choice2!=="none"){
              htmlThankYouShare+="2te Wahl: "+body.choice2+"<br/>"
            }
            if(body.choice3!=="none"){
              htmlThankYouShare+="3te Wahl: "+body.choice3+"<br/>"
            }
            htmlThankYouShare+=`Sie wurden von ${body.name} angemeldet.<br/>
            In Kürze werden Sie eine Information erhalten, ob Sie erfolgreich aufgenommen worden sind, sowie alle weiteren benötigten Informationen!<br/><br/>
            Mit lieben Grüßen<br/>
            Ihr Team von Elviras Nähspass</p>`
  return htmlThankYouShare
}
function createHTMLWorkshop(body, course){
  let html = `<h1>Die Anfrage:</h1><hr>`
  html += `<p>${body.name} (${body.email}) möchte an diesem Workshop teilnehmen: ${course.header}<br/>Die eingetragenen Infos:<br/>Name: ${body.name}<br/>Email: ${body.email}<br/>Telefon: ${body.phone}<br/>Adresse: ${body.adress}`
  html += `</p><p>Weitere Mitteilung: ${body.message}</p><br><hr><br>`
  return html
}
function createHTMLThankYouWorkshop(body,course){
  let htmlThankYou = 
  `Sehr geehrte/r ${body.name} <br/><br/>
  Wir danken vielmals für Ihre Anmeldung für folgenden Workshop:<br/> ${course.header}<br/>
  In Kürze werden Sie eine Information erhalten, ob Sie erfolgreich aufgenommen worden sind, sowie alle weiteren benötigten Informationen!<br/><br/>
  Mit lieben Grüßen<br/>
  Ihr Team von Elviras Nähspass</p>`
  return htmlThankYou
}

router.post("/anmeldung/:type", (req,res,next)=>{
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  let messageToTeachers = {
    to: "elvirasnaehspass@gmail.com",
    from: 'elvirasnaehspass@gmail.com',
    reply_to:req.body.email,
    subject: "Eine neue "+req.params.type+ " Anmeldung",
  }
  let messageToStudents = {
    to: req.body.email,
    from: 'elvirasnaehspass@gmail.com',
    subject: "Vielen Dank für Ihre Anmeldung!",
  }

  if(req.params.type==="kurs"){
    //choice object is the course name string
    const html = createHTML(req.body)
    messageToTeachers.html = html
    sgMail.send(messageToTeachers)
      .then(sth => {
        console.log("sent")
        const htmlThankYou = createHTMLThankYou(req.body)
        messageToStudents.html=htmlThankYou
        sgMail.send(messageToStudents)
          .then(sth2=>{
            console.log("sentstudent")
            if(req.body.shareName){
              const htmlThankYouShare = createHTMLThankYouShare(req.body)
              messageToStudents.html=htmlThankYouShare
              messageToStudents.to = req.body.shareEmail
              sgMail.send(messageToStudents)
                .then(sth3=>{res.json( { success: true })})
                .catch(err => { console.log(err) })
            } else {
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
        const html = createHTMLWorkshop(req.body, course)
        messageToTeachers.html = html
        
        sgMail.send(messageToTeachers)
          .then(sth => {
            if(course.category==="DESSOUS"){
              messageToTeachers.to = "beckmannbarbara@web.de"
              sgMail.send(messageToTeachers)
                .then(sth=>console.log("success"))
                .catch(err=>console.log("ERROR",err))
            }
            console.log("sent")
            const htmlThankYou = createHTMLThankYouWorkshop(req.body,course)
            messageToStudents.html = htmlThankYou
            sgMail.send(messageToStudents)
              .then(sth2=>{res.json( { success: true })})
              .catch(err => { console.log(err) })
          })
          .catch(err => { console.log(err) })
      })
      .catch(err=>console.log(err))
  }
 
})


module.exports = router;
