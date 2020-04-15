import React from 'react';
import {Box,Text} from 'rebass';

const CityReview = (props) => {



    
return (
    <Box>

<Text marginTop={2} justifyContent='center' fontWeight='bold' backgroundColor='#f5f5f5' textAlign="center">  {props.data[0]}</Text>

   </Box>
)
}
export default CityReview;