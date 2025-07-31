import React from 'react'
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
import { fetchSingleProperty, updateProperty } from '@/utils/actions'

async function EditPropertyPage({params}:{params:{id:string}}) {

  const {id} = await params;
  const property = await fetchSingleProperty(id);
  const {name,tagLine,category,description,location,guests,bedrooms,baths,beds,amenities} = property

  return (
    <section className='mt-10'>
      <h1 className='text-2xl font-semibold mb-8'>Update Property</h1>
    
      <Card className='p-6'>
        <h3 className='text-lg font-medium'>General Info</h3>
        
        <FormContainer action={updateProperty}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <input type="hidden" name='id' value={id} />
            <InputForm name='name' type='text' placeholder='Property Name' defaultValue={name}/>
            <InputForm name='tagLine' type='text' placeholder='Tagline' defaultValue={tagLine} />
            <CategoryInput defaultValue={category}/>
            <div className="md:col-span-2">
              <TextAreaInput name='description' placeholder='Add property description' defaultValue={description}/>
            </div>
            <CountryInput defaultValue={location}/>
          </div>
          <RentDetails defaultValue={{guests,bedrooms,baths,beds}} />
          <Amenities defaultValue={amenities}/>
          <FormButton text='Update Rental' className='max-w-40' />
        </FormContainer>
      </Card>
    </section>
  )
}

export default EditPropertyPage