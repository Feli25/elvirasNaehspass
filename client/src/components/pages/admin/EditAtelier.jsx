import React, { Component } from 'react';
import api from '../../../api';

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

  selectMakeNew=()=>{
    this.setState({
      selectedOld:"",
      header:"",
      content:"",
      makeNew:true
    })
  }
  renderCreateNewPopup=()=>{
    return (
      <dialog open={this.state.makeNew}>
        <label for="header">Titel:</label>
        <input type="text" name="header" id="header" value={this.state.header} onChange={this.handleChange}/>
        <br/><br/>
        <label for="content">Text:</label>
        <input type="text" name="content" id="content" value={this.state.content} onChange={this.handleChange}/>
        <br/><br/>
        <button onClick={this.confirmNew}>Hinzufügen</button>
      </dialog>
    )
  }
  confirmNew=()=>{
    this.setState({makeNew:false})
    let data ={
      header: this.state.header,
      content:this.state.content
    }
    api.addEquipment(data)
      .then(response=>{
        console.log(response)
        this.updateData()
      })
      .catch(err=>{console.log(err)})
  }

  selectEditOld=(thing)=>{
    this.setState({editOld:true, 
      selectedOld:thing,
      header:thing.header,
      content:thing.content
    })
  }
  renderEditOldPopup=()=>{
    return (
      <dialog open={this.state.editOld}>      
        <label for="header">Titel:</label>
        <input type="text" name="header" id="header" value={this.state.header} onChange={this.handleChange}/>
        <br/><br/>
        <label for="content">Text:</label>
        <input type="text" name="content" id="content" value={this.state.content} onChange={this.handleChange}/>
        <br/><br/>
        <button onClick={this.confirmEdit}>Aktualisieren</button>
      </dialog>
    )
  }
  confirmEdit=()=>{
    this.setState({editOld:false})
    let data={
      header:this.state.header,
      content:this.state.content
    }
    api.updateEquipment(this.state.selectedOld._id, data)
      .then(response=>{
        console.log(response)
        this.updateData()
      })
      .catch(err=>{console.log(err)})
  }

  onDelete=(id)=>{
    api.deleteEquipment(id)
      .then(response=>{
        console.log(response)
        this.updateData()
      })
      .catch(err=>{console.log(err)})
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

  render() {                
    return (
      <div className="Home">
        <div class="page-title">
          <h1 class="page-title">Admin - Ausstattung</h1>
        </div>
        <section class="card-container">
          <div class="card" style={{width: "45rem"}}>
              <div class="card-body">
                <p><button onClick={this.selectMakeNew}>Neu</button></p>
              </div>
            </div>
        </section>
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
