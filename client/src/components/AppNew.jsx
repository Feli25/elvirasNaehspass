import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeNew from './pagesNew/Home'
import Kontakt from './pagesNew/Kontakt'
import Datenschutz from './pagesNew/Datenschutz';

import '../styles/card.scss';
import '../styles/slider.scss';
import '../styles/layout.scss';
import '../styles/home.scss';

import '../styles/kontakt.scss';

export default class NewHome extends Component {
  state = {
    navOpen: false
  }

  render () {
    return(
      <React.Fragment>
        <section className="header">
          <img className="header__icon" id="icon" alt="icon" src="../images/icon.png"/>
          <h1 className="header__title">Elvira's Nähspass</h1>
          <div className={this.state.navOpen?'nav--is-expanded nav':'nav'}>
            <button className="nav__button" onClick={()=>this.setState({navOpen:!this.state.navOpen})}>
              <span className="nav__button-line"/>
              <span className="nav__button-line"/>
              <span className="nav__button-line"/>
              <span className="nav__button-close">&#x2715;</span>
            </button>
            <div className="nav__links">
              {/* <span>test</span> */}
              <a href="/new">Home</a>
              <a href="/new/naehkurse">Nähkurse</a>
              <a href="/new/atelier">Atelier</a>
              <a href="/new/ueberuns">Über uns</a>
              {/* <a>Galerie</a> */}
              <a href="/new/kontakt">Kontakt</a>
            </div>
          </div>
        </section>
        
        <div className="content">
          <Switch>
            <Route path="/new" exact component={HomeNew} />
            {/* <Route path="/new/naehkurse" exact component={Naehkurse} /> */}
            {/* <Route path="/new/atelier" exact component={Atelier} /> */}
            {/* <Route path="/new/ueberuns" exact component={About} /> */}
            <Route path="/new/kontakt" exact component={Kontakt} />
            <Route path="/new/datenschutz" exact component={Datenschutz} />
            {/* <Route path="/new/impressum" exact component={Impressum} /> */}
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </div>

        <footer>
          <a href="/new/kontakt">Kontakt</a>
          <a href="/new/impressum">Impressum</a>
          <a href="/new/datenschutz">Datenschutz</a>
          <a className="footer-copyright" href="https://www.deutges.com">© 2020 created by Felicitas Deutges</a>
        </footer>
      </React.Fragment>
    )
  }
}