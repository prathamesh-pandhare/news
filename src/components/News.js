import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    static defaultProps={
        pageSize:5,
        category:'general'
    }
    
    constructor(){
        super();
        this.state = {
            articles:[],
            page:1,
            totalResults:0,
            loading:true
            
    
        }
    }
    
    async componentDidMount() {
        this.setState({loading:true});
        let link = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=1d9938e7d487407585c050daa905c6b9&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(link);
        let parsedData = await data.json();
        this.setState({
            articles:parsedData.articles,
            totalResults: parsedData.totalResults,
            loading:false
        })
     }
    handleNext =async ()=>{
        if(this.state.page +1 <= Math.ceil(this.state.totalResults/12)){
            this.setState({loading:true});
            let link = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=1d9938e7d487407585c050daa905c6b9&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(link);
            let parsedData = await data.json();
            this.setState({
                page:this.state.page +1,
                articles:parsedData.articles,
                loading:false
               
            })
            window.scrollTo(0, 0);
        }
        
       
     }
    
    handlePrevious =async ()=>{
        this.setState({loading:true})
        let link = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=1d9938e7d487407585c050daa905c6b9&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(link);
        let parsedData = await data.json();
        this.setState({
            page:this.state.page -1,
            articles:parsedData.articles,
            loading:false
        })
        window.scrollTo(0, 0);
     }
     
   
  render() {
    
    
    return (
      <div className='contmiddleainer my-4'>
        <h1 className="text-center" style={{ fontFamily: "Georgia, serif" ,color:'#980000',backgroundColor:'black' }}>Reporter PANDA</h1>
        {this.state.loading&&<Spinner/>}
        <div className="row">
            {!this.state.loading&&this.state.articles.map((element)=>{
                return  <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title.split(" ").slice(0,6).join(" "):" "} description={element.description?element.description.split(" ").slice(0,15).join(" "):" "} imageurl={element.urlToImage?element.urlToImage:'https://wallpapers.com/images/hd/ripples-in-blank-black-6m97l43pauyhiw4e.jpg'}  more={element.url} />
            </div>
            })}
           
       </div>
       <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevious} className="btn btn-dark">&larr; Previous</button>
        <button type="button" disabled={this.nextDisable} onClick={this.handleNext} className="btn btn-dark">Next&rarr;</button>
       </div>
      </div>
    )
  }
}

export default News