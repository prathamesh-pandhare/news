import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let {title , description , imageurl,more} = this.props ;
    return (
      <div className="card" >
    <img src={imageurl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
            <a rel='noreferrer' href={more} target='_blank' className="btn btn-dark">Go somewhere</a>
        </div>
        </div>
    )
  }
}

export default NewsItem