import React,{useState} from 'react'
import {FaStar, FaStarHalf} from 'react-icons/fa'


const StarRating =() => {
// const [rating,setRating] = useState(null)
// const [hover,setHover] = useState(null)

return (
<div>
{[...Array(5)].map((star,i) => {
 const ratingValue = i+1

 return (
      <label>
     <input
      type = 'radio' 
      name ='rating'
      value ={ratingValue} 
    //   onClick ={e =>setRating(ratingValue)}
    //   onMouseEnter ={() => setHover(ratingValue)}
    //   onMouseLeave ={() => setHover(null)}
      />
     <FaStarHalf className="star" color ={ratingValue <=(  rating) ? 'purple': 'grey'} size ={20}/>
     </label>
)
})}
</div>
)
}
export default StarRating;