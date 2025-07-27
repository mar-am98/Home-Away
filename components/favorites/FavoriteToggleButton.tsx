
import React from 'react'
import { useUser } from '@clerk/nextjs'
import CardSignButton from './CardSignButton'
import FavoriteToggleForm from './FavoriteToggleForm'
import { auth } from '@clerk/nextjs/server';
import { fetchFavoriteID } from '@/utils/actions';

async function FavoriteToggleButton({propertyID}:{propertyID:string}) {
  const {userId} = await auth();

  if(!userId) return <CardSignButton />
  const fetchID = await fetchFavoriteID(propertyID);

  
  return (
    <FavoriteToggleForm propertyID={propertyID} favoriteID={fetchID}/>
  )
}

export default FavoriteToggleButton