import React, { Component } from 'react';
import api from '../../api';
import StaticContentKurse from './StaticContentKurse';

export default class Kurse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infoBoxes:[]
    }
  }
  componentDidMount(){
    api.getInfo("kurse")
      .then(kurse=>{
        this.setState({infoBoxes:kurse})
      })
      .catch(err=>console.log(err))
  }
  renderFlexibleContent=()=>{
    return (
      <section class="card-container">
      </section>
    )
  }
  render() {                
    return (
      <div className="Home">
        <div class="page-title">
          <h1 class="page-title">Kurse</h1>
        </div>
        <p>
          <br/>
          <div class="button-container">
            <p style={{fontSize:"20px"}}><strong>Die nächste Anmeldung findet am 17.3.2019 um 11 Uhr statt!!</strong></p>
          </div>
          <div class="button-container">
            <a id="class-page-button" class="btnHref" href="/anmeldung/kurse">Buchen</a>
          </div>
            <StaticContentKurse/>
            {/* {this.renderFlexibleContent()} */}
        </p>
      </div>
    );
  }
}