import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps={
        pageSize:5,
        category:'general',
     
    }
    
    constructor(props){
        super(props);
        this.state = {
            articles:[],
            page:1,
            totalResults:0,
            loading:true  
    
        }
        // document.title=`${this.capitalizeFirstLetter(this.props.category)}-Reporter PANDA`
    }
    async update() {
        this.props.setProgress(10);
        let link = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=1d9938e7d487407585c050daa905c6b9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(link);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.setState({
            articles:parsedData.articles,
            totalResults: parsedData.totalResults,
            loading:false
        })
        this.props.setProgress(100);
        
        
    }
    async componentDidMount() {
        // this.setState({loading:true});
        // let link = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=1d9938e7d487407585c050daa905c6b9&page=1&pageSize=${this.props.pageSize}`;
        // let data = await fetch(link);
        // let parsedData = await data.json();
        // this.setState({
        //     articles:parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading:false
        // })
        this.update()
     }
    // handleNext =async ()=>{
    //     // if(this.state.page +1 <= Math.ceil(this.state.totalResults/12)){
    //     //     this.setState({loading:true});
    //     //     let link = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=1d9938e7d487407585c050daa905c6b9&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
    //     //     let data = await fetch(link);
    //     //     let parsedData = await data.json();
    //     //     this.setState({
    //     //         page:this.state.page +1,
    //     //         articles:parsedData.articles,
    //     //         loading:false
               
    //     //     })
    //     //     window.scrollTo(0, 0);
    //     // }
    //     this.setState({
    //         page:this.state.page +1})
    //     this.update()
    //     }
    // handlePrevious =async ()=>{
    //     // this.setState({loading:true})
    //     // let link = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=1d9938e7d487407585c050daa905c6b9&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    //     // let data = await fetch(link);
    //     // let parsedData = await data.json();
    //     // this.setState({
    //     //     page:this.state.page -1,
    //     //     articles:parsedData.articles,
    //     //     loading:false
    //     // })
    //     // window.scrollTo(0, 0);
    //     this.setState({
    //         page:this.state.page -1})

    //     this.update()
    //  }
    fetchMoreData = async() => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        this.setState({loading:true})
        let link = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=1d9938e7d487407585c050daa905c6b9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(link);
        let parsedData = await data.json();
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading:false,
            page:this.state.page +1
        })
        
    }

   
  render() {
    
    
    return (
      <>
        <h1 className="text-center " style={{ fontFamily: "Georgia, serif" ,color:'#980000' }}>Reporter PANDA</h1>
       
        <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length!==this.state.totalResults}
            loader={<Spinner/>}
            >
        <div className="container">      
        <div className="row">
            {this.state.articles.map((element)=>{
                return  <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title.split(" ").slice(0,6).join(" "):" "} description={element.description?element.description.split(" ").slice(0,15).join(" "):" "} imageurl={element.urlToImage?element.urlToImage:'https://wallpapers.com/images/hd/ripples-in-blank-black-6m97l43pauyhiw4e.jpg'}  more={element.url} author={element.author} date={element.publishedAt} name={element.source.name} />
            </div>
            })}
           
       </div>
       </div> 
       </InfiniteScroll>
       {/* <div className="container d-flex justify-content-between">
        <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevious} className="btn btn-dark">&larr; Previous</button>
        <button type="button" disabled={this.state.page +1 >= Math.ceil(this.state.totalResults/5)}  onClick={this.handleNext} className="btn btn-dark">Next&rarr;</button>
       </div> */}
      </>
    )
  }
}

export default News