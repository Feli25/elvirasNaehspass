import React, { Component } from 'react';
import api from '../../api';
import queryString from 'query-string';

import Card from '../Card'

export default class Datenschutz extends Component {
  state={
    posts: [],
    selectedPost: false,
  }
  componentDidMount(){
    api.getAllPosts()
      .then(result=>{
        this.setState({posts:result})
      })
      .catch(err=>{
        console.log(err)
      })
    if(this.props?.location?.state?.id) {
      this.setState({selectedPost: this.props.location.state.id})
    }
  }
  renderPosts=()=>{
    return this.state.posts.map(post=>{
      return <Card 
        id = {post._id}
        imgPath = {post.imgPath}
        imgName = {post.imgName}
        header = {post.header}
        text = {post.content}
        lineclamp = {true}
        link = "Mehr lesen"
        onlinkclick = {()=>this.setState({selectedPost:post._id})}
      />
    })
  }
  renderSinglePost = () => {
    let postFiltered = this.state.posts.filter(post=>{return post._id === this.state.selectedPost})
    if(postFiltered.length!==1){
      this.setState({selectedPost:false})
      return;
    }
    let post = postFiltered[0]

    return <div className="modal">
      <div className="modal__close" onClick={() => this.setState({selectedPost: false})}>&#x2715;</div>
      <Card 
        id = {post._id}
        imgPath = {post.imgPath}
        imgName = {post.imgName}
        header = {post.header}
        text = {post.content}
        lineclamp = {false}
        subtext = {"Erstellt von: " + post.creator}
      />
    </div>
  }
  render () {
    return (
      <div className="news">
        <h2 className="title">Neuigkeiten</h2>
          <div className="card-block">
            {this.renderPosts()}
          </div>
          {this.state.selectedPost && this.state.posts && this.renderSinglePost()}
      </div> 
    )
  }
}