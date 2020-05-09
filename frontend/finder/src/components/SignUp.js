import React,{useState, useEffect} from 'react';
import {Flex, Box, Link,Text,Button,Image} from 'rebass'; 
import {Link as RouterLink} from 'react-router-dom';
import { storage } from "./firebaseConfig";





const Signup = () =>{

const[inputEmail,setInputEmail] = useState('')
const[inputPassword,setInputPassword] = useState('')
const[inputFirst_name,setFirstName] = useState('')
const[inputLast_name,setLastName] = useState('')
const[register,setRegister] = useState(false)
const [image, setImage] = useState(null);
//  const [url, setUrl] = useState("");
const [progress, setProgress] = useState(0);
const [error, setError] = useState("");

    const handChange = e => {
  
      const file = e.target.files[0];
  
      if (file) {
  
        const fileType = file["type"];
  
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
  
        if (validImageTypes.includes(fileType)) {
  
          setError("");
  
          setImage(file);
  
        } else {
  
          setError("Please select an image to upload");
  
        }
      }
    }
  
      
    
  let example = ""

    const sendData = async() => {
      if (image) {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
  
          "state_changed",
  
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          error => {
            setError(error);
          },
          async() => {
            storage
              .ref("images")
  
              .child(image.name)
  
              .getDownloadURL()
  
              .then (async(url) => {
  
                example += url;
    
                setRegister(false)
                const endpoint = "http://localhost:5000/create/";
                const data = {
                  Email:inputEmail,
                  password:inputPassword,
                  First_name:inputFirst_name,
                  Last_name:inputLast_name,
                  image_path: example,
                };
                const configs = {
                  method: "POST",
                  mode: "cors",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify(data)
                }
                const response = await fetch(endpoint, configs);
                const res = await response.json();
                console.log(res)
                setRegister(true)
              
                console.log(example)
  
                setProgress(0);
  
              });
  
          }
  
        );
  
      } else {
  
        setError("Error please choose an image to upload");
  
      }
  
    };

   
     
      
return (
 <div class = 'signupwrapper'>
    
 

   <div class='signupCard'>
 
 <card>
   <div class ='signupimg'>
 <p>Uva</p>
  
    
    </div>
    <div class = 'Signup'>
      <div class = "signuph2">
      <h2 > Sign up</h2>
      </div>
      </div>
      <div class = 'signupemail'>
        <form>
       {/* <label mx={6} width={100} backgroundColor='white'  marginTop={3} backgroundColor='white' htmlFor='email'>Email</label> <br/> */}
        <input  type="text" placeholder="Email" onChange={e => setInputEmail(e.target.value)}/><br/>
        </form>
        </div>
        <div class = "signuppass" >
        <form>  
        <input   type="password" placeholder="Password" onChange={e => setInputPassword(e.target.value)} /><br/>
        </form>
        </div>
        <div class = "signupfirst" >  
        <form>
        <input type= "text" placeholder="First name"  onChange={e => setFirstName(e.target.value)} /><br/>
        </form>
        </div>
        <div class = "signuplast" >  
        <form>
        <input   type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)} /><br/>
        </form>
        </div>
        
        {/* <Flex 
          mx={2}
          p={2}
          bg= "white"
          > */}
          <div className = "signupinput">
        <input  type="file" onChange={handChange} /> 
        </div>
        {/* </Flex> */}
        <div>

        {progress > 0 ? <progress value={progress} max="100" /> : ""}

        <p style={{ color: "red" }}>{error}</p>

      </div>
         
        {register && <Text backgroundColor="white" marginLeft={5} color = "green"> Thank you for creating an account!
         Please log in </Text>}
         <div class ='loginbutton'>
        <button onClick = {e=>sendData()}>  Sign Up</button>
         <div class = 'signupcontainer'>
        <Text backgroundColor='white'> Already have an Account? </Text> 
        <div class ='signuplink'>
        <a link backgroundColor='white' href= '/login'as ={RouterLink}> Log in here </a>
        </div> 
        </div>
        </div>
    </card>
    </div>
    
   
 </div> 


)
};
export default Signup;

