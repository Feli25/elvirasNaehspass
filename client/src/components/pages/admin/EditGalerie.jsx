import React, { Component } from 'react';
import api from '../../../api';
import {Dialog, Slide, DialogContent, DialogActions, Button, DialogTitle, TextField} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const styles = theme => ({
  resize:{
    fontSize:20
  },
});

class EditGalerie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pictures:[],
      makeNew:false,
      editOld:false,
      file:null,
      header:""
    }
  }
  componentDidMount=()=>{
    this.updateData()
  }
  updateData=()=>{
    api.getGaleriePictures()
      .then(pic=>{
        this.setState({pictures:pic})
      })
      .catch(err=>{console.log(err)})
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
  handleChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  selectMakeNew=()=>{
    this.setState({makeNew:true, header:"", file:null})
  }
  renderCreateNewPopup=()=>{
    return (
      <Dialog open={this.state.makeNew} TransitionComponent={Transition}>
          <DialogTitle><h5 className="card-title">Ein Galeriebild hinzufügen</h5></DialogTitle>
          <DialogContent>
            <label xl={3}>Add a picture</label>
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
                  InputProps={{
                    classes: {
                      input: this.props.classes.resize,
                    },
                  }}
                />
          </DialogContent>
          <DialogActions>
            <Button className="btnHref" onClick={this.confirmNew}>Hinzufügen</Button>
            <Button className="btnHref" onClick={this.cancel}>Abbrechen</Button>
          </DialogActions>
      </Dialog>
    )
  }
  confirmNew=()=>{
    this.setState({makeNew:false})
    let data = {
      header: this.state.header,
      picture : this.state.file
    }
    api.addGaleriePicture(data)
      .then(response=>{
        this.updateData()
      })
      .catch(er=>console.log(er))
  }

  onDelete=(id)=>{
    //delete in Backend
    api.deleteGaleriePicture(id)
      .then(sth=>
        this.updateData()
      )
      .catch(err=>console.log(err))
  }

  createDisplay=()=>{
    return this.state.pictures.map(pic=>{
      return(
        <div className="card" style={{width: "30rem"}} key={pic._id}>
          <img src={pic.imgPath} alt={pic.header} className="card-img-top"/>
          <div className="card-body">
              <p className="card-text">Name: {pic.header}</p>
            
            <button onClick={()=>this.onDelete(pic._id)} className="btnHref">Delete</button>
          </div>
        </div>
      )
    })
  }

  render() {                
    return (
      <div className="Home">
        <div className="page-title">
          <h1 className="page-title">Admin - Galerie</h1>
        </div>
        <div className="manage-container">
          <div className="card" style={{width: "30rem"}}>
            <div className="card-body">
            <h2><button onClick={this.selectMakeNew} className="btnHref">Neues Bild hinzufügen</button></h2>
            </div>
          </div>
        </div>
        <section className="card-container">
          {this.createDisplay()}
        </section>
        {this.renderCreateNewPopup()}
      </div>
    );
  }
}

export default withStyles(styles)(EditGalerie);

