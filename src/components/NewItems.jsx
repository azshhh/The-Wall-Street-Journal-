import React, { Component } from "react";

export class NewItems extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    return (
      <div>
        <div className="card  border-primary  mb-3">
          <img
            // Default image
            src={
              !imageUrl
                ? "https://images.moneycontrol.com/static-mcnews/2021/06/Morning-Scan-14-770x433.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ marginLeft: "-10%", zIndex: "2" }}
            >
              {source}
              <span className="visually-hidden">unread messages</span>
            </span>
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unknown" : author}{" "}
              </small>
            </p>
            <p className="card-text">
              <small className="text-muted">
                Published on {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewItems;
