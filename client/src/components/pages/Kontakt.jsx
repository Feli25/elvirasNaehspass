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
    loading:false,
    warningMessage:null,
  }
  onChange=(event)=>{
    this.setState({
      [event.target.name]: event.target.value,
    })
    if(this.state.warningMessage && this.state.warningMessage.type===event.target.name) {
      this.setState({warningMessage:null})
    }
  }
  submitContact=()=>{
    if(this.state.name!==""
    &&this.state.email!==""
    &&this.state.message!==""
    &&this.state.subject!==""){
      this.setState({loading:true})
      api.sendKontakt(this.state)
      .then(response=>{
        if(response.success === false && response.error === "reply_to.email") this.setState({success:false, error:false, loading: false, warningMessage:{type:"email", text:"Bitte eine korrekte Email angeben"}})
        else this.setState({success:true,loading:false})
      })
      .catch(err=>{
        console.log(err)
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
            button = {this.state.success ? "Zurück" : null}
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
        <img className="mail-img" alt="mail" src="https://res.cloudinary.com/mcfrihfd/image/upload/v1601927335/project2React/kontaktsignup/mail.jpg"/>
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
            {this.state.warningMessage && this.state.warningMessage.text && <p className="info-block__text warning">{this.state.warningMessage.text}</p>}
            <p className="info-block__content">
              <input type="text" name="name" id="name" placeholder="Name*" size="30" value={this.state.name} onChange={(e)=>this.onChange(e)}/>
              <input type="text" name="email" id="email" placeholder="Email*" size="30" value={this.state.email} onChange={(e)=>this.onChange(e)}/>
              <input type="text" name="subject" id="subject" placeholder="Betreff" size="30" value={this.state.subject} onChange={(e)=>this.onChange(e)}/>
              <textarea rows="4" cols="29" type="text" name="message" id="message" placeholder="Nachricht" size="30" value={this.state.message} onChange={(e)=>this.onChange(e)}/>
              
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