import React, { Component } from 'react';
import api from '../../../api';
import {Dialog, Slide, DialogContentText,Checkbox, DialogContent, DialogActions, Button, DialogTitle, TextField} from '@material-ui/core'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courses:[],
      editPopupOpen:false,
      editSpecialPopupOpen:false,
      makeNewPopupOpen:false,
      id:null,
      
      header:"",
      content:"",
      list:[],
      teacher:"",
      specialInfo:""
    }
  }
  componentDidMount=()=>{
    this.setState({
      specialInfo: process.env!==undefined ? "5cea38ad0990e07b27e88019": "5cea38bb84c7e20021f3b247"
    })
    this.updateView()
  }
  updateView=()=>{
    api.getInfo("kurse")
      .then(kurse=>{
        this.setState({courses:kurse})
      })
      .catch(err=>console.log(err))
  }
  renderNormalCards=()=>{
    return this.state.courses.filter(
      course => {return course._id !== this.state.specialInfo}
    ).map(course=>{
      return (
        <div class="card" style={{width: "30rem"}}>
          <div class="card-body">
            <h5 class="card-title">{course.header}</h5>
            <p class="card-text">{course.content}</p>
            {course.list.length>0 && course.list[0].name!=="" &&<ol>
              {course.list.map((item)=>{
                if(item.name!==""){
                  return (
                    <li>{item.name} {item.belegt && <span style={{color:"red"}}>belegt</span>}</li>
                  )
                }
              })}
            </ol>}
            <p class="card-text">by {course.teacher}</p>
            <button class="btnHref" onClick={()=>{this.selectEdit(course)}}>Bearbeiten</button>
          </div>
        </div>
      )
    })
  }
  renderSpecificCard=()=>{
    return this.state.courses.filter(
      course=>{return course._id===this.state.specialInfo}
    ).map(course=>{
      return (
        <div class="card flexible-card">
          <div class="card-body">
            <h5 class="card-title">{course.header}</h5>
            {course.list.length>0 && course.list[0].name!=="" &&
            <table class="table">
              <tr>
                <th>Kurs</th>
                <th>Terminanzahl</th>
                <th>Beginn</th>
                <th>   </th>
              </tr>
              {course.list.map((item)=>{
                if(item.name!==""){
                  var values = item.name.split("$")
                  return (
                    <tr>
                      <td>{values[0]}</td>
                      <td>{values[1]}</td>
                      <td>{values[2]}</td>
                      <td>{item.belegt && <span style={{color:"red"}}>belegt</span>}</td>
                    </tr>
                  )
                }
              })}
            </table>}
            <button class="btnHref" onClick={()=>{this.selectSpecialEdit(course)}}>Bearbeiten</button>
          </div>
        </div>
      )
    })
  }
  cancel=()=>{
    this.setState({
      editPopupOpen:false,
      makeNewPopupOpen:false,
      editSpecialPopupOpen:false
    })
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  addLine=()=>{
    var array = this.state.list
    array.push({
      name:"",
      belegt:false
    })
    this.setState({list:array})
  }
  updateList=(index,value)=>{
    var array = this.state.list
    array[index].name = value
    this.setState({list:array})
  }
  changeCheckBox=(index)=>{
    var array = this.state.list
    array[index].belegt = !this.state.list[index].belegt
    this.setState({list:array})
  }
  removeOneLine=(index)=>{
    var array = this.state.list
    array.splice(index,1)
    this.setState({list:array})
  }

  selectEdit=(course)=>{
    this.setState({
      id:course._id,
      header:course.header,
      content:course.content,
      list:course.list,
      editPopupOpen:true,
      teacher:course.teacher
    })
  }
  renderEditPopup=()=>{
    return (
      <Dialog open={this.state.editPopupOpen} TransitionComponent={Transition}>
          <DialogTitle><h5 class="card-title">Einen Kurs bearbeiten</h5></DialogTitle>
          <DialogContent>
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
              label="Inhalt"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.content}
            />
            {this.state.list.map((item,i)=>{
              return(
                <React.Fragment key={i}>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="Stichpunkt"
                    label="Stichpunkt"
                    type="text"
                    width="200px"
                    onChange={(e)=>this.updateList(i,e.target.value)}
                    value={item.name}
                  />
                  <Checkbox checked={item.belegt} onChange={()=>this.changeCheckBox(i)} />
                  <Button class="btnHref" onClick={()=>this.removeOneLine(i)}>X</Button>
                  <br/>
                </React.Fragment>
              )
            })}
            <TextField
              autoFocus
              margin="dense"
              name="teacher"
              label="Lehrer"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.teacher}
            />
          </DialogContent>
          <DialogActions>
            <Button class="btnHref" onClick={this.addLine}>Zeile hinzufügen</Button>
            <Button class="btnHref" onClick={this.confirmEdit}>Bestätigen</Button>
            <Button class="btnHref" onClick={this.cancel}>Abbrechen</Button>
          </DialogActions>
      </Dialog>
    )
  }
  confirmEdit=()=>{
    let data ={
      header:this.state.header,
      content:this.state.content,
      list:this.state.list.length!==0 ? this.state.list:[{name:"",belegt:false}],
      category:"KURSE",
      teacher:this.state.teacher
      // picture:this.state.file,
      // pictureUrl:this.state.pictureUrl,
      // pictureName:this.state.pictureName,
      // public_id:this.state.public_id,
    }
    api.updateInfo(this.state.id,data)
      .then(res=>{
        this.setState({id:null, editPopupOpen:false})
        this.updateView()
      })
      .catch(err=>console.log(err))
  }

  selectSpecialEdit=(course)=>{
    this.setState({
      id:course._id,
      header:course.header,
      content:course.content,
      list:course.list,
      editSpecialPopupOpen:true,
      teacher:course.teacher
    })
  }
  renderSpecialEditPopup=()=>{
    return (
      <Dialog open={this.state.editSpecialPopupOpen} TransitionComponent={Transition}>
          <DialogTitle><h5 class="card-title">Einen Kurs bearbeiten</h5></DialogTitle>
          <DialogContent>
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
            <table class="table">
              <tr>
                <th>Name</th>
                <th>Anzahl</th>
                <th>Startdatum</th>
                <th>belegt?</th>
                <th>Entfernen</th>
              </tr>
              {this.state.list.map((item,i)=>{
                var values = item.name.split("$")
                return(
                  <tr key={i}>
                  <td>
                    <TextField
                      autoFocus
                      margin="dense"
                      name="Stichpunkt"
                      label="Stichpunkt"
                      type="text"
                      width="200px"
                      onChange={(e)=>this.changeInputSpecial(i,e.target.value,0)}
                      value={values[0]}
                    />
                  </td>
                  <td>
                    <TextField
                      autoFocus
                      margin="dense"
                      name="Stichpunkt"
                      label="Stichpunkt"
                      type="text"
                      width="200px"
                      onChange={(e)=>this.changeInputSpecial(i,e.target.value,1)}
                      value={values[1]}
                    />
                  </td>
                  <td>
                    <TextField
                      autoFocus
                      margin="dense"
                      name="Stichpunkt"
                      label="Stichpunkt"
                      type="text"
                      width="200px"
                      onChange={(e)=>this.changeInputSpecial(i,e.target.value,2)}
                      value={values[2]}
                    />
                  </td>
                  <td><Checkbox checked={item.belegt} onChange={()=>this.changeCheckBox(i)} /></td>
                  <td><Button class="btnHref" onClick={()=>this.removeOneLine(i)}>X</Button></td>
                    <br/>
                  </tr>
                )
              })}
            </table>
          </DialogContent>
          <DialogActions>
            <Button class="btnHref" onClick={this.addSpecialLine}>Zeile hinzufügen</Button>
            <Button class="btnHref" onClick={this.confirmSpecialEdit}>Bestätigen</Button>
            <Button class="btnHref" onClick={this.cancel}>Abbrechen</Button>
          </DialogActions>
      </Dialog>
    )
  }
  addSpecialLine=()=>{
    var array = this.state.list
    array.push({
      name:"$$",
      belegt:false
    })
    this.setState({list:array})
  }
  changeInputSpecial=(i,input,place)=>{
    var values = this.state.list[i].name.split("$")
    values[place] = input
    var array = this.state.list
    array[i].name = values.join("$")
    this.setState({list:array})
  }
  confirmSpecialEdit=()=>{
    let data ={
      header:this.state.header,
      content:"platzhalter",
      list:this.state.list.length!==0 ? this.state.list:[{name:"$$",belegt:false}],
      category:"KURSE",
      teacher:"platzhalter"
    }
    api.updateInfo(this.state.id,data)
      .then(res=>{
        this.setState({id:null, editSpecialPopupOpen:false})
        this.updateView()
      })
      .catch(err=>console.log(err))
  }

  selectMakeNew=()=>{
    this.setState({
      id:"",
      header:"",
      content:"",
      list:[],
      makeNewPopupOpen:true,
      teacher:""
    })
  }
  renderMakeNewPopup=()=>{
    return (
      <Dialog open={this.state.makeNewPopupOpen} TransitionComponent={Transition}>
        <DialogTitle><h5 class="card-title">Einen Kurs erstellen</h5></DialogTitle>
          <DialogContent>
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
              label="Inhalt"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.content}
            />
        {this.state.list.map((item,i)=>{
          return(
            <React.Fragment key={i}>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="Stichpunkt"
                    label="Stichpunkt"
                    type="text"
                    width="200px"
                    onChange={(e)=>this.updateList(i,e.target.value)}
                    value={item.name}
                  />
                  <Checkbox checked={item.belegt} onChange={()=>this.changeCheckBox(i)} />
                  <Button class="btnHref" onClick={()=>this.removeOneLine(i)}>X</Button>
                  <br/>
                </React.Fragment>
          )
        })}
            <TextField
              autoFocus
              margin="dense"
              name="teacher"
              label="Lehrer"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.teacher}
            />
          </DialogContent>
          <DialogActions>
            <Button class="btnHref" onClick={this.addLine}>Zeile hinzufügen</Button>
            <Button class="btnHref" onClick={this.confirmNew}>Bestätigen</Button>
            <Button class="btnHref" onClick={this.cancel}>Abbrechen</Button>
          </DialogActions>
      </Dialog>
    )
  }
  confirmNew=()=>{
    let data ={
      header:this.state.header,
      content:this.state.content,
      list:this.state.list.length !== 0 ? this.state.list:[{name:"",belegt:false}],
      category:"KURSE",
      teacher:this.state.teacher
      // picture:this.state.file
    }
    api.addInfo(data)
      .then(res=>{
        this.setState({makeNewPopupOpen:false})
        this.updateView()
      })
      .catch(err=>console.log(err))
  }

  render() {     
    return (
      <div className="Home">
        <div class="page-title">
          <h1 class="page-title">Admin - Kurse</h1>
        </div>
        <div class="manage-container">
          <div class="card" style={{width: "30rem"}}>
            <div class="card-body">
            <h2><button onClick={this.selectMakeNew} class="btnHref">Neuen Kurs erstellen</button></h2>
            </div>
          </div>
        </div>
          {this.renderSpecificCard()}
        <section class="card-container">
        </section>
        <section class="card-container">
            {this.renderNormalCards()}
        </section>
        {this.renderEditPopup()}
        {this.renderSpecialEditPopup()}
        {this.renderMakeNewPopup()}
      </div>
    );
  }
}
