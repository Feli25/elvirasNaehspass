import React, { Component } from 'react';

export default class AnmeldungKurs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:"",
      email:"",
      phone:"",
      adress:"",
      message:"",
      sharing:false,
      shareName:"",
      shareEmail:"",
      // sharePhone:"",
      // shareAdress:"",
      choice1:"",
      choice2:"",
      choice3:"",
      errorMessage:null
    }
  }
  onChange=(event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  onCheckBoxChange=()=>{
    this.setState({sharing:!this.state.sharing})
  }
  submitAnmeldung=()=>{
    console.log("todo")
  }
  render() {                
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
                <input type="text" name="adress" id="adress" value={this.state.address} onChange={this.onChange}/>
                
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
                {/* <br/><br/>
                <label for="choice1">Erste Wahl <font color="red" size="5px">*</font></label>
                <select name="choice1" id="choice1">
                  {{#each courses}}
                  <option value="{{this._id}}">{{this.name}}</option>
                  {{/each}}
                </select>
                <br/>
                <label for="choice2">Zweite Wahl (optional)</label>
                <select name="choice2" id="choice2">
                  <option value="">Keine</option>
                  {{#each courses}}
                  <option value="{{this._id}}">{{this.name}}</option>
                  {{/each}}
                </select>
                <br/>
                <label for="choice3">Dritte Wahl (optional)</label>
                <select name="choice3" id="choice3">
                  <option value="">Keine</option>
                  {{#each courses}}
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
              <img src="https://static.wixstatic.com/media/591c392b8ecd50d325e1041d0411bc94.jpg/v1/fill/w_166,h_164,al_c,q_80,usm_0.66_1.00_0.01/591c392b8ecd50d325e1041d0411bc94.webp"
                alt="Nähkurs" class="card-img-top"/>
            </div>
          </div>
          </section>
        </p>
      </React.Fragment>
    );
  }
}
