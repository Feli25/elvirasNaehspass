import React, { Component } from 'react';

export default class Error extends Component {
  render () {
    return (
      <div className="error">
        <h2 className="title">404 - Fehler</h2>
        <p>Ups! Diese Seite scheint nicht zu existieren</p>
      </div> 
    )
  }
}