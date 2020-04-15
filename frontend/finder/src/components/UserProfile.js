import React,{useState} from 'react';
import {Box,Text,Card,Button,Flex} from 'rebass';
import Relationships from './Relationships';




const Userprofile = () => {
    const [data,setData] = useState([])
    const [token, setToken] = useState(sessionStorage.getItem('token') || '')

    const seeFriends = async () => {
        try{
        const response = await fetch(`http://127.0.0.1:5000/getfriends/${token}`);
        const res = await response.json();
        setData(res.friends);
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
<hr color ='black'></hr>
     {output.length >0 && <Text fontWeight='bold' marginTop={4} backgroundColor='#f5f5f5'>  {output.length} request(s)</Text> }
     <div class = "pendingoutput">
     {output.length >0 && <p marginTop={1} backgroundColor='#f5f5f5'>{output}</p>}
     </div>
</Card>
</Flex>
</Box>
)
}
export default Userprofile;