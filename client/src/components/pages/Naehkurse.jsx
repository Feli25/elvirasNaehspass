import React, { Component } from 'react';
import Slider from '../Slider'
import Card from '../Card'

import naehkurse from '../../data/naehkurse.json'
const picturesKurse = [
  'https://res.cloudinary.com/mcfrihfd/image/upload/v1560006430/project2React/kurseworkshops/kurse.jpg',
  'https://res.cloudinary.com/mcfrihfd/image/upload/v1558623547/project2React/news/kursdurchgang.jpg.jpg'
  ]
const picturesWorkshops = [
  'https://res.cloudinary.com/mcfrihfd/image/upload/v1572813405/project2React/kurseworkshops/IMG_2701.JPG.jpg'
  ]
const picturesWeekend = [
  'https://res.cloudinary.com/mcfrihfd/image/upload/v1558623594/project2React/news/freckenhorst.jpg.jpg',
  ]
const picturesDessous = [
  'https://res.cloudinary.com/mcfrihfd/image/upload/v1601928643/project2React/kurseworkshops/Twelf.jpg',
  'https://res.cloudinary.com/mcfrihfd/image/upload/v1601928713/project2React/kurseworkshops/Fourteen.jpg'
  ]

export default class Naehkurse extends Component {
  render () {
    return (
      <div className="naehkurse">
        <h2 className="title">Nähkurse & Workshops</h2>
        
        <Slider
          automaticMovement={true}
          content={picturesKurse.map(pic=><img src={pic} alt="galerie" className="slider__img"/>)}
        />
        <div className="home__text">
          <div className="info-block">
            <h3 className="info-block__header">Wichtige Infos</h3>
            <p className="info-block__text">
              Hier finden Sie alle unsere Unterrichtsangebote! Wir hoffen es ist etwas passendes dabei.
              Wenn Sie sich angemeldet haben, werden wir vor dem ersten Unterricht ein Telefonat führen, um die benötigten Materialien zu besprechen.
              Bitte decken Sie sich nicht selber mit Material ein, bevor man einmal drüber gesprochen hat.
              Es gibt sehr große Qualitätsunterschiede in diesem Gebiet und nicht alle Sachen sind für jedes Level von Näherfahrung geeignet. 
              Außerdem haben wir viele Materialien zur Ausleihe vor Ort.
            </p>
          </div>
        </div>
        <div className="home__text">
          <div className="info-block">
            <h3 className="info-block__header">Nähkurse</h3>
            <p className="info-block__text">
              Haben Sie schon immer davon geträumt, mal einen Rock, eine Hose oder eine Jacke nähen zu können und stolz zu sagen: „Hab ich selbst genäht!“ 
              Bei uns haben Sie die Möglichkeit, Ihren Traum wahr werden zu lassen.
              Vorkenntnisse sind nicht erforderlich, wir können aufgrund von kleinen Gruppen und individuellem Unterricht auf jedes Level eingehen.
              Die Kurse finden fortlaufend wöchentlich statt, immer zum gleichen Zeitpunkt. 
              In der nachfolgenden Tabelle können Sie alle angebotenen Uhrzeiten einsehen.
            </p>
          </div>
        </div>
        
        <div className="home__kurse-table">
          <div className="info-block">
            <h3 className="info-block__header">Kurstermine</h3>
            <p className="info-block__text">
              ED = Elvira Deutges, SB = Simone Becher
            </p>
            <table>
              <tbody>
                <tr>
                  <th>Tag</th>
                  <th>Uhrzeit</th>
                  <th>Lehrer</th>
                  <th></th>
                </tr>
                {naehkurse.table.list.map((row,index)=>{
                  if (row.subheader) return <tr key={index} className="subHeaderTable">
                      <td>{row.subheader}</td>
                    </tr>
                  else return <tr key={index}>
                    <td>{row.name}</td>
                    <td>{row.time}</td>
                    <td>{row.teacher}</td>
                    <td>{row.belegt&& "belegt"}</td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="home__block-reverse">
          <Slider
            automaticMovement={true}
            content={picturesWorkshops.map(pic=><img src={pic} alt="galerie" className="slider__img"/>)}
          />
          <div className="home__text">
            <div className="info-block">
              <h3 className="info-block__header">Workshops</h3>
              <p className="info-block__text">
                An Wochenenden und in den Ferien finden immer wieder Workshops statt. 
                Das ist ein wechselndes Angebot, schaut also immer mal wieder vorbei, was es neues gibt!
                Die Workshops richten sich an alle Altersgruppen, für Jung und Alt; Anfänger und Fortgeschrittene; Eltern und Kind; Oma und Enkel; einfach alle die Spass am Nähen haben.
                Besonders die Ferienworkshops eignen sich als super Ferienprogramm für Schülerinnen und Schüler.
              </p>
            </div>
          </div>
        </div>

        <div className="info-block is-workshop">
          <h3 className="info-block__header">Die nächsten Workshops</h3>
          <div className="card-block">
            {naehkurse.workshops.length ?
                naehkurse.workshops.map(wsh=>{
                  let list = wsh.list && wsh.list.length>0 ?
                      <span><br/>
                        Daten:{" "}
                        {wsh.list.map(entry=><span>{wsh.list.length>1 && <br/>}{entry.name}</span>)}
                      </span>
                  :
                    '';
                  let price = wsh.price ? <span><br/>Preis: {wsh.price}</span> : '';
                  let filled = wsh.isFilled ? <span><br/>Dieser Workshop ist leider schon ausgebucht.</span>:'';
                  let content = <span>
                    {wsh.content}
                    {list}
                    {price}
                    {filled}
                  </span>
                return <Card
                    key = {wsh._id}
                    id = {wsh._id}
                    header = {wsh.headvzer}
                    text = {content}
                    subtext = {wsh.teacher ? "Unterrichtet von: " + wsh.teacher : false}
                  />
            })
            :
                <Card
                    key = "empty"
                    id = "empty"
                    header = "Aktuell stehen keine Workshops an. Schau doch demnächst nochmal vorbei!"
                    text ={false}
                    subtext ={false}
                />
            }
          </div>
        </div>
        
        <Slider
          automaticMovement={true}
          content={picturesWeekend.map(pic=><img src={pic} alt="galerie" className="slider__img"/>)}
        />
        <div className="home__text">
          <div className="info-block">
            <h3 className="info-block__header">Ein Wochenende mit der Nähmaschine</h3>
            <p className="info-block__text">
              Ein ganzes, langes Wochenende nähen gemeinsam mit netten Leuten in toller Umgebung und toller Verpflegung.
              Das hört sich gut an? Dann komm doch mit!
              Ein paar mal im Jahr bieten wir diese besonderen Wochenenden an.
              Acht Nähbegeisterte können daran teilnehmen. Auch für absolute Anfänger geeignet!
              Herzlich Wilkommen sind auch die Familien der Teilnehmenden, die dann während der Nähkurs Zeiten dann ja etwas anderes in der Gegend unternehmen oder einfach nur entspannen können.
              Anstehende Termin findet ihr unten drunter!
            </p>
          </div>
        </div>

        <div className="info-block is-workshop">
          <h3 className="info-block__header">Die nächsten Wochenenden</h3>
          <div className="card-block">
            {naehkurse.weekend.map(wsh=>{
              let list = wsh.list && wsh.list.length>0 ?
                  <span><br/>
                        Daten:{" "}
                    {wsh.list.map(entry=><span>{wsh.list.length>1 && <br/>}{entry.name}</span>)}
                      </span>
                  :
                  '';
              let price = wsh.price ? <span><br/>Preis: {wsh.price}</span> : '';
              let filled = wsh.isFilled ? <span><br/>Dieses Wochenende ist bereits ausgebucht.</span>:'';
              let content = <span>
                    {wsh.content}
                    {list}
                    {price}
                    {filled}
                  </span>
                return <Card
                    key = {wsh._id}
                    id = {wsh._id}
                    header = {wsh.header}
                    text = {content}
                    subtext = {"Unterrichtet von: " + wsh.teacher}
                  />
            })}
          </div>
        </div>
      </div>
    )
  }
}