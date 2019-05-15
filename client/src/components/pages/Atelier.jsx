import React, { Component } from 'react';
import api from '../../api';

export default class Atelier extends Component {
  constructor(props) {
    super(props)
    this.state = {
      equipment:[]
    }
  }
  componentDidMount=()=>{
    api.getEquipment()
      .then(equ=>{
        console.log(equ)
        this.setState({equipment:equ})
      })
      .catch(err=>{console.log(err)})
  }
  createEquipmentCards=()=>{
    return this.state.equipment.map(eq=>{
      return(
            <div class="card" style={{width: "30rem"}} key={eq.name}>
            {eq.imgPath && <img src={ eq.imgPath } alt={ eq.imgName } class="card-img-top" />}
              <div class="card-body">
                <h5 class="card-title">{eq.header}</h5>
                <p class="card-text">{eq.content}</p>
              </div>
            </div>
      )
    })
  }
  render() {                
    return (
      <React.Fragment>
        <div class="page-title">
          <h1 class="page-title">Das Atelier</h1>
        </div>
        <div>
          <section class="card-container">
            <div class="card" style={{width: "30rem"}}>
              <div class="card-body">
                <h2>Unsere Ausstattung:</h2>
              </div>
            </div>
          </section>
        </div>
        <section class="card-container">
          <p>
            {this.createEquipmentCards()}
          </p>
        </section>
      </React.Fragment>
    )
  }
}