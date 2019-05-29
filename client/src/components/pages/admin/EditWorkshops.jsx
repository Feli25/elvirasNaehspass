import React, { Component } from 'react';
import api from '../../../api';
import {Dialog, Slide, Checkbox, DialogContent, DialogActions, Button, DialogTitle, TextField} from '@material-ui/core'
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

class EditWorkshop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courses:[],
      editPopupOpen:false,
      makeNewPopupOpen:false,
      id:null,
      deleteConfirm:false,
      deleteId:"",

      header:"",
      content:"",
      list:[],
      teacher:""
    }
  }
  componentDidMount=()=>{
    this.updateView()
  }
  updateView=()=>{
    api.getInfo("workshops")
      .then(kurse=>{
        this.setState({courses:kurse})
      })
      .catch(err=>console.log(err))
  }
  renderCards=()=>{
    return this.state.courses.map(course=>{
      return (
        <div className="card" style={{width: "30rem"}} key={course._id}>
          <div className="card-body">
            <h5 className="card-title">{course.header}</h5>
            <p className="card-text">{course.content}</p>
            {course.list.length>0 && course.list[0].name!=="" && <ol>
              {course.list.map(item=>{
                return (
                  <li key={item.name}>{item.name} {item.belegt && <span style={{color:"red"}}>belegt</span>}</li>
                )
              })}
            </ol>}
            <p className="card-text">Dieser Workshop wird von {course.teacher} durchgeführt.</p>
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
            <p>Dass du diesen Workshop löschen möchtest?</p>
          </DialogContent>
          <DialogActions>
            <Button className="btnHref" onClick={this.onDelete}>Löschen</Button>
            <Button className="btnHref" onClick={this.cancel}>Abbrechen</Button>
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

  cancel=()=>{
    this.setState({
      editPopupOpen:false,
      makeNewPopupOpen:false,
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
          <DialogTitle><h5 className="card-title">Einen Workshop bearbeiten</h5></DialogTitle>
          <DialogContent>
          <TextField
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
            <TextField
              margin="dense"
              name="content"
              label="Inhalt"
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
        {this.state.list.map((item,i)=>{
          return(
            <React.Fragment key={i}>
                  <TextField
    
                    margin="dense"
                    name="Stichpunkt"
                    label="Stichpunkt"
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
          <TextField
              margin="dense"
              name="teacher"
              label="Lehrer"
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
            <Button className="btnHref" onClick={this.addLine}>Zeile hinzufügen</Button>
            <Button className="btnHref" onClick={this.confirmEdit}>Bestätigen</Button>
            <Button className="btnHref" onClick={this.cancel}>Abbrechen</Button>
          </DialogActions>
      </Dialog>
    )
  }
  confirmEdit=()=>{
    let data ={
      header:this.state.header,
      content:this.state.content,
      list:this.state.list,
      category:"WORKSHOPS",
      teacher:this.state.teacher
    }
    api.updateInfo(this.state.id,data)
      .then(res=>{
        this.setState({editPopupOpen:false, id:null})
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
        <DialogTitle><h5 className="card-title">Einen Workshop erstellen</h5></DialogTitle>
        <DialogContent>
          <TextField
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
            <TextField
              margin="dense"
              name="content"
              label="Inhalt"
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
        {this.state.list.map((item,i)=>{
          return(
            <React.Fragment key={i}>
                  <TextField
    
                    margin="dense"
                    name="Stichpunkt"
                    label="Stichpunkt"
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
            <TextField
              margin="dense"
              name="teacher"
              label="Lehrer"
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
            <Button className="btnHref" onClick={this.addLine}>Zeile hinzufügen</Button>
            <Button className="btnHref" onClick={this.confirmNew}>Bestätigen</Button>
            <Button className="btnHref" onClick={this.cancel}>Abbrechen</Button>
          </DialogActions>
      </Dialog>
    )
  }
  confirmNew=()=>{
    let data ={
      header:this.state.header,
      content:this.state.content,
      list:this.state.list.length !== 0 ? this.state.list:[{name:"",belegt:false}],
      category:"WORKSHOPS",
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
          <h1 className="page-title">Admin - Workshops</h1>
        </div>
        <div className="manage-container">
          <div className="card" style={{width: "30rem"}}>
            <div className="card-body">
            <h2><button onClick={this.selectMakeNew} className="btnHref">Neuen Workshop erstellen</button></h2>
            </div>
          </div>
        </div>
        <section className="card-container">
            {this.renderCards()}
        </section>
        {this.renderEditPopup()}
        {this.renderMakeNewPopup()}
        {this.confirmDeletePopup()}
      </div>
    );
  }
}

export default withStyles(styles)(EditWorkshop);
