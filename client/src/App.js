import './App.css';

import React from "react";

import {

  BrowserRouter,
  
  Route,
  
  Routes,
  
  Link
  
  } from "react-router-dom";
  
  import LandingPage from './components/views/LandingPage/LandingPage'
  
  import LoginPage from './components/views/LoginPage/LoginPage'
  
  import RegisterPage from './components/views/RegisterPage/RegisterPage'
  
  
  
  
  function App() {
  
  return (
  <BrowserRouter>

    <div>
        <ul>
          <li>
            <Link to="/">LandingPage</Link>
          </li>
          <li>
            <Link to="/about">LoginPage</Link>
          </li>
          <li>
            <Link to="/dashboard">RegisterPage</Link>
          </li>
        </ul>
        <hr />
      <Routes>
        
        <Route exact path="/" element = {<LandingPage/>}/>
        
        <Route exact path="/login" element = {<LoginPage/>}/>
        
        <Route exact path="/register" element = {<RegisterPage/>}/>
      
      </Routes>
    </div>
  </BrowserRouter>
  
  );
  
}

export default App;
