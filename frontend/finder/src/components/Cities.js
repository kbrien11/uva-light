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


  const output = <FaStar backgroundColor='white'/>
  const stars = []
  for (let i =0; i < (props.data[5]); i += 1) {
     stars.push(output)
  }

 return (
  
   <div class = 'citycard'> 
    
   <Flex
   textAlign='center'
   >
     <div class = 'cityimage'>
      <object data =  {props.data[10]}  >
      <img src = "https://img.traveltriangle.com/blog/wp-content/uploads/2018/08/N64f007h-Rima-Italian-Restaurant.jpg"></img>
      </object>
       
</div>
    <Card height={220} marginTop={2} marginLeft={3} justifyContent='left' width={850} backgroundColor='#f5f5f5' textAlign='Center' p={2} color='blue' >
    <div class = 'address'>
    <p >{props.data[11]}</p>
    </div>
   <Flex
   marginTop={2}
    mx = {4}
    
    justifyContent = 'center'
    alignItems='center'
    color="black">
      <h2 marginTop={2} textAlign='center'  mx={1} fontWeight='bolder'  color="black" >{props.data[4]}.</h2>
      <h2 marginTop={2} fontFamily='Corben, Georgia, Times, serif;'  mx={1} color="black"> {props.data[1]}</h2> 
   
   </Flex>
  
   <Flex
  
    mx = {4}
    backgroundColor='#f5f5f5'
    justifyContent = 'center'
    alignItems='center'
    color="black">
   <Text  mx={1} justifyContent='center'  color="black" textAlign ="center"> {props.data[6]}</Text>
 <Text  color='gold'  mx={1}> {stars}</Text>
 <Text  color='black'>({props.data[5]})</Text>
   </Flex>

   <Flex
   marginTop={1}
    mx = {4}
    marginBottom={1}
    justifyContent = 'center'
    alignItems='center'
    color="black">
      <Text mx={1} color="black"  color="black">{props.data[7]} Reviews</Text>
      <div class = 'menulink'>
      <a fontWeight='bold' color='lightskyblue' backgroundColor='#f5f5f5'  href = {props.data[9]} target ='_blank'> Menu </a>
      </div>
    </Flex>
  
   <hr></hr>

   <Flex
   marginTop={1}
    mx = {4}
    
    justifyContent = 'center'
    alignItems='center'
    color="black">
   {<Text  marginTop={2} color="black"> {result}</Text>}
   </Flex>
   <Text marginBottom={1}  textAlign='center' justifyContent='center'  marginTop={2} color="black"> {results}</Text>
  
   <hr></hr>
    
   {[...Array(5)].map((star,i) => {
 const ratingValue = i + 1

 return (
     
      <label>
     <input class='starInput'
      type = 'radio' 
      name ='rating'
      value ={ratingValue} 
      onClick ={e =>setRating(ratingValue)}
      />
     <FaStar 
     class="star" 
     color ={ratingValue <=( hover || rating) ? 'gold': 'grey'} size ={40}
     onMouseEnter ={() => setHover(ratingValue)}
     onMouseLeave ={() => setHover(null)}/>
     </label>
)
})}
 <br/>
   <Button textAlign='center' justifyContent='left' marginTop={2} width={1/4} backgroundColor = "lightskyblue" color = 'white' marginBottom={3} onClick = {e => addRating()} > Add rating </Button>
  
   </Card>
   </Flex>  
   </div>
) ;
};

export default City;







