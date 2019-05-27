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
        this.setState({equipment:equ})
      })
      .catch(err=>{console.log(err)})
  }
  createEquipmentCards=()=>{
    return this.state.equipment.map(eq=>{
      return(
            <div className="card" style={{width: "30rem"}} key={eq._id}>
            {eq.imgPath && <img src={ eq.imgPath } alt={ eq.imgName } className="card-img-top" />}
              <div className="card-body">
                <h5 className="card-title">{eq.header}</h5>
                <p className="card-text">{eq.content}</p>
              </div>
            </div>
      )
    })
  }
  render() {                
    return (
      <React.Fragment>
        <div className="page-title">
          <h1 className="page-title">Das Atelier</h1>
        </div>
        <div>
          <section className="card-container">
            <div className="card" style={{width: "30rem"}}>
              <div className="card-body">
                <h2>Unsere Ausstattung:</h2>
              </div>
            </div>
          </section>
        </div>
        <section className="card-container">
            {this.createEquipmentCards()}
        </section>
      </React.Fragment>
    )
  }
}