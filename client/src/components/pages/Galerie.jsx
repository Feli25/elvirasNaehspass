import React, { Component } from 'react';
import api from '../../api';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = theme => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
});

class Galerie extends Component {
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
    const { classes, theme } = this.props;
    const { activeStep, pictures } = this.state;
    const maxSteps = pictures.length;
    return (
      <React.Fragment>
        <div class="page-title">
          <h1 class="page-title">Galerie</h1>
        </div>
        <p>
          <section class="card-container">
            <div class="card about-card">
              <div class="card-body">
                {/* <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                  {this.state.pictures[0] && 
                  <div class="carousel-item active">
                    <img class="d-block w-100" src={this.state.pictures[0].imgPath} alt="Nähkurs"/>
                  </div> 
                  }
                    {this.createCarouselItems()}
                    
                  </div>
                  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div> */}
                {pictures.length>0&&
                <div className={classes.root}>
                  <Paper square elevation={0} className={classes.header}>
                    <Typography>{pictures[activeStep].header}</Typography>
                  </Paper>
                  <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={this.handleStepChange}
                    enableMouseEvents
                    >
                    {pictures.map((step, index) => (
                      <div key={step.header}>
                        {Math.abs(activeStep - index) <= 2 ? (
                          <img className={classes.img} src={step.imgPath} alt={step.header} />
                          ) : null}
                      </div>
                    ))}
                  </AutoPlaySwipeableViews>
                  <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    className={classes.mobileStepper}
                    nextButton={
                      <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                      </Button>
                    }
                    backButton={
                      <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                      </Button>
                    }
                    />
                </div>
                  }
              </div>
            </div>
          </section>
        </p>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Galerie);