import React,{useState} from 'react';
import {Box,Heading,Text,Button,Card,Flex} from 'rebass';
import User from './User';


const Review = (props) => {

    const [data,setData] = useState([])
    const [token, setToken] = useState(sessionStorage.getItem('token') || '')

    const seeReviews = async () => {
        try{
        const response = await fetch(`http://127.0.0.1:5000/api/onereview/${token}`);
        const res = await response.json();
        setData(res.reviews);
      } catch(error) {
        console.log(error)
      
      }
      };
  
      
      const result = data.map((i) => {
        return < User data = {i} />
    })


return (
    // <div class = 'reviewss'>
<Box>
  <Flex
   justifyContent='center'
   textAlign = 'center'
  >
<Card marginTop={4} p={2} height={400} width={650} backgroundColor="#f5f5f5">
    <Button  onClick={e => seeReviews()} backgroundColor='#f5f5f5'  color="black" marginTop={3}  width = {1/2}> Reviews</Button>
    <hr color ='black'></hr>
    {result.length >0 &&<p fontWeight='bold'> # of reviews : {result.length}</p>}
    {result.length >0 &&<p backgroundColor="#f5f5f5" marginLeft={1} marginTop={1}>{result}</p>}
  
 </Card> 
</Flex>
</Box>
)
}
export default Review