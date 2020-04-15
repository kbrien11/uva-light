import React,{useState} from 'react';
import {Box,Text,Card,Heading,Image,Flex} from 'rebass';

import {FaStar} from 'react-icons/fa'


const User = (props) =>{
   const output = <FaStar/>
   const stars = []
   for (let i =0; i < (props.data[2]); i++) {
      stars.push(output)
   }

return (
   <Box>
     
      <Flex
         justifyContent="center"
         textAlign="center"
         >
    <Text fontWeight="bold" textAlign='center' justifyContent='center' marginTop={3} backgroundColor='#f5f5f5' >  {props.data[1]} </Text>
    <Text textAlign='center' justifyContent='center' marginTop={3} backgroundColor='#f5f5f5' >  ({props.data[0]}) </Text>
    <Text color = 'purple' marginTop={3}  fontWeight='bold' mx={3} textAlign='left' backgroundColor='#f5f5f5'> {stars}</Text>
    {/* <Image src = {props.data[5]}></Image> */}
   </Flex>
   </Box>

   
)
}
export default User;