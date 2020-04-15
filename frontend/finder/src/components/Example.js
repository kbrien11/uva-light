import React, { useState,useEffect} from 'react';
import City from './Cities';
import OtherNavBar from './LoggedInNavBar';
import {Input,Label, Select } from '@rebass/forms'
import {Box,Image,Heading,Button,Flex,Text,Card} from 'rebass';
import Rating from './Rating'
import './example.css'
import ExampleTwo from './ExampleTwo';
import Footer from './Footer';
import {FaSearch, FaFilter} from 'react-icons/fa'





function Example () {
  const[data, setData] = useState([]);
  const[datas, setDatas] = useState([]);
  const [inputCity,setInputCity] = useState('');
  const [isError,setIsError] = useState(false)
  const [priceRangeOne,setPriceRangeOne] = useState(true)
  const [priceRangeTwo,setPriceRangeTwo] = useState(2)
  const [priceRangeFour,setPriceRangeFour] = useState(4)
  const [rating,setRating] = useState(4)
  const [italian,setItalian] = useState('Italian')
  const [asian,setAsian] = useState('Asian')
  


  
  // useEffect(() => {fetchData()}, [])
  useEffect(() => {fetchDataOffset()}, [])

  const fetchData = async () => {
    setIsError(false)
    try{
    const response = await fetch(`http://127.0.0.1:5000/api/city/${inputCity}`);
    const data = await response.json();
     if (data.restaurants){
       setData(data.restaurants)
     }
  
      else{
        setIsError(true)
    }
    }catch(err) {
    console.log(err)
    setIsError(true)
    }
      }


  const fetchDataOffset = async () => {
    try{
    const response = await fetch(`http://127.0.0.1:5000/api/city/${data.length}/${inputCity}`);
    const datas = await response.json();
    setData(datas.restaurant);
  } catch(error) {
    console.log(error)
   
  }
  };

  const filterPriceOne = async () => {
    try{
    const response = await fetch(`http://127.0.0.1:5000/city/${inputCity}/${priceRangeOne}`);
    const datas = await response.json();
    setData(datas.restaurant);
  } catch(error) {
    console.log(error)
   
  }
  };

  const PriceOneOffset = async () => {
    try{
    const response = await fetch(`http://127.0.0.1:5000/api/price_one/offset/${inputCity}/${priceRangeOne}/${data.length}`);
    const datas = await response.json();
    setData(datas.restaurant);
  } catch(error) {
    console.log(error)
   
  }
  };

  const filterPriceTwo = async () => {
    try{
    const response = await fetch(`http://127.0.0.1:5000/price/${inputCity}/${priceRangeTwo}/${data.length}`);
    const datas = await response.json();
    setData(datas.restaurant);
  } catch(error) {
    console.log(error)
   
  }
  };
  const filterPriceFour = async () => {
    try{
    const response = await fetch(`http://127.0.0.1:5000/price_four/${inputCity}/${priceRangeFour}/${data.length}`);
    const datas = await response.json();
    setData(datas.restaurant);
  } catch(error) {
    console.log(error)
   
  }
  };

  const suggest = async () => {
    try{
    const response = await fetch(`http://127.0.0.1:5000/api/suggest/${inputCity}/${rating}/${priceRangeTwo}`);
    const datas = await response.json();
    setData(datas.restaurant);
  } catch(error) {
    console.log(error)
   
  }
  };

  const Italian = async () => {
    try{
    const response = await fetch(`http://127.0.0.1:5000/italian/${inputCity}/${italian}/${data.length}`);
    const datas = await response.json();
    setData(datas.restaurant);
  } catch(error) {
    console.log(error)
   
  }
  };

  const Asian = async () => {
    try{
    const response = await fetch(`http://127.0.0.1:5000/asian/${inputCity}/${asian}/${data.length}`);
    const datas = await response.json();
    setData(datas.restaurant);
  } catch(error) {
    console.log(error)
   
  }
  };


const search = <FaSearch/>
  const output = datas.map((i) => {
    return <City data={i}/> 
  })

 const results = data.map((i) => {
  return <City data={i}/> 
})


  return (
    <div>
    <OtherNavBar/>
    <div className='main'> 
   
      
    <div className='mainheader'>
    <h2 class = 'glow'>Uva</h2>
    </div>
  
    {isError && <Heading textAlign='center'   color='red'>City does not exist in database</Heading>}
      <Flex
     >
       <div class = 'homesearch'>
     <input  type="text" placeholder='Search City' onChange={e => setInputCity(e.target.value)} />
     <button type='button' onClick={e => fetchData()}> <FaSearch/> </button> 
     </div>
     </Flex>
     {results.length > 0 &&<div class = "dropdown">
     {results.length > 0 && <p class = "drop"> <span> Filter  <FaFilter/></span>  </p>}
     
     {results.length > 0 && <div class = "dropdown-content">
     {results.length > 0 && <button  onClick={e => PriceOneOffset()}>  Cheap </button>}
     {results.length > 0 && <button  onClick = {e => filterPriceTwo()}> Medium </button> }
     {results.length > 0 && <button  onClick = {e => filterPriceFour()}> Expensive </button> }
     {results.length > 0 && <button  onClick = {e => suggest()}> Vacation </button> }
     {results.length > 0 && <button  onClick = {e => Italian()}> Italian </button> }
     {results.length > 0 && <button  onClick = {e => Asian()}> Asian</button> }
     {results.length > 0 && <button  onClick={e => fetchDataOffset()}> Intial Results </button>}
     </div>}
     </div>}
     {results}
    {output.length > 0 && output}

     {results.length > 0 && <Footer/>}
  </div>
  </div>
);
}

export default Example;