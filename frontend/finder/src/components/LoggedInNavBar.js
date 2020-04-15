import React,{useEffect,useState} from 'react';
import {Flex, Box, Link,Text,Heading} from 'rebass'; 
import {Link as RouterLink} from 'react-router-dom';
import MessageTwo from './messagetwo'
import Logged from './loggedininfo';


const OtherNavBar =() => {
    const[data,setData] = useState([])
    const [pop,setPop] = useState([])
    const[mess,seeMess] = useState(false)
    const [token, setToken] = useState(sessionStorage.getItem('token'))
    const [image,setImage] =useState(false)

    useEffect(() => {seeUsers()},(image))
    useEffect(() => {notifications()},(mess))

  const seeUsers = async () => {
    setImage(false)
    try{
    const response = await fetch(`http://127.0.0.1:5000/api/users/${token}`);
    const res = await response.json();
    setData(res.results);
    setToken(res.token)
    setImage(true)
  } catch(error) {
    console.log(error)
  
  }
  };

  const output = data.map((i) => {
    return <Logged data={i}/> 
  })

  const notifications = async () => {
      
    try{
    const response = await fetch(`http://127.0.0.1:5000/getmessages/${token}`);
    const res = await response.json();
    setPop(res.friends);
    setToken(res.token)
   
  } catch(error) {
    console.log(error)
  
  }
  };

  const notif = pop.map((i) => {
    return <MessageTwo datas={i}/> 
  })

return (
    <div class="nav_wrapper">
<div class='firstnav'>
<Flex 
bg ='lightskyblue'
> 

   <h2 backgroundColor='lightskyblue' fontSize={6} fontWeight='bold'   > Uva</h2>
    <a link sx= {{':hover': { backgroundColor:"grey"}}} marginTop={3} backgroundColor='purple' color='white' fontWeight='bold'   p={1}  href= '/home'as ={RouterLink}> Home  </a>
    <a link sx= {{':hover': { backgroundColor:"grey"}}} marginTop={3} backgroundColor='purple' color='white' fontWeight='bold'   p={1}  href= '/user' as ={RouterLink}>  Users </a>
    <a  sx= {{':hover': { backgroundColor:"grey"}}} marginTop={3} backgroundColor='purple' color='white' fontWeight='bold'   p={1}  href= '/view profile'as ={RouterLink}> Profile </a>
    <a sx= {{':hover': { backgroundColor:"grey"}}} marginTop={3} backgroundColor='purple' color='white' fontWeight='bold'   p={1} href= '/about'as ={RouterLink}> About </a>
   <a sx= {{':hover': { backgroundColor:"grey"}}} marginTop={3} backgroundColor='purple' color='white' fontWeight='bold'   p={1}  href= '/cities'as ={RouterLink}> Cities </a>
   <div class = 'logoutnavbar'>
   <a sx= {{':hover': { backgroundColor:"grey"}}}  backgroundColor='purple' color='white' fontWeight='bold'   p={2} textAlin='right'  href= '/'as ={RouterLink}> Logout </a>
   </div>
   <div class = 'inboxcard'>
  <Flex 
  bg="lightskyblue"
  >
    <h4> Inbox</h4>
  <p>{notif.length} </p>
</Flex>
 </div> 
 <div class = 'navimg'>
   {image && output}
   </div>
</Flex>
</div>
</div>
)
}
export default OtherNavBar;

