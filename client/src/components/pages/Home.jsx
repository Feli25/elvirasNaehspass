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
        <p>{post.header}</p>
      )
    })
  }
  render() {                
    return (
      <div className="Home">
        <h2>Home</h2>
        <p>This is a sample project with the MERN stack</p>
        {this.createPosts()}
      </div>
    );
  }
}
