import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageurl, more, author, date,name } = this.props;
    return (
      <div className="card position-relative">
        <span
            className="position-absolute top-0 end-0 badge rounded-pill bg-danger"
            style={{ transform: 'translate(-2%, 3%)', zIndex: 1 }}
          >
            {name}
        </span>

        <img src={imageurl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5> 
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small class="text-body-secondary">
              by {author ? author : "unknown"}
            </small>
          </p>
          <p className="card-text">
            <small class="text-body-secondary">
              on {new Date(date).toGMTString()}{" "}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={more}
            target="_blank"
            className="btn btn-dark"
          >
            Read more
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
