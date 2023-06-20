import React, { Component } from "react";
import NewItems from "./NewItems";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    pageSize: 6,
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = { articles: [], page: 1, totalResults: 0 };
    document.title = `NewsMonkey - ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }

  updateNews = async () => {
    this.props.setProgress(10);
    const url = "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=4f9ed993ea7b49b9bdcffd8b158d7bd1"
    // `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
    this.props.setProgress(100);
  };

  async componentDidMount() {
    this.updateNews();
  }

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=4f9ed993ea7b49b9bdcffd8b158d7bd1"
    // `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <h1
          className="text-center"
          style={{ color: "white", marginTop: "90px" }}
        >
          {/* NewsMonkey - {`${this.capitalizeFirstLetter(this.props.category)}`}{" "} */}
          Headlines
        </h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((e) => {
                return (
                  <div className="col-md-4 my-4" key={e.url}>
                    <NewItems
                      title={e.title ? e.title.slice(0, 50) : "No title"}
                      description={
                        e.description
                          ? e.description.slice(0, 80)
                          : "No Description"
                      }
                      imageUrl={e.urlToImage}
                      newsUrl={e.url}
                      author={e.author}
                      date={e.publishedAt}
                      source={e.source.name}
                    />
                  </div>
                );
              })}
            </div>
            Buttons
            <div className="container d-flex justify-content-between">
              <button
                disabled={this.state.page <= 1}
                type="button"
                className="btn btn-dark"
                onClick={this.handlePreviousClick}
              >
                &larr; Previous
              </button>
              <button
                disabled={
                  this.state.page >
                  Math.ceil(this.state.totalResults / this.props.pageSize)
                }
                type="button"
                className="btn btn-dark"
                onClick={this.handleNextClick}
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
