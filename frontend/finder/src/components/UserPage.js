import React,{useState,useEffect} from 'react';
import User from './User';
import {Box,Text,Flex,Heading,Button,Card} from 'rebass';
import OtherNavBar from './LoggedInNavBar';
import CityReview from './ReviewCity';
import FirstReview from './ReviewFirstName';
import moment from 'moment';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import {FaRocketchat} from 'react-icons/fa'
 





const UserData = () => {


  
const [inputEmail,setInputEmail] = useState("")
const [data,setData] = useState([])
const [datas,setDatas] = useState([])
const [datafirst,setDataFirst] = useState([])
const [otherData,setOtherData] = useState([])
const [otherDatas,setOtherDatas] = useState([])
const [friends,setFriends] = useState([])
const [isError,setIsError] = useState(false)
const [noFriend,setNoFriend] = useState(false)
const[message,setMessage] = useState(false)
const [token, setToken] = useState(sessionStorage.getItem('token') || "")

const[time,setTime] = useState("")



useEffect (()=> {
 {data}
})
useEffect(() => {getUser()}, [])
const getUser = async() =>{
    setIsError(false)
try {
     const data = await fetch (`http://localhost:5000/api/searchuser/${inputEmail}`)
     const jsonInfo = await data.json()
     if (jsonInfo.reviews){
     setData(jsonInfo.reviews)
     }
    
      
     
    

    }catch(err) {
    console.log(err)
    
    }
    useEffect (()=> {
      {firstname}
     })

   
      }


    const getCity = async() =>{
        setIsError(false)
    try {
         const data = await fetch (`http://localhost:5000/api/searchusers/${inputEmail}`)
         const jsonInfo = await data.json()
         if (jsonInfo.reviews){
         setDatas(jsonInfo.reviews)
         }
    
         else{
            setIsError(true)
        }
    
        }catch(err) {
        console.log(err)
        setIsError(true)
        }
          }
         
        const getRest = async() =>{
            setIsError(false)
        try {
             const data = await fetch (`http://localhost:5000/api/searchuser/${inputEmail}`)
             const jsonInfo = await data.json()
             if (jsonInfo.reviews){
             setOtherData(jsonInfo.reviews)
             }
        
             
        
            }catch(err) {
            console.log(err)
         
            }
              }

              const getRev = async() =>{
                setIsError(false)
            try {
                 const data = await fetch (`http://localhost:5000/api/searchuser/${inputEmail}`)
                 const jsonInfo = await data.json()
                 if (jsonInfo.reviews){
                 setOtherDatas(jsonInfo.reviews)
                 }
            
                 else{
                    setIsError(true)
                }
            
                }catch(err) {
                console.log(err)
                setIsError(true)
                }
                  }
       

                  const getProfile = async() =>{
                    setIsError(false)
                try {
                     const data = await fetch (`http://localhost:5000/api/searchuserss/${inputEmail}`)
                     const jsonInfo = await data.json()
                     if (jsonInfo.reviews){
                     setDataFirst(jsonInfo.reviews)
                     getUser()
                     }
                
                     else{
                        setIsError(true)
                    }
                
                    }catch(err) {
                    console.log(err)
                    setIsError(true)
                    }
                      }
                      const seeFriends = async () => {
                        try{
                        const response = await fetch(`http://127.0.0.1:5000/getusersacceptedfriends/${token}/${inputEmail}`);
                        const res = await response.json();
                        setToken(res.token)
                        if(res.friends.length>0) {
                          setFriends(res.friends)
                        }
                        else{
                          setNoFriend(true)
                      }
                  
                      } catch(error) {
                        console.log(error)
                      
                      }
                      };
    // const friend = friends.map((i) => <p>{i}</p>)

    const outputs = otherDatas.map((i) => {
        return < User data = {i} />
    })

     const results = otherData.map((i) => {
        return < User data = {i} />
    })

    const output = datas.map((i) => {
        return <CityReview  data = {i} />
    }) 
    
    const firstname = datafirst.map((i) => {
        return <FirstReview data = {i} />
    }) 

    const result = data.map((i) => {
    return < User data = {i} />
})

const addfriend = async(props) =>{
    const endpoint = `http://localhost:5000/friendRequest/${inputEmail}`;
    const data = {
       api_key: sessionStorage.getItem("token")
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
    console.log(JSON.stringify(props))
    
    
  }
  const sendMessage = async(props) =>{
    const endpoint = `http://localhost:5000/message/${inputEmail}/${message}`;
    const data = {
       api_key: sessionStorage.getItem("token"),
       email:inputEmail,
       message:message,
       time_stamp:now,
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
    console.log(JSON.stringify(props))
  }

  let now = moment().format("MM/DD/YYYY HH:mm:ss")

  console.log(friends.length)
  
return (
<Box
>
    <OtherNavBar/>
    <Heading fontFamily='Lucida Sans Unicode' color='#888' textAlign="center" justifyContent="center" marginTop={4}> Please search for a user below</Heading>
  
    {isError && <Text marginTop={3} color='red' textAlign="center" justifyContent='center'> This User/Email does not exist or has no reviews to see!</Text>} 
   
    <div className='userinput'>
    <input textAlign='center'  placeholder = "Email..." onChange = {e => setInputEmail(e.target.value)}></input> <br/>
   </div>
    <Flex
    sx = {{
      textAlign:'center',
      justifyContent:'center'
    }}
    >
    <div class = 'outterDiv'>
     <div class = "addfriend"> 
      <button  onClick = {e =>getProfile()}> Profile</button>  
  
       {firstname}
       
{/*       
       <div class = 'userButton'>
       {firstname.length >0 &&<button class = 'userActionButton' onClick = {e =>addfriend()}> Connect</button>}
      {firstname.length >0 && <button class = 'userActionButton'  onClick = {e =>getUser()}>More Info</button>}
     
      </div> */}
      
       </div> 
       
       {firstname.length >0 &&<button class = 'userActionButton' onClick = {e =>addfriend()}> Connect</button>}
       {/* {firstname.length >0 && <button class = 'userActionButton'  onClick = {e =>getUser()}>More Info</button>} */}
     
      
     </div>
     
     {/* <div class = 'outterDiv'>
      {firstname.length > 0 &&<div class = "dropdowns">
     {firstname.length > 0 && <p class = "drops"> More     <FaAngleDown/>  </p>}
      <i class="fa fa-caret-down"></i>
     {firstname.length > 0 && <div class = "dropdowns-contents">
      {firstname.length >0 &&<button onClick = {e =>addfriend()}> Connect</button>}
      {firstname.length >0 && <button  onClick = {e =>getUser()}>More Info</button>}
     
</div> }
</div>
 } */}
 
<div class = 'messwrapper'>
<div class = 'messcard'>
 {firstname.length >0 && <div class="form-container">
  <h1>Chat</h1>
  <label for="msg"><b>Message</b></label>
    <textarea  onChange={e => setMessage(e.target.value)} placeholder="Type message.." name="msg" required></textarea>
     {firstname.length >0 && <button class='btn'  onClick = {e =>sendMessage()} > Send <FaRocketchat class = 'faChat'/>  </button>} 

</div> }
</div>
</div>

</Flex>


    <div class = 'row'>
    <div class ='column'>
    {result.length >0 && <button onClick = {e =>seeFriends()}> Friends</button> }
    {result.length >0 && <hr></hr>}
    {friends.length >0 && <Text marginTop={3}>{friends}</Text> }
    {noFriend && <p>Currently no friends, connect above!</p>}
    </div>
    <div class = 'column'>
    {result.length >0 && <button  onClick = {e =>getRest()}> Restaurants</button> }
    {result.length >0 && <hr></hr>}
    {result.length >0 && <p > {results}</p> }
    </div>
    <div class = "column">
    {result.length >0 && <button   onClick = {e =>getCity()}> Cities</button>}
    {result.length >0 && <hr></hr>}
     {result.length >0 && <p >  {output}</p> } 

    </div>
    </div>
  
    
 </Box>
)
}
export default UserData;