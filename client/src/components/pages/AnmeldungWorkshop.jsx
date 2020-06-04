import React, { Component } from 'react';
import api from '../../api';
import { withStyles } from '@material-ui/core/styles';
import {Dialog,  DialogContent, DialogActions, DialogTitle,Slide,Button} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class AnmeldungWorkshop extends Component {
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
      error:false,
      loading:false
    }
  }
  componentDidMount=()=>{
    api.getInfo("workshops")
      .then(kurse=>{
        api.getInfo("dessous")
          .then(dessous=>{
            this.setState({courses:[...kurse, ...dessous]})
          })
          .catch(err=>console.log(err))
      })
      .catch(err=>console.log(err))
  }
  onChange=(event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  submitAnmeldung=()=>{
    this.setState({loading:true})
    if(this.state.name!==""
    && this.state.email!=="" 
    && this.state.phone!==""
    && this.state.choice!=="none"
    ) {
      console.log(this.state)
      api.sendAnmeldung(this.state,"workshop")
        .then(response=>{
          this.setState({success:true,loading:false})
        })
        .catch(err=>{console.log(err)
            this.setState({error:true, loading:false})})
    } else {
      alert("Bitte alle Pflichfelder ausfüllen")
      this.setState({loading:false})
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
          <Button className="btnHref" onClick={this.cancel}>Zurück</Button>
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
  renderLoadingPopup=()=>{
    return (
      <Dialog open={this.state.loading} TransitionComponent={Transition} style={{display:"flex",justifyContent:"center"}}>
        <DialogTitle><h5 className="card-title">Loading...</h5></DialogTitle>
        <CircularProgress className={this.props.classes.progress} color="secondary" />
    </Dialog>
    )
  }
  render() {    
    console.log(this.state.courses)
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
        <option key={course.header} value={course._id}>{course.header}</option>
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
          <div className="card" style={{width: "30rem"}}>
          <div className="card-body">
            <img src="./../../images/galerie/IMG_6010.JPG"
              alt="Nähkurs" className="card-img-top"/>
          </div>
          </div>
          </section>
        {this.renderSuccessPopup()}
        {this.renderErrorPopup()}
        {this.renderLoadingPopup()}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AnmeldungWorkshop);
