import React, { Component } from 'react';
import api from '../../api';

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
  render() {                
    return (
      <div className="Home">
        <h2>Nähkurse</h2>
        <p>This is a sample project with the MERN stack</p>
      </div>
    );
  }
}