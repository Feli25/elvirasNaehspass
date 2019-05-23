import React, { Component } from 'react';
import api from '../../../api';
import {Dialog} from '@material-ui/core'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courses:[],
      editPopupOpen:false,
      makeNewPopupOpen:false,
      id:null,
      
      header:"",
      content:"",
      list:[],
      teacher:""
      // pictureUrl:"",
      // pictureName:"",
      // public_id:"",
      // file:null
    }
  }
  componentDidMount=()=>{
    this.updateView()
  }
  updateView=()=>{
    api.getInfo("kurse")
      .then(kurse=>{
        this.setState({courses:kurse})
      })
      .catch(err=>console.log(err))
  }
  renderCards=()=>{
    return this.state.courses.map(course=>{
      return (
        <div class="card" style={{width: "30rem"}}>
        {/* {course.imgPath && 
          <img src={ course.imgPath } alt={ course.imgName } class="card-img-top" />} */}
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

  cancel=()=>{
    this.setState({
      editPopupOpen:false,
      makeNewPopupOpen:false
    })
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  // handleFileChange=(e)=>{
  //   e.preventDefault();
  //   const file = e.target.files[0];
  //   this.setState({
  //     file: file,
  //     pictureUrl: null,
  //   })
  // }
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
      // pictureUrl:course.imgPath,
      // pictureName:course.imgName,
      // public_id:course.public_id
    })
  }
  renderEditPopup=()=>{
    return (
      <Dialog open={this.state.editPopupOpen}>
        {/* <label for="pictureUrl" xl={3}>Add a picture</label>
        <input type="file" name="pictureUrl" cols="30" rows="5" onChange={this.handleFileChange} /> */}
        <label for="header">Titel</label>
        <input name="header" id="header" value={this.state.header} onChange={this.handleChange}/>
        <br/><br/>
        <label for="content">Inhalt</label>
        <input name="content" id="content" value={this.state.content} onChange={this.handleChange}/>
        <br/><br/>
        {this.state.list.map((item,i)=>{
          return(
            <React.Fragment key={i}>
              <input onChange={(e)=>this.updateList(i,e.target.value)} value={item.name}/>
              <input type="checkbox" onChange={()=>this.changeCheckBox(i)} checked={item.belegt}/>
              <button onClick={()=>this.removeOneLine(i)}>X</button>
              <br/><br/>
            </React.Fragment>
          )
        })}
        <label for="teacher">Teacher</label>
        <input name="teacher" id="teacher" value={this.state.teacher} onChange={this.handleChange}/>
        <br/><br/>
        <button onClick={this.addLine}>Zeile hinzufügen</button>
        <button onClick={this.confirmEdit}>Bestätigen</button>
        <button onClick={this.cancel}>Abbrechen</button>
      </Dialog>
    )
  }
  confirmEdit=()=>{
    let data ={
      header:this.state.header,
      content:this.state.content,
      list:this.state.list.length!==0 ? this.state.list:[{name:"",belegt:false}],
      category:"KURSE",
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
      <Dialog open={this.state.makeNewPopupOpen}>
        {/* <label for="pictureUrl" xl={3}>Add a picture</label>
        <input type="file" name="pictureUrl" cols="30" rows="5" onChange={this.handleFileChange} /> */}
        <label for="header">Titel</label>
        <input name="header" value={this.state.header} onChange={this.handleChange}/>
        <br/><br/>
        <label for="content">Inhalt</label>
        <input name="content" value={this.state.content} onChange={this.handleChange}/>
        <br/><br/>
        {this.state.list.map((item,i)=>{
          return(
            <React.Fragment key={i}>
              <input onChange={(e)=>this.updateList(i,e.target.value)} value={item.name}/>
              <input type="checkbox" onChange={()=>this.changeCheckBox(i)} value={item.belegt}/>
              <button onClick={()=>this.removeOneLine(i)}>X</button>
              <br/><br/>
            </React.Fragment>
          )
        })}
        <label for="teacher">Teacher</label>
        <input name="teacher" value={this.state.teacher} onChange={this.handleChange}/>
        <br/><br/>
        <button onClick={this.addLine}>Zeile hinzufügen</button>
        <button onClick={this.confirmNew}>Bestätigen</button>
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
        <button onClick={this.selectMakeNew}>Neu</button>
        <section class="card-container">
          <p>
            {this.renderCards()}
          </p>
        </section>
        {this.renderEditPopup()}
        {this.renderMakeNewPopup()}
      </div>
    );
  }
}
