import React, { useState } from 'react';
import {Box,Image,Card,Flex,Text} from 'rebass';
import Moment from 'react-moment';

const Message =(props) => {
    

    

return (
<div>
<div class ='mess'>
<img src = {props.datas[3]}></img>
<p> {props.datas[0]}</p>
<span class ="time-right">
<p>{props.datas[4]}  {props.datas[5]}</p> <br/>
<p> {props.datas[2]} </p> 
</span>
</div>    
</div>
    )
}
export default Message