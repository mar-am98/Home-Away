
import FavoriteToggleButton from '@/components/favorites/FavoriteToggleButton';
import PropertyReviews from '@/components/reviews/PropertyReviews';
import SubmitReview from '@/components/reviews/SubmitReview';
import CrumbBread from '@/components/single-page/CrumbBread'
import DateCalendar from '@/components/single-page/DateCalendar';
import DescDetails from '@/components/single-page/DescDetails';
import PlaceOffer from '@/components/single-page/PlaceOffer';
import ShareButton from '@/components/single-page/ShareButton';
import StayDetails from '@/components/single-page/StayDetails';
import StayLocation from '@/components/single-page/StayLocation';
import UserDetails from '@/components/single-page/UserDetails';
import { Separator } from '@/components/ui/separator';
import { fetchReservedDates, fetchReviewStats, fetchSingleProperty } from '@/utils/actions';
import Image from 'next/image';
import React from 'react'

async function PropertiesDetails({params}:any) {

  const {id} = await params;

  const [property, stats, rereservedDate] = await Promise.all([
    fetchSingleProperty(id),
    fetchReviewStats(id),
    fetchReservedDates(id),
  ]);

  const {name,tagLine,image,description,amenities,location,userName,userImg,price} = property
  return (
    <section className='mt-12 mx-1'>
      <CrumbBread name={name}/>

      <div className='flex justify-between items-center'>
        <h1 className='py-4 text-4xl font-bold capitalize'>{tagLine}</h1>
        <div className='flex gap-2'>
          <ShareButton id={id} name={name}/>
          <FavoriteToggleButton propertyID={property.id} />
        </div>
      </div>

      <div className='relative w-full h-120'>
        <Image src={image} alt={name} fill quality={100} className='object-cover rounded mt-4' priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>     
      </div>

      <div className='h-fit grid-cols-1 lg:grid lg:grid-cols-[2fr_1fr] gap-12 mt-12'>
        <div>
          <StayDetails property={property} stats={stats}/>
          <UserDetails userName={userName} userImg={userImg} />
          <Separator />
          <DescDetails description={description}/>
          <PlaceOffer amenities={amenities}/>
          <StayLocation location={location} />
        </div>
        
        <div>
          <DateCalendar propertyID={property.id} rereservedDate={rereservedDate} price={price} />
        </div>
      </div>

      <div>
        <SubmitReview id={id}/>
        <PropertyReviews id={id}/>
      </div>
    </section>
  )
}

export default PropertiesDetails