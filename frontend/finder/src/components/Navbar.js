import React from 'react';
import {Flex, Heading, Link, Text} from 'rebass'; 
import {Link as RouterLink} from 'react-router-dom';



const NavBar =() => {
return(
    <div class="nav_wrapper">
<div class='navbars' >
<Flex
bg ='purple'
> 
    <h2  > Uva</h2>
   <Link sx= {{':hover': { backgroundColor:"grey"}}}  backgroundColor='purple' color='white'  p={3} to= '/'as ={RouterLink}> Sign up </Link>
   <Link sx= {{':hover': { backgroundColor:"grey"}}}  backgroundColor='purple' color='white'  p={3} to= '/main'as ={RouterLink}> Log in </Link>
   <Link sx= {{':hover': { backgroundColor:"grey"}}}  backgroundColor='purple' color='white' p={3} to= '/about'as ={RouterLink}> About </Link>
   <Link sx= {{':hover': { backgroundColor:"grey"}}}  backgroundColor='purple' color='white'  p={3} to= '/cities'as ={RouterLink}> Cities </Link>
   </Flex>
</div>    
</div>
)
}
export default NavBar;


{/* <img class="rg_i Q4LuWd tx8vtf" data-src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQnJtPxmppENkgvam4qzDybn6Hr-MYenSm7vkgfyQ3HlriO928" data-lt="" jsname="Q4LuWd" alt="Image result for cool grape" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQnJtPxmppENkgvam4qzDybn6Hr-MYenSm7vkgfyQ3HlriO928"></img> */}