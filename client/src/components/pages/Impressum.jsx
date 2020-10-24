import React, { Component } from 'react';

export default class Impressum extends Component {
  render() {                
    return (
      <div className="impressum">
        <h2 className="title">Impressum</h2>

        <div className="info-block">
          <h3 className="info-block__header">ANGABEN GEMÄSS § 5 TMG</h3>
          <p className="info-block__text">Elvira Deutges<br/>
          Entenpfad 22<br/>
          41334 Nettetal</p>
          <h3 className="info-block__header">KONTAKT</h3>
          <p className="info-block__text">Tel: 02157 3029432<br/>
          Mail: elvirasnaehspass@gmail.com</p>
          <h3 className="info-block__header">VERANTWORTLICH FÜR DEN INHALT NACH § 55 ABS. 2 RSTV</h3>
          <p className="info-block__text">Elvira Deutges<br/>
          Entenpfad 22<br/>
          41334 Nettetal</p>
          <h3 className="info-block__header">STREITSCHLICHTUNG</h3>
          <p className="info-block__text">Plattform der EU-Kommission zur Online-Streitbeilegung: https://ec.europa.eu/consumers/odr<br/>
          Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle weder verpflichtet noch bereit.</p>
        
          <h3 className="info-block__header">UST</h3>
          <p className="info-block__text">Eingetragen als nicht umsatzsteuerpflichtiger Kleinunternehmer<br/>
            Steuer ID Finanzamt Kempen: 115-5030-1416</p>

          <h3 className="info-block__header">HAFTUNG FÜR INHALTE</h3>
          <p className="info-block__text">Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.<br/>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>

          <h3 className="info-block__header">HAFTUNG FÜR LINKS</h3>
          <p className="info-block__text">Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.<br/>
          Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>

          <h3 className="info-block__header">URHEBERRECHT</h3>
          <p className="info-block__text">Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.<br/>
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
        </div>
      </div>
    );
  }
}
