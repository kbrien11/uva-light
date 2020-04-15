import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import {NavLink} from 'react-router-dom'
import {Text,Box,Image,Card,Heading,Button,Flex} from 'rebass';
import { Label, Checkbox,Input } from '@rebass/forms'
import Example from './Example' ;
import Signup from './SignUp'
import OtherNavBar from './LoggedInNavBar';
import NavBar from './Navbar'
import Output from './output';
import {FaKey,FaFolder} from 'react-icons/fa'




const SignIn =() => {
const[inputEmail,setInputEmail] = useState('')
const[inputPassword,setInputPassword] = useState('')
//  const [token, setToken] = useState(sessionStorage.getItem('token') || "")
  const [isError,setIsError] = useState(false)
    const [token, setToken] = useState(false)


const history =useHistory()

const signin = async() =>{
    const endpoint = "http://localhost:5000/login";
    const data = {
      Email:inputEmail,
      password:inputPassword,
    };
    const configs = {
      method: "POST",
      mode: "cors",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }
    const response = await fetch(endpoint, configs);
    const res = await response.json(); 
     console.log(res.token)
     sessionStorage.setItem("token", res.token)
     setToken(res.token)
     setIsError(true)
     if (res.token) {
     history.push ('/home')
   } 
}
  
    
return (

  <div class = 'signinwrapper'>
    
    
 


  
      {token ? <Example/> : ( 
       <div class = 'signincard'>
         <card>
     {/* <div class = "container">
        <div class='flex-item'>  */}
        <div class ='signinimg'>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSb8BEHcb1ucSqGNDns6vy_c9n32PJBFDkSsGalx5BdL7rVtIFL"
    />
    </div>
      <div class = 'Signup'>
      <div class = "signuph2">
      <h2 > Log in</h2>
      </div>
      </div>
         <div class='loginemail' >  
         <FaFolder color='lightskyblue' class = 'email'/>
        <input  type="text" placeholder="Email" onChange={e => setInputEmail(e.target.value)} /><br/>
         </div> 
        <div class ='loginpass'>
        <FaKey color='lightskyblue' class = 'key'/>
        <input  type="password" placeholder="Password" onChange={e => setInputPassword(e.target.value)} /><br/>
        </div>
        <div class='loginerror'>
        {isError && <p color='red'> 
          The Email or Password is incorrect,
          please try again!</p>}
          </div>
         <div class ='loginbutton'>
          <button   onClick = {e => signin()}>  Log in</button>
          </div>
          </card>
   </div>
      )}  
   </div> 

)
};
export default SignIn



