import React,{useState} from 'react';
import {Flex} from 'rebass';

const Images = (props)=> {

return (
  <div>
    <Flex>
      <div class = 'cards'>  
    <img src = {props.data[2]}></img>
   {/* <p>{props.data[0]}  {props.data[1]}</p> */}
  
  
</div>


</Flex>
</div>
)
 }
 export default Images