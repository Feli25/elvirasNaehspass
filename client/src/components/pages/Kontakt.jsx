import React, { Component } from 'react';

export default class Kontakt extends Component {
  render () {
    return (
      <div className="kontakt">
        <h2 className="title">Kontakt</h2>
        <img className="mail-img" alt="mail" src="https://res.cloudinary.com/mcfrihfd/image/upload/v1601927335/project2React/kontaktsignup/mail.jpg"/>
        <div className="block-wrapper">
          <div className="info-block">
            <h3 className="info-block__header">Unsere Kontaktdaten</h3>
            <p className="info-block__text">
              Elvira Deutges<br/>
              Entenpfad 22<br/>
              41334 Nettetal<br/>
              Telefon: 02157/3029432<br/>
              Handy: 0152/53859794<br/>
              Email: elvirasnaehspass@gmail.com</p>
          </div>

        </div>
      </div>
    )
  }
}