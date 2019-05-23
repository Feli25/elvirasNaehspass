import React, { Component } from 'react';
import api from '../../api';
import StaticContentWorkshop from './StaticContentWorkshop'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infoBoxes:[]
    }
  }
  componentDidMount(){
    api.getInfo("workshops")
      .then(workshops=>{
        this.setState({infoBoxes:workshops})
      })
      .catch(err=>console.log(err))
  }
  createCards=()=>{
    return (
      <section class="card-container">
        {this.state.infoBoxes.map(box=>{
          return (
            <div class="card" style={{width: "30rem"}}>
              <div class="card-body">
                <h5 class="card-title">{box.header}</h5>
                <p class="card-text">{box.content}</p>
                {box.list.length>0&&box.list[0].name!==""&&
                  <p class="card-text">Daten:
                    <ul>
                      {box.list.map(item=>{
                        if(item.name!==""){
                          return(
                            <li>{item.name}{"   "}{item.belegt&&<span color="red">Belegt</span>}</li>
                            )
                          }
                        })}
                    </ul>
                  </p>
                }
                {box.teacher !== "" &&
                  <h4 class="card-subtitle mb-2 text-muted">Dieser Workshop wird von {box.teacher} durchgeführt.</h4>
                }
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
          <h1 class="page-title">Workshops</h1>
        </div>
        <p>
          <div class="card-container">
            <div class="card book-workshop" style={{width: "30rem"}}>
              <div class="card-body">
                <a href="/anmeldung/workshops">Einen Workshop buchen</a>
              </div>
            </div>
          </div>
            <StaticContentWorkshop />
            {this.createCards()}
        </p>
      </div>
    );
  }
}