import React, { Component } from 'react';
import api from '../../../api';
import {Dialog} from '@material-ui/core'

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
      <Dialog open={this.state.makeNew}>
        <label for="pictureUrl" xl={3}>Add a picture</label>
        <input type="file" name="pictureUrl" cols="30" rows="5" onChange={this.handleFileChange} />
        <br/><br/>
        <label for="header">Titel:</label>
        <input type="text" name="header" id="header" value={this.state.header} onChange={this.handleChange}/>
        <br/><br/>
        <button onClick={this.confirmNew}>Hinzufügen</button>
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
        <div class="card" style={{width: "30rem"}}>
          <img src={pic.imgPath} alt={pic.header} class="card-img-top"/>
          <div class="card-body">
              <p class="card-text">Name: {pic.header}</p>
            
            <button onClick={()=>this.onDelete(pic._id)} class="btnHref">Delete</button>
          </div>
        </div>
      )
    })
  }

  render() {                
    return (
      <div className="Home">
        <div class="page-title">
          <h1 class="page-title">Admin - Galerie</h1>
        </div>
        <div class="manage-container">
          <div class="card" style={{width: "30rem"}}>
            <div class="card-body">
            <h2><button onClick={this.selectMakeNew} class="btnHref">Neues Bild hinzufügen</button></h2>
            </div>
          </div>
        </div>
        <section class="card-container">
          <p>
            {this.createDisplay()}
          </p>
        </section>
        {this.renderCreateNewPopup()}
      </div>
    );
  }
}
