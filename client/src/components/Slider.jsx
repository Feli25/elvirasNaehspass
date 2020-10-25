import React, { Component } from 'react';

//props:
// automaticMovement: true or false, determines if the slider automatically moves, or if it is static and shows the arrows
//    default: false, not mandatory
// speed: determines the speed of the automatic slider
//    default: 3000, not mandatory
// content: the content in an html tag, 
//    is mandatory

export default class Slider extends Component {
  state = {
    sliderNumber: 0
  }
  componentDidMount(){
    if(this.props.automaticMovement) {
      this.carousel()
    }
  }
  carousel = () => {
    const newNumber = this.generateNumber(this.state.sliderNumber+1)
    this.setState({sliderNumber:newNumber})
    setTimeout(this.carousel, this.props.speed? this.props.speed : 3000); // Change image every 2 seconds, or use the speed given
  }
  move = (amount) => {
    const newNumber = this.generateNumber(this.state.sliderNumber+amount)
    this.setState({sliderNumber:newNumber})
  }
  generateNumber = (number) => {
    return number < 0 ? this.props.content.length - 1 : number >= this.props.content.length ? 0 : number
  }
  generateClassName = () => {
    let className = "slider"
    if(!this.props.automaticMovement) className += " slider__content-border"
    if(this.props.slideMultiple) className += " slider__content-grid"
    return className
  }
  render () {
    return (
      <div className={this.generateClassName()}>
        {!this.props.automaticMovement && 
        <span className="slider__arrow-left" onClick={()=>this.move(-1)}>&#10094;</span>
        }
        <div>{this.props.content[this.state.sliderNumber]}</div>
        {this.props.slideMultiple && 
          <React.Fragment>
            <div className="slider__multiple slider__multiple-one">{this.props.content[this.generateNumber(this.state.sliderNumber+1)]}</div>
            <div className="slider__multiple slider__multiple-two">{this.props.content[this.generateNumber(this.state.sliderNumber+2)]}</div>
          </React.Fragment>
        }
        {!this.props.automaticMovement && 
        <span className="slider__arrow-right" onClick={()=>this.move(1)}>&#10095;</span>
        }
      </div>
    )
  }
}