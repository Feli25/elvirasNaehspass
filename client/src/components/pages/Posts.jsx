import React, { Component } from 'react';
import api from '../../api';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allPosts:[]
    }
  }
  componentDidMount(){
    api.getAllPosts()
      .then(posts=>{
        this.setState({allPosts:posts})
      })
  }
  createCardsPosts=()=>{
    return this.state.allPosts.map(post=>{
      return (<div class="card" style={{width: "30rem"}}>
        {post.imgPath &&<img class="card-img-top" src={ post.imgPath } alt="not available"/> }
            <div class="card-body">
              <h5 class="card-title">{post.header}</h5>
              <p class="card-text">{post.content}</p>
              <h6 class="card-subtitle mb-2 text-muted"> by {post._creator.username}</h6>
            </div>
          </div>)
    })
  }
  render() {                
    return (
      <React.Fragment>
        <div class="page-title">
          <h1 class="page-title">Willkommen</h1>
        </div>
        <section class="card-container">
        <p>
          {this.createCardsPosts()}
        </p>
        </section>
      </React.Fragment>
    );
  }
}
