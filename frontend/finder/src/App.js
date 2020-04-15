import React from 'react';
import Signup from './components/SignUp';
import Login from './components/Login';
import {Switch} from "react-router";
import { BrowserRouter, Route } from 'react-router-dom';
import UserData from './components/UserPage';
import About from './components/About'
import Profile from './components/Profile';
import CityList from './components/CityList'
import NavBar from './components/Navbar'
import './App.css';
import Example from './components/Example';
import SignIn from './components/SignIn';

function App() {

    return (
      <BrowserRouter>
      <div className="App">
      <Route  exact path = "/login" component = {SignIn} /> 
      <Route exact path = "/" component = {Signup}/>
      <Route exact path = "/user" component = {UserData}/>
      <Route exact path = "/about" component = {About}/>
      <Route exact path = "/view profile" component = {Profile}/>
      <Route exact path = "/cities" component = {CityList}/>
       <Route exact path = "/home" component = {Example}/> 
  
      </div>
      </BrowserRouter>
    );
  };


export default App;
