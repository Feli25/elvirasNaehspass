import React, { Component } from 'react';
import api from '../../../api';
import {Dialog, Slide,  DialogContent, DialogActions, Button, DialogTitle, TextField} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const styles = theme => ({
  resize:{
    fontSize:20
  },
  textfieldResize:{
    fontSize:17,
    lineHeight:1.2,
    minHeight:"auto",
    boxShadow:"none"
  }
});

class EditAtelier extends Component {
  constructor(props) {
    super(props)
    this.state = {
      equipment:[],
      makeNew:false,
      editOld:false,
      deleteConfirm:false,
      deleteId:"",
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
      deleteConfirm:false,
      deleteId:"",
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
          <div className="card" style={{width: "30rem"}} key={eq._id}>
            {eq.imgPath && 
            <img src={ eq.imgPath } alt={ eq.imgName } className="card-img-top" />}
            <div className="card-body">
              <h5 className="card-title">{eq.header}</h5>
              <p className="card-text">{eq.content}</p>
              <button className="btnHref" onClick={()=>this.selectEditOld(eq)}>Bearbeiten</button>
              <button className="btnHref" onClick={()=>this.deleteConfirm(eq._id)}>Löschen</button>
            </div>
          </div>
      )
    })
  }

  deleteConfirm=(id)=>{
    this.setState({
      deleteConfirm:true,
      deleteId:id,
    })
  }
  onDelete=()=>{
    api.deleteEquipment(this.state.deleteId)
      .then(response=>{
        console.log(response)
        this.cancel()
        this.updateData()
      })
      .catch(err=>{console.log(err)})
  }

  confirmDeletePopup=()=>{
    return(
      <Dialog 
        open={this.state.deleteConfirm}
        TransitionComponent={Transition}>
          <DialogTitle><h5 className="card-title">Sicher?</h5></DialogTitle>
          <DialogContent>
            <p>Dass du diese Ausstattung löschen möchtest?</p>
          </DialogContent>
          <DialogActions>
            <Button className="btnHref" style={{fontSize:"12px"}} onClick={this.onDelete}>Löschen</Button>
            <Button className="btnHref" style={{fontSize:"12px"}} onClick={this.cancel}>Abbrechen</Button>
          </DialogActions>
      </Dialog>
    )
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
          <DialogTitle><h5 className="card-title">Eine Ausstattung hinzufügen</h5></DialogTitle>
          <DialogContent>
            <label xl={3}>Füge ein Bild hinzu</label>
            <input type="file" name="pictureUrl" cols="30" rows="5" onChange={this.handleFileChange} /><br/>
            Titel:
            <TextField
              margin="dense"
              name="header"
              // label="Titel"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.header}
              InputProps={{
                classes: {
                  input: this.props.classes.resize,
                },
              }}
            />
            Text:
            <TextField
              margin="dense"
              name="content"
              // label="Text"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.content}
              InputProps={{
                classes: {
                  input: this.props.classes.textfieldResize,
                },
              }}
              multiline
              rows="5"
            />
          </DialogContent>
          <DialogActions>
            <Button className="btnHref" style={{fontSize:"12px"}} onClick={this.confirmNew}>Hinzufügen</Button>
            <Button className="btnHref" style={{fontSize:"12px"}} onClick={this.cancel}>Abbrechen</Button>
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
        <DialogTitle><h5 className="card-title">Eine Ausstattung bearbeiten</h5></DialogTitle>
        <DialogContent>
          {this.state.pictureUrl&&<img src={this.state.pictureUrl} alt={this.state.pictureName} className="card-img-top"/>} 
          <label xl={3}>Add a picture</label>
          <input type="file" name="pictureUrl" cols="30" rows="5" onChange={this.handleFileChange} /><br/>
          Titel:
          <TextField
              margin="dense"
              name="header"
              // label="Titel"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.header}
              InputProps={{
                classes: {
                  input: this.props.classes.resize,
                },
              }}
            />
            Text:
            <TextField
              margin="dense"
              name="content"
              // label="Text"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.content}
              InputProps={{
                classes: {
                  input: this.props.classes.textfieldResize,
                },
              }}
              multiline
              rows="5"
            />
        </DialogContent>
        <DialogActions>
          <Button className="btnHref" style={{fontSize:"12px"}} onClick={this.confirmEdit}>Aktualisieren</Button>
          <Button className="btnHref" style={{fontSize:"12px"}} onClick={this.cancel}>Abbrechen</Button>
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
        <div className="page-title">
          <h1 className="page-title">Admin - Ausstattung</h1>
        </div>
        <div className="manage-container">
          <div className="card" style={{width: "30rem"}}>
            <div className="card-body">
            <h2><button onClick={this.selectMakeNew} className="btnHref">Neue Ausstattung</button></h2>
            </div>
          </div>
        </div>
        <section className="card-container">
            {this.createDisplay()}
        </section>
        {this.renderCreateNewPopup()}
        {this.renderEditOldPopup()}
        {this.confirmDeletePopup()}
      </div>
    );
  }
}

export default withStyles(styles)(EditAtelier);
