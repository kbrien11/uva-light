import React, { useState, useEffect } from 'react';
import {Box,Image,Card,Flex,Text} from 'rebass';
import Images from './userPicture'


const ProfileImage = () => {

const[data,setData] = useState([])
const [token, setToken] = useState(sessionStorage.getItem('token'))
const [image,setImage] =useState(false)
  
useEffect(() => {seeUsers()},(image))

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
    return <Images data={i}/> 
  })
return (
    <Box>

    <Flex>
  <Card  marginTop={3} width={[ 330, 360 ]} mx='auto'>
    <div class = 'profilebutton'>
     {/* <button type = 'button' onClick = {e => seeUsers()}> Profile</button>  */}
    {image && output}
    {/* {output}  */}
    </div>
  </Card>
</Flex>

    </Box>
)
}
export default ProfileImage


