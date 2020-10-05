import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import '../styles/variables.scss'
import '../styles/card.scss';
import '../styles/slider.scss';
import '../styles/modal.scss';
import '../styles/layout.scss';

import '../styles/home.scss';
import '../styles/news.scss';
import '../styles/naehkurse.scss';
import '../styles/atelier.scss';
import '../styles/about.scss';
import '../styles/kontakt.scss';


import Home from './pagesNew/Home'
import News from './pagesNew/News'
import Naehkurse from './pagesNew/Naehkurse'
import Anmeldung from './pagesNew/Anmeldung'
import Atelier from './pagesNew/Atelier'
import About from './pagesNew/About'
import Kontakt from './pagesNew/Kontakt'
import Datenschutz from './pagesNew/Datenschutz';
import Impressum from './pagesNew/Impressum';

import Error from './pagesNew/Error';

export default class App extends Component {

  state = {
    navOpen: false
  }

  // handleLogoutClick(e) {
  //   api.logout()
  // }

  render() {
    return (
      <div className="App">
        

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
              <a href="/">Home</a>
              <a href="/news">Neuigkeiten</a>
              <a href="/naehkurse">Nähkurse & Workshops</a>
              <a href="/anmeldung">Anmeldung</a>
              <a href="/atelier">Atelier</a>
              <a href="/about">Über uns</a>
              <a href="/kontakt">Kontakt</a>
            </div>
          </div>
        </section>
        
        <div className="content">
          <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/news" exact component={News} />
            <Route path="/naehkurse" exact component={Naehkurse} />
            <Route path="/anmeldung" exact component={Anmeldung} />
            <Route path="/atelier" exact component={Atelier} />
            <Route path="/about" exact component={About} />
            <Route path="/kontakt" exact component={Kontakt} />
            <Route path="/datenschutz" exact component={Datenschutz} />
            <Route path="/impressum" exact component={Impressum} />
            <Route component={Error} />
          </Switch>
        </div>

        <footer>
          <a href="/kontakt">Kontakt</a>
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
          <a className="footer-copyright" href="https://www.deutges.com">© 2020 created by Felicitas Deutges</a>
        </footer>




      </div>
    );
  }
}