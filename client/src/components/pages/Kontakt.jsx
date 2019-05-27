import React, { Component } from 'react';
// import { api } from 'cloudinary/lib/cloudinary';
import api from '../../api';


export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:"",
      email:"",
      subject:"",
      message:"",
      errorMessage:null
    }
  }
  onChange=(event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  submitContact=()=>{
    api.sendKontakt(this.state)
      .then(sth=>{
        this.setState({errorMessage:"Success"})
      })
      .catch(err=>{console.log(err)})
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
                {this.state.errorMessage!==null && <div className="error-message">{ this.state.errorMessage }</div>}
                  <input type="text" name="name" id="name" placeholder="Name*" size="30" value={this.state.name} onChange={(e)=>this.onChange(e)}/><br/>
                  <input type="text" name="email" id="email" placeholder="Email*" size="30" value={this.state.email} onChange={(e)=>this.onChange(e)}/><br/>
                  <input type="text" name="subject" id="subject" placeholder="Betreff" size="30" value={this.state.subject} onChange={(e)=>this.onChange(e)}/><br/>
                  <textarea rows="4" cols="29" type="text" name="message" id="message" placeholder="Nachricht" size="30" value={this.state.message} onChange={(e)=>this.onChange(e)}/><br/>
                  <br/>
                  <button className="btnAll btn1 anmelden" onClick={this.submitContact}>Senden</button>
              </div>
            </div>
          </section>
      </React.Fragment>
    );
  }
}