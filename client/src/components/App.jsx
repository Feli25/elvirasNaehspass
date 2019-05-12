import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Posts from './pages/Posts';
import Naehkurse from './pages/Naehkurse';
import Workshops from './pages/Workshops';
import Kurse from './pages/Kurse';
import Atelier from './pages/Home';
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
import EditAtelier from './pages/admin/EditAtelier';
import EditGalerie from './pages/admin/EditGalerie';

import Signup from './pages/auth/Signup';

import api from '../api';
import logo from '../logo.svg';

export default class App extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     countries: []
  //   }
  // }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <header className="header-container">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MERN Boilerplate</h1>
          <NavLink to="/" exact>Home</NavLink>
          <NavLink to="/naehkurse" exact>Nähkurse</NavLink>
          <NavLink to="/atelier">Atelier</NavLink>
          <NavLink to="/about">Über uns</NavLink>
          <NavLink to="/galerie">Galerie</NavLink>
          <NavLink to="/anmeldung" exact>Anmeldung</NavLink>
          <NavLink to="/kontakt">Kontakt</NavLink>

          {!api.isLoggedIn() && <NavLink to="/login" className="login-logout">Login</NavLink>}
          {api.isLoggedIn() && <NavLink to="/admin" exact>Admin Seite</NavLink>}
          {api.isLoggedIn() && <Link to="/" className="login-logout" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}

          {/* {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>} */}
        </header>
        <Switch>



          <Route path="/" exact component={Home} />
          <Route path="/posts"  component={Posts} />
          <Route path="/naehkurse" exact component={Naehkurse} />
          <Route path="/naehkurse/workshop" component={Workshops} />
          <Route path="/naehkurse/kurse" component={Kurse} />
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
          <Route path="/admin/atelier" component={EditAtelier} />
          <Route path="/admin/galerie" component={EditGalerie} />


          <Route path="/signup" component={Signup} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
        <footer className="navbar fixed-bottom" style={{backgroundColor: "white"}}>
          <a className="navbar-brand" href="/contact">Kontakt</a>
          <p>© created by Emina and Feli</p>
        </footer>
      </div>
    );
  }
}