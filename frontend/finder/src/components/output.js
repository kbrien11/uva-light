import React, { useState,useEffect} from 'react';
import ExampleTwo from './ExampleTwo';
import Example from './Example';

const Output =() => {
return (
    <div>
   <Example /> ? <Example/> : <ExampleTwo/>
   </div>
)
}
export default Output