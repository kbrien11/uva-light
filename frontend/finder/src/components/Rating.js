import React,{useState} from 'react';
import {Box,Text,Card,Heading,Button,Flex} from 'rebass';

import {Input,Label, Select } from '@rebass/forms'


const Rating = (props) => {

const[inputRating,setRating] = useState('')
const [token, setToken] = useState(sessionStorage.getItem('token') || '')

const addRating = async() => {
    const endpoint = `http://localhost:5000/api/addreview/${token}/${props.data[1]}`;
    const data = {
      Rating:inputRating

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
    sessionStorage.setItem("token",res.token)
    setToken(res.token)
  }

 return (
   <Box sx ={{justifyContent:'center',
       textAlign:'center'}}> 
  <Card  marginLeft={8} width={900} textAlign='Center' backgroundColor="lightgreen" color='blue' p={3} marginBottom={2}>
      <Heading  color="purple"> {props.data[1]}</Heading> 
   <Flex
   marginTop={2}
    mx = {4}
    justifyContent = 'center'
    alignItems='center'
    color="black">
   <Text justifyContent='center'  color="black" textAlign ="center" marginBottom={3}> {props.data[6]}</Text>
   <Text justifyContent='center' color="black" textAlign ="center" marginBottom={3}> Ranking: {props.data[4]}</Text>
   </Flex>
   <Flex
   marginTop={1}
    mx = {4}
    justifyContent = 'center'
    alignItems='center'
    color="black">
   <Text marginTop={2} color="black"> {props.data[3]}</Text>
   <Text marginTop={2} color="black"> Rating: {props.data[5]}</Text>
   </Flex>
   <Text marginTop={2} color="black"> {props.data[2]}</Text>
   <Text marginLeft={4} color="black"  marginTop={2} color="black">{props.data[7]} Reviews</Text>
   <Text marginLeft={4} marginTop={2} color="black"> {props.data[8]}</Text>
   
    <Input backgroundColor="white" marginLeft={7} width={1/3} marginTop={2} placeholder = "rating" onChange = {e =>setRating(e.target.value)}></Input> <br/>
   <Button marginTop={2} width={1/3} backgroundColor = "purple" color = 'white' marginTop={2} onClick = {e => addRating()} > Add rating </Button>
  
   </Card>  
   </Box>

) ;
};

export default Rating;