import React, { Component } from 'react';
import api from '../../api';
import {Dialog,  DialogContent, DialogActions, DialogTitle,Slide,Button} from '@material-ui/core'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
      success:false,
      error:false
    }
  }
  componentDidMount=()=>{
    api.getInfo("workshops")
      .then(kurse=>{
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
          this.setState({success:true})
        })
        .catch(err=>{console.log(err)
            this.setState({error:true})})
    } else {
      alert("Bitte alle Pflichfelder ausfüllen")
    }
  }
  renderSuccessPopup=()=>{
    return (
      <Dialog open={this.state.success} TransitionComponent={Transition}>
        <DialogTitle>Vielen Dank!</DialogTitle>
        <DialogContent>
          <p>Ihre Anmeldung ist erfolgreich eingegangen, vielen Dank dafür! Wir werden uns bald bei Ihnen melden.</p>
        </DialogContent>
        <DialogActions>
          <a className="btnHref" href="/">Zurück</a>
        </DialogActions>
      </Dialog>
    )
  }
  renderErrorPopup=()=>{
    return(
    <Dialog open={this.state.error} TransitionComponent={Transition}>
        <DialogTitle><h5 className="card-title">Ohje!</h5></DialogTitle>
        <DialogContent>
          {/* <DialogContentText> */}
            <p>Da ist wohl was schief gelaufen! Überprüfen Sie doch bitte Ihre Internetverbindung und probieren es später nochmal.<br/>
            Sollte es trotzdem nicht gehen kontaktieren Sie uns doch bitte direkt.</p>
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button className="btnHref" onCLick={this.cancel}>Zurück</Button>
        </DialogActions>  
    </Dialog>)
  }
  cancel=()=>{
    this.setState({
      errorMessage:null,
      success:false,
      error:false
    })
  }
  render() {    
    var choices =[]
    choices.push(
      <option value="none" key="none">None</option>
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
        <option key={course.header} value={course.header}>{course.header}</option>
      )
    })              
    return (
      <React.Fragment>
        <div className="page-title">
          <h1 className="page-title">Anmeldung - Workshop</h1>
        </div>
          <section className="card-container">
          <div className="card anmeldung-card">
            <div className="card-body">
              <h1 className="card-title">Anmeldung für einen Workshop</h1>
              <br/>

                <label >Name <font color="red" size="5px">*</font></label>
                <input type="text" name="name" id="name" value={this.state.name} onChange={this.onChange}/>

                <br/><br/>

                <label >E-mail <font color="red" size="5px">*</font></label>
                <input type="text" name="email" id="email"  value={this.state.email} onChange={this.onChange}/>

                <br/><br/>

                <label >Telefonnummer <font color="red" size="5px">*</font></label>
                <input type="text" name="phone" id="phone" value={this.state.phone} onChange={this.onChange}/>

                <br/><br/>

                <label >Adresse</label>
                <textarea type="text" name="adress" id="adress" value={this.state.address} onChange={this.onChange} className="adressSignup"/>
                
                <br/><br/>

                 <label >Gewünschter Workshop <font color="red" size="5px">*</font></label>
                  <select name="choice" id="workshop" onChange={this.onChange}>
                    {choices}
                  </select>
                <br/><br/>

                <label >Weitere Mitteilung</label>
                <textarea type="text" name="message" id="message" value={this.state.message} onChange={this.onChange} className="textareSignup"/>

                <br/><br/>
                {this.state.errorMessage!==null && 
                <div className="error-message">{ this.state.errorMessage }</div>}

                <button className="btnAll btn1 anmelden" onClick={this.submitAnmeldung}>Anmelden</button>
                <br/>
            </div>
          </div>
          <div className="card" style={{width: "20rem"}}>
          <div className="card-body">
            <img src="https://static.wixstatic.com/media/4da4ea_1c862f13c53e049ac73a024c6ee7dd6a.jpg/v1/fill/w_167,h_141,al_c,q_80,usm_0.66_1.00_0.01/4da4ea_1c862f13c53e049ac73a024c6ee7dd6a.webp"
              alt="Nähkurs" className="card-img-top"/>
          </div>
          </div>
          </section>
        {this.renderSuccessPopup()}
        {this.renderErrorPopup()}
      </React.Fragment>
    );
  }
}
