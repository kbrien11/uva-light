import React,{useState,useEffect} from 'react';
import {Box,Heading,Text,Button,Card,Flex} from 'rebass';
import OtherNavBar from './LoggedInNavBar';
import Userprofile from './UserProfile';
import ProfileImage from './ProfileImage'
import Review from './Reviews';
import Message from './message';
import MessageTwo from './messagetwo'




const Profile = () =>{
    const [data,setData] = useState([])
    const [datas,setDatas] = useState([])
   const[messageError,setMessageError] = useState(false)
   const[error,setError] = useState(false)
   const [token, setToken] = useState(sessionStorage.getItem('token') || "")
  


    const seeFriends = async () => {
        try{
        const response = await fetch(`http://127.0.0.1:5000/getacceptedfriends/${token}`);
        const res = await response.json();
        if(res.friends.length>0){
          setToken(res.token)
          setData(res.friends)
          setError(false)
        }
        else{
          setError(true)
        }
      } catch(error) {
        console.log(error)
      
      }
      };

      const seemessages = async () => {
       
        try{
        const response = await fetch(`http://127.0.0.1:5000/getmessages/${token}`);
        const res = await response.json();
        // setDatas(res.friends);
        setToken(res.token)
        if (res.friends.length>0){
          setDatas(res.friends)
        }
        else{
          setMessageError(true)
        }
       
      } catch(error) {
        console.log(error)
      
      }
      };

      // const notifications = async () => {
      
      //   try{
      //   const response = await fetch(`http://127.0.0.1:5000/getmessages/${token}`);
      //   const res = await response.json();
      //   setPop(res.friends);
      //   setToken(res.token)
       
      // } catch(error) {
      //   console.log(error)
      
      // }
      // };

      const output = data.map((i) => <p>{i}</p>)

      const messages = datas.map((i) => {
        return <Message datas={i}/> 
      })
       
      // const notif = pop.map((i) => {
      //   return <MessageTwo datas={i}/> 
      // })




return (
  
 <Box>
     <OtherNavBar/>


  
 
  {/* <div class = 'inboxcard'>
  <Flex>
    <h4> Inbox</h4>
  <p>{notif.length} </p>
</Flex>
 </div>  */}
 <ProfileImage/> 
 <div class = 'rows'> 
 <div class = 'columns'>
 <Button  onClick={e => seeFriends()} backgroundColor='#f5f5f5' color="black" marginTop={5} width = {1/2}> Friends</Button>

   <hr color ='black'></hr>



 {/* <Button  onClick={e => seemessages()} backgroundColor='#f5f5f5' color="black" marginTop={5} width = {1/2}> Messages</Button>
 {messages.length > 0 && <Text marginTop={2} fontWeight="bold"> messages :{messages.length} </Text>}
 {messages} */}
 <Flex
 bg='li#f5f5f5'
 textAlign='center'
 justifyContent='center'
 >
 {output.length > 0 && <Text textAlign='left' fontWeight='bold' marginTop={3} backgroundColor='#f5f5f5'> Friend(s):</Text>}
 {output.length > 0 && <Text mx={2} fontWeight='bold' textAlign='center' marginTop={3} backgroundColor='#f5f5f5'>{output.length}</Text>}
 </Flex>
 
 {output.length > 0 && <Text mx={2}  color='black' backgroundColor='#f5f5f5'> {output}</Text>} 
 {error&& <Text fontFamily= 'Lucida Sans Unicode' marginTop={3}> You currently have no friends, go connect!</Text>}
 </div>
 <div class ='columns'>
 < p><Userprofile/></p>
 </div>
 <div class = 'columns'>
 < p ><Review/></p>

 </div>
 <div class = 'columns'>
 <Button  onClick={e => seemessages()} backgroundColor='#f5f5f5' color="black" marginTop={5} width = {1/2}> Messages</Button>

   <hr></hr>

 {messages.length > 0 && <Text textAlign='left' marginTop={2} marginBottom={2} fontWeight="bold"> Messages : {messages.length} </Text>}
 {/* <hr></hr> */}
 {messages}
 {messageError &&<Text fontFamily='Lucida Sans Unicode' marginTop={3} color='black'> You currently do not have any messages</Text>}


 </div>
 </div>
 

 </Box>
)
}
export default Profile;