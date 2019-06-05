import React, { Component } from 'react';
import api from '../../api';
import {FormControl,InputLabel,Select,OutlinedInput} from '@material-ui/core'
import {Dialog, DialogContent, DialogActions,  DialogTitle,Slide,Button} from '@material-ui/core'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class AnmeldungKurs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courses:[],

      name:"",
      email:"",
      phone:"",
      adress:"",
      message:"",

      sharing:false,
      shareName:"",
      shareEmail:"",

      choice1:"none",
      choice2:"none",
      choice3:"none",

      errorMessage:null,
      success:false,
      error:false
    }
  }
  componentDidMount=()=>{
    // var specialInfo = process.env.REACT_APP_API_URL ? "5cea38ad0990e07b27e88019": "5cea38bb84c7e20021f3b247"
    api.getInfo("table")
        // api.getInfoById(specialInfo)
      .then(result=>{
        var choices = []
        result[0].list.filter(obj=>{
          return obj.belegt===false
        }).forEach(obj=>{
          if(obj.name!==""){
            var array = obj.name.split("$")
            choices.push(array[0])
          }
        })
        this.setState({courses:choices})
      })
      .catch(err=>console.log(err))
  }
  onChange=(event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  onCheckBoxChange=()=>{
    this.setState({sharing:!this.state.sharing})
  }
  createSelect=(choices,name,value,stateName,change)=>{
    return (
      <FormControl variant="outlined" className={this.props.classes.formControl}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-simple"
          >
            {name}
          </InputLabel>
          <Select
            value={value}
            onChange={change}
            name={stateName}
            input={
              <OutlinedInput
                labelWidth={0}
                name="age"
                id="outlined-age-simple"
              />
            }
          >
          {choices}
          </Select>
      </FormControl>
    )
  }
  submitAnmeldung=()=>{
    if(this.state.name!==""
    && this.state.email!=="" 
    && this.state.phone!==""
    && this.state.choice1!=="none"
    && (this.state.sharing===false || (this.state.sharing && this.state.shareName!=="" && this.state.shareEmail!==""))
    ) {
      api.sendAnmeldung(this.state,"kurs")
        .then(response=>{
          console.log(response)
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
      <Dialog open={this.state.success}>
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
    this.state.courses.forEach(course=>{
      choices.push(
        <option key={course} value={course}>{course}</option>
      )
    })    
    return (
      <React.Fragment>
        <div className="page-title">
          <h1 className="page-title">Anmeldung - Kurs</h1>
        </div>
        <div>
          <div className="button-container">
            <span style={{fontSize:"20px"}}><strong>Die nächste Anmeldung findet am 17.3.2019 um 11 Uhr statt!!</strong></span>
          </div>
          <section className="card-container">
          <div className="card anmeldung-card">
            <div className="card-body">
              <h1 className="card-title">Anmeldung für einen Kurs</h1>
              <br/>

                <label>Name <font color="red" size="5px">*</font></label>
                <input type="text" name="name" id="name" value={this.state.name} onChange={this.onChange}/>

                <br/><br/>

                <label>E-mail <font color="red" size="5px">*</font></label>
                <input type="text" name="email" id="email"  value={this.state.email} onChange={this.onChange}/>

                <br/><br/>

                <label>Telefonnummer <font color="red" size="5px">*</font></label>
                <input type="text" name="phone" id="phone" value={this.state.phone} onChange={this.onChange}/>

                <br/><br/>

                <label>Adresse</label>
                <textarea type="text" name="adress" id="adress" value={this.state.address} onChange={this.onChange} className="adressSignup"/>
                
                <br/><br/>

                <label>Erste Wahl <font color="red" size="5px">*</font></label>
                <select name="choice1" id="choice1" onChange={this.onChange}>
                  {choices}
                </select>
                <br/>
                <label >Zweite Wahl (optional)</label>
                <select name="choice2" id="choice2" onChange={this.onChange}>
                  {choices}
                </select>
                <br/>
                <label>Dritte Wahl (optional)</label>
                <select name="choice3" id="choice3" onChange={this.onChange}>
                  {choices}
                </select>
                {/* {this.createSelect(choices,"Erste Wahl",this.state.choice1,this.onChange,)} */}

                <br/><br/>

                <input type="checkbox" value={this.state.sharing} name="sharingBox" onClick={this.onCheckBoxChange}/> Ich teile mir den Kurs mit:
                {this.state.sharing && <React.Fragment>
                <br/>
                <label>Name <font color="red" size="5px">*</font></label>
                <input type="text" name="shareName" id="shareName" value={this.state.shareName} onChange={this.onChange}/>
                <br/>
                <label>E-mail <font color="red" size="5px">*</font></label>
                <input type="text" name="shareEmail" id="shareEmail" value={this.state.shareEmail} onChange={this.onChange}/>
                </React.Fragment>}
                <br/><br/>

                <label>Weitere Mitteilung</label>
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
            <img src="./../../images/IMG_6010.JPG"
              alt="Nähkurs" className="card-img-top"/>
            </div>
          </div>
          </section>
        </div>
        {this.renderSuccessPopup()}
        {this.renderErrorPopup()}
      </React.Fragment>
    );
  }
}
