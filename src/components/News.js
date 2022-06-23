import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      totalSize: 0,
      loading: false
    };
  }

  async componentDidMount() {
    this.props.setProgress(0);
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0d0d9cbef4954e1fa599d5e198b7bbce&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalSize: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    this.setState({ loading: true });
    let latestPage = this.state.page + 1;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0d0d9cbef4954e1fa599d5e198b7bbce&page=${latestPage}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      page: latestPage,
      loading: false,
      totalSize: parsedData.totalResults
    });
  };

  render() {
    return (
     <>
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.totalSize}
          loader={this.state.loading && <Spinner />}
        >
        <div className="container row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title.slice(0, 45)}
                    description={
                      element.description && element.description.slice(0, 88)
                    }
                    imageUrl={element.urlToImage}
                    url={element.url}
                  />
                </div>
              );
            })}
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={() => this.handlePrevPage()}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page * 9 > this.state.totalSize}
            type="button"
            className="btn btn-dark"
            onClick={() => this.handleNextPage()}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
