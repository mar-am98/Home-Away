import FormatCurrency from '@/utils/formats'
import React from 'react'
import { Separator } from '../ui/separator';
import FormContainer from '../form/FormContainer';
import { createResrvation } from '@/utils/actions';
import FormButton from '../form/FormButton';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import { Button } from '../ui/button';

interface ResProps{
    nights: number,
    price: number,
    checkIn: Date;
    checkOut: Date;
    propertyID: string
}

function ReserveCard({nights,price,checkIn,checkOut,propertyID}:ResProps) {
  const pricePerNights = price * nights;
  const cleaningFee = 21;
  const service = 40;
  const tax = 50 * nights;

  const total = pricePerNights + cleaningFee + service + tax;
  return (
    <div className='text-sm'>
        <div className='flex items-center justify-between mb-2'>
            <p>{FormatCurrency(price)}<span> × </span>{nights} nights</p>
            <p>{FormatCurrency(pricePerNights)}</p>
        </div>
        <div className='flex items-center justify-between mb-2'>
            <p>Cleaning Fee</p>
            <p>{FormatCurrency(cleaningFee)}</p>
        </div>
        <div className='flex items-center justify-between mb-2'>
            <p>Service Fee</p>
            <p>{FormatCurrency(service)}</p>
        </div>
        <div className='flex items-center justify-between mb-2'>
            <p>Tax</p>
            <p>{FormatCurrency(tax)}</p>
        </div>
        <Separator className='my-4'/>
        <div className='flex items-center justify-between mb-2 font-bold'>
            <p>Booking Total</p>
            <p>{FormatCurrency(total)}</p>
        </div>

        <ReservedAction checkIn={checkIn} checkOut={checkOut} nights={nights} total={total} propertyID={propertyID}/>
    </div>
  )
}

export default ReserveCard

function ReservedAction({checkIn,checkOut,nights,total,propertyID}:{checkIn:Date,checkOut:Date,nights:number,total:number,propertyID:string}){
    return(
        <FormContainer action={createResrvation}>
            <input type="hidden" name="checkIn" value={checkIn.toISOString()} />
            <input type="hidden" name="checkOut" value={checkOut.toISOString()} />
            <input type="hidden" name="propertyID" value={propertyID} />
            <input type="hidden" name="nights" value={nights} />
            <input type="hidden" name="total" value={total} />

            <SignedIn>
                <FormButton text='reserve' className='w-full mt-6 text-lg' />
            </SignedIn>

            <SignedOut >
                <SignInButton mode='modal'>
                    <Button type='button' className='w-full mt-6 text-lg'>
                        Sign In To Complete Booking
                    </Button>
                </SignInButton>
            </SignedOut>

        </FormContainer>
    )
}
