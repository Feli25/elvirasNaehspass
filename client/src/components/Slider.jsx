import React, { Component } from 'react';

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
    const newNumber = this.state.sliderNumber+1 < this.props.content.length ? this.state.sliderNumber+1 : 0
    this.setState({sliderNumber:newNumber})
    setTimeout(this.carousel, 2000); // Change image every 2 seconds
  }
  render () {
    return (
      <div className="slider">
        {this.props.content[this.state.sliderNumber]}
      </div>
    )
  }
}