import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props)=> {
    
      const [articles, setArticles] = useState([]);
      const [page, setPage] = useState(1);
      const [totalResults, setTotalResults] = useState(0);
      const [loading, setLoading] = useState(true);
      
        // super(props);
        // this.state = {
        //     articles:[],
        //     page:1,
        //     totalResults:0,
        //     loading:true  
    
        // }
        // document.title=`${this.capitalizeFirstLetter(props.category)}-Reporter PANDA`
    
    const updateNews =async()=> {
        props.setProgress(10);
        let link = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(link);
        props.setProgress(30);
        let parsedData = await data.json();
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setPage(page +1)
        setLoading(false)
       
        // this.setState({
        //     articles:parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading:false,
        //     page:this.state.page +1
        // })
        props.setProgress(100);
        
        
    }
    useEffect(() => {
       updateNews();
    }, []);

    //  componentDidMount() {
    //     // this.setState({loading:true});
    //     // let link = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=1d9938e7d487407585c050daa905c6b9&page=1&pageSize=${props.pageSize}`;
    //     // let data = await fetch(link);
    //     // let parsedData = await data.json();
    //     // this.setState({
    //     //     articles:parsedData.articles,
    //     //     totalResults: parsedData.totalResults,
    //     //     loading:false
    //     // })
    //     this.update()
    //  }
    // handleNext =async ()=>{
    //     // if(this.state.page +1 <= Math.ceil(this.state.totalResults/12)){
    //     //     this.setState({loading:true});
    //     //     let link = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=1d9938e7d487407585c050daa905c6b9&page=${this.state.page +1}&pageSize=${props.pageSize}`;
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
    //     // let link = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=1d9938e7d487407585c050daa905c6b9&page=${this.state.page -1}&pageSize=${props.pageSize}`;
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
    const fetchMoreData = async() => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        // console.log("Articles:", this.state.articles.length);
        // console.log("Total:", this.state.totalResults);
        setLoading(true)
        let link = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=1d9938e7d487407585c050daa905c6b9&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(link);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        setPage(page +1)
        // this.setState({
        //     articles:this.state.articles.concat(parsedData.articles),
        //     totalResults: parsedData.totalResults,
        //     loading:false,
        //     page:this.state.page +1
        // })
        
    }

   
 
    return (
      <>
        <h1 className="text-center " style={{ fontFamily: "Georgia, serif" ,color:'#980000' }}>Reporter PANDA</h1>
        {loading&&<Spinner/>}
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length!==totalResults}
            loader={<Spinner/>}
            >
        <div className="container">      
        <div className="row">
            {articles.map((element)=>{
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
  

News.defaultProps={
      pageSize:5,
      category:'general',
  }

export default News