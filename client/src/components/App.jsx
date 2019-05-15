import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Posts from './pages/Posts';
import Naehkurse from './pages/Naehkurse';
import Workshops from './pages/Workshops';
import Kurse from './pages/Kurse';
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
import EditAtelier from './pages/admin/EditAtelier';
import EditGalerie from './pages/admin/EditGalerie';

import Signup from './pages/auth/Signup';

import api from '../api';
import logo from '../logo.svg';

export default class App extends Component {

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <header className="header-container">
          <meta name="description" content='Willkommen bei Elviras Nähspass, Nähkurse und Workshops für jedermann. Haben sie schon immer mal davon geträumt, mal einen Rock, eine Hose oder eine Jacke nähen zu können und stolz zu sagen: "Hab ich selbst genäht!". Dann sind sie bei uns richtig.' />
          <title>Elvira's Nähspass</title>
          <link rel="icon" type="image/png" href="../images/icon2.png" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
          <link rel="stylesheet" href="/stylesheets/style.css" />
          <link href="https://fonts.googleapis.com/css?family=Alegreya|Open+Sans" rel="stylesheet"/>
          <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"/>
          <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
          <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        </header>
        <body>
        <section id="header-container">
          {!api.isLoggedIn() &&
          <a class="login-logout" href="/login">Login</a>
          }
          {api.isLoggedIn() &&
          <a class="login-logout" href="/auth/logout">Logout</a>
          }
          <div id="header">


            <img id="icon" alt="icon" src="../images/icon.png"/>
            <div id="title-container">
              <img id="icon2" alt="icon" src="../images/icon.png"/>
              <h1 id="header-title">Elvira's Nähspass</h1>
            </div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item active">
                    <a class="nav-style" href="/">Home <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-style" href="/naehkurse">Nähkurse</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-style" href="/atelier">Das Atelier</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-style" href="/about">Über uns</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-style" href="/galerie">Galerie</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-style" href="/anmeldung">Anmeldung</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-style" href="/kontakt">Kontakt</a>
                  </li>
                  {!api.isLoggedIn() &&
                  <li class="nav-item" id="login-nav">
                    <a class="nav-style" href="/login">Login</a>
                  </li>
                  }
                  {api.isLoggedIn() &&
                  <li class="nav-item" id="logout-nav">
                    <a class="nav-style" href="/logout">Logout</a>
                  </li>
                  }
                  {api.isLoggedIn() &&
                  <li class="nav-item">
                    <a class="nav-style" href="/admin">Admin Page</a>
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
        </body>
        <footer className="navbar fixed-bottom" style={{backgroundColor: "white"}}>
          <a className="navbar-brand" href="/contact">Kontakt</a>
          <p>© created by Emina and Feli</p>
        </footer>
      </div>
    );
  }
}