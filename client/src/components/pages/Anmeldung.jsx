import React, { Component } from 'react'
import naehkurse from '../../data/naehkurse.json'
import Card from '../Card'
import api from '../../api';


export default class Anmeldung extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    choice: "none", //name of the course
    success:false,
    error:false,
    loading:false,
    warningMessage:null,
  }
  createChoices=()=>{
    const choices = [<option value="none" key="none">&#x25BC; Ihre Kurswahl</option>]
    naehkurse.table.list.filter(course=>!course.subheader).forEach((course,index)=>{
      choices.push(<option key={"Kurs"+index} value={course.name}>Kurs: {course.name}</option>)
    })
    naehkurse.workshops.forEach((course,index)=>{
      choices.push(<option key={"WS"+index} value={course.header}>Workshop: {course.header}</option>)
    })
    naehkurse.weekend.forEach((course,index)=>{
      choices.push(<option key={"WE"+index} value={course.header}>Wochenende: {course.header}</option>)
    })
    return choices
  }
  onChange=(event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
    if(this.state.warningMessage && this.state.warningMessage.type===event.target.name) {
      this.setState({warningMessage:null})
    }
  }
  submit=()=>{
    if(this.state.name!==""
    && this.state.email!=="" 
    && this.state.phone!==""
    && this.state.choice!=="none"
    ) {
      this.setState({loading:true})
      api.sendAnmeldung(this.state)
        .then(response=>{
          // console.log(response)
          if(response.success === false && response.error === "reply_to.email") this.setState({success:false, error:false, loading: false, warningMessage:{type:"email", text:"Bitte eine korrekte Email angeben"}})
          else this.setState({success:true, loading:false})
        })
        .catch(err=>{
          console.log(err)
          this.setState({error:true, loading:false})
        })
    } else {
      alert("Bitte alle Pflichfelder ausfüllen")
    }
  }
  renderModal=()=>{
    if(this.state.success || this.state.error) {
      return <div className="modal">
          {this.state.error && <div className="modal__close" onClick={this.cancel}>&#x2715;</div>}
          <Card 
            id = "alert"
            header = {this.state.success? "Vielen Dank!":"Ohje!"}
            text = {this.state.success? "Ihre Anmeldung ist erfolgreich eingegangen, vielen Dank dafür! Wir werden uns bald bei Ihnen melden." : 
            "Da ist wohl was schief gelaufen! Überprüfen Sie doch bitte Ihre Internetverbindung und probieren es später nochmal. Sollte es trotzdem nicht gehen kontaktieren Sie uns doch bitte direkt."}
            lineclamp = {false}
            button = {this.state.success ? "Zurück" : null}
            onbuttonclick = {()=>this.props.history.push('/')}
          />
        </div>
    } else {
      return null
    }
  }
  cancel=()=>{
    this.setState({
      success:false,
      error:false
    })
  }
  render () {
    return (
      <div className="kontakt">
        <h2 className="title">Anmeldung</h2>
        <img className="mail-img" alt="mail" src="https://res.cloudinary.com/mcfrihfd/image/upload/v1601927337/project2React/kontaktsignup/signup.jpg"/>
        <div className="block-wrapper">
          <div className="info-block">
            <h3 className="info-block__header">Anmeldung</h3>
            {this.state.warningMessage && this.state.warningMessage.text && <p className="info-block__text warning">{this.state.warningMessage.text}</p>}
            <p className="info-block__content">
              <input type="text" name="name" id="name" placeholder="Name*" size="30" value={this.state.name} onChange={(e)=>this.onChange(e)}/>
              <input type="text" name="email" id="email" placeholder="Email*" size="30" value={this.state.email} onChange={(e)=>this.onChange(e)}/>
              <input type="text" name="phone" id="phone" placeholder="Telefon*" size="30" value={this.state.phone} onChange={(e)=>this.onChange(e)}/>
              <textarea rows="4" cols="29" type="text" name="address" id="address" placeholder="Adresse" size="30" value={this.state.address} onChange={(e)=>this.onChange(e)}/>
              <select value={this.state.choice} name="choice" onChange={(e)=>this.onChange(e)}>
                {this.createChoices()}
              </select>
              <textarea rows="4" cols="29" type="text" name="message" id="message" placeholder="Weitere Anmerkungen" size="30" value={this.state.message} onChange={(e)=>this.onChange(e)}/>
              
              {this.state.loading ? 
              <button className="info-block__button">Lädt...</button>
              : <button className="info-block__button" onClick={this.submit}>Senden</button>}
            </p>
          </div>
        </div>
        {this.renderModal()}
      </div> 
    )
  }
}