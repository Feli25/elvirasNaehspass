import React, { Component } from 'react';
import api from '../../../api';

export default class Home extends Component {
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
      <dialog open={this.state.makeNew}>
        <label for="pictureUrl" xl={3}>Add a picture</label>
        <input type="file" name="pictureUrl" cols="30" rows="5" onChange={this.handleFileChange} />
        <br/><br/>
        <label for="header">Titel:</label>
        <input type="text" name="header" id="header" value={this.state.header} onChange={this.handleChange}/>
        <br/><br/>
        <button onClick={this.confirmNew}>Hinzufügen</button>
      </dialog>
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
        <React.Fragment>
          <img src={pic.imgPath} alt={pic.header}/>
          <br/><br/>
          Name: {pic.header}
          <br/><br/>
          <button onClick={()=>this.onDelete(pic._id)}>Delete</button>
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
      </div>
    );
  }
}
