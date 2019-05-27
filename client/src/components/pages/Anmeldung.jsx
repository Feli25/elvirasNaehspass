import React, { Component } from 'react';

export default class Anmeldung extends Component {
  render() {                
    return (
      <React.Fragment>
        <div className="page-title">
          <h1 className="page-title">Anmeldung</h1>
        </div>
          <section className="card-container">
            <div className="card" style={{width: "30rem"}}>
              <div className="card-body">
                <h3>Wir freuen uns über jede Anmeldung!</h3>
                <h5 className="card-title" >Anmeldung</h5>
                <p className="card-text">Für was möchten sie sich anmelden?</p>
                <div>
                <a href="/anmeldung/kurse" className="btnHref">Kurs</a>
                <a href="/anmeldung/workshop" className="btnHref">Workshop</a>
                </div>
              </div>
            </div>
          </section>
      </React.Fragment>
    );
  }
}