import React, { Component } from 'react';
import api from '../../api';
import StaticContentKurse from './StaticContentKurse';

export default class Kurse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infoBoxes:[],
      specialInfo:""
    }
  }
  componentDidMount(){
    this.setState({
      specialInfo: process.env.REACT_APP_API_URL ? "5cea38ad0990e07b27e88019": "5cea38bb84c7e20021f3b247"
    })
    api.getInfo("kurse")
      .then(kurse=>{
        this.setState({infoBoxes:kurse})
      })
      .catch(err=>console.log(err))
  }
  renderSpecificFlexibleContent=()=>{
    return (
      <section class="card-container">
        {this.state.infoBoxes.filter(course=>{return course._id===this.state.specialInfo}
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
              </div>
            </div>
          )
        })
        }
      </section>
    )
  }
  renderNormalFlexibleContent=()=>{
    return (
      <section class="card-container">
        {this.state.infoBoxes.filter(
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
        })}
      </section>
    )
  }
  render() {                
    return (
      <div className="Home">
        <div class="page-title">
          <h1 class="page-title">Kurse</h1>
        </div>
        <p>
          <br/>
          <div class="button-container">
            <p style={{fontSize:"20px"}}><strong>Die nächste Anmeldung findet am 17.3.2019 um 11 Uhr statt!!</strong></p>
          </div>
          <div class="button-container">
            <a id="class-page-button" class="btnHref" href="/anmeldung/kurse">Buchen</a>
          </div>
            <StaticContentKurse/>
            {this.renderSpecificFlexibleContent()}
            {this.renderNormalFlexibleContent()}
        </p>
      </div>
    );
  }
}