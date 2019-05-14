import React, { Component } from 'react';

export default class Naehkurse extends Component {
  render() {                
    return (
      <React.Fragment>
        <div class="page-title">
          <h1 class="page-title">Nähkurse</h1>
        </div>

        <p>
          <section class="card-container">

            <div class="card" style={{width: "30rem"}}>
              <img src="../images/kurs.jpg" alt="Nähkurs" class="card-img-top" />
              <div class="card-body">
                <p class="card-text">Die nächste Anmeldung findet am 17.3.2019 um 11 Uhr statt!</p>
                <h5 class="card-title">Unsere Kurse</h5>
                <p class="card-text">Jede Woche finden bei uns Kurse zu verschiedenen Uhrzeiten statt. Die Kurse finden
                  wöchentlich statt, immer zum gleichen Zeitpunkt, und gehen über 10-14 Termine. Bevor Sie sich für einen Kurs
                  anmelden, schreiben Sie doch bitte einmal eine Email oder rufen sie einmal an!</p>
                <div>
                <a class="btnHref" href="/anmeldung/kurse">Buchen</a>
                <a class="btnHref" href="/naehkurse/kurse">Mehr Infos</a>
                </div>
              </div>
            </div>

            <div class="card" style={{width: "30rem"}}>
              <img src="../images/workhopsNew.JPG"
                alt="Workshop" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">Unsere Workshops</h5>
                <p class="card-text">An Wochenenden und in den Ferien finden immer wieder Workshops statt. Schaut einfach mal
                  rein, was es da für besondere Angebote gibt!</p>
                <div>
                <a class="btnHref" href="/anmeldung/workshop">Buchen</a>
                <a class="btnHref" href="/naehkurse/workshop">Mehr Infos</a>
                </div>
              </div>
            </div>

          </section>
        </p>
      </React.Fragment>
    );
  }
}