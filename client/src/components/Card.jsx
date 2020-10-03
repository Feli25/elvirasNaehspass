import React, { Component } from 'react';

//props:
// id: string
//    mandatory, unique identifier
// imgName, imgPath, header, text, subtext, link, onlinkclick, button, onbuttonclick: string
//    not mandatory, only displayed if give
// line-clamp: true or false
//    default false, if text should be clamped

export default class Card extends Component {
  render () {
    const { id, imgPath, imgName, header, text, lineclamp, subtext, link, onlinkclick , button, onbuttonclick} = this.props
    return (
      <div className="card" key={id}>
        {imgPath && <img className="card__img" src={imgPath} alt={imgName}/>}
        <div className="card__content">
          {header && <h3 className="card__header">{header}</h3>}
          {text && <p className={lineclamp ? "card__text line-clamp" : "card__text"}>{text}</p>}
          {subtext && <p className="card__subText">{subtext}</p>}
          {button && onbuttonclick && <button onClick={onbuttonclick}>{button}</button>}
          {link && onlinkclick && <a onClick={onlinkclick} className="card__link">{link}</a>}
        </div>
      </div>
    )
  }
}