import React, { Component } from 'react';
import api from '../../api';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts : []
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
        <div class="card" style={{width: "30rem"}}>
          {post.imgPath && <img src={ post.imgPath } alt={ post.imgName } class="card-img-top" />}
          <div class="card-body">
            <h5 class="card-title">{post.header}</h5>
            <p class="card-text">{post.content}</p>
            <h6 class="card-subtitle mb-2 text-muted">by {post._creator.name}</h6>
          </div>
        </div>
      )
    })
  }
  render() {                
    return (
      <React.Fragment>
        <div class="page-title">
  <h1 class="page-title">Willkommen</h1>
</div>
<p>

  <section class="card-container">
      {this.createPosts()}

  </section>
  <section class="button-container"> 
    <a href="/posts" class="btnHref" id="all-posts">Alle Beiträge ansehen</a>
  </section>
  <section class="card-container women-container">
    <div class="card women-card" style={{width: "20rem"}}>
      <div class="card-body">
        <img src="./images/woman.png" alt="Woman" class="card-img-top"/>
      </div>
    </div>
  </section>

</p>
      </React.Fragment>
    );
  }
}
