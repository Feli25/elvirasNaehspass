import React, { Component } from 'react';
import api from '../../api';
import StaticContentKurse from './StaticContentKurse';
import CountDownClock from '../CountDownClock'

export default class Kurse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infoBoxes:[],
      specialInfo:[]
    }
  }
  componentDidMount(){
    // this.setState({
    //   specialInfo: process.env.REACT_APP_API_URL ? "5cea38ad0990e07b27e88019": "5cea38bb84c7e20021f3b247"
    // })
    api.getInfo("kurse")
      .then(kurse=>{
        this.setState({infoBoxes:kurse})
        api.getInfo("table")
          .then(table=>{
            this.setState({specialInfo:table})
          })
          .catch(err=>console.log(err))
      })
      .catch(err=>console.log(err))
  }
  renderSpecificFlexibleContent=()=>{
    return (
      <section className="card-container">
        {this.state.specialInfo.map(course=>{
          return (
            <div className="card flexible-card">
              <div className="card-body">
                <h1>{course.header}</h1>
                BB = Barbara Beckmann<br/>
                ED = Elvira Deutges<br/>
                NM = Nicola Münter<br/>
                SB = Simone Becher
                {/* <h5 className="card-title">{course.header}</h5> */}
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
      <section className="card-container">
        {this.state.infoBoxes.map(course=>{
          return (
            <div className="card" style={{width: "30rem"}}>
              <div className="card-body">
                <h5 className="card-title">{course.header}</h5>
                <p className="card-text">{course.content}</p>
                {course.list.length>0 && course.list[0].name!=="" &&<ol>
                  {course.list.map((item)=>{
                    if(item.name!==""){
                      return (
                        <li key={item.name}>{item.name}{item.belegt && <span style={{color:"red"}}>belegt</span>}</li>
                      )
                    }
                  })}
                </ol>}
                <p className="card-text">by {course.teacher}</p>
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
        <div className="page-title">
          <h1 className="page-title">Kurse</h1>
        </div>
          <br/>
          {/* <div className="button-container">
            <p style={{fontSize:"20px"}}><strong>Die nächste Anmeldung findet am 30.6.2019 um 11 Uhr statt!!</strong></p>
          </div> */}
          {/* <section className="card-container">
            <div className="countDownHome" key="countdown">
              <CountDownClock/>
            </div>
          </section> */}
          <div className="button-container">
            <a id="class-page-button" className="btnHref" href="/anmeldung/kurse">Einen Kurs buchen</a>
          </div>
            <section className="card-container">
              <StaticContentKurse/>
              {this.renderSpecificFlexibleContent()}
            </section>
            {this.renderNormalFlexibleContent()}
      </div>
    );
  }
}