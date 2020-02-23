import React, { Component } from 'react';
import api from '../../../api';
import {Dialog, Slide,Checkbox, DialogContent, DialogActions, Button, DialogTitle, TextField} from '@material-ui/core'
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

class EditKurse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courses:[],
      editPopupOpen:false,
      editSpecialPopupOpen:false,
      makeNewPopupOpen:false,
      deleteConfirm:false,
      deleteId:"",
      id:null,
      
      header:"",
      content:"",
      list:[],
      teacher:"",
      specialInfo:[]
    }
  }
  componentDidMount=()=>{
    // this.setState({
    //   specialInfo: process.env.REACT_APP_API_URL ? "5cea38ad0990e07b27e88019": "5cea38bb84c7e20021f3b247"
    // })
    this.updateView()
  }
  updateView=()=>{
    api.getInfo("kurse")
      .then(kurse=>{
        this.setState({courses:kurse})
        api.getInfo("table")
          .then(table=>{
            this.setState({specialInfo:table})
          })
          .catch(err=>console.log(err))
    })
      .catch(err=>console.log(err))
  }
  renderNormalCards=()=>{
    return this.state.courses.map(course=>{
      return (
        <div className="card" style={{width: "30rem"}} key={course._id}>
          <div className="card-body">
            <h5 className="card-title">{course.header}</h5>
            <p className="card-text">{course.content}</p>
            {course.list.length>0 && course.list[0].name!=="" &&<ol>
              {course.list.map((item)=>{
                if(item.name!==""){
                  return (
                    <li key={item.name}>{item.name} {item.belegt && <span style={{color:"red"}}>belegt</span>}</li>
                  )
                }
              })}
            </ol>}
            <p className="card-text">by {course.teacher}</p>
            <button className="btnHref" onClick={()=>{this.selectEdit(course)}}>Bearbeiten</button>
            <button className="btnHref" onClick={()=>{this.deleteConfirm(course._id)}}>Löschen</button>
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
  confirmDeletePopup=()=>{
    return(
      <Dialog 
        open={this.state.deleteConfirm}
        TransitionComponent={Transition}>
          <DialogTitle><h5 className="card-title">Sicher?</h5></DialogTitle>
          <DialogContent>
            <p>Dass du diesen Kurs löschen möchtest?</p>
          </DialogContent>
          <DialogActions>
            <Button className="btnHref" style={{fontSize:"12px"}} onClick={this.onDelete}>Löschen</Button>
            <Button className="btnHref" style={{fontSize:"12px"}} onClick={this.cancel}>Abbrechen</Button>
          </DialogActions>
      </Dialog>
    )
  }
  onDelete=()=>{
    api.deleteInfo(this.state.deleteId)
      .then(response=>{
        console.log(response)
        this.cancel()
        this.updateView()
      })
      .catch(err=>{console.log(err)})
  }
  renderSpecificCard=()=>{
    return this.state.specialInfo.map(course=>{
      return (
        <div className="card flexible-card">
          <div className="card-body">
            <h5 className="card-title">{course.header}</h5>
            {course.list.length>0 && course.list[0].name!=="" &&
            <table className="table">
              <tr>
                <th>Kurs</th>
                <th>Uhrzeit</th>
                <th>Lehrer</th>
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
            <button className="btnHref" onClick={()=>{this.selectSpecialEdit(course)}}>Bearbeiten</button>
          </div>
        </div>
      )
    })
  }
  cancel=()=>{
    this.setState({
      editPopupOpen:false,
      makeNewPopupOpen:false,
      editSpecialPopupOpen:false,
      deleteConfirm:false,
      deleteId:""
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
          <DialogTitle><h5 className="card-title">Einen Kurs bearbeiten</h5></DialogTitle>
          <DialogContent>
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
            Inhalt:
            <TextField
              margin="dense"
              name="content"
              // label="Inhalt"
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
              rows="8"
            />
            Daten:<br/>
            {this.state.list.map((item,i)=>{
              return(
                <React.Fragment key={i}>
                  <TextField
    
                    margin="dense"
                    name="Stichpunkt"
                    // label="Stichpunkt"
                    type="text"
                    width="200px"
                    onChange={(e)=>this.updateList(i,e.target.value)}
                    value={item.name}
                    InputProps={{
                      classes: {
                        input: this.props.classes.resize,
                      },
                    }}
                  />
                  <Checkbox checked={item.belegt} onChange={()=>this.changeCheckBox(i)} />
                  <Button className="btnHref" onClick={()=>this.removeOneLine(i)}>X</Button>
                  <br/>
                </React.Fragment>
              )
            })}
            <Button className="btnHref" style={{fontSize:"12px"}} onClick={this.addLine}>Zeile hinzufügen</Button><br/><br/>
            Lehrer:
            <TextField
              margin="dense"
              name="teacher"
              // label="Lehrer"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.teacher}
              InputProps={{
                classes: {
                  input: this.props.classes.resize,
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button className="btnHref" style={{fontSize:"12px"}} onClick={this.confirmEdit}>Bestätigen</Button>
            <Button className="btnHref" style={{fontSize:"12px"}} onClick={this.cancel}>Abbrechen</Button>
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
          <DialogTitle><h5 className="card-title">Einen Kurs bearbeiten</h5></DialogTitle>
          <DialogContent>
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
            <table className="table">
              <tr>
                <th>Name</th>
                <th>Uhrzeit</th>
                <th>Lehrer</th>
                <th>belegt?</th>
                <th>Entfernen</th>
              </tr>
              {this.state.list.map((item,i)=>{
                var values = item.name.split("$")
                return(
                  <tr key={i}>
                  <td>
                    <TextField
      
                      margin="dense"
                      name="Name"
                      label="Name"
                      type="text"
                      width="200px"
                      onChange={(e)=>this.changeInputSpecial(i,e.target.value,0)}
                      value={values[0]}
                      InputProps={{
                        classes: {
                          input: this.props.classes.textfieldResize,
                        },
                      }}
                      multiline
                      rows="2"
                    />
                  </td>
                  <td>
                    <TextField
      
                      margin="dense"
                      name="Uhrzeit"
                      label="Uhrzeit"
                      type="text"
                      width="200px"
                      onChange={(e)=>this.changeInputSpecial(i,e.target.value,1)}
                      value={values[1]}
                      InputProps={{
                        classes: {
                          input: this.props.classes.resize,
                        },
                      }}
                    />
                  </td>
                  <td>
                    <TextField
      
                      margin="dense"
                      name="Lehrer"
                      label="Lehrer"
                      type="text"
                      width="200px"
                      onChange={(e)=>this.changeInputSpecial(i,e.target.value,2)}
                      value={values[2]}
                      InputProps={{
                        classes: {
                          input: this.props.classes.resize,
                        },
                      }}
                    />
                  </td>
                  <td><Checkbox checked={item.belegt} onChange={()=>this.changeCheckBox(i)} /></td>
                  <td><Button className="btnHref" onClick={()=>this.removeOneLine(i)}>X</Button></td>
                    <br/>
                  </tr>
                )
              })}
            </table>
          </DialogContent>
          <DialogActions>
            <Button className="btnHref" style={{fontSize:"12px"}} onClick={this.addSpecialLine}>Zeile hinzufügen</Button>
            <Button className="btnHref" style={{fontSize:"12px"}} onClick={this.confirmSpecialEdit}>Bestätigen</Button>
            <Button className="btnHref" style={{fontSize:"12px"}} onClick={this.cancel}>Abbrechen</Button>
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
      category:"TABLE",
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
        <DialogTitle><h5 className="card-title">Einen Kurs erstellen</h5></DialogTitle>
          <DialogContent>
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
            Inhalt:
            <TextField
              margin="dense"
              name="content"
              // label="Inhalt"
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
              rows="8"
            />
            Daten:<br/>
        {this.state.list.map((item,i)=>{
          return(
            <React.Fragment key={i}>
                  <TextField
    
                    margin="dense"
                    name="Stichpunkt"
                    // label="Stichpunkt"
                    type="text"
                    width="200px"
                    onChange={(e)=>this.updateList(i,e.target.value)}
                    value={item.name}
                    InputProps={{
                      classes: {
                        input: this.props.classes.resize,
                      },
                    }}
                  />
                  <Checkbox checked={item.belegt} onChange={()=>this.changeCheckBox(i)} />
                  <Button className="btnHref" onClick={()=>this.removeOneLine(i)}>X</Button>
                  <br/>
                </React.Fragment>
          )
        })}
        <Button className="btnHref" style={{fontSize:"12px"}} onClick={this.addLine}>Zeile hinzufügen</Button><br/><br/>
        Lehrer:
            <TextField
              margin="dense"
              name="teacher"
              // label="Lehrer"
              type="text"
              fullWidth
              onChange={this.handleChange}
              value={this.state.teacher}
              InputProps={{
                classes: {
                  input: this.props.classes.resize,
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button className="btnHref" style={{fontSize:"12px"}} onClick={this.confirmNew}>Bestätigen</Button>
            <Button className="btnHref" style={{fontSize:"12px"}} onClick={this.cancel}>Abbrechen</Button>
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
        <div className="page-title">
          <h1 className="page-title">Admin - Kurse</h1>
        </div>
        <div className="manage-container">
          <div className="card" style={{width: "30rem"}}>
            <div className="card-body">
            <h2><button onClick={this.selectMakeNew} className="btnHref">Neuen Kurs erstellen</button></h2>
            </div>
          </div>
        </div>
        <section className="card-container">
          {this.renderSpecificCard()}
        </section>
        <section className="card-container">
            {this.renderNormalCards()}
        </section>
        {this.renderEditPopup()}
        {this.renderSpecialEditPopup()}
        {this.renderMakeNewPopup()}
        {this.confirmDeletePopup()}
      </div>
    );
  }
}

export default withStyles(styles)(EditKurse);
