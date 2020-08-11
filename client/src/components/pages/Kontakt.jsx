import React, { Component } from 'react';
// import { api } from 'cloudinary/lib/cloudinary';
import api from '../../api';
import { withStyles } from '@material-ui/core/styles';
import {Dialog, Slide, DialogContent, DialogActions, Button, DialogTitle} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});
//test

class Kontakt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:"",
      email:"",
      subject:"",
      message:"",
      success:false,
      error:false,
      errorMessage:null,
      loading:false
    }
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
        this.setState({success:true,errorMessage:"Success",loading:false})
      })
      .catch(err=>{console.log(err)
        this.setState({error:true,loading:false})})
    }
    else {
      alert("Bitte alle Felder ausfüllen!")
    }
  }
  renderLoadingPopup=()=>{
    return (
      <Dialog open={this.state.loading} TransitionComponent={Transition} style={{display:"flex",justifyContent:"center"}}>
        <DialogTitle><h5 className="card-title">Loading...</h5></DialogTitle>
        <CircularProgress className={this.props.classes.progress} color="secondary" />
    </Dialog>
    )
  }
  cancel=()=>{
      this.setState({success:false,
        error:false,
        errorMessage:null})
  }
  renderSuccessPopup=()=>{
    return(
    <Dialog open={this.state.success} TransitionComponent={Transition}>
        <DialogTitle><h5 className="card-title">Vielen Dank!</h5></DialogTitle>
        <DialogContent>
          {/* <DialogContentText> */}
            <p>Wir haben Ihre Anfrage erhalten und setzen uns möglichst bald mit Ihnen in Verbindung!!</p>
          {/* </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <a className="btnHref" href="/">Zurück</a>  
        </DialogActions> 
    </Dialog>)
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
          <Button className="btnHref" onClick={this.cancel}>Zurück</Button>
        </DialogActions>  
    </Dialog>)
  }
  render() {                
    return (
      <React.Fragment>
        <div className="page-title">
          <h1 className="page-title">Kontakt</h1>
        </div>
          <section className="card-container">

            <div className="card" style={{width: "30rem"}}>
              <img src="../images/icon.png" alt="Elvira's Nähspass" className="card-img-top" />
              <div className="card-body">
                Elvira Deutges<br/>
                Entenpfad 22<br/>
                41334 Nettetal<br/>
                Telefon: 02157/3029432<br/>
                Handy: 0152/53859794<br/>
                Email: elvirasnaehspass@gmail.com
              </div>
            </div>
            <div className="card" style={{width: "30rem"}}>

              <div className="card-body">
                <h1>Kontaktformular:</h1>
                <br/>
                {/* {this.state.errorMessage!==null && <div className="error-message">{ this.state.errorMessage }</div>} */}
                  <input type="text" name="name" id="name" placeholder="Name*" size="30" value={this.state.name} onChange={(e)=>this.onChange(e)}/><br/>
                  <input type="text" name="email" id="email" placeholder="Email*" size="30" value={this.state.email} onChange={(e)=>this.onChange(e)}/><br/>
                  <input type="text" name="subject" id="subject" placeholder="Betreff" size="30" value={this.state.subject} onChange={(e)=>this.onChange(e)}/><br/>
                  <textarea rows="4" cols="29" type="text" name="message" id="message" placeholder="Nachricht" size="30" value={this.state.message} onChange={(e)=>this.onChange(e)}/><br/>
                  <br/>
                  <button className="btnAll btn1 anmelden" onClick={this.submitContact}>Senden</button>
              </div>
            </div>
          </section>
          {this.renderErrorPopup()}
          {this.renderSuccessPopup()}
          {this.renderLoadingPopup()}
        </React.Fragment>
    );
  }
}

export default withStyles(styles)(Kontakt);