import React, { Component } from 'react';
import CountDownClock from '../CountDownClock'
import api from '../../api';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts : [],
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
