import React, { Component } from 'react';
import Card from '../Card'

const teachers = [
  {
    name: "Elvira Deutges",
    picturePath: "https://res.cloudinary.com/mcfrihfd/image/upload/v1601927422/project2React/about/Elvira.jpg",
    cv: <span>geboren: 03.08.1965<br/>
    Ausbildung:<br/>
    1982 – 1984 Fachoberschule mit Fachabitur Bekleidung<br/>
    1984 – 1986 Ausbildung zur Bekleidungsschneiderin<br/>
    1986 – 1991 Beschäftigung als Musternäherin<br/>
    1991 – 2002 Selbstständigkeit als Maßatelier<br/>
    Seit 1990 tätig in der Erwachsenenbildung<br/>
    Weiterbildung:<br/>
    1987 – 1990 Ausbildung zum Industrieschneidermeisterin<br/>
    (mit Anerkennung im Handwerk)<br/>
    1992 Ausbildung zur Schnittdirectrice</span>
  },
  // {
  //   name: "Barbara Beckmann",
  //   picturePath: "https://res.cloudinary.com/mcfrihfd/image/upload/v1601927444/project2React/about/barbara.jpg",
  //   cv: <span>geboren 12.07.1967<br/>
  //   Ausbildung:<br/>
  //   1983 – 1985 Ausbildung zur Bekleidungsfertigerin<br/>
  //   1986 – 1991 Beschäftigung in der Industrie<br/>
  //   1992 – 1997 Selbstständige Damenschneiderin<br/>
  //   Seit 2010 tätig in der Erwachsenenbildung<br/>
  //   Weiterbildung:<br/>
  //   1987 – 1990 Ausbildung zur Industrieschneidermeisterin<br/>
  //   (mit Anerkennung im Handwerk)<br/>
  //   1992 Ausbildung zur Schnittdirectrice</span>
  // },
  {
    name: "Simone Becher",
    // picturePath: "../images/Simone.jpg",
    cv: <span>geboren: 27.07.1970<br/>
    Ausbildung:<br/>
    1986 - 1989 Vollzeitschulische Ausbildung zur Damenschneiderin im Handwerk<br/>
    1989 - 1990 Musternäherin Kinderbekleidung<br/>
    1990 - 1992 Musternäherin DOB, ab Mai 1991 Reisetechnikerin van Laack<br/>
    1992 - 1994 Fachschule für Technik, Abschluss Bekleidungstechnikerin, Schwerpunkt Gestaltung<br/>
    1994 Produktionsassistentin ZASPEL<br/>
    1994 - 2004 Erstschnittdirektrice DOB manuell und CAD-Assyst<br/>
    seit 2004 Selbstständige Tätigkeit als Schnittservice<br/>
    Weiterbildung:<br/>
    1993 REFA Grundschein 1 und 2<br/>
    2002 Schnittkonstruktion, Gradieren, Digitalisieren, Schnittbild legen an CAD-ASSYST<br/>
    2004 Gradierung Müller und Sohn<br/>
    2004 Schnittkonstruktion, Gradieren, Digitalisieren, Schnittbild legen an CAD-Grafis, regelmässige Upgrades auf die jeweils aktuellste Version mit entsprechender Schulung</span>
  },
  {
    name: "Nicola Münter",
    // picturePath: "",
    cv: <span>Lebenslauf folgt...</span>
  }
]

export default class About extends Component {
  renderCards=()=>{
    return teachers.map(teacher=>
      <Card 
        key = {teacher.name}
        id = {teacher.name}
        imgPath = {teacher.picturePath}
        imgName = {teacher.name}
        header = {teacher.name}
        text = {teacher.cv}
      />)
  }
  render() {                
    return (
      <div className="about">
        <h2 className="title">Über uns</h2>
        <div className="card-block">
          {this.renderCards()}
        </div>
      </div>
    );
  }
}