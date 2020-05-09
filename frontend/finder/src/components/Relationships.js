import React,{useState} from 'react';
import {Box,Button,Text,Flex} from 'rebass';
import {FaCheckSquare} from 'react-icons/fa'


const Relationships = (props) =>{

    const acceptfriend = async() =>{
        const endpoint = `http://localhost:5000/acceptfriend/${props.data[1]}`;
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

return (
    <Box>
 <Flex
 textAlign ='center'
 justifyContent='center'
 >
 <Text marginTop={2} backgroundColor ='#f5f5f5'> {props.data[0]}</Text>
{/* <Text backgroundColor ='lightgrey'> {props.data[1]}</Text> */}
   <div class = 'pendingbutton'>
     <button type = 'button' onClick={e => acceptfriend()}  marginTop={2} textAlign='center' justifyContent='center' backgroundColor='lightgrey' color="purple" mx={2}  width = {1/5}>  <FaCheckSquare /></button>
     </div>
     </Flex>
     
</Box>
)
}
export default Relationships