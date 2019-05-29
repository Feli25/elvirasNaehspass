import React, { Component } from 'react';
import api from '../../../api';

var possNames = ["Donald Duck", "Daisy Duck", "Mickey Mouse", "Minnie Mouse", "Goofy", "Pluto"]
var possEmails = ["donald.duck@entenhausen.com", "daisy.duck@entenhausen.com", "mickey.mouse@entenhausen.com", "minnie.mouse@entenhausen.com", "goofy@entenhausen.com", "pluto@entenhausen.com"]
var possPhone = ["96727/*donald*", "96727/*daisy*", "96727/*mickey*", "96727/*minnie*", "96727/*goofy*", "96727/*pluto*"]
var possAdress = ["Ulmengasse 321, Entenhausen", "Zypressenweg 5, Entenhausen", "Zwiebelweg 12, Entenhausen", "Geranienweg 15, Entenhausen", "Lindenstraße 8, Entenhausen", "Zwiebelweg 12, Entenhausen"]


export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      message: null,
      random:[]
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  componentDidMount=()=>{
    this.findRandomPlaceholder(9)
  }
  findRandomPlaceholder = ()=>{
    var index = Math.floor(Math.random() * possNames.length)
    this.setState({random:[possNames[index], possEmails[index], possPhone[index], possAdress[index]]}) 
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick(e) {
    e.preventDefault()
    api.login(this.state.username, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/") // Redirect to the home page
      })
      .catch(err => this.setState({ message: "Incorrect" }))
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-title">
          <h1 className="page-title">Login</h1>
        </div>
        <section className="card-container">
            <div className="card" style={{width: "45rem"}}>
              <div className="card-body">
                <form id="form-container">
                  <label for="username">Name</label><br/>
                  <input id="username" type="text" name="username" placeholder={this.state.random[0]} style={{width: "250px"}} onChange={this.handleInputChange}/>

                  <br/><br/>

                  <label for="password">Passwort</label><br/>
                  <input id="password" type="password" name="password" placeholder={this.state.random[0]+"'s Passwort"} style={{width: "250px"}} onChange={this.handleInputChange}/>
                  <br/>
                  {this.state.message &&
                  <div className="error-message">{ this.state.message }</div>
                  }
                  <br/><br/>

                  <button className="btnAll btn2" onClick={(e) => this.handleClick(e)}>Einloggen</button>
                  <br/>
                </form>
              </div>
            </div>
        </section>
      </React.Fragment>
    );
  }
}
