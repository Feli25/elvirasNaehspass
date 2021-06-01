import React, { Component } from 'react';

import Slider from '../Slider'
import Card from '../Card'
import posts from '../../data/posts.json'

const pictures = [
  // 'https://res.cloudinary.com/mcfrihfd/image/upload/v1558628756/project2React/IMG_6122.JPG.jpg',
  'https://res.cloudinary.com/mcfrihfd/image/upload/v1602009956/project2React/home/home-slider.jpg'
  ]

export default class Home extends Component {
  state={
    posts: []
  }
  componentDidMount(){
    const latestPosts = posts.slice(0,5);
    const formattedResult = latestPosts.map(post=>
      <Card 
        key = {post._id}
        id = {post._id}
        header = {post.header}
        text = {post.content}
        lineclamp = {true}
        link = "Mehr lesen"
        onlinkclick = {()=>this.props.history.push('/news', {id: post._id})}
      />
      )
    this.setState({posts:formattedResult})
  }
  render () {
    return (
      <div className="home">
        <h2 className="title">Willkommen</h2>

         <div className="home__news-banner">
             <span className="home__news-banner-header">Es geht wieder los!<br/></span>
             <div className="home__news-banner-content">
             Nach einer sehr langen Zwangspause können wir mit kleinen Gruppen und Hygieneregeln endlich wieder starten.
             Wir freuen uns darauf, euch in den renovierten Nähräumen zu begrüßen!</div>
         </div>

        <Slider
          automaticMovement={true}
          content={pictures.map(pic=><img src={pic} alt="galerie" className="slider__img"/>)}
        />

        <div className="home__intro">
          <div className="info-block">
            <h3 className="info-block__header">Elviras Nähspass</h3>
            <p className="info-block__text">Wie schön, dass Sie unsere Seite gefunden haben! Schauen Sie sich um, entdecken Sie unsere Kursangebote und melden Sie sich gerne bei uns, wenn Fragen sein sollten. Wir freuen uns, Sie bald in unseren Kursen begrüßen zu können!</p>
          </div>
        </div>

        <div className="home__category-mobile">
          <a href="/naehkurse">{"Unser Angebot >>"}</a>
          <a href="/about">{"Das sind wir >>"}</a>
          <a href="/atelier">{"Das Atelier >>"}</a>
          <a href="/kontakt">{"Kontakt >>"}</a>
        </div>
        <div className="home__category-tablet">
            <div>
              <img src="../icons/button.svg" className="home__category-icon" alt="Angebot"/>
              <a href="/naehkurse">{"Unser Angebot >>"}</a>
            </div>
            <div>
              <img src="../icons/face.svg" className="home__category-icon" alt="Wir"/>
              <a href="/about">{"Das sind wir >>"}</a>
            </div>
            <div>
              <img src="../icons/house.svg" className="home__category-icon" alt="Atelier"/>
              <a href="/atelier">{"Das Atelier >>"}</a>
            </div>
            <div>
              <img src="../icons/mail.svg" className="home__category-icon" alt="Kontakt"/>
              <a href="/kontakt">{"Kontakt >>"}</a>
            </div>
        </div>

        <div className="home__news">
          <div className="info-block">
            <h3 className="info-block__header">Neuigkeiten</h3>
            <Slider
              automaticMovement={false}
              content={this.state.posts}
              slideMultiple={true}
            />
            <a href="/news" className="info-block__link">{"Alle Neuigkeiten >>"}</a>
          </div>
        </div>

        <div className="home__selfmade">
          <div className="info-block">
            <h3 className="info-block__header">Das habe ich selbst genäht</h3>
            <p className="info-block__text">Wolltest du das auch schon immer mal sagen?<br/>
              Dann bist du bei uns genau richtig! In unseren Kursen gehen wir auf individuelle Wünsche ein, und so entstehen jedes Mal einzigartige Meisterstücke.
              Taschen oder Kleidungsstücke, Kissen oder Kuscheltiere, alles ist möglich.</p>
            <p className="info-block__text">Hier seht ihr Fotos von Kleidungsstücken, die in den Kursen gefertigt wurden. Alle sind aus dem gleichen Modell entstanden, und doch ist jedes einzigartig!</p>
          </div>
        </div>

        <div className="image-tiles">
          <div className="image-tiles-column">
            <img src="https://res.cloudinary.com/mcfrihfd/image/upload/v1582495663/project2React/home/WhatsApp_Image_2020-02-23_at_10.53.19_PM_2.jpg" alt="modell"/>
            <img src="https://res.cloudinary.com/mcfrihfd/image/upload/v1582495664/project2React/home/WhatsApp_Image_2020-02-23_at_10.53.21_PM.jpg" alt="modell"/>
          </div>
          <div className="image-tiles-column">
            <img src="https://res.cloudinary.com/mcfrihfd/image/upload/v1582495664/project2React/home/WhatsApp_Image_2020-02-23_at_10.53.22_PM_1.jpg" alt="modell"/>
            <img src="https://res.cloudinary.com/mcfrihfd/image/upload/v1582495664/project2React/home/WhatsApp_Image_2020-02-23_at_10.53.20_PM_1.jpg" alt="modell"/>
          </div>
          <div className="image-tiles-column">
            <img src="https://res.cloudinary.com/mcfrihfd/image/upload/v1582495665/project2React/home/WhatsApp_Image_2020-02-23_at_10.53.42_PM.jpg" alt="modell"/>
            <img src="https://res.cloudinary.com/mcfrihfd/image/upload/v1582495665/project2React/home/WhatsApp_Image_2020-02-23_at_10.53.24_PM.jpg" alt="modell"/>
          </div>
          <div className="image-tiles-column">
            <img src="https://res.cloudinary.com/mcfrihfd/image/upload/v1582495664/project2React/home/WhatsApp_Image_2020-02-23_at_10.53.23_PM.jpg" alt="modell"/>
            <img src="https://res.cloudinary.com/mcfrihfd/image/upload/v1582495664/project2React/home/WhatsApp_Image_2020-02-23_at_10.53.23_PM_1.jpg" alt="modell"/>
          </div>
        </div>

         <iframe 
          title="videoKirschpups"
          src="https://www.youtube.com/embed/gf_hijPN_Jk?rel=0&amp;modestbranding=1" 
          frameBorder="0"
          // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen="allowFullScreen"
          mozallowfullscreen="mozallowfullscreen"
          msallowfullscreen="msallowfullscreen"
          oallowfullscreen="oallowfullscreen" 
          webkitallowfullscreen="webkitallowfullscreen"
          className="video">
        </iframe>
      </div>
    )
  }
}