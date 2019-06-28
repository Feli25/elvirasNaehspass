import React, { Component } from 'react';
import CountDownClock from '../CountDownClock'
import api from '../../api';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts : [],
      // days:0,
      // hours:0,
      // minutes:0,
      // seconds:0
    }
  }
  componentDidMount(){
    // this.interval = setInterval(() => {
    // // year, index of month(month-1), day
    //   const date = this.calculateCountdown("2019-12-24T00:00:00");
    //   date ? this.setState(date) : this.stop();
    // }, 1000);
    api.getLatestPosts()
      .then(result=>{
        this.setState({posts:result})
      })
      .catch(err=>{
        console.log(err)
      })
  }
  // componentWillUnmount() {
  //   this.stop();
  // }
  // stop() {
  //   clearInterval(this.interval);
  // }
  createPosts=()=>{
    return this.state.posts.map(post=>{
      return (
        <div className="card" style={{width: "30rem"}} key={post._id}>
          {post.imgPath && <img src={ post.imgPath } alt={ post.imgName } className="card-img-top" />}
          <div className="card-body">
            <h5 className="card-title">{post.header}</h5>
            <p className="card-text">{post.content}</p>
            <h6 className="card-subtitle mb-2 text-muted">by {post._creator.username}</h6>
          </div>
        </div>
      )
    })
  }
  // calculateCountdown(endDate) {
  //   let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

  //   // clear countdown when date is reached
  //   if (diff <= 0) return false;

  //   const timeLeft = {
  //     years: 0,
  //     days: 0,
  //     hours: 0,
  //     min: 0,
  //     sec: 0
  //   };

  //   // calculate time difference between now and expected date
  //   if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
  //     timeLeft.years = Math.floor(diff / (365.25 * 86400));
  //     diff -= timeLeft.years * 365.25 * 86400;
  //   }
  //   if (diff >= 86400) { // 24 * 60 * 60
  //     timeLeft.days = Math.floor(diff / 86400);
  //     diff -= timeLeft.days * 86400;
  //   }
  //   if (diff >= 3600) { // 60 * 60
  //     timeLeft.hours = Math.floor(diff / 3600);
  //     diff -= timeLeft.hours * 3600;
  //   }
  //   if (diff >= 60) {
  //     timeLeft.min = Math.floor(diff / 60);
  //     diff -= timeLeft.min * 60;
  //   }
  //   timeLeft.sec = diff;

  //   return timeLeft;
  // }
  // addLeadingZeros(value) {
  //   value = String(value);
  //   while (value.length < 2) {
  //     value = '0' + value;
  //   }
  //   return value;
  // }
  render() {   
    // this.countdown()             
    return (
      <React.Fragment>
        <div className="page-title">
          <h1 className="page-title">Willkommen</h1>
          {/* {this.state.sec !== undefined &&
            <span>Countdown: {this.addLeadingZeros(this.state.days)}:{this.addLeadingZeros(this.state.hours)}:{this.addLeadingZeros(this.state.min)}:{this.addLeadingZeros(this.state.sec)}</span>
          } */}
        </div>
        <section className="card-container">
          <div className="countDownHome" key="countdown">
            <CountDownClock/>
          </div>
        </section>
          <section className="card-container">
              {this.createPosts()}

          </section>
          <section className="button-container"> 
            <a href="/posts" className="btnHref" id="all-posts">Alle Beiträge ansehen</a>
          </section>
          <section className="card-container women-container">
            <div className="card women-card" style={{width: "20rem"}}>
              <div className="card-body">
                <img src="./images/woman.png" alt="Woman" className="card-img-top"/>
              </div>
            </div>
          </section>

      </React.Fragment>
    );
  }
}
