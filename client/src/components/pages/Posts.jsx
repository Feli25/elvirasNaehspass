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
      return (<div className="card" style={{width: "30rem"}}>
        {post.imgPath &&<img className="card-img-top" src={ post.imgPath } alt="not available"/> }
            <div className="card-body">
              <h5 className="card-title">{post.header}</h5>
              <p className="card-text">{post.content}</p>
              <h6 className="card-subtitle mb-2 text-muted"> by {post._creator.username}</h6>
            </div>
          </div>)
    })
  }
  render() {                
    return (
      <React.Fragment>
        <div className="page-title">
          <h1 className="page-title">Willkommen</h1>
        </div>
        <section className="card-container">
          {this.createCardsPosts()}
        </section>
      </React.Fragment>
    );
  }
}
