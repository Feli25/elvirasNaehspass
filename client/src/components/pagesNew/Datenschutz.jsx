import React, { Component } from 'react';

export default class Datenschutz extends Component {
  state={
    posts: []
  }
  render () {
    return (
      <div className="datenschutz">
        <h2 className="title">Datenschutz</h2>

        <div className="info-block">
          <h3 className="info-block__header">Unsere Datenschutzerklärung</h3>
          <p className="info-block__text"></p>
        </div>
      </div>
    )
  }
}