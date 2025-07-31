import EmptyState from '@/components/global/EmptyState'
import { fetchPropertyByUser } from '@/utils/actions';
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import { pageLinks } from '@/utils/links';
import FormatCurrency, { formatDate } from '@/utils/formats';

async function ReservationPage() {
  const myRentals = await fetchPropertyByUser();
  const rentNum = myRentals.length;
  const reserveNum = myRentals.reduce((sum, property)=> sum + property.reservations.length, 0);
  const totalNights = myRentals.reduce((sum, property)=>{
    return sum + property.reservations.reduce((revSum,reserve)=> revSum + reserve.nights, 0)
  },0);
  const totalPrice = myRentals.reduce((sum,property)=>{
    return sum + property.reservations.reduce((revSum,reserve)=> revSum + reserve.total , 0)
  },0)



  if(reserveNum === 0) return(
    <div className='mt-15'>
      <EmptyState heading='No items in the list.' message='Keep exploring our properties' actionLabel='back home' />
    </div>
  )

  return (
    <div className='mt-18'>
      <div className='w-full my-12 h-25 grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <div className='bg-muted rounded-xl border text-card-foreground shadow flex items-center justify-around py-4'>
          <p className='text-3xl font-bold capitalize'>properties</p>
          <p className='text-5xl font-extrabold text-primary'>{rentNum}</p>
        </div>
        <div className='bg-muted rounded-xl border text-card-foreground shadow flex items-center justify-around py-4'>
          <p className='text-3xl font-bold capitalize'>nights</p>
          <p className='text-5xl font-extrabold text-primary'>{totalNights}</p>
        </div>
        <div className='bg-muted rounded-xl border text-card-foreground shadow flex items-center justify-around py-4'>
          <p className='text-3xl font-bold capitalize'>total</p>
          <p className='text-5xl font-extrabold text-primary'>{FormatCurrency(totalPrice)}</p>
        </div>
        
      </div>
      <div>
        <h4 className='text-lg font-bold mb-4'>Total Reservations : <span> {reserveNum}</span></h4>
        <Table>
          <TableCaption>A list of your recent reservations.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='text-muted-foreground'>Property Name</TableHead>
              <TableHead className='text-muted-foreground'>Country</TableHead>
              <TableHead className='text-muted-foreground'>Nights</TableHead>
              <TableHead className='text-muted-foreground'>Total</TableHead>
              <TableHead className='text-muted-foreground'>Check In</TableHead>
              <TableHead className='text-muted-foreground'>Check Out</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {
            myRentals.map((item)=>{
              const {id,name,price,reservations,location} = item;
              return reservations.map((reserve,i)=>(
                <TableRow key={i}>
                  <TableCell className='text-muted-foreground underline cursor-pointer'>
                    <Link href={`${pageLinks.PROPERTIES.href}/${id}`}>
                      {name}
                    </Link>
                  </TableCell>
                  <TableCell>{location}</TableCell>
                  <TableCell>{reserve.nights}</TableCell>
                  <TableCell>{FormatCurrency(reserve.total)}</TableCell>
                  <TableCell>{formatDate(reserve.checkIn)}</TableCell>
                  <TableCell>{formatDate(reserve.checkOut)}</TableCell>
                </TableRow>
              ))
            })
          }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ReservationPage