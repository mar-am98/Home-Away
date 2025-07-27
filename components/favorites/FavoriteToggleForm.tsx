
import React from 'react'
import FormContainer from '../form/FormContainer';
import CardSubmitButton from './CardSubmitButton';
import { toggleFavAction } from '@/utils/actions';


type toggleFavActionProps = {
    propertyID: string,
    favoriteID: string | null
}

function FavoriteToggleForm({propertyID,favoriteID}:toggleFavActionProps) {
    const toggleAction = toggleFavAction.bind(null,{propertyID,favoriteID})
  
    return (
    <FormContainer action={toggleAction}>
        <CardSubmitButton isFav={favoriteID ? true : false} />
    </FormContainer>
  )
}

export default FavoriteToggleForm