import React, { Component } from 'react'
import NavBar from './components/navbar'
import News from './components/news'
import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <Routes>
            <Route path="/" element={<News country='us' pageSize={8} category= "general"/>}/> 
            <Route path="/business" element={<News country='us' pageSize={8} category= "business"/>} /> 
            <Route path="/entertainment" element={<News country='us' pageSize={8} category= "entertainment"/>} />
            <Route path="/health" element={<News country='us' pageSize={8} category= "health"/>} />
            <Route path="/science" element={<News country='us' pageSize={8} category= "science"/>} />
            <Route path="/sports" element={<News country='us' pageSize={8} category= "sports"/>} />
            <Route path="/technology" element={<News country='us' pageSize={8} category= "technology"/>} />
          </Routes>
        </Router>
      </div>
    )
  }
}

