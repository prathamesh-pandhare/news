
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



export default class App extends Component {
  // static propTypes = {second: third}

  render() {
    return (
      <>
      <Router>
      <NavBar/>
       <Routes>
          <Route exact  path="/" element ={<News key="general" pageSize='6' category='general'/>}/>
          <Route exact  path="/science" element ={<News key="science" pageSize='6' category='science'/>}/>
          <Route exact  path="/sports" element ={<News key="sports" pageSize='6' category='sports'/>}/>
        </Routes>
      </Router>
      </>
    )
  }
}


