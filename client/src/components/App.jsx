import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Posts from './pages/Posts';
import Naehkurse from './pages/Naehkurse';
import Workshops from './pages/Workshops';
import Kurse from './pages/Kurse';
import Dessous from './pages/Dessous';
import Atelier from './pages/Atelier';
import About from './pages/About';
import Galerie from './pages/Galerie';
import Anmeldung from './pages/Anmeldung';
import AnmeldungKurs from './pages/AnmeldungKurs';
import AnmeldungWorkshop from './pages/AnmeldungWorkshop';
import Kontakt from './pages/Kontakt';
import Login from './pages/auth/Login';

import Admin from './pages/admin/Admin';
import EditPosts from './pages/admin/EditPosts';
import EditKurse from './pages/admin/EditKurse';
import EditWorkshops from './pages/admin/EditWorkshops';
import EditDessous from './pages/admin/EditDessous';
import EditAtelier from './pages/admin/EditAtelier';
import EditGalerie from './pages/admin/EditGalerie';

import Signup from './pages/auth/Signup';

import api from '../api';
import CountDownClock from './CountDownClock';

export default class App extends Component {

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <section id="header-container">
          {!api.isLoggedIn() &&
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
          <Route render={() => <h2>404</h2>} />
        </Switch>
        <br/><br/>
        <footer className="navbar fixed-bottom" style={{backgroundColor: "white"}}>
          <a className="navbar-brand" href="/kontakt">Kontakt</a>
          <p>© created by Emina and Feli</p>
        </footer>
      </div>
    );
  }
}