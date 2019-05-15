import React, { Component } from 'react';
import api from '../../../api';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id:null,
      header:"",
      content:"",
      list:[],
      courses:[],
      editPopupOpen:false
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
          <div class="card-body">
            <h5 class="card-title">{course.header}</h5>
            <p class="card-text">{course.content}</p>
            {course.list.length>0 && <ol>
              {course.list.map(item=>{
                return (
                  <li>{item.name} {item.belegt && <span style={{color:"red"}}>belegt</span>}</li>
                )
              })}
            </ol>}
            <button class="btnHref" onClick={()=>{this.selectEdit(course)}}>Bearbeiten</button>
          </div>
        </div>
      )
    })
  }
  selectEdit=(course)=>{
    this.setState({
      id:course._id,
      header:course.header,
      content:course.content,
      list:course.list,
      editPopupOpen:true
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
  renderEditPopup=()=>{
    return (
      <dialog open={this.state.editPopupOpen}>
        <input name="header" value={this.state.header} onChange={this.handleChange}/>
        <input name="content" value={this.state.content} onChange={this.handleChange}/>
        {this.state.list.map((item,i)=>{
          return(
            <React.Fragment key={i}>
              <input onChange={(e)=>this.updateList(i,e.target.value)} value={item.name}/><checkbox onChange={()=>this.changeCheckBox(i)} value={item.belegt}/>
            </React.Fragment>
          )
        })}
        <button onClick={this.addLine}>Zeile hinzufügen</button>
      </dialog>
    )
  }
  confirmEdit=()=>{
    let data ={
      header:this.state.header,
      content:this.state.content,
      list:this.state.list,
      category:"KURSE"
    }
    api.updateInfo(this.state.id,data)
      .then(res=>{
        this.setState({id:null, editPopupOpen:false})
        this.updateView()
      })
      .catch(err=>console.log(err))
  }
  render() {                
    return (
      <div className="Home">
        <h2>Edit Kurse</h2>
        <p>This is a sample project with the MERN stack</p>
        {this.renderEditPopup()}
      </div>
    );
  }
}
