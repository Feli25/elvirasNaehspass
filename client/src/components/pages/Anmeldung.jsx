import React, { Component } from 'react';

export default class Anmeldung extends Component {
  render() {                
    return (
      <React.Fragment>
        <div class="page-title">
          <h1 class="page-title">Anmeldung</h1>
        </div>
        <p>
          <section class="card-container">
            <div class="card" style={{width: "30rem"}}>
              <div class="card-body">
                <h3>Wir freuen uns über jede Anmeldung!</h3>
                <h5 class="card-title" >Anmeldung</h5>
                <p class="card-text">Für was möchten sie sich anmelden?</p>
                <div>
                <a href="/anmeldung/kurse" class="btnHref">Kurs</a>
                <a href="/anmeldung/workshop" class="btnHref">Workshop</a>
                </div>
              </div>
            </div>
          </section>
        </p>
      </React.Fragment>
    );
  }
}