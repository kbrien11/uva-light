import React from 'react';
import {Box,Text,Heading} from 'rebass';
import NavBar from './Navbar';
import OtherNavBar from './LoggedInNavBar';



const CityList = () => {
return (
    <Box>
        <OtherNavBar/>
<Heading color='purple' textAlign='center' fontWeight='bold' p={3} marginTop={1}> Here is a list of all the cites that are in the databse</Heading>
<Text textAlign='center'  fontWeight='bold' p={3} marginTop={5}> Amsterdam (NL) </Text>
<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Athens (GR) </Text>
<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Barcelona (ES) </Text>
<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Berlin (DE) </Text>


<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Copenhagen (DK) </Text>
<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Dublin (IE) </Text>
<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Edinburgh (UK) </Text>
<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Helsinki (FI)</Text>

<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Krakow (PL), </Text>
<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Lisbon (PT) </Text>

<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> London (UK)</Text>

<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Madrid (ES) </Text>

<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Milan (IT)</Text>
<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Munich (DE)</Text>

<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Oslo (NO)</Text>
<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Paris (FR) </Text>
<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Prague (CZ)</Text>
<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Rome (IT)</Text>
<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Stockholm (SE)</Text>
<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Vienna (AT) </Text>

<Text textAlign='center' fontWeight='bold' p={3} marginTop={1}> Zurich (CH) </Text>

</Box>
)
}
export default CityList;