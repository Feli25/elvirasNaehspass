import React, { Component } from 'react';

export default class AnmeldungWorkshop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:"",
      email:"",
      phone:"",
      adress:"",
      message:"",
      choice:"",
      errorMessage:null
    }
  }
  onChange=(event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  submitAnmeldung=()=>{
    console.log("todo")
  }
  render() {                
    return (
      <React.Fragment>
        <div class="page-title">
          <h1 class="page-title">Anmeldung - Workshop</h1>
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
                <input type="text" name="adress" id="adress" value={this.state.address} onChange={this.onChange}/>
                
                <br/><br/>

                {/*  <label for="workshop">Gewünschter Workshop <font color="red" size="5px">*</font></label>
                  <select name="workshop" id="workshop">
                    {{#each workshops}}
                    <option value="{{this._id}}">{{this.name}}</option>
                    {{/each}}
                  </select> */}
                <br/><br/>

                <label for="message">Weitere Mitteilung</label>
                <input type="text" name="message" id="message" value={this.state.message} onChange={this.onChange}/>

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
      </React.Fragment>
    );
  }
}
