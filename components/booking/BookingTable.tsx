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
import { deleteResrvation, fetchUserResrvation } from '@/utils/actions';
import FormatCurrency, { formatDate } from '@/utils/formats';
import Link from 'next/link';
import { pageLinks } from '@/utils/links';
import IconButton from '@/components/global/IconButton';
import FormContainer from '@/components/form/FormContainer';
import EmptyState from '@/components/global/EmptyState';


async function BookingTable() {
  const userBooking = await fetchUserResrvation();
  const totalBK = userBooking.length;

  if(totalBK === 0) return(
    <div className='mt-15'>
      <EmptyState heading='No items in the list.' message='Keep exploring our properties' actionLabel='back home' />
    </div>
  )
  
  return (
    <div className='mt-15'>
      <h4 className='text-lg font-bold mb-4'>Total Bookings : <span>{totalBK}</span></h4>
      <Table className=''>
        <TableCaption>A list of your recent bookings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='text-muted-foreground'>Property Name</TableHead>
            <TableHead className='text-muted-foreground'>Country</TableHead>
            <TableHead className='text-muted-foreground'>Nights</TableHead>
            <TableHead className='text-muted-foreground'>Total</TableHead>
            <TableHead className='text-muted-foreground'>Check In</TableHead>
            <TableHead className='text-muted-foreground'>Check Out</TableHead>
            <TableHead className='text-muted-foreground'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {
          userBooking.map((item,i)=>{
            const {id,nights,total,checkIn,checkOut,propertyID,property} = item;
            return(
                        <TableRow key={i}>
                          <TableCell className='text-muted-foreground underline cursor-pointer'>
                            <Link href={`${pageLinks.PROPERTIES.href}/${propertyID}`}>
                              {property.name}
                            </Link>
                          </TableCell>
                          <TableCell>{property.location}</TableCell>
                          <TableCell>{nights}</TableCell>
                          <TableCell>{FormatCurrency(total)}</TableCell>
                          <TableCell>{formatDate(checkIn)}</TableCell>
                          <TableCell>{formatDate(checkOut)}</TableCell>
                          <TableCell>
                            <DeleteReserve reservationID={id} />
                          </TableCell>
                        </TableRow>
            )
          })
        }
        </TableBody>
      </Table>
    </div>
  )
}

export default BookingTable



function DeleteReserve({reservationID}:{reservationID:string}){
  const deleteeResv = deleteResrvation.bind(null,{reservationID})
  return(
    <FormContainer action={deleteeResv}>
      <IconButton actionType={'delete'} />
    </FormContainer>
  )
}
