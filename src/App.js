
import './App.css';

// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";



export default class App extends Component {
  // static propTypes = {second: third}
  state={
    progress:0
  }
  setProgress = (progress)=>{
    this.setState({
      progress:progress
    })
  }

  render() {
    return (
      <>
      <Router>
      <NavBar/>
      <LoadingBar
        height={3}
        color="#f11946"
        progress={this.state.progress}
        onLoaderFinished={() => this.setProgress(0)}
      />
       <Routes>
          <Route exact  path="/" element ={<News  setProgress={this.setProgress}   key="general" pageSize='6' category='general'/>}/>
          <Route exact  path="/science" element ={<News  setProgress={this.setProgress}   key="science" pageSize='6' category='science'/>}/>
          <Route exact  path="/sports" element ={<News  setProgress={this.setProgress}  key="sports" pageSize='6' category='sports'/>}/>
        </Routes>
      </Router>
      </>
    )
  }
}


