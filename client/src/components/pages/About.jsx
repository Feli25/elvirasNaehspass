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
        <div class="page-title">
          <h1 class="page-title">Über uns</h1>
        </div>

        <section class="card-container">
          <div style={{display:"flex"}}>
            <div class="card about-card">
              <img src="../images/Elvira.jpg" alt="Elvira Deutges" class="card-img-top"/>
              <div class="card-body">
                <h5 class="card-title">Elvira Deutges</h5>
                <p class="card-text about-text">
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
            <div class="card about-card">
              <img src="../images/barbara.jpg" alt="Barbara Beckmann" class="card-img-top"/>
              <div class="card-body">
                <h5 class="card-title">Barbara Beckmann</h5>
                <p class="card-text about-text">
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
          </div>
        </section>
      </React.Fragment>
    );
  }
}