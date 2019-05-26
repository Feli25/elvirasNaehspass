import React, { Component } from 'react';
import api from '../../api';
import { withStyles } from '@material-ui/core/styles';
import {FormControl,InputLabel,Select,MenuItem,OutlinedInput} from '@material-ui/core'
import {Dialog, Slide, DialogContentText, DialogContent, DialogActions, Button, DialogTitle, TextField} from '@material-ui/core'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
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
      success:false
    }
  }
  componentDidMount=()=>{
    var specialInfo = process.env.REACT_APP_API_URL ? "5cea38ad0990e07b27e88019": "5cea38bb84c7e20021f3b247"
    api.getInfoById(specialInfo)
      .then(result=>{
        console.log(result)
        var choices = []
        result.list.filter(obj=>{
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
    console.log(this.state.courses)
    var choices =[]
    choices.push(
      <option value="none">None</option>
    )        
    this.state.courses.forEach(course=>{
      choices.push(
        <option value={course}>{course}</option>
      )
    })    
    return (
      <React.Fragment>
        <div class="page-title">
          <h1 class="page-title">Anmeldung - Kurs</h1>
        </div>
        <p>
          <div class="button-container">
            <p style={{fontSize:"20px"}}><strong>Die nächste Anmeldung findet am 17.3.2019 um 11 Uhr statt!!</strong></p>
          </div>
          <section class="card-container">
          <div class="card anmeldung-card">
            <div class="card-body">
              <h1 class="card-title">Anmeldung für einen Kurs</h1>
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

                <input type="checkbox" value={this.state.sharing} name="sharingBox" onClick={this.onCheckBoxChange}/> Ich teile mir den Kurs mit:
                {this.state.sharing && <React.Fragment>
                <br/>
                <label for="shareName">Name <font color="red" size="5px">*</font></label>
                <input type="text" name="shareName" id="shareName" value={this.state.shareName} onChange={this.onChange}/>
                <br/>
                <label for="shareEmail">E-mail <font color="red" size="5px">*</font></label>
                <input type="text" name="shareEmail" id="shareEmail" value={this.state.shareEmail} onChange={this.onChange}/>
                </React.Fragment>}
                <br/><br/>

                <label for="choice1">Erste Wahl <font color="red" size="5px">*</font></label>
                <select name="choice1" id="choice1" onChange={this.onChange}>
                  {choices}
                </select>
                <br/>
                <label for="choice2">Zweite Wahl (optional)</label>
                <select name="choice2" id="choice2" onChange={this.onChange}>
                  {choices}
                </select>
                <br/>
                <label for="choice3">Dritte Wahl (optional)</label>
                <select name="choice3" id="choice3" onChange={this.onChange}>
                  {choices}
                </select>
                {/* {this.createSelect(choices,"Erste Wahl",this.state.choice1,this.onChange,)} */}

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
              <img src="https://static.wixstatic.com/media/591c392b8ecd50d325e1041d0411bc94.jpg/v1/fill/w_166,h_164,al_c,q_80,usm_0.66_1.00_0.01/591c392b8ecd50d325e1041d0411bc94.webp"
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

// export default withStyles(styles)(AnmeldungKurs);