import React from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import FavoriteToggleButton from '../favorites/FavoriteToggleButton'
import { property } from '@prisma/client';
import FormatCurrency from '@/utils/formats';

function PropertyCard({property}:{property:property}) {
    
    const {image,name,tagLine,price,location} = property;
    const price$ = FormatCurrency(price);

    return (
        <Card className='h-full rounded-xl transition-all hover:shadow-lg  p-1 overflow-hidden cursor-pointer duration-300 ease-in-out hover:scale-[1.02]'>
            <CardContent className='p-1 h-full'>
            <div className='relative w-full  max-lg:h-60 h-67'>
                <Image 
                src={image}
                alt={name}
                fill
                priority
                className='object-cover rounded-lg'
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <FavoriteToggleButton />
            </div>
            <div className='mt-4 mx-3'>
                <div className='flex justify-between items-center text-sm font-semibold truncate'>
                <h3 className="truncate font-bold">{name}</h3>
                <p className="text-muted-foreground">rate</p>
                </div>

                <p className='text-sm font-medium text-muted-foreground '>{tagLine}</p>
                <div className='flex justify-between flex-wrap mt-4 pb-1 text-sm'>
                <p className='font-bold'>{price$}<span className="text-muted-foreground font-medium"> /night</span></p>
                <p className='font-bold'>{location}</p>
                </div>
            </div>
            </CardContent>
        </Card>
    )
}

export default PropertyCard