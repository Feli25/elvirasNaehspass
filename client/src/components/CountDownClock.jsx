import React, { Component } from 'react'
import Countdown from 'react-countdown-now';

const Completionist = () => 
            <div className="countDownTextBox">
              <p className="countDownTextHome">Die Anmeldung hat angefangen!</p>
            </div>

const renderer = ({ total, days, hours, minutes, seconds, milliseconds, completed }) => {
  if (completed) {
    return <Completionist />
  } else {
    return  <div className="countDownTextBox">
              <p className="countDownTextHome">Die nächste Anmeldung für unsere Kurse findet statt in:</p>
              <div className="countDownTimeHome">
                <div className="equalTimerBoxes">{days}</div>
                <div className="spaceBetween">:</div>
                <div className="equalTimerBoxes">{hours}</div>
                <div className="spaceBetween">:</div>
                <div className="equalTimerBoxes">{minutes}</div>
                <div className="spaceBetween">:</div>
                <div className="equalTimerBoxes">{seconds}</div>
              </div>
              <div className="countDownTimeHome">
                <div className="equalTimerBoxes">{days===1 ? "Tag" : "Tagen"}</div>
                <div className="spaceBetween"> </div>
                <div className="equalTimerBoxes">{hours===1 ? "Stunde" : "Stunden"}</div>
                <div className="spaceBetween"> </div>
                <div className="equalTimerBoxes">{minutes===1 ? "Minute" : "Minuten"}</div>
                <div className="spaceBetween"> </div>
                <div className="equalTimerBoxes">{seconds===1 ? "Sekunde" : "Sekunden"}</div>
              </div>
              <p className="countDownText2Home">(24.11.2019 11 Uhr)</p>
              <p className="countDownText2Home">Für unsere Workshops können Sie sich jederzeit anmelden!</p>
            </div>
  }
};

export default class CountDownClock extends Component {
  render() {
    return (
      <Countdown 
        renderer={renderer}
        date='Sun, 24 Nov 2019 11:00:00'
      />
    )
  }
}
