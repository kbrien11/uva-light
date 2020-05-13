import React,{useState,useEffect} from 'react';
import {Box,Text,Flex,Image,Card} from 'rebass';
import User from './User';

const FirstReview = (props) => {

  const [otherDatas,setOtherDatas] = useState([])
  const [isError,setIsError] = useState(0)
  const [friendError,setFriendError] = useState(0)
  const [friends,setFriends] = useState([])
  const [token, setToken] = useState(sessionStorage.getItem('token') || "")
  const [otherData,setOtherData] = useState([])

  useEffect(() => {getRev()}, [])
  useEffect(() => {seeFriends()}, [])
  useEffect(() => {getRest()}, [])

  const getRev = async() =>{
    setIsError(false)
try {
     const data = await fetch (`http://localhost:5000/api/searchuser/${props.data[3]}`)
     const jsonInfo = await data.json()
     if (jsonInfo.reviews){
     setOtherDatas(jsonInfo.reviews)
     }

     else{
        setIsError(0)
    }

    }catch(err) {
    console.log(err)
    setIsError(true)
    }
      }

       
      const getRest = async() =>{
        setIsError(false)
    try {
         const data = await fetch (`http://localhost:5000/api/searchuser/${props.data[3]}`)
         const jsonInfo = await data.json()
         if (jsonInfo.reviews){
         setOtherData(jsonInfo.reviews)
         }
    
         else{
            setIsError(true)
        }
    
        }catch(err) {
        console.log(err)
        setIsError(true)
        }
          }

      const seeFriends = async () => {
        try{
        const response = await fetch(`http://127.0.0.1:5000/getusersacceptedfriends/${token}/${props.data[3]}`);
        const res = await response.json();
        setToken(res.token)
        setFriends(res.friends)
        console.log(res.friends)
        
  
      }catch(error) {
        console.log(error)
      
      }
      };
     console.log(Number(friends))
      const results = otherData.map((i) => {
        return < User data = {i} />
    })

      const outputs = otherDatas.map((i) => {
        return < User data = {i} />
    })
    
    return (
        <div>
            <Flex>
                {/* <div class ='container'> */}
                
              <div class = "card">  
            {/* <Card marginTop={2} backgroundColor = 'white' textAlign='center' width={[ 350, 520 ]} mx='auto'> */}
            <img src = {props.data[2]}></img>
           <p> {props.data[0]} {props.data[1]}</p>
           {/* <hr></hr> */}
           {/* <p> {props.data[3]}</p> */}
           <div class ='cardinfo'>
           {outputs.length> 0 && <h5> Reviews</h5>}
           
           {outputs.length>0 ? <p>{outputs.length}</p>: isError}
           {/* {isError && <p>0</p>} */}
          
           {outputs.length> 0 && <h3> Friends</h3>}
           
           {friends.length>0 ? <h4>{friends.length}</h4> :outputs.length>0 && <h4>{friends}</h4> }
           {/* {outputs.length>0 && <h4>{friends.length}</h4>} */}
           
           
           {results.length> 0 && <h1> Restaurants</h1>}
           
           {results.length>0 ? <h2>{results.length}</h2>: isError}
           </div>
           {/* <div class = 'cardfriends'>
           {friends.length> 0 && <h5> Friends</h5>}
           
           {friends.length>0 && <h4>{friends.length}</h4>}
           </div> */}
   
    {/* </Card> */}
     </div>  
    
     {/* </div> */}
    </Flex>

       </div>
    )
    }
    export default FirstReview;