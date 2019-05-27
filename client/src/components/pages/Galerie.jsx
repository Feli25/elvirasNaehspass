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
        <div className="carousel-item">
          <img className="d-block w-100" src={pic.imgPath} alt="Nähkurs"/>
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
        <div className="page-title">
          <h1 className="page-title">Galerie</h1>
        </div>
          <section className="card-container">
            <div className="card about-card">
              <div className="card-body">
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                  <div className="carousel-inner">

                    <div className="carousel-item active">
                      <img className="d-block w-100" src="../images/selberGenaeht.png" alt="Nähkurs"/>
                    </div>
                    
                    {this.state.pictures.map(pic=>{
                      return(
                        <div className="carousel-item" key={pic._id}>
                          <img className="d-block w-100" src={pic.imgPath} alt={pic.header}/>
                        </div>
                    )
                    })}

                  </div>
                  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
      </React.Fragment>
    );
  }
}
