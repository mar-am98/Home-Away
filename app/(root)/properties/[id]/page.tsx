
import FavoriteToggleButton from '@/components/favorites/FavoriteToggleButton';
import RatingInput from '@/components/reviews/RatingInput';
import CrumbBread from '@/components/single-page/CrumbBread'
import DescDetails from '@/components/single-page/DescDetails';
import PlaceOffer from '@/components/single-page/PlaceOffer';
import ShareButton from '@/components/single-page/ShareButton';
import StayDetails from '@/components/single-page/StayDetails';
import StayLocation from '@/components/single-page/StayLocation';
import UserDetails from '@/components/single-page/UserDetails';
import { Separator } from '@/components/ui/separator';
import { fetchSingleProperty } from '@/utils/actions';
import Image from 'next/image';
import React from 'react'

async function PropertiesDetails({params}:any) {

  const {id} = await params;
  const property = await fetchSingleProperty(id);

  return (
    <section className='mt-12'>
      <CrumbBread name={property.name}/>

      <div className='flex justify-between items-center'>
        <h1 className='py-4 text-4xl font-bold capitalize'>{property.tagLine}</h1>
        <div className='flex gap-2'>
          <ShareButton id={id} name={property.name}/>
          <FavoriteToggleButton propertyID={property.id} />
        </div>
      </div>

      <div className='relative w-full h-120'>
        <Image src={property.image} alt={property.name} fill quality={100} className='object-cover rounded mt-4' priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>     
      </div>

      <div className='h-200 grid-cols-1 lg:grid lg:grid-cols-[2fr_1fr] gap-12 mt-12'>
        <div>
          <StayDetails property={property}/>
          <UserDetails />
          <Separator />
          <DescDetails property={property}/>
          <PlaceOffer property={property}/>
          <StayLocation property={property} />
        </div>
        
        <div>
          
        </div>
      </div>

      {/* <div>
        
      </div> */}
    </section>
  )
}

export default PropertiesDetails