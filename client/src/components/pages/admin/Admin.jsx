import React, { Component } from 'react';

export default class Home extends Component {
  render() {                
    return (
      <React.Fragment>
        <div className="page-title">
          <h1 className="page-title">Admin</h1>
        </div>

        <section className="card-container">
          <div className="card" style={{width: "30rem"}}>
            <div className="card-body"><br/>
              <a className="btnHref"href="/admin/posts">Posts verwalten</a><br/>
              <a className="btnHref"href="/admin/kurse">Kurse Seite bearbeiten</a><br/>
              <a className="btnHref"href="/admin/workshops">Workshop Seite bearbeiten</a><br/>
              <a className="btnHref"href="/admin/atelier">Ausstattung</a><br/>
              <a className="btnHref"href="/admin/galerie">Galerie</a><br/>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
