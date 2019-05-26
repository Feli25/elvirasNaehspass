import React, { Component } from 'react';
import api from '../../api';

export default class Galerie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pictures:[],
      activeStep:0
    }
  }
  componentDidMount=()=>{
    api.getGaleriePictures()
      .then(pic=>{
        this.setState({pictures:pic})
      })
      .catch(err=>{console.log(err)})
  }
  createCarouselItems=()=>{
    return this.state.pictures.map((pic)=>{
      console.log(pic)
      return(
        <div class="carousel-item">
          <img class="d-block w-100" src={pic.imgPath} alt="Nähkurs"/>
        </div> 
      )
    })
  }
  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };
  render() {   
    return (
      <React.Fragment>
        <div class="page-title">
          <h1 class="page-title">Galerie</h1>
        </div>
        <p>
          <section class="card-container">
            <div class="card about-card">
              <div class="card-body">
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">

                    <div class="carousel-item active">
                      <img class="d-block w-100" src="../images/selberGenaeht.png" alt="Nähkurs"/>
                    </div>
                    
                    {this.state.pictures.map(pic=>{
                      return(
                        <div class="carousel-item">
                          <img class="d-block w-100" src={pic.imgPath} alt={pic.header}/>
                        </div>
                    )
                    })}

                  </div>
                  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </p>
      </React.Fragment>
    );
  }
}
