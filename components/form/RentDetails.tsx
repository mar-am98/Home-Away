'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Input } from '../ui/input';


type RoomLabel = 'guests' | 'bedrooms' | 'beds' | 'baths';
type RoomCount = { [key in RoomLabel]: number };

function RentDetails({defaultValue}:{defaultValue?: Partial<RoomCount> }) {
  const [count,setCount]= useState<RoomCount>({
    guests: defaultValue?.guests ?? 0,
    bedrooms: defaultValue?.bedrooms ?? 0,
    beds: defaultValue?.beds ?? 0,
    baths: defaultValue?.baths ?? 0,
  })
  const roomLabels:RoomLabel[] = ['guests', 'bedrooms', 'beds', 'baths']
  function increment(label: RoomLabel){
      setCount((prev)=> ({...prev, [label] : prev[label]+1}))
  } 

  function decrement(label: RoomLabel){
    setCount((prev)=> ({...prev,[label] : prev[label] > 0 ? prev[label] - 1 : 0}))
  } 

  return (
    <div className='my-8'>
        <h3 className='text-lg font-medium'>Accommodation Details</h3>
        <div>
            {
              roomLabels.map((label)=>(
              <Card className='my-6' key={label}>
                  <CardContent className='flex justify-between items-center max-sm:flex-col gap-y-4'>
                      <div>
                          <h4 className='font-medium text-lg capitalize'>{label}</h4>
                          <p className='text-sm text-muted-foreground'>Specify the number of {label}</p>
                      </div>
                      <div className='flex items-center gap-4'>
                          <Button size={'icon'} variant={'outline'} onClick={()=>decrement(label)} type='button'>
                              <FaMinus className='text-primary' />
                          </Button>
                          <span className='font-bold text-2xl'>{count[label]}</span>
                          <Button size={'icon'}  variant={'outline'} onClick={()=>increment(label)} type='button'>
                              <FaPlus className='text-primary' />
                          </Button>
                      </div>
                  </CardContent>
                  <Input type='hidden' name={label} value={count[label]} />
              </Card>
              ))
          }
        </div>
    </div>
  )
}

export default RentDetails