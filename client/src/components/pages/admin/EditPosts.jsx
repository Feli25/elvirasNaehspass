import React, { Component } from 'react';
import api from '../../../api';
import { runInThisContext } from 'vm';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts:[],
      editPopupOpen:false,
      newPopupOpen:false,
      selectedPostId:null
    }
  }
  componentDidMount(){
    this.updateView()
  }
  updateView=()=>{
    api.getAllPosts()
    .then(result=>{
      this.setState({posts:result})
    })
    .catch(err=>{console.log(err)})
  }

  displayPosts=()=>{
    return this.state.posts.map(post=>{
      return(
        <card>{post.title}
          <button onClick={()=>{this.editPost(post.id)}}>Bearbeiten</button>
          <button onClick={()=>{this.deletePost(post.id)}}>Löschen</button>
        </card>
      )
    })
  }

  deletePost=(id)=>{
    api.deletePost(id)
      .then(post=>{
        this.updateView()
      })
      .catch(err=>{console.log(err)})
  }

  createNewPost=()=>{
    this.setState({newPopupOpen:true})
  }
  renderCreateNewPostPopup=()=>{
    return(
      <dialog open={this.state.newPopupOpen}>
        <button onClick={()=>{this.cancel()}}>Abbruch</button>
        <button onClick={()=>{this.createNewPostConfirm()}}>Bestätigen</button>
      </dialog>
    )
  }
  createNewPostConfirm=()=>{
    this.updateView()
    this.setState({newPopupOpen:false})
  }

  editPost=(id)=>{
    this.setState({selectedPostId:id, editPopupOpen:true})
  }
  renderEditPostPopup=()=>{
    return(
      <dialog open={this.state.editPopupOpen}>
        <button onClick={()=>{this.cancel()}}>Abbruch</button>
        <button onClick={()=>{this.editPostConfirm()}}>Bestätigen</button>
      </dialog>
    )
  }
  editPostConfirm=()=>{
    this.updateView()
    this.setState({editPopupOpen:false, selectedPostId:null})
  }

  cancel=()=>{
    this.setState({editPopupOpen:false, newPopupOpen:false})
  }
  render() {                
    return (
      <div className="Home">
        <h2>Edit Posts</h2>
        <p>This is a sample project with the MERN stack</p>
        {this.displayPosts()}
        {this.renderEditPostPopup()}
        {this.renderCreateNewPostPopup()}
      </div>
    );
  }
}
