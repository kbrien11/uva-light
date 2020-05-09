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
import Favicon from 'react-favicon';



function App() {
<title>Uva</title>
//  <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
//  <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico"> </link>

{/* <img alt="Single Grape Stock Photos, Pictures &amp; Royalty-Free Images - iStock" class="n3VNCb" src="https://media.istockphoto.com/photos/red-grape-isolated-on-white-background-picture-id477899903?k=6&amp;m=477899903&amp;s=612x612&amp;w=0&amp;h=EJImWovrOSZJ319ZbvMD9aP-deSIyVYNIlDi_wwdhsI=" data-noaft="1" jsname="HiaYvf" jsaction="load:XAeZkd;" style="width: 523px; height: 346.958px; margin: 0px;"></img> */}
    return (
      <BrowserRouter>
      <div className="App">
      <Favicon url="https://media.istockphoto.com/photos/red-grape-isolated-on-white-background-picture-id477899903?k=6&amp;m=477899903&amp;s=612x612&amp;w=0&amp;h=EJImWovrOSZJ319ZbvMD9aP-deSIyVYNIlDi_wwdhsI=" />
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
