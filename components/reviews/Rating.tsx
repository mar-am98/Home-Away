import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa';

function Rating({rating}:{rating:number}) {
  const stars = Array.from({length:5},(_,i)=> i+1 <=rating);
  return (
    <div className='flex items-center gap-1'>
      {
        stars.map((full,i)=>{
          return full 
          ? <FaStar key={i} className='text-yellow-400'/>

          : <FaRegStar key={i} />
        })
      }
    </div>
  )
}

export default Rating