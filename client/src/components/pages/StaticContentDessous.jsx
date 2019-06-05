import React, { Component } from 'react'

export default class StaticContentDessous extends Component {
  generateCarousel=(pics)=>{
    var array = []
    pics.forEach(pic=>{
      array.push(
        <div className="carousel-item">
          <img className="d-block w-100" src={"../images/dessousPage/"+pic+".jpg"}
            alt="Dessous"/>
        </div>
      )
    })
    return array
  }
  render() {
    const pics = ["Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelf","Thirteen","Fourteen","Fifteen"]
    return (
      <section className="card-container">
        {/* <div className="card" style={{width: "65rem"}}>
          <div className="card-body">
            <h5 className="card-title">Dessous-Workshops</h5> */}
            <p className="card-text" style={{textAlign:"center", fontSize:"20px",fontWeight:"300", lineHeight:"1.5",margin:"40px 240px 40px 120px",fontFamily:"Alegreya,serif"}}>
            Nähen ist schon lange deine Leidenschaft und du möchtest dich gerne immer weiterentwickeln?<br/>
            Mein Dessous-Workshop ist die perfekte Möglichkeit für alle Näherinnen, die eine neue Herausforderung suchen. Dessous benötigen Fingerspitzengefühl und viel Erfahrung an der Nähmaschine und im kleinen Workshop-Rahmen zeige ich dir die Besonderheit des Dessous-Nähens. Mit einer kleinen Gruppe von netten und gleichgesinnten Frauen kannst du dich austauschen und an deinen persönlichen Dessous arbeiten. <br/>
            In meinem Workshop lernst du den Umgang mit feinen Stoffen, schönen Spitzen und Materialien wie Wäschegummis, BH-Bügeln etc. Ob BH, Slip, Hemdchen, Bikini oder Body- alles ist möglich.  Für alle Dessous-Anfängerinnen, empfehle ich mit einem Slip und/oder Hemdchen zu beginnen. Erfahrene Dessous-Näherinnen können aber gerne direkt mit einem BH starten. Als Designerin und Inhaberin von meinem eignen Dessous-Unternehmen und mit vielen Jahren Erfahrung beim Nähen von Dessous, bin ich immer an deiner Seite und unterstütze dich fachkundig während des Workshops. <br/><br/>

            Der Dessous-Nähkurs ist komprimiert an zwei Tagen, damit wir uns gemeinsam auf das Nähen der Dessous konzentrieren können. So verspreche ich dir, am Ende des Workshops mit viel Erfahrung und einem schönen und einzigartigen Dessous-Modell nach Hause gehen zu können.<br/>
            Alles wird nach Deinen Vorstellungen und Dein eigenes Werk sein!<br/><br/>

            Nach der Anmeldung melde ich mich bei jeder Workshop-Teilnehmerin und berate sie zu Stoffen, Spitzen und Schnittmustern.<br/>
            Deine, Barbara<br/><br/><br/></p>
            
            <p>
              Materialien: Stoffe, Zutaten und Schnittmuster müssen vorher besorgt und die Schnitte vorbereitet werden.<br/>
              Für wen ist der Kurs geeignet: erfahrene Näherinnen.<br/> Für Näh-Anfängerinnen ist der Dessous-Workshop leider nicht geeignet!<br/>
              Teilnehmerzahl: mindestens 4 Personen höchstens 6 Personen.<br/>
              Kurszeiten: Freitags von 18-22 Uhr, samstags von 10-17 Uhr an ausgewählten Terminen<br/>
              Unten sehen Sie ob es schon neue Termine gibt!
            </p>
          {/* </div>
        </div> */}
        
        <div className="card" style={{width: "30rem"}}>
          <div className="card-body">

            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="d-block w-100" src="../images/dessousPage/One.jpg"
                    alt="First slide"/>
                </div>
                {this.generateCarousel(pics)}
              
              </div>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>

            </div>

          </div>
        </div>
      </section>    
    )
  }
}
