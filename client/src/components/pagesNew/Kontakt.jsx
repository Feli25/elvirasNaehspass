import React, { Component } from 'react';
import api from '../../api';
import Card from '../Card';

export default class Kontakt extends Component {
  state = {
    name:"",
    email:"",
    subject:"",
    message:"",
    success:false,
    error:false,
    loading:false
  }
  onChange=(event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  submitContact=()=>{
    this.setState({loading:true})
    if(this.state.name!==""
    &&this.state.email!==""
    &&this.state.message!==""
    &&this.state.subject!==""){
      api.sendKontakt(this.state)
      .then(sth=>{
        this.setState({success:true,loading:false})
      })
      .catch(err=>{console.log(err)
        this.setState({error:true,loading:false})})
    }
    else {
      alert("Bitte alle Felder ausfüllen!")
    }
  }
  cancel=()=>{
    this.setState({success:false,
      error:false})
  }
  renderModal=()=>{
    if(this.state.success || this.state.error) {
      return <div className="modal">
          {this.state.error && <div className="modal__close" onClick={this.cancel}>&#x2715;</div>}
          <Card 
            id = "alert"
            header = {this.state.success? "Vielen Dank!":"Ohje!"}
            text = {this.state.success? "Wir haben Ihre Anfrage erhalten und setzen uns möglichst bald mit Ihnen in Verbindung!!" : "Da ist wohl was schief gelaufen! Überprüfen Sie doch bitte Ihre Internetverbindung und probieren es später nochmal. Sollte es trotzdem nicht gehen kontaktieren Sie uns doch bitte direkt."}
            lineclamp = {false}
            button = "Zurück"
            onbuttonclick = {()=>this.props.history.push('/')}
          />
        </div>
    } else {
      return null
    }
  }
  render () {
    return (
      <div className="kontakt">
        <h2 className="title">Kontakt</h2>
        <img className="mail-img" alt="mail" src="../images/mail.jpg"/>
        <div className="block-wrapper">
          <div className="info-block">
            <h3 className="info-block__header">Unsere Kontaktdaten</h3>
            <p className="info-block__text">
              Elvira Deutges<br/>
              Entenpfad 22<br/>
              41334 Nettetal<br/>
              Telefon: 02157/3029432<br/>
              Handy: 0152/53859794<br/>
              Email: elvirasnaehspass@gmail.com</p>
          </div>

          <div className="info-block">
          <h3 className="info-block__header">Kontaktformular</h3>
          <p className="info-block__content">
            <input type="text" name="name" id="name" placeholder="Name*" size="30" value={this.state.name} onChange={(e)=>this.onChange(e)}/><br/>
            <input type="text" name="email" id="email" placeholder="Email*" size="30" value={this.state.email} onChange={(e)=>this.onChange(e)}/><br/>
            <input type="text" name="subject" id="subject" placeholder="Betreff" size="30" value={this.state.subject} onChange={(e)=>this.onChange(e)}/><br/>
            <textarea rows="4" cols="29" type="text" name="message" id="message" placeholder="Nachricht" size="30" value={this.state.message} onChange={(e)=>this.onChange(e)}/><br/>
            <br/>
            {this.state.loading ? 
            <button className="info-block__button">Lädt...</button>
            : <button className="info-block__button" onClick={this.submitContact}>Senden</button>}
          </p>
        </div>
        </div>
        {this.renderModal()}
      </div>
    )
  }
}