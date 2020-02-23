import React, { Component } from 'react'

export default class StaticContentKurse extends Component {
  render() {
    return (
      <React.Fragment>
          <section className="card-container">

            <div className="card image-direction" style={{width: "30rem"}}>
              <img src="../images/selberGenaeht.png" alt="Nähkurs" className="card-img-top"/>
              <div className="card-body">
                  <h5 className="card-title">Nähkurse für Anfänger und Fortgeschrittene</h5>
                  <p className="card-text">Haben Sie schon immer davon geträumt, mal einen Rock, eine Hose oder eine Jacke nähen zu können und stolz zu
                  sagen: <b>„Hab ich selbst genäht!“</b> Bei uns haben Sie die Möglichkeit, Ihren Traum wahr werden zu lassen.
                  Vorkenntnisse sind nicht erforderlich. Eine Nähmaschine sollten Sie bitte mitbringen – kann aber auch bei uns
                  geliehen werden … Ihre Nähwünsche können bei der Anmeldung besprochen werden.
                  </p>
              </div>
            </div>
            {/*<div className="card flexible-card">
              <div className="card-body">
                <h1>Dauerhafte Kurstermine</h1>
                BB = Barbara Beckmann<br/>
                ED = Elvira Deutges<br/>
                NM = Nicola Münter<br/>
                SB = Simone Becher
                  <table className="table">
                    <tr>
                      <th>Kurs</th>
                      <th>Uhrzeit</th>
                      <th>Lehrer</th>
                    </tr>
                    <tr>
                      <td>Montag morgens</td>
                      <td>09:00 - 11:30</td>
                      <td>BB</td>
                    </tr>
                    <tr>
                      <td>Montag abends</td>
                      <td>19:00 - 21:30</td>
                      <td>ED</td>
                    </tr>
                    <tr>
                      <td>Dienstag morgen</td>
                      <td>09:00 - 12:00</td>
                      <td>SB</td>
                    </tr>
                    <tr>
                      <td>Mittwoch morgens</td>
                      <td>08:45 - 11:15</td>
                      <td>ED</td>
                    </tr>
                    <tr>
                      <td>Mittwoch abends</td>
                      <td>19:00 - 21:30</td>
                      <td>ED</td>
                    </tr>
                    <tr>
                      <td>Donnerstag morgens</td>
                      <td>09:00 - 12:00</td>
                      <td>ED</td>
                    </tr>
                    <tr>
                      <td>Donnerstag mittags</td>
                      <td>16:30 - 19:00</td>
                      <td>NM</td>
                    </tr>
                    <tr>
                      <td>Donnerstag abends</td>
                      <td>19:30 - 22:00</td>
                      <td>BB</td>
                    </tr>
                  </table>
              </div>
            </div>*/}
            </section>
          {/* <section className="card-container">
          <div className="card flexible-card">
            <div className="card-body">
              <p>Jeder Kurs umfasst 5 oder mehr Einheiten gemäß der Tabelle.<br/>
                (Bei Verhinderung ist, bei rechtzeitiger Online-Abmeldung , ein Nachholen in den anderen Kursen, nach
                Platzverfügbarkeit, möglich) Die Kursgebühr von je <strong>EUR 12,--/Kurstag</strong> ist bei Anmeldung, vor Kursbeginn zu
                bezahlen. <br/>Aktuelle Starttermine für die nächsten Kurse entnehmen Sie bitte der Tabelle mit den zukünftigen Kursdaten.</p>
            </div>
          </div>
          </section> */}
      </React.Fragment>
    )
  }
}
