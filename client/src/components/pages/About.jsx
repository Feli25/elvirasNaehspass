import React, { Component } from 'react';

export default class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {                
    return (
      <React.Fragment>
        <div className="page-title">
          <h1 className="page-title">Über uns</h1>
        </div>

        <section className="card-container">
            <div className="card about-card">
              <img src="../images/Elvira.jpg" alt="Elvira Deutges" className="card-img-top img-fluid"/>
              <div className="card-body">
                <h5 className="card-title">Elvira Deutges</h5>
                <p className="card-text about-text">
                  geboren: 03.08.1965<br/>
                  Ausbildung:<br/>
                  1982 – 1984 Fachoberschule mit Fachabitur Bekleidung<br/>
                  1984 – 1986 Ausbildung zur Bekleidungsschneiderin<br/>
                  1986 – 1991 Beschäftigung als Musternäherin<br/>
                  1991 – 2002 Selbstständigkeit als Maßatelier<br/>
                  Seit 1990 tätig in der Erwachsenenbildung<br/>
                  Weiterbildung:<br/>
                  1987 – 1990 Ausbildung zum Industrieschneidermeisterin<br/>
                  (mit Anerkennung im Handwerk)<br/>
                  1992 Ausbildung zur Schnittdirectrice
                </p>
              </div>
            </div>
            <div className="card about-card">
              <img src="../images/barbara.jpg" alt="Barbara Beckmann" className="card-img-top img-fluid"/>
              <div className="card-body">
                <h5 className="card-title">Barbara Beckmann</h5>
                <p className="card-text about-text">
                  geboren 12.07.1967<br/>
                  Ausbildung:<br/>
                  1983 – 1985 Ausbildung zur Bekleidungsfertigerin<br/>
                  1986 – 1991 Beschäftigung in der Industrie<br/>
                  1992 – 1997 Selbstständige Damenschneiderin<br/>
                  Seit 2010 tätig in der Erwachsenenbildung<br/>
                  Weiterbildung:<br/>
                  1987 – 1990 Ausbildung zur Industrieschneidermeisterin<br/>
                  (mit Anerkennung im Handwerk)<br/><br/>
                  1992 Ausbildung zur Schnittdirectrice
                </p>
              </div>
          </div>
          <div className="card about-card">
            {/* <img src="../images/Simone.jpg" alt="Simone Becher" className="card-img-top img-fluid"/> */}
            <div className="card-body">
              <h5 className="card-title">Simone Becher</h5>
              <p className="card-text about-text" style={{textAlign:"left"}}>
                geboren: 27.07.1970<br/>
                Ausbildung:<br/>
                1986 - 1989 Vollzeitschulische Ausbildung zur Damenschneiderin im Handwerk<br/>
                1989 - 1990 Musternäherin Kinderbekleidung<br/>
                1990 - 1992 Musternäherin DOB, ab Mai 1991 Reisetechnikerin van Laack<br/>
                1992 - 1994 Fachschule für Technik, Abschluss Bekleidungstechnikerin, Schwerpunkt Gestaltung<br/>
                1994 Produktionsassistentin ZASPEL<br/>
                1994 - 2004 Erstschnittdirektrice DOB manuell und CAD-Assyst<br/>
                seit 2004 Selbstständige Tätigkeit als Schnittservice<br/>
                Weiterbildung:<br/>
                1993 REFA Grundschein 1 und 2<br/>
                2002 Schnittkonstruktion, Gradieren, Digitalisieren, Schnittbild legen an CAD-ASSYST<br/>
                2004 Gradierung Müller und Sohn<br/>
                2004 Schnittkonstruktion, Gradieren, Digitalisieren, Schnittbild legen an CAD-Grafis, regelmässige Upgrades auf die jeweils aktuellste Version mit entsprechender Schulung
              </p>
            </div>
          </div>
          <div className="card about-card">
            {/* <img src="../images/Simone.jpg" alt="Simone Becher" className="card-img-top img-fluid"/> */}
            <div className="card-body">
              <h5 className="card-title">Nicola Münter</h5>
              {/* <p className="card-text about-text">
                geboren: 03.08.1965<br/>
                Ausbildung:<br/>
                1982 – 1984 Fachoberschule mit Fachabitur Bekleidung<br/>
                1984 – 1986 Ausbildung zur Bekleidungsschneiderin<br/>
                1986 – 1991 Beschäftigung als Musternäherin<br/>
                1991 – 2002 Selbstständigkeit als Maßatelier<br/>
                Seit 1990 tätig in der Erwachsenenbildung<br/>
                Weiterbildung:<br/>
                1987 – 1990 Ausbildung zum Industrieschneidermeisterin<br/>
                (mit Anerkennung im Handwerk)<br/>
                1992 Ausbildung zur Schnittdirectrice
              </p> */}
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}