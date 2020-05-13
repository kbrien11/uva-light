import React,{useState, useEffect} from 'react';
import {Box,Heading,Text,Button,Card,Flex} from 'rebass';
 import {Pie} from 'react-chartjs-2'
import User from './User';


const Review = (props) => {

    const [data,setData] = useState([])
    const [token, setToken] = useState(sessionStorage.getItem('token') || '')
    const [chartData,setChartData] = useState({})
    const [error,setError] = useState(false)
    const [reviewError,setReviewError] = useState(false)

    const seeReviews = async () => {
      const rest =[]
      
      const rate =[]
      setError(false)
        try{
        const response = await fetch(`http://127.0.0.1:5000/api/onereview/${token}`);
        const res = await response.json();
         if(res.reviews.length>0) {
        
          setData(res.reviews)
        for(const output of res.reviews) {
          rest.push(output[1])
          rate.push(output[2])
          
      }
        setChartData ({
         
           labels:[...rest],
          datasets: [
             {
              //  label: 'Reviews',
               data:[...rate],
               backgroundColor: ['blue','orange','green','yellow','purple','darkgreen','pink','red','grey','darkblue'],
               height:80,
               width:30
              
              
              
              //  borderColor:"black",
              //  borderWidth:2,
              //  fontColor:'red',
              //  bottom:10


             }

          ]

        
       })}
      
      else{
        setReviewError(true)
      }
        
      } catch(error) {
        console.log(error)
        setReviewError(true)
      
      }
      };

      // const chart =() =>{
      //   setChartData ({
      //      labels:['firstCity', 'secondCity','thirdCity'],
      //      datasets: [
      //         {
                
      //           data:[3.5,5, 4],
      //           backgroundColor:[
      //             'blue','blue','blue'
      //           ],
      //           height: '300px'


      //         }

      //      ]


      //   })
      // }
  
      
      const result = data.map((i) => {
        return < User data = {i} />
    })
     
    // useEffect(() => {
    //   chart()
    // }, [])
    


return (
    // <div class = 'reviewss'>
<Box>
  <Flex
   justifyContent='center'
   textAlign = 'center'
  >
<Card marginTop={4} p={2} backgroundColor="#f5f5f5">
    <Button  onClick={e => seeReviews()} backgroundColor='#f5f5f5'  color="black" marginTop={3}  width = {1/2}> Reviews</Button>
    
    <div class = 'reviewerror'>
    <hr ></hr>
    {reviewError &&<p> You currently have no reviews, go check out some restaraunts!</p>}
    </div>
    {result.length >0 &&<p fontWeight='bold'> # of Reviews : {result.length}</p>}
    {/* {result.length >0 &&<p backgroundColor="#f5f5f5" marginLeft={1} marginTop={1}>{result}</p>} */}
   <Card></Card>
    <div class = 'chart'>
      <div class = 'divchart'>
    {result.length > 0 &&  <Pie data={chartData} options = {{
     title: {
      display: true,
      text: 'Restaurant ratings'
    }
  
      // responsive: true,
      // maintainAspectRatio: true,
      // scales: {
      //   yAxes: [
      //     {
      //       ticks: {
      //         beginAtZero:true,
      //         padding:10,
      //         max:5,
      //         stepSize:0.5,
      //         lineHeight:1,
      //         backdropColor:'blue',
      //         height:20
      //       },
      //       gridLines: {
      //         display: true
      //       },
      //       scaleLabel: {
      //         display: true,
      //         labelString: 'Rating',
      //         fontColor:'red',
      //         fontSize:20
      //       }
      //     }
      //   ],
      //   xAxes: [
      //     {
      //       ticks: { 
      //         fontSize:8,
      //         padding:4,
      //         marginLeft: 5,
      //         align:'right'
      //       },
      //       gridLines: {
      //       display:true,
      //       fontStyle:'cursive',
      //       padding: 6,
          
      //       Align:'right',
      //       bottom:5
      //     },
      //     scaleLabel: {
      //       display: true,
      //       labelString: 'Restaurants',
      //       fontColor:'red',
      //       fontSize:20
      //     }
      //     }
      //   ]
      // },
      // layout :{
      //   padding: {
      //     bottom:4,
      //     left:10
      //   }
        
      // }
    }}
    
    />
    
    }
    </div>
    </div>
    
 </Card> 
</Flex>
</Box>
)
}
export default Review