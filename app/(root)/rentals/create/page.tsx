import Amenities from '@/components/form/Amenities'
import CategoryInput from '@/components/form/CategoryInput'
import CountryInput from '@/components/form/CountryInput'
import FormButton from '@/components/form/FormButton'
import FormContainer from '@/components/form/FormContainer'
import ImageInput from '@/components/form/ImageInput'
import InputForm from '@/components/form/InputForm'
import PriceInput from '@/components/form/PriceInput'
import RentDetails from '@/components/form/RentDetails'
import TextAreaInput from '@/components/form/TextAreaInput'
import { Card } from '@/components/ui/card'
import { createRentalForm } from '@/utils/actions'
import React from 'react'

function CreatePropertPage() {
  return (
    <section className='mt-10'>
      <h1 className='text-2xl font-semibold mb-8'>Create Property</h1>
    
      <Card className='p-6'>
        <h3 className='text-lg font-medium'>General Info</h3>
        
        <FormContainer action={createRentalForm}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <InputForm name='name' type='text' placeholder='Property Name'/>
            <InputForm name='tagLine' type='text' placeholder='Tagline' />
            <PriceInput name='price'/>
            <CategoryInput />
            <div className="md:col-span-2">
              <TextAreaInput name='description' placeholder='Add property description' />
            </div>
            <CountryInput />
            <ImageInput name='image' />
          </div>
          <RentDetails />
          <Amenities />
          <FormButton text='Create Rental'/>
        </FormContainer>
      </Card>
    </section>
  )
}

export default CreatePropertPage