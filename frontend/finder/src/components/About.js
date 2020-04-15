import React from 'react';
import {Box,Heading,Text,Image} from 'rebass';
import NavBar from './Navbar'
import OtherNavBar from './LoggedInNavBar';



const About =() => {
return (
    <Box 
    sx ={{
        bg:'#f5f5f5',
        justifyContent:'center'
    }}>
<OtherNavBar/>
<Heading textAlign='center' marginTop={6}> Welcome to Uva!!</Heading>

  <Image marginTop={3} marginLeft={8} width ={200} src = "https://w0.pngwave.com/png/417/759/grapevines-cartoon-juice-grape-png-clip-art.png" />

<Text textAlign='center' marginTop={4} backgroundColor='#f5f5f5'>This is an appliaction this will help people find places to eat while traveling or studying abroad in Europe</Text>

<Text textAlign='center' backgroundColor="#f5f5f5"> Please connect to your friends, find the reviews they left and help others find great places too by reviewing places that you have visited as well</Text>

    </Box>
)
}
export default About;