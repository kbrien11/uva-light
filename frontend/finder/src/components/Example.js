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
import Names from './Name';





function Example () {
  const[data, setData] = useState([]);
  const[datas, setDatas] = useState([]);
  const [inputCity,setInputCity] = useState('');
  const [isError,setIsError] = useState(false)
  const [priceRangeOne,setPriceRangeOne] = useState(null)
  const [priceRangeTwo,setPriceRangeTwo] = useState(null)
  const [priceRangeFour,setPriceRangeFour] = useState(null)
  const [rating,setRating] = useState(null)
  const [italian,setItalian] = useState(null)
  const[initial,setInitial] = useState(false)
  const[error,setError] = useState(false)
  const[moremed,setmoremed] = useState(false)
  const[moreExpensive,setMoreExpensive] = useState(false)
  const[moreItalian,setMoreItalian] = useState(false)
  const[moreAsian,setMoreAsian] = useState(false)
  const[moreVeg,setMoreVeg] = useState(false)
  const [asian,setAsian] = useState(null)
  const [vegeterian,setVegeterian] = useState(null)
  const [filterResults,setFilterResults] = useState(null)
  const [filterPrice,setFilterPrice] = useState(null)
  const [filterType,setFilterType] = useState(null)
  const [filterVacation,setFilterVacation] = useState(null)


  
  // useEffect(() => {fetchData()}, [])
  useEffect(() => {fetchDataOffset()}, [])

  const fetchData = async () => {
    setIsError(false)
    try{
    const response = await fetch(`http://127.0.0.1:5000/api/city/${inputCity}`);
    const data = await response.json();
     if (data.restaurants){
       setData(data.restaurants)
       setInitial(true)
      
    setError(false)
    setmoremed(false)
    setMoreExpensive(false)
    setMoreItalian(false)
    setMoreAsian(false)
    setMoreVeg(false)
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
    setInitial(true)
    setError(false)
    setmoremed(false)
    setMoreExpensive(false)
    setMoreItalian(false)
    setMoreAsian(false)
    setMoreVeg(false)
  } catch(error) {
    console.log(error)
   
  }
  };

  const PriceOneOffset = async () => {
    try{
    const response = await fetch(`http://127.0.0.1:5000/api/price_one/offset/${inputCity}/${priceRangeOne}/${data.length}`);
    const datas = await response.json();
    setData(datas.restaurant);
    setError(true)
    setInitial(false)
    setMoreExpensive(false)
    setmoremed(false)
    setMoreItalian(false)
    setMoreAsian(false)
    setMoreVeg(false)
  } catch(error) {
    console.log(error)
   
  }
  };

  const filterPriceTwo = async () => {
    try{
    const response = await fetch(`http://127.0.0.1:5000/price/${inputCity}/${priceRangeTwo}/${data.length}`);
    const datas = await response.json();
    setData(datas.restaurant);
    setmoremed(true)
    setError(false)
    setMoreExpensive(false)
    setInitial(false)
    setMoreItalian(false)
    setMoreAsian(false)
    setMoreVeg(false)
  } catch(error) {
    console.log(error)
   
  }
  };
  const filterPriceFour = async () => {
    try{
    const response = await fetch(`http://127.0.0.1:5000/price_four/${inputCity}/${priceRangeFour}/${data.length}`);
    const datas = await response.json();
    setData(datas.restaurant);
    setMoreExpensive(true)
    setError(false)
    setmoremed(false)
    setInitial(false)
    setMoreItalian(false)
    setMoreAsian(false)
    setMoreVeg(false)
  } catch(error) {
    console.log(error)
   
  }
  };

  const suggest = async () => {
    try{
    const response = await fetch(`http://127.0.0.1:5000/api/suggest/${inputCity}/${rating}/${priceRangeTwo}`);
    const datas = await response.json();
    setData(datas.restaurant);
    setMoreItalian(false)
    setMoreExpensive(false)
    setError(false)
    setmoremed(false)
    setInitial(false)
    setMoreAsian(false)
    setMoreVeg(false)
  } catch(error) {
    console.log(error)
   
  }
  };

  const Italian = async () => {
    try{
    const response = await fetch(`http://127.0.0.1:5000/italian/${inputCity}/${italian}/${data.length}`);
    const datas = await response.json();
    setData(datas.restaurant);
    setMoreItalian(true)
    setMoreExpensive(false)
    setError(false)
    setmoremed(false)
    setInitial(false)
    setMoreAsian(false)
    setMoreVeg(false)
  } catch(error) {
    console.log(error)
   
  }
  };

  const Asian = async () => {
    setError(false)
    try{
    const response = await fetch(`http://127.0.0.1:5000/asian/${inputCity}/${asian}/${data.length}`);
    const datas = await response.json();
    setData(datas.restaurant);
    setMoreItalian(false)
    setMoreExpensive(false)
    setError(false)
    setmoremed(false)
    setInitial(false)
    setMoreAsian(true)
    setMoreVeg(false)
  } catch(error) {
    console.log(error)
    setError(true)
   
  }
  };

  const Vegeterian = async () => {
    try{
    const response = await fetch(`http://127.0.0.1:5000/vegeterian/${inputCity}/${vegeterian}/${data.length}`);
    const datas = await response.json();
    setData(datas.restaurant);
    setMoreVeg(true)
    setMoreItalian(false)
    setMoreExpensive(false)
    setError(false)
    setmoremed(false)
    setInitial(false)
    setMoreAsian(false)
  } catch(error) {
    console.log(error)
   
  }
  };

const getFilter = () => {
  setFilterResults(true)
  setFilterPrice(false)
  setFilterType(false)
  setFilterVacation(false)
}
const getPrice = () => {
  setFilterPrice(true)
  setFilterResults(false)
  setFilterType(false)
  setFilterVacation(false)
}
const getCuisine = () => {
  setFilterPrice(false)
  setFilterResults(false)
  setFilterType(true)
  setFilterVacation(false)
}
const getVacation = () => {
  setFilterPrice(false)
  setFilterResults(false)
  setFilterType(false)
  setFilterVacation(true)
}
const getNone = () => {
  setFilterPrice(false)
  setFilterResults(false)
  setFilterType(false)
  setFilterVacation(false)
}

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
    < Names/>
    <div className='main'> 
   
      
    <div className='mainheader'>
    <h2 class = 'glow'>Uva</h2>
    </div>
  
    {isError && <Heading fontFamily='cursive' marginBottom={2} textAlign='center'   color='red'>City does not exist!</Heading>}
      <Flex
     >
       <div class = 'homesearch'>
     <input  type="text" placeholder='Search City' onChange={e => setInputCity(e.target.value)} />
     </div>
     
     </Flex>
     
       
     <div class = 'homesearchs'>
       <div class = 'mainsearch'>
     <button type='button' onClick={e => fetchData()}> <p><FaSearch backgroundColor='lightskyblue' height={100}/> </p> </button> 
     {results.length > 0 && <p> Filter</p> }
     </div>
  



       <Flex mx={2}
       textAlign='center'
       justifyContent='center'
      
      >
      {results.length > 0 &&  <button type ='button' onClick ={e=> getPrice()}> Price Range</button>}
     {results.length > 0 &&  <button type = 'button' onClick ={e=> getCuisine()}> Cuisine Type </button>}
     {results.length > 0 &&  <button type = 'button' onClick ={e=> getVacation()}> Vacation </button>}
       {results.length>0 && <button variant='outline' background color = 'lightskyblue' mx={2} backgroundColor='darkgrey' width={1/9}  onClick={e => getFilter()}> Reset </button>}
       {results.length > 0 &&  <button color ='lightskyblue' mx={2} backgroundColor='darkgrey' width={1/9} type = 'button' onClick ={e=> getNone()}> Clear Filter </button>}

        </Flex>
       <div class = 'filterhr'>
        {results.length>0 && <hr></hr>}
        </div>
     <div class = 'homesearch'>
     <div class = 'v1'></div>
     {filterResults && <button  onClick={e => fetchDataOffset()}> Initial Results </button>}
       <div class = 'v1'></div>
       <div>
       {filterPrice && <p> Price Range</p> }
       </div>
       {filterPrice &&  <button  onClick={e => PriceOneOffset()}>  Cheap </button>}
       {filterPrice && <button  onClick = {e => filterPriceTwo()}> Medium </button> }
       {filterPrice &&<button  onClick = {e => filterPriceFour()}> Expensive </button> }
   
    
     <div class = 'v1'></div>
     <div>
      {filterType && <p> Cuisine Type</p> }
     </div>
     {filterType && <button  onClick = {e => Italian()}> Italian </button> }
     {filterType && <button  onClick = {e => Asian()}> Asian</button> }
     {filterType && <button  onClick = {e => Vegeterian()}> Vegeterian</button> }
     <div class = 'v1'></div>
     <div class = 'v1'></div>
     {filterVacation && <button  onClick = {e => suggest()}> Vacation </button> }
  
         </div>
         </div>
     {results}
     <div class = 'morecheap'>
     {error &&  <button  onClick={e => PriceOneOffset()}> Load  More ! </button>}
     {moremed &&  <button  onClick={e => filterPriceTwo()}> Load More ! </button>}
     {moreExpensive &&  <button  onClick={e => filterPriceFour()}> Load  More ! </button>}
     {initial &&  <button  onClick={e => fetchDataOffset()}> Load  More ! </button>}
     {moreItalian &&  <button  onClick={e => Italian()}> Load  More ! </button>}
     {moreAsian &&  <button  onClick={e => Asian()}> Load  More ! </button>}
     {moreVeg &&  <button  onClick={e => Vegeterian()}> Load  More ! </button>}
     </div>
    {output.length > 0 && output}

     {results.length > 0 && <Footer/>}
  </div>
  </div>
);
}

export default Example;