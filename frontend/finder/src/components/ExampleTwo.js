import React, { useState} from 'react';
import City from './Cities';
import {Box,Image,Heading,Button,Flex,Text} from 'rebass';
import {Input,Label, Select } from '@rebass/forms'

const ExampleTwo = (props) => {
  const[data, setData] = useState([]);
  const[datas, setDatas] = useState([]);
  const [inputRating,setInputRating] =useState ('');

    const filterData = async () => {
        try{
        const endpoint = await fetch(`http://localhost:5000/api/rating/${inputRating}`);
        const datas = await endpoint.json()
        setDatas(datas.rest);
      } catch(error) {
        console.log(error)
       
      }
      };
  const filterOffset = async () => {
    
    try{
    const response = await fetch(`http://127.0.0.1:5000/api/rating/${inputRating}/${data.length}`);
    const datas = await response.json();
    setData(datas.restaurant);
  } catch(error) {
    console.log(error)
    
  }
  };

  const output = datas.map((i) => {
    return <City data={i}/> 
  })

 const results = data.map((i) => {
  return <City data={i}/> 
})

    
return (
    <div>
<Flex>
 <Input color="purple" backgroundColor="black" marginLeft={3} marginTop ={5} width ={1/7} type="text" id = "name" placeholder="Rating" onChange={e => setInputRating(e.target.value)} />
 <Button width={1/9} mx={2} marginTop={4} backgroundColor="purple" onClick={e => filterData()}> Filter </Button> 
 </Flex>
   
    {output}

    {output.length > 0 && <Button marginLeft={8} marginTop={2} backgroundColor="Orange" onClick={e => filterOffset()}>  More results </Button>}
    {results}
    </div>
)
}
export default ExampleTwo