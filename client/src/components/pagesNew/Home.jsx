import React, { Component } from 'react';

import Slider from '../Slider'
import api from '../../api';

const pictures = [
  'https://res.cloudinary.com/mcfrihfd/image/upload/v1558623517/project2React/dessous.jpg.jpg'
  ]

export default class Home extends Component {
  state={
    posts: []
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
  newsCards=()=>{
    return this.state.posts.length()>0?
      this.state.posts.map(post=>
        <div className="card">
          <img className="card__img" src={post.imgPath}/>
          <h3 className="card__header">{post.header}</h3>
          <p className="card__text">{post.content}</p>
        </div>
        )
    :[]
  }
  render () {
    return (
      <div className="home">
        <h2 className="title">Willkommen</h2>

        <Slider
          automaticMovement={true}
          content={pictures.map(pic=><img src={pic} alt="galerie" className="slider__img"/>)}
        />

        <div className="home__intro">
          <div className="info-block">
            <h3 className="info-block__header">Elviras Nähspass</h3>
            <p className="info-block__text">Herzlich Wilkommen bei uns, schön, dass sie da sind</p>
          </div>
          {/* <img src='../../images/woman.png' className="home__intro-img"/> */}
        </div>

        <div className="home__category">
          <a className="home__category--box">{"Unser Angebot >>"}</a>
          <a className="home__category--box">{"Das sind wir >>"}</a>
          <a className="home__category--box">{"Das Atelier >>"}</a>
          <a className="home__category--box">{"Kontakt >>"}</a>
        </div>

        <div className="home__news">
          <div className="info-block">
            <h3 className="info-block__header">News</h3>
            <Slider
              automaticMovement={true}
              content={()=>this.newsCards()}
            />

          </div>
        </div>
      </div>
    )
  }
}