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
  import Auth from './hoc/auth'
  
  
  
  function App() {

    const NewLandingPage = Auth(LandingPage,null);
    const NewLoginPage = Auth(LoginPage,false);
    const NewRegisterPage = Auth(RegisterPage,false);
  
  return (
  <BrowserRouter> 

    <div>
        <ul>
          <li>

            <Link to="/">LandingPage</Link>
          </li>
          <li>
            <Link to="/login">LoginPage</Link>
          </li>
          <li>
            <Link to="/register">RegisterPage</Link>
          </li>
        </ul>
        <hr />
      <Routes>
        
      <Route exact path="/" element = {<NewLandingPage/>} />
      <Route exact path="/login" element = {<NewLoginPage/>} />
      <Route exact path="/register" element = {<NewRegisterPage/>} />
      
      </Routes>
    </div>
  </BrowserRouter>
  
  );
  
}

export default App;
