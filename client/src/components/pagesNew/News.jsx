import React, { Component } from 'react';
import api from '../../api';
import queryString from 'query-string';

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
      return <div className="card" key={post._id}>
      {post.imgPath && <img className="card__img" src={post.imgPath} alt={post.imgName}/>}
        <h3 className="card__header">{post.header}</h3>
        <p className="card__text line-clamp">{post.content}</p>
        <a onClick={()=>this.setState({selectedPost:post._id})} className="card__read-more">Mehr lesen</a>
      </div>
    })
  }
  renderSinglePost = () => {
    let postFiltered = this.state.posts.filter(post=>{return post._id === this.state.selectedPost})
    if(postFiltered.length!==1){
      this.setState({selectedPost:false})
      return;
    }
    let post = postFiltered[0]
    console.log(post)

    return <div className="modal">
      <div className="modal__close" onClick={() => this.setState({selectedPost: false})}>&#x2715;</div>
      <div className="card" key={post._id}>
        {post.imgPath && <img className="card__img" src={post.imgPath} alt={post.imgName}/>}
        <h3 className="card__header">{post.header}</h3>
        <p className="card__text">{post.content}</p>
        <p className="card__subText">Erstellt von: {post.creator}</p>
      </div>
    </div>
  }
  render () {
    return (
      <div className="news">
        <h2 className="title">Neuigkeiten</h2>
          <div className="info-block">
            {this.renderPosts()}
          </div>
          {this.state.selectedPost && this.state.posts && this.renderSinglePost()}
      </div> 
    )
  }
}