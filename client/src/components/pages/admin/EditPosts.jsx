import React, { Component } from 'react';
import api from '../../../api';
import { runInThisContext } from 'vm';
import {Dialog, Slide, DialogContentText, DialogContent, DialogActions, Button, DialogTitle, TextField} from '@material-ui/core'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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


  displayPosts=()=>{
    return this.state.posts.map(post=>{
      return(
        <div class="card" style={{width: "30rem"}}>
          {post.imgPath && 
          <img src={ post.imgPath } alt={ post.imgName } class="card-img-top" />}
          <div class="card-body">
            <h5 class="card-title">{post.header}</h5>
            <p class="card-text">{post.content}</p>
            <h6 class="card-subtitle mb-2 text-muted">by {post._creator.username}</h6>
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
      <Dialog open={this.state.newPopupOpen} TransitionComponent={Transition}>
          <DialogTitle><h5 class="card-title">Einen Post hinzufügen</h5></DialogTitle>
          <DialogContent>
        <label for="pictureUrl" xl={3}>Add a picture</label>
        <input type="file" name="pictureUrl" cols="30" rows="5" onChange={this.handleFileChange} />
          <TextField
              autoFocus
              margin="dense"
              name="header"
              label="Titel"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.header}
            />
            <TextField
              autoFocus
              margin="dense"
              name="content"
              label="Text"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.content}
            />
          </DialogContent>
          <DialogActions>
            <Button class="btnHref" onClick={this.createNewPostConfirm}>Hinzufügen</Button>
            <Button class="btnHref" onClick={this.cancel}>Abbruch</Button>
          </DialogActions>
      </Dialog>
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
      <Dialog open={this.state.editPopupOpen} TransitionComponent={Transition}>
        <DialogTitle><h5 class="card-title">Einen Post bearbeiten</h5></DialogTitle>
        <DialogContent>
        {this.state.pictureUrl&&<img src={this.state.pictureUrl} alt={this.state.pictureName} class="card-img-top"/>} 
        <label for="pictureUrl" xl={3}>Add a picture</label>
        <input type="file" name="pictureUrl" cols="30" rows="5" onChange={this.handleFileChange} />
        <TextField
              autoFocus
              margin="dense"
              name="header"
              label="Titel"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.header}
            />
            <TextField
              autoFocus
              margin="dense"
              name="content"
              label="Text"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.content}
            />
        </DialogContent>
        <DialogActions>
          <Button class="btnHref" onClick={this.editPostConfirm}>Bestätigen</Button>
          <Button class="btnHref" onClick={this.cancel}>Abbruch</Button>
        </DialogActions>
      </Dialog>
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
          <section class="card-container">
            {this.displayPosts()}
          </section>
        {this.renderEditPostPopup()}
        {this.renderCreateNewPostPopup()}
      </div>
    );
  }
}
