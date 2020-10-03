import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// import api from '../api';
// import CountDownClock from './CountDownClock';

// import './index.scss';
import '../styles/variables.scss'
import '../styles/card.scss';
import '../styles/slider.scss';
import '../styles/modal.scss';
import '../styles/layout.scss';
import '../styles/home.scss';
import '../styles/news.scss';
import '../styles/kontakt.scss';


import Home from './pagesNew/Home'
import News from './pagesNew/News'
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
              <a href="/naehkurse">Nähkurse</a>
              {/* <a href="/anmeldung">Anmeldung</a> */}
              <a href="/atelier">Atelier</a>
              <a href="/ueberuns">Über uns</a>
              {/* <a>Galerie</a> */}
              <a href="/kontakt">Kontakt</a>
            </div>
          </div>
        </section>
        
        <div className="content">
          <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/news" exact component={News} />
            {/* <Route path="/naehkurse" exact component={Naehkurse} /> */}
            {/* <Route path="/atelier" exact component={Atelier} /> */}
            <Route path="/ueberuns" exact component={About} />
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




        {/* <section id="header-container"> */}
          {/* {!api.isLoggedIn() &&
          <a className="login-logout" href="/login">Login</a>
          }
          {api.isLoggedIn() &&
          <a className="login-logout" href="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</a>
          }
          <div id="header">


            <img id="icon" alt="icon" src="../images/icon.png"/>
            <div id="title-container">
              <img id="icon2" alt="icon" src="../images/icon.png"/>
              <h1 id="header-title">Elvira's Nähspass</h1>
            </div>
            </div>
            <div>
            <nav className="navbar navbar-expand-md navbar-light bg-light">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <a className="nav-style" href="/">Home <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-style" href="/naehkurse">Nähkurse</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-style" href="/atelier">Das Atelier</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-style" href="/about">Über uns</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-style" href="/galerie">Galerie</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-style" href="/anmeldung">Anmeldung</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-style" href="/kontakt">Kontakt</a>
                  </li>
                  {!api.isLoggedIn() &&
                  <li className="nav-item" id="login-nav">
                    <a className="nav-style" href="/login">Login</a>
                  </li>
                  }
                  {api.isLoggedIn() &&
                  <li className="nav-item" id="logout-nav">
                    <a className="nav-item" href="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</a>
                  </li>
                  }
                  {api.isLoggedIn() &&
                  <li className="nav-item">
                    <a className="nav-style" href="/admin">Admin Page</a>
                  </li>
                  }
                </ul>
              </div>
            </nav>
            </div>
            <div id="border-container"></div>
          </section>

        <Switch>



          <Route path="/" exact component={Home} />
          <Route path="/posts"  component={Posts} />
          <Route path="/naehkurse" exact component={Naehkurse} />
          <Route path="/naehkurse/workshop" component={Workshops} />
          <Route path="/naehkurse/kurse" component={Kurse} />
          <Route path="/naehkurse/dessous" component={Dessous} />
          <Route path="/atelier"  component={Atelier} />
          <Route path="/about"  component={About} />
          <Route path="/galerie"  component={Galerie} />
          <Route path="/anmeldung" exact component={Anmeldung} />
          <Route path="/anmeldung/kurse" component={AnmeldungKurs} />
          <Route path="/anmeldung/workshop" component={AnmeldungWorkshop} />
          <Route path="/kontakt"  component={Kontakt} />
          <Route path="/impressum"  component={Impressum} />
          <Route path="/datenschutz"  component={Datenschutz} />

          <Route path="/login" component={Login} />

          <Route path="/admin" exact component={Admin} />
          <Route path="/admin/posts" component={EditPosts} />
          <Route path="/admin/kurse" component={EditKurse} />
          <Route path="/admin/workshops" component={EditWorkshops} />
          <Route path="/admin/dessous" component={EditDessous} />
          <Route path="/admin/atelier" component={EditAtelier} />
          <Route path="/admin/galerie" component={EditGalerie} />

          <Route path="/countdown" component={CountDownClock}/>


          {/* <Route path="/signup" component={Signup} /> */}
          {/* <Route render={() => <h2>404</h2>} />
        </Switch>
        <br/><br/>
        <footer className="navbar fixed-bottom" style={{backgroundColor: "white"}}>
          <span>
            <a className="navbar-brand" href="/kontakt">Kontakt</a>
            <a className="navbar-brand" href="/impressum">Impressum</a>
            <a className="navbar-brand" href="/datenschutz">Datenschutz</a>
          </span>
          <p>© created by Emina and Feli</p>
        </footer> */}
      </div>
    );
  }
}