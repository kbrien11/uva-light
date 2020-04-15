import React from 'react';
import {Flex, Heading, Link, Text} from 'rebass'; 
import {Link as RouterLink} from 'react-router-dom';



const NavBars =() => {
return(
    <div class="nav_wrapper">
<div class='navbar' >
<Flex 
bg='purple'
> 
<Heading backgroundColor='purple' fontSize={6} fontWeight='bold'    > Uva</Heading>
   <Link sx= {{':hover': { backgroundColor:"grey"}}} marginTop={3} backgroundColor='purple' color='white'  p={3} to= '/'as ={RouterLink}> Sign up </Link>
   <Link sx= {{':hover': { backgroundColor:"grey"}}} marginTop={3} backgroundColor='purple' color='white'  p={3} to= '/main'as ={RouterLink}> Log in </Link>
   <Link sx= {{':hover': { backgroundColor:"grey"}}} marginTop={3} backgroundColor='purple' color='white' p={3} to= '/about'as ={RouterLink}> About </Link>
   <Link sx= {{':hover': { backgroundColor:"grey"}}} marginTop={3} backgroundColor='purple' color='white'  p={3} to= '/cities'as ={RouterLink}> Cities </Link>
   </Flex>
</div>    
</div>
)
}
export default NavBars;