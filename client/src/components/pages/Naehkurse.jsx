import React, { Component } from 'react';

export default class Naehkurse extends Component {
  render() {                
    return (
      <React.Fragment>
        <div className="page-title">
          <h1 className="page-title">Nähkurse</h1>
        </div>

          <section className="card-container">

            <div className="card" style={{width: "30rem"}}>
              <img src="https://res.cloudinary.com/mcfrihfd/image/upload/v1560006430/project2React/kurse.jpg" alt="Nähkurs" className="card-img-top" />
              <div className="card-body">
                {/* <p className="card-text">Die nächste Anmeldung findet am 30.6.2019 um 11 Uhr statt!</p> */}
                <h5 className="card-title">Unsere Kurse</h5>
                <p className="card-text">Jede Woche finden bei uns Kurse zu verschiedenen Uhrzeiten statt. Die Kurse finden
                  wöchentlich statt, immer zum gleichen Zeitpunkt, und gehen über 10-14 Termine. Bevor Sie sich für einen Kurs
                  anmelden, schreiben Sie doch bitte einmal eine Email oder rufen sie einmal an!</p>
                <div>
                <a className="btnHref" href="/anmeldung/kurse">Buchen</a>
                <a className="btnHref" href="/naehkurse/kurse">Mehr Infos</a>
                </div>
              </div>
            </div>

            <div className="card" style={{width: "30rem"}}>
              <img src="../images/workshopsPage/workshopNew.png"
                alt="Workshop" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Unsere Workshops</h5>
                <p className="card-text">An Wochenenden und in den Ferien finden immer wieder Workshops statt. Schaut einfach mal
                  rein, was es da für Angebote gibt!</p>
                <div>
                <a className="btnHref" href="/anmeldung/workshop">Buchen</a>
                <a className="btnHref" href="/naehkurse/workshop">Mehr Infos</a>
                </div>
              </div>
            </div>

            <div className="card" style={{width: "30rem"}}>
              <img src="../images/dessousPage/workhopsNew.JPG"
                alt="Dessous" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Unsere Dessous-Workshops</h5>
                <p className="card-text">Ein ganz besonderes Angebot sind unsere Dessous-Workshops, die immer wieder an Wochenenden stattfinden</p>
                <div>
                <a className="btnHref" href="/anmeldung/workshop">Buchen</a>
                <a className="btnHref" href="/naehkurse/dessous">Mehr Infos</a>
                </div>
              </div>
            </div>

          </section>
      </React.Fragment>
    );
  }
}