import React from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import FavoriteToggleButton from '../favorites/FavoriteToggleButton'
import { property } from '@prisma/client';
import FormatCurrency from '@/utils/formats';
import PropertyRating from '../single-page/PropertyRating';
import Link from 'next/link';
import { pageLinks } from '@/utils/links';
import { fetchReviewStats } from '@/utils/actions';

async function PropertyCard({property}:{property:property}) {
    
    const {image,name,tagLine,price,location} = property;
    const price$ = FormatCurrency(price);
    const stats = await fetchReviewStats(property.id)

    return (
        <Card className='h-full rounded-xl transition-all hover:shadow-lg  p-1 overflow-hidden cursor-pointer duration-300 ease-in-out dark:hover:shadow-gray-950'>
            <CardContent className='p-1 h-full relative'>
                <Link href={`${pageLinks.PROPERTIES.href}/${property.id}`}>
                    <div className='relative w-full  max-lg:h-60 h-67'>
                        <Image 
                        src={image}
                        alt={name}
                        fill
                        priority
                        className='object-cover rounded-lg'
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    <div className='mt-4 mx-3'>
                        <div className='flex justify-between items-center text-sm font-semibold truncate'>
                            <h3 className="truncate font-bold">{name}</h3>
                            <p className='font-medium text-muted-foreground'><PropertyRating stats={stats}/></p>
                        </div>

                        <p className='text-sm font-medium text-muted-foreground mt-1'>{tagLine}</p>
                        <div className='flex justify-between flex-wrap mt-4 pb-1 text-sm'>
                        <p className='font-bold'>{price$}<span className="text-muted-foreground font-medium"> /night</span></p>
                        <p className='font-bold'>{location}</p>
                        </div>
                    </div>
                </Link>
                <div className='absolute right-3 top-3 bg-muted/80 rounded-md' >
                    <FavoriteToggleButton propertyID={property.id} />
                </div>
            </CardContent>
        </Card>
    )
}

export default PropertyCard