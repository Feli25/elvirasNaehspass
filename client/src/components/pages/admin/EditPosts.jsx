import React, { Component } from 'react';
import api from '../../../api';
import { runInThisContext } from 'vm';

export default class EditPosts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts:[],
      editPopupOpen:false,
      newPopupOpen:false,
      selectedPost:null,

      header:"",
      content:"",
      pictureUrl:"",
      pictureName:"",
      public_id:"",
      file:null
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

  handleChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  handleFileChange=(e)=>{
    e.preventDefault();
    const file = e.target.files[0];
    this.setState({
      file: file,
      pictureUrl: null,
    })
  }
  cancel=()=>{
    this.setState({editPopupOpen:false, newPopupOpen:false})
  }

  displayPosts=()=>{
    return this.state.posts.map(post=>{
      return(
        <div class="card" style={{width: "30rem"}}>
          {post.imgPath && 
          <img src={ post.imgPath } alt={ post.imgName } class="card-img-top" />}
          <div class="card-body">
            <h5 class="card-title">{post.header}</h5>
            <p class="card-text">{post.content}</p>
            <h6 class="card-subtitle mb-2 text-muted">by {post._creator.name}</h6>
            <button class="btnHref" onClick={()=>{this.editPost(post)}}>Bearbeiten</button>
            <button class="btnHref" onClick={()=>{this.deletePost(post._id)}}>Löschen</button>
          </div>
        </div>
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
    this.setState({
      selectedPost:null,
      header:"",
      content:"",
      file:null,
      creator:"",
      newPopupOpen:true})
  }
  renderCreateNewPostPopup=()=>{
    return(
      <dialog open={this.state.newPopupOpen}>
        <label for="pictureUrl" xl={3}>Add a picture</label>
        <input type="file" name="pictureUrl" cols="30" rows="5" onChange={this.handleFileChange} />
        <label for="header">Titel:</label>
        <input type="text" name="header" id="header" value={this.state.header} onChange={this.handleChange}/>
        <br/><br/>
        <label for="content">Text:</label>
        <input type="text" name="content" id="content" value={this.state.content} onChange={this.handleChange}/>
        <br/><br/>
        <button onClick={this.createNewPostConfirm}>Hinzufügen</button>
        <button onClick={this.cancel}>Abbruch</button>
      </dialog>
    )
  }
  createNewPostConfirm=()=>{
    this.setState({newPopupOpen:false})
    let data ={
      header: this.state.header,
      content:this.state.content,
      picture : this.state.file
    }
    api.addPost(data)
      .then(response=>{
        this.updateView()
      })
      .catch(er=>console.log(er))
  }

  editPost=(thing)=>{
    this.setState({
      editPopupOpen:true,
      selectedPost:thing, 
      header:thing.header,
      content:thing.content,
      pictureUrl:thing.imgPath,
      pictureName:thing.imgName,
      public_id:thing.public_id
    })
  }
  renderEditPostPopup=()=>{
    return(
      <dialog open={this.state.editPopupOpen}>
        {this.state.pictureUrl&&<img src={this.state.pictureUrl} alt={this.state.pictureName}/>} 
        <label for="pictureUrl" xl={3}>Add a picture</label>
        <input type="file" name="pictureUrl" cols="30" rows="5" onChange={this.handleFileChange} />
        <label for="header">Titel:</label>
        <input type="text" name="header" id="header" value={this.state.header} onChange={this.handleChange}/>
        <br/><br/>
        <label for="content">Text:</label>
        <input type="text" name="content" id="content" value={this.state.content} onChange={this.handleChange}/>
        <br/><br/>
        <button onClick={this.editPostConfirm}>Bestätigen</button>
        <button onClick={this.cancel}>Abbruch</button>
      </dialog>
    )
  }
  editPostConfirm=()=>{
    let data ={
      header: this.state.header,
      content:this.state.content,
      pictureUrl:this.state.pictureUrl,
      pictureName:this.state.pictureName,
      public_id:this.state.public_id,
      picture : this.state.file
    }
    api.updatePost(this.state.selectedPost._id,data)
      .then(res=>{
        this.updateView()
        this.setState({editPopupOpen:false, selectedPost:null})
      })
      .catch(err=>console.log(err))
  }

  render() {                
    return (
      <div className="Home">
        <div class="page-title">
          <h1 class="page-title">Admin - Alle Posts</h1>
        </div>
        <div class="manage-container">
          <div class="card" style={{width: "30rem"}}>
            <div class="card-body">
            <h2><button onClick={this.createNewPost} class="btnHref">Neuen Post erstellen</button></h2>
            </div>
          </div>
        </div>
        <p>
          <section class="card-container">
            {this.displayPosts()}
          </section>
        </p>
        {this.renderEditPostPopup()}
        {this.renderCreateNewPostPopup()}
      </div>
    );
  }
}
