import React, { Component } from 'react';
import api from '../../api';
import {Dialog, Slide, DialogContentText, DialogContent, DialogActions, Button, DialogTitle, TextField} from '@material-ui/core'

export default class AnmeldungWorkshop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courses:[],
      name:"",
      email:"",
      phone:"",
      adress:"",
      message:"",
      choice:"none",
      errorMessage:null,
      success:false
    }
  }
  componentDidMount=()=>{
    api.getInfo("workshops")
      .then(kurse=>{
        console.log(kurse)
        this.setState({courses:kurse})
      })
      .catch(err=>console.log(err))
  }
  onChange=(event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  submitAnmeldung=()=>{
    if(this.state.name!==""
    && this.state.email!=="" 
    && this.state.phone!==""
    && this.state.choice!=="none"
    ) {
      api.sendAnmeldung(this.state,"workshop")
        .then(response=>{
          console.log(response)
          this.setState({success:true})
        })
        .catch(err=>{console.log(err)
          alert("Es ist etwas schief gelaufen, bitte versuchen Sie es später nochmal oder kontaktieren uns.")})
    } else {
      alert("Bitte alle Pflichfelder ausfüllen")
    }
  }
  renderSuccessPopup=()=>{
    return (
      <Dialog open={this.state.success}>
        <DialogTitle>Vielen Dank!</DialogTitle>
        <DialogContent>
          <p>Ihre Anmeldung ist erfolgreich eingegangen, vielen Dank dafür! Wir werden uns bald bei Ihnen melden.</p>
        </DialogContent>
        <DialogActions>
          <a class="btnHref" href="/">Zurück</a>
        </DialogActions>
      </Dialog>
    )
  }
  render() {    
    var choices =[]
    choices.push(
      <option value="none">None</option>
    )        
    this.state.courses.filter(course=>{
      var ret = true
      course.list.forEach(elem=>{
          if(elem.belegt){
            ret = false
          }
        }
      )
      return ret
    }).forEach(course=>{
      choices.push(
        <option value={course.header}>{course.header}</option>
      )
    })              
    return (
      <React.Fragment>
        <div class="page-title">
          <h1 class="page-title">Anmeldung - Workshop</h1>
        </div>
        <p>
          <section class="card-container">
          <div class="card anmeldung-card">
            <div class="card-body">
              <h1 class="card-title">Anmeldung für einen Workshop</h1>
              <br/>

                <label for="name">Name <font color="red" size="5px">*</font></label>
                <input type="text" name="name" id="name" value={this.state.name} onChange={this.onChange}/>

                <br/><br/>

                <label for="email">E-mail <font color="red" size="5px">*</font></label>
                <input type="text" name="email" id="email"  value={this.state.email} onChange={this.onChange}/>

                <br/><br/>

                <label for="phone">Telefonnummer <font color="red" size="5px">*</font></label>
                <input type="text" name="phone" id="phone" value={this.state.phone} onChange={this.onChange}/>

                <br/><br/>

                <label for="adress">Adresse</label>
                <textarea type="text" name="adress" id="adress" value={this.state.address} onChange={this.onChange} className="adressSignup"/>
                
                <br/><br/>

                 <label for="workshop">Gewünschter Workshop <font color="red" size="5px">*</font></label>
                  <select name="choice" id="workshop" onChange={this.onChange}>
                    {choices}
                  </select>
                <br/><br/>

                <label for="message">Weitere Mitteilung</label>
                <textarea type="text" name="message" id="message" value={this.state.message} onChange={this.onChange} className="textareSignup"/>

                <br/><br/>
                {this.state.errorMessage!==null && 
                <div class="error-message">{ this.state.errorMessage }</div>}

                <button class="btnAll btn1 anmelden" onClick={this.submitAnmeldung}>Anmelden</button>
                <br/>
            </div>
          </div>
          <div class="card" style={{width: "20rem"}}>
          <div class="card-body">
            <img src="https://static.wixstatic.com/media/4da4ea_1c862f13c53e049ac73a024c6ee7dd6a.jpg/v1/fill/w_167,h_141,al_c,q_80,usm_0.66_1.00_0.01/4da4ea_1c862f13c53e049ac73a024c6ee7dd6a.webp"
              alt="Nähkurs" class="card-img-top"/>
          </div>
          </div>
          </section>
        </p>
        {this.renderSuccessPopup()}
      </React.Fragment>
    );
  }
}
