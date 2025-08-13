import React, { Component } from 'react'
import Newscomponent from './newscomponent'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

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


    constructor(){
      super();
      this.state = {
         articles : [],
         page : 1,
      }
    }

    async updateNews(){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c14817eff98a4e74818c03bc54c3bbea&pagesize=${this.props.pageSize}`;
      this.setState({loading : true})
      let promise = await fetch(url);
      let data = await promise.json();
      this.setState({loading : false})
      this.setState({articles : data.articles, totalResults: data.totalResults})
    }

    async componentDidMount(){
      this.updateNews();
    }
    
    handlePrevious = async()=>{
      this.setState({page: this.state.page - 1})
      this.updateNews();
    }

    handlenext = async()=>{
      this.setState({page: this.state.page + 1});
      this.updateNews();
      
    }

  render() {
    return (
    <>
    <div className="container my-4">
        <h1 className='text-center'>DAILY NEWS</h1>
        {this.state.loading && <Spinner></Spinner>}
        <div className="row">
            {!this.state.loading && this.state.articles.map((element, index)=>{ 
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
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevious} className="btn btn-dark">&laquo; Previous</button>
          <button type="button" onClick={this.handlenext} className="btn btn-dark">Next &raquo;</button>
        </div>
    </div>
  </>


    )
  }
}
