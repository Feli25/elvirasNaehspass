import React, { Component } from 'react'


export default class Anmeldung extends Component {
  render () {
    return (
      <div className="kontakt">
        <h2 className="title">Anmeldung</h2>
        <img className="mail-img" alt="mail" src="https://res.cloudinary.com/mcfrihfd/image/upload/v1601927337/project2React/kontaktsignup/signup.jpg"/>
        {/* <img className="mail-img" alt="mail" src="https://res.cloudinary.com/mcfrihfd/image/upload/v1601927335/project2React/kontaktsignup/mail.jpg"/> */}
        <div className="block-wrapper">
          <div className="info-block">
            <h3 className="info-block__header">Anmeldung!</h3>
            <p className="info-block__text">
              Sie möchten sich bei einem unserer Kurse anmelden? Dann schicken Sie uns gerne eine Email und wir melden uns schnellstmöglich. <br/><br/>
              elvirasnaehspass@gmail.com</p>
          </div>

        </div>
      </div>
    )
  }
}