import React, { Component } from 'react';
import api from '../../../api';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pictures:[],
      makeNew:false,
      editOld:false,
      selectedOld:""
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

  selectMakeNew=()=>{
    this.setState({makeNew:true})
  }
  renderCreateNewPopup=()=>{
    return (
      <dialog open={this.state.makeNew}>

      </dialog>
    )
  }
  confirmNew=()=>{
    this.setState({makeNew:false})
    //the creating new thing
    this.updateData()
  }

  selectEditOld=(thing)=>{
    this.setState({editOld:true, selectedOld:thing})
  }
  renderEditOldPopup=()=>{
    return (
      <dialog open={this.state.editOld}>

      </dialog>
    )
  }
  confirmEdit=()=>{
    this.setState({editOld:false})
    //edit the old thing
    this.updateData()
  }

  onDelete=(id)=>{
    //delete in Backend
    this.updateData()
  }

  createDisplay=()=>{
    return this.state.pictures.map(pic=>{
      return(
        <React.Fragment>
          <button onClick={()=>this.selectEditOld(pic)}>Edit</button>
          <button onClick={()=>this.onDelete(pic.id)}>Delete</button>
        </React.Fragment>
      )
    })
  }

  render() {                
    return (
      <div className="Home">
        <h2>Edit galerie</h2>
        <p>This is a sample project with the MERN stack</p>
        <button onClick={this.selectMakeNew}>Neu</button>
        {this.createDisplay()}
        {this.renderCreateNewPopup()}
        {this.renderEditOldPopup()}
      </div>
    );
  }
}
