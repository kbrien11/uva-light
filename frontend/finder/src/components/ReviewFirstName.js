import React from 'react';
import {Box,Text,Flex,Image,Card} from 'rebass';


const FirstReview = (props) => {

    
    return (
        <div>
            <Flex>
                {/* <div class ='container'> */}
                
              <div class = "card">  
            {/* <Card marginTop={2} backgroundColor = 'white' textAlign='center' width={[ 350, 520 ]} mx='auto'> */}
            <img src = {props.data[2]}></img>
           <p> {props.data[0]} {props.data[1]}</p>
 
   
    {/* </Card> */}
     </div>  
     {/* </div> */}
    </Flex>
    </div>
    )
    }
    export default FirstReview;