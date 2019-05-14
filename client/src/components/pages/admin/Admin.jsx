import React, { Component } from 'react';

export default class Home extends Component {
  render() {                
    return (
      <React.Fragment>
        <div class="page-title">
          <h1 class="page-title">Admin</h1>
        </div>

        <section class="card-container">
          <div class="card" style={{width: "30rem"}}>
            <div class="card-body"><br/>
              <a class="btnHref"href="/admin/posts">Posts verwalten</a><br/>
              <a class="btnHref"href="/admin/kurse">Kurse Seite bearbeiten</a><br/>
              <a class="btnHref"href="/admin/workshops">Workshop Seite bearbeiten</a><br/>
              <a class="btnHref"href="/admin/atelier">Ausstattung</a><br/>
              <a class="btnHref"href="/admin/galerie">Galerie</a><br/>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
