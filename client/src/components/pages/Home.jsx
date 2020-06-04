import React, { Component } from 'react';
// import CountDownClock from '../CountDownClock'
import api from '../../api';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts : [],
      pictures:[
        "https://res.cloudinary.com/mcfrihfd/image/upload/v1582495663/project2React/WhatsApp_Image_2020-02-23_at_10.53.19_PM_2.jpg",
        "https://res.cloudinary.com/mcfrihfd/image/upload/v1582495664/project2React/WhatsApp_Image_2020-02-23_at_10.53.22_PM.jpg",
        "https://res.cloudinary.com/mcfrihfd/image/upload/v1582495664/project2React/WhatsApp_Image_2020-02-23_at_10.53.21_PM.jpg",
        "https://res.cloudinary.com/mcfrihfd/image/upload/v1582495664/project2React/WhatsApp_Image_2020-02-23_at_10.53.22_PM_1.jpg",
        "https://res.cloudinary.com/mcfrihfd/image/upload/v1582495664/project2React/WhatsApp_Image_2020-02-23_at_10.53.20_PM_1.jpg",
        "https://res.cloudinary.com/mcfrihfd/image/upload/v1582495664/project2React/WhatsApp_Image_2020-02-23_at_10.53.23_PM_1.jpg",
        "https://res.cloudinary.com/mcfrihfd/image/upload/v1582495664/project2React/WhatsApp_Image_2020-02-23_at_10.53.23_PM.jpg",
        "https://res.cloudinary.com/mcfrihfd/image/upload/v1582495665/project2React/WhatsApp_Image_2020-02-23_at_10.53.21_PM_1.jpg",
        "https://res.cloudinary.com/mcfrihfd/image/upload/v1582495665/project2React/WhatsApp_Image_2020-02-23_at_10.53.24_PM.jpg",
        "https://res.cloudinary.com/mcfrihfd/image/upload/v1582495665/project2React/WhatsApp_Image_2020-02-23_at_10.53.42_PM.jpg",
        "https://res.cloudinary.com/mcfrihfd/image/upload/v1582495663/project2React/WhatsApp_Image_2020-02-23_at_10.53.19_PM.jpg",
        "https://res.cloudinary.com/mcfrihfd/image/upload/v1582495662/project2React/WhatsApp_Image_2020-02-23_at_10.53.18_PM.jpg",
        "https://res.cloudinary.com/mcfrihfd/image/upload/v1582495663/project2React/WhatsApp_Image_2020-02-23_at_10.53.19_PM_1.jpg",
        "https://res.cloudinary.com/mcfrihfd/image/upload/v1582495663/project2React/WhatsApp_Image_2020-02-23_at_10.53.20_PM.jpg"]
    }
  }
  componentDidMount(){
    api.getLatestPosts()
      .then(result=>{
        this.setState({posts:result})
      })
      .catch(err=>{
        console.log(err)
      })
  }
  createPosts=()=>{
    return this.state.posts.map(post=>{
      return (
        <div className="card" style={{width: "30rem"}} key={post._id}>
          {post.imgPath && <img src={ post.imgPath } alt={ post.imgName } className="card-img-top" />}
          <div className="card-body">
            <h5 className="card-title">{post.header}</h5>
            <p className="card-text">{post.content}</p>
            <h6 className="card-subtitle mb-2 text-muted">by {post._creator.username}</h6>
          </div>
        </div>
      )
    })
  }
  createSpecialGalleryPost=()=>{
    return (
      <div className="card" style={{width: "30rem"}} key="SpecialGalleryPost">
          <div id="carouselExampleControls" className="carousel slide card-img-top" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src="https://res.cloudinary.com/mcfrihfd/image/upload/v1582495636/project2React/WhatsApp_Image_2020-02-23_at_10.52.10_PM.jpg" alt="Nähkurs"/>
              </div>
              {this.state.pictures.map((pic,i)=>{
                return(
                  <div className="carousel-item" key={i}>
                    <img className="d-block w-100" src={pic} alt="Schnitt"/>
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
          <div className="card-body">
            <h5 className="card-title">Ein Modell</h5>
            <p className="card-text">kann so unterschiedlich aussehen</p>
            <h6 className="card-subtitle mb-2 text-muted">by Elvira</h6>
          </div>
      </div>
    )
  }
  render() {   
    return (
      <React.Fragment>
        <div className="page-title">
          <h1 className="page-title">Willkommen</h1>
        </div>
        {/* <section className="card-container">
          <div className="countDownHome" key="countdown">
            <CountDownClock/>
          </div>
        </section> */}
          <section className="card-container">
              {this.createSpecialGalleryPost()}
              {this.createPosts()}
          </section>
          <section className="button-container"> 
            <a href="/posts" className="btnHref" id="all-posts">Alle Beiträge ansehen</a>
          </section>
          <section className="card-container women-container">
            <div className="card women-card" style={{width: "20rem"}}>
              <div className="card-body">
                <img src="./images/woman.png" alt="Woman" className="card-img-top"/>
              </div>
            </div>
          </section>

      </React.Fragment>
    );
  }
}
