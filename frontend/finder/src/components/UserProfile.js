import React,{useState} from 'react';
import {Box,Text,Card,Button,Flex} from 'rebass';
import Relationships from './Relationships';




const Userprofile = () => {
    const [data,setData] = useState([])
    const [token, setToken] = useState(sessionStorage.getItem('token') || '')
    const[error,setError] = useState(false)

    const seeFriends = async () => {
        try{
        const response = await fetch(`http://127.0.0.1:5000/getfriends/${token}`);
        const res = await response.json();
       if(res.friends.length>0) {
         setData(res.friends)
         setError(false)
       }
        else{
          setError(true)
          setData([])
        }
      } catch(error) {
        console.log(error)
      
      }
      };
     
      const output = data.map((i) => {
        return <Relationships data={i}/> 
      })

return(
<Box>
  <Flex
   justifyContent='center'
   textAlign = 'center'
  >
<Card marginTop={4} p={2} height={400} width={400} backgroundColor="#f5f5f5">
<Button  onClick ={e => seeFriends()} backgroundColor='#f5f5f5' color="black"  marginTop={3} width = {1/2}> Pending</Button>
<div class = "pendingoutput">
<hr ></hr>
      {error && <Text fontFamily= 'Lucida Sans Unicode' marginTop={3}>No pending friend requests</Text>}
     {output.length >0 && <Text fontFamily= 'Lucida Sans Unicode'
       marginTop={4} backgroundColor='#f5f5f5'>  {output.length} Request(s)</Text> }
     
     {output.length >0 && <p marginTop={1} backgroundColor='#f5f5f5'>{output}</p>}
     </div>
</Card>
</Flex>
</Box>
)
}
export default Userprofile;