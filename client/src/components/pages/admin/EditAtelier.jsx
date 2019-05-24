import React, { Component } from 'react';
import api from '../../../api';
import {Dialog, Slide, DialogContentText, DialogContent, DialogActions, Button, DialogTitle, TextField} from '@material-ui/core'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      equipment:[],
      makeNew:false,
      editOld:false,
      selectedOld:"",

      header:"",
      content:"",
      pictureUrl:"",
      pictureName:"",
      public_id:"",
      file:null
    }
  }
  componentDidMount=()=>{
    this.updateData()
  }
  updateData=()=>{
    api.getEquipment()
      .then(eq=>{
        this.setState({equipment:eq})
      })
      .catch(err=>{console.log(err)})
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  cancel=()=>{
    this.setState({
      makeNew:false,
      editOld:false,
      selectedOld:""})
  }
  handleFileChange=(e)=>{
    e.preventDefault();
    const file = e.target.files[0];
    this.setState({
      file: file,
      pictureUrl: null,
    })
  }

  createDisplay=()=>{
    return this.state.equipment.map(eq=>{
      return(
          <div class="card" style={{width: "30rem"}}>
            {eq.imgPath && 
            <img src={ eq.imgPath } alt={ eq.imgName } class="card-img-top" />}
            <div class="card-body">
              <h5 class="card-title">{eq.header}</h5>
              <p class="card-text">{eq.content}</p>
              <button class="btnHref" onClick={()=>this.selectEditOld(eq)}>Bearbeiten</button>
              <button class="btnHref" onClick={()=>this.onDelete(eq._id)}>Löschen</button>
            </div>
          </div>
      )
    })
  }

  onDelete=(id)=>{
    api.deleteEquipment(id)
      .then(response=>{
        console.log(response)
        this.updateData()
      })
      .catch(err=>{console.log(err)})
  }

  selectMakeNew=()=>{
    this.setState({
      selectedOld:"",
      header:"",
      content:"",
      file:null,
      makeNew:true
    })
  }
  renderCreateNewPopup=()=>{
    return (
      <Dialog 
        open={this.state.makeNew}
        TransitionComponent={Transition}>
          <DialogTitle><h5 class="card-title">Eine Ausstattung hinzufügen</h5></DialogTitle>
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
            <Button class="btnHref" onClick={this.confirmNew}>Hinzufügen</Button>
            <Button class="btnHref" onClick={this.cancel}>Abbrechen</Button>
          </DialogActions>
      </Dialog>
    )
  }
  confirmNew=()=>{
    this.setState({makeNew:false})
    let data ={
      header: this.state.header,
      content:this.state.content,
      picture : this.state.file
    }
    api.addEquipment(data)
      .then(response=>{
        console.log(response)
        this.updateData()
      })
      .catch(err=>{console.log(err)})
  }

  selectEditOld=(thing)=>{
    this.setState({
      editOld:true, 
      selectedOld:thing,
      header:thing.header,
      content:thing.content,
      pictureUrl:thing.imgPath,
      pictureName:thing.imgName,
      public_id:thing.public_id
    })
  }
  renderEditOldPopup=()=>{
    return (
      <Dialog open={this.state.editOld}
      TransitionComponent={Transition}>  
        <DialogTitle><h5 class="card-title">Eine Ausstattung bearbeiten</h5></DialogTitle>
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
          <Button class="btnHref" onClick={this.confirmEdit}>Aktualisieren</Button>
          <Button class="btnHref" onClick={this.cancel}>Abbrechen</Button>
        </DialogActions>
      </Dialog>
    )
  }
  confirmEdit=()=>{
    this.setState({editOld:false})
    let data={
      header:this.state.header,
      content:this.state.content,
      pictureUrl:this.state.pictureUrl,
      pictureName:this.state.pictureName,
      public_id:this.state.public_id,
      picture : this.state.file
    }
    api.updateEquipment(this.state.selectedOld._id, data)
      .then(response=>{
        console.log(response)
        this.updateData()
      })
      .catch(err=>{console.log(err)})
  }

  render() {                
    return (
      <div className="Home">
        <div class="page-title">
          <h1 class="page-title">Admin - Ausstattung</h1>
        </div>
        <div class="manage-container">
          <div class="card" style={{width: "30rem"}}>
            <div class="card-body">
            <h2><button onClick={this.selectMakeNew} class="btnHref">Neue Ausstattung</button></h2>
            </div>
          </div>
        </div>
        <section class="card-container">
          <p>
            {this.createDisplay()}
          </p>
        </section>
        {this.renderCreateNewPopup()}
        {this.renderEditOldPopup()}
      </div>
    );
  }
}
