import React, { Component } from 'react';

export default class Newscomponent extends Component {
  render() {
    let { title, description, UrlImage, url, author , date, source } = this.props;
    return (
      <div className="card my-3">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style={{left:'87%', zIndex: 1}}>{source}</span>
        <img src={UrlImage} className="card-img-top" alt="News" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-body-secondary">Last updated by {!author ?"Unkown" :author} at {new Date(date).toUTCString()}</small></p>
          <a href={url} target="_blank" rel="noreferrer" className="btn btn-primary">
            Read More
          </a>
        </div>
      </div>
    );
  }
}
