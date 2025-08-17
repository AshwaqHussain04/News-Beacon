import React, { Component } from 'react'
import Newscomponent from './newscomponent'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    static defaultProps = {
      country : 'us',
      pageSize : 8,
      category : 'Entertainment'
    }

    static propTypes = {
      country : PropTypes.string,
      pageSize : PropTypes.number,
      category : PropTypes.string,
    }

    capitalizeFirstLetter = (val) => {
      return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    };



    constructor(props){
      super(props);
      this.state = {
         articles : [],
         page : 1,
         totalResults: 0,
         hasMore: true
      }
      document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Beacon`
    }


    async updateNews(){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.Apikey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
      this.setState({loading : true})
      let promise = await fetch(url);
      let data = await promise.json();
      this.setState({articles : data.articles, totalResults: data.totalResults , loading: false})
    }

    async componentDidMount(){
      this.updateNews();
    }
    
   fetchMoreData = async () => {
        const nextPage = this.state.page + 1; 
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.Apikey}&page=${nextPage}&pagesize=${this.props.pageSize}`;
        this.props.setProgress(10);
        this.setState({ loading: true });
        let promise = await fetch(url);
        this.props.setProgress(60);
        let data = await promise.json();
        this.props.setProgress(100);

        if(!data.articles || data.articles.length === 0){
          this.setState({
            hasMore: false,
            loading: false,
          });
          return
        }

        this.setState({
          articles: this.state.articles.concat(data.articles),
          totalResults: data.totalResults,
          page: nextPage, 
          loading: false,
        });
      };


  render() {
    return (
    <>
  
    <div className="container my-4">
        <h1 className='text-center'>Top headlines from {this.capitalizeFirstLetter(this.props.category)} Category</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<Spinner/>}
        >
        <div className="Container">
          <div className="row">
              {this.state.articles.map((element, index)=>{ 
                return<div className="col-md-4" key={element.url || index}>
                      <Newscomponent
                      title={element.title}
                      description ={element.description} 
                      UrlImage={element.urlToImage}
                      url={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}/>    
                    </div>
              })}
            </div> 
          </div>
        </InfiniteScroll> 
    </div>
  </>


    )
  }
}
