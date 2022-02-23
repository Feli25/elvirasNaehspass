import React, { Component } from 'react';

import Card from '../Card'
import Slider from '../Slider'
import equipment from '../../data/equipment.json'

const pictures = [
  'https://res.cloudinary.com/mcfrihfd/image/upload/v1559237957/project2React/atelier/IMG_6011.JPG.jpg',
  // 'https://res.cloudinary.com/mcfrihfd/image/upload/v1559237366/project2React/atelier/IMG_6132.JPG.jpg',
  'https://res.cloudinary.com/mcfrihfd/image/upload/v1558624068/project2React/atelier/IMG_6148.JPG.jpg',
  'https://res.cloudinary.com/mcfrihfd/image/upload/v1558628310/project2React/atelier/IMG_6022.JPG.jpg',
  'https://res.cloudinary.com/mcfrihfd/image/upload/v1558627603/project2React/atelier/IMG_5978.JPG.jpg',
  'https://res.cloudinary.com/mcfrihfd/image/upload/v1558624096/project2React/atelier/IMG_6057.JPG.jpg',
  'https://res.cloudinary.com/mcfrihfd/image/upload/v1559237054/project2React/atelier/IMG_5985.JPG.jpg',
  ]

export default class Atelier extends Component {
  state={
    equipment: equipment,
  }
  createCards=()=>{
    return this.state.equipment.map((eq,index)=>{
      return(
        <Card 
          key = {index}
          id = {index}
          imgPath = {eq.imgPath}
          imgName = {eq.imgName}
          header = {eq.header}
          text = {eq.content}
        />
      )
    })
  }
  render () {
    return (
      <div className="atelier">
        <h2 className="title">Atelier</h2>

        <Slider
          automaticMovement={true}
          content={pictures.map(pic=><img src={pic} alt="galerie" className="slider__img"/>)}
        />

        <div className="atelier__intro">
          <div className="info-block">
            <h3 className="info-block__header">Die gute Stube</h3>
            <p className="info-block__text">In unserer schönen Nähschule haben wir eine große Auswahl an Materialien, die käuflich erworben werden können, sowie eine vielfältige Ausstattung für den Unterricht. Diese könnt ihr hier sehen!</p>
          </div>
        </div>

        <div className="card-block">
          {this.createCards()}
        </div>
      </div> 
    )
  }
}