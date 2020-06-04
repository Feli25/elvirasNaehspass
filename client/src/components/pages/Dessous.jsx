import React, { Component } from 'react';
import api from '../../api';
import StaticContentDessous from './StaticContentDessous'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      infoBoxes:[]
    }
  }
  componentDidMount(){
    api.getInfo("dessous")
      .then(workshops=>{
        this.setState({infoBoxes:workshops})
      })
      .catch(err=>console.log(err))
  }
  createCards=()=>{
    return (
      <section className="card-container">
        {this.state.infoBoxes.map(box=>{
          return (
            <div className="card" style={{width: "30rem"}} key={box.header}>
              <div className="card-body">
                <h5 className="card-title">{box.header}</h5>
                <p className="card-text">{box.content}</p>
                {box.list.length>0&&box.list[0].name!==""&&
                    <ul className="card-text">
                    Daten:
                      {box.list.map(item=>{
                        if(item.name!==""){
                          return(
                            <li  key={item.name} >{item.name}{"   "}{item.belegt&&<span color="red">Belegt</span>}</li>
                            )
                          } else {return <React.Fragment></React.Fragment>}
                        })}
                    </ul>
                }
                {box.teacher !== "" &&
                  <h4 className="card-subtitle mb-2 text-muted">Dieser Workshop wird von {box.teacher} durchgeführt.</h4>
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
        <div className="page-title">
          <h1 className="page-title">Dessous-Workshops</h1>
        </div>
          <div className="card-container">
            <div className="card book-workshop" style={{width: "30rem"}}>
              <div className="card-body">
                <a href="/anmeldung/workshop">Einen Dessous-Workshop buchen</a>
              </div>
            </div>
          </div>
            <StaticContentDessous />
            {this.createCards()}
      </div>
    );
  }
}