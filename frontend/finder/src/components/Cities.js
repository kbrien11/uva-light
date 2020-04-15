import React,{useState} from 'react';
import {Box,Text,Card,Heading,Button,Flex,Link,Image} from 'rebass';
import {Input,Label, Select } from '@rebass/forms'
import {Link as RouterLink} from 'react-router-dom';
import {FaStar} from 'react-icons/fa'



const City = (props) => {

const [rating,setRating] = useState(null)
const [hover,setHover] = useState(null)
const [token, setToken] = useState(sessionStorage.getItem('token'))

const addRating = async() => {
    const endpoint = `http://localhost:5000/api/addreview/${token}/${props.data[1]}/${props.data[2]}`;
    const data = {
      Rating:rating

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
    setToken(res.token)
    
    
    
   
  }
  
let result = (props.data[3]).replace(/("|')/g, "")
let results = (props.data[8]).replace(/("|')/g, "")


  const output = <FaStar/>
  const stars = []
  for (let i =0; i < (props.data[5]); i += 1) {
     stars.push(output)
  }

 return (
  
   <Box sx ={{justifyContent:'center',
       textAlign:'center'}}> 
    
   <Flex
   textAlign='center'
   >
     <div class = 'cityimage'>
      
       <img src = {props.data[10]} onError ></img>
    
      
</div>
    <Card marginTop={2} marginLeft={3} justifyContent='left' width={850} textAlign='Center' backgroundColor="white" color='blue' p={2} marginBottom={2}>
  
   <Flex
   marginTop={2}
    mx = {4}
    backgroundColor='white'
    justifyContent = 'center'
    alignItems='center'
    color="black">
      <Heading backgroundColor='white'  mx={1} fontWeight='bolder' justifyContent='center' color="black" textAlign ="center">{props.data[4]}.</Heading>
      <Heading fontFamily='Corben, Georgia, Times, serif;' backgroundColor='white' mx={1} color="black"> {props.data[1]}</Heading> 
      
   </Flex>
   <Flex
   marginTop={2}
    mx = {4}
    backgroundColor='white'
    justifyContent = 'center'
    alignItems='center'
    color="black">
   <Text backgroundColor='white' mx={1} justifyContent='center'  color="black" textAlign ="center"> {props.data[6]}</Text>
 <Text backgroundColor='white' color='gold'  mx={1}> {stars}</Text>

   </Flex>

   <Flex
   marginTop={1}
    mx = {4}
    backgroundColor='white'
    justifyContent = 'center'
    alignItems='center'
    color="black">
      <Text backgroundColor='white'mx={1} color="black"  color="black">{props.data[7]} Reviews</Text>
      <div class = 'menulink'>
      <a fontWeight='bold' color='lightskyblue' backgroundColor='white'  href = {props.data[11]} target ='_blank'> Menu </a>
      </div>
    </Flex>

   <hr></hr>

   <Flex
   marginTop={1}
    mx = {4}
    backgroundColor='white'
    justifyContent = 'center'
    alignItems='center'
    color="black">
   {<Text backgroundColor='white' marginTop={2} color="black"> {result}</Text>}
   </Flex>
   <Text backgroundColor='white' marginLeft={4} marginTop={2} color="black"> {results}</Text>
  
   <hr></hr>
    
   {[...Array(5)].map((star,i) => {
 const ratingValue = i + 1/2

 return (
  
      <label>
     <input class='starInput'
      type = 'radio' 
      name ='rating'
      value ={ratingValue} 
      onClick ={e =>setRating(ratingValue)}
      />
     <FaStar backgroundColor='white' 
     class="star" 
     color ={ratingValue <=( hover || rating) ? 'gold': 'grey'} size ={40}
     onMouseEnter ={() => setHover(ratingValue)}
     onMouseLeave ={() => setHover(null)}/>
     </label>
)
})}
 <br/>
   <Button marginTop={2} width={1/4} backgroundColor = "lightskyblue" color = 'white' marginTop={2} onClick = {e => addRating()} > Add rating </Button>
  
   </Card>
   </Flex>  
   </Box>
) ;
};

export default City;






<img alt="Food - Wikipedia" class="n3VNCb" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg" data-noaft="1" jsname="HiaYvf" jsaction="load:XAeZkd;" style="width: 585px; height: 390px; margin: 0px;"></img>