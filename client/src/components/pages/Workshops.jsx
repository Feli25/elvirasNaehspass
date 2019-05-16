import React, { Component } from 'react';
import api from '../../api';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infoBoxes:[]
    }
  }
  componentDidMount(){
    api.getInfo("workshops")
      .then(workshops=>{
        this.setState({infoBoxes:workshops})
      })
      .catch(err=>console.log(err))
  }
  render() {                
    return (
      <div className="Home">
        <h2>Workshops</h2>
        <p>This is a sample project with the MERN stack</p>
      </div>
    );
  }
}