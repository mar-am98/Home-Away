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
import { deleteProperty, fetchPropertyByUser } from '@/utils/actions';
import Link from 'next/link';
import { pageLinks } from '@/utils/links';
import FormatCurrency from '@/utils/formats';
import EmptyState from '@/components/global/EmptyState';
import IconButton from '@/components/global/IconButton';
import FormContainer from '@/components/form/FormContainer';

async function RentalsPage() {
  const myRentals = await fetchPropertyByUser();
  const rentnum = myRentals.length;

  if(rentnum === 0) return(
    <div className='mt-15'>
      <EmptyState heading='No items in the list.' message='Keep exploring our properties' actionLabel='back home' />
    </div>
  )

  return (
    <div className='mt-15'>
      <h4 className='text-lg font-bold mb-4'>Active Properties : <span> {rentnum}</span></h4>
      <Table>
        <TableCaption>A list of all your properties.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='text-muted-foreground'>Property Name</TableHead>
            <TableHead className='text-muted-foreground'>Nightly Rate</TableHead>
            <TableHead className='text-muted-foreground'>Nights Booked</TableHead>
            <TableHead className='text-muted-foreground'>Total Income</TableHead>
            <TableHead className='text-muted-foreground'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {
          myRentals.map((item,i)=>{
            const {id,name,price,reservations} = item;
            const totalIncome = reservations.reduce((sum, r) => sum + r.total, 0);
            const totalNights = reservations.reduce((sum, r) => sum + r.nights, 0);
            return(
              <TableRow key={i}>
                <TableCell className='text-muted-foreground underline cursor-pointer'>
                  <Link href={`${pageLinks.PROPERTIES.href}/${id}`}>
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{FormatCurrency(price)}</TableCell>
                <TableCell>{totalNights}</TableCell>
                <TableCell>{FormatCurrency(totalIncome)}</TableCell>
                <TableCell className='flex items-center gap-2'>
                  <Link href={`${pageLinks.PROPERTIES.href}/${id}/edit`}>
                    <IconButton actionType='edit' />
                  </Link>
                  <DeleteProperty PropertyID={id}/>
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

export default RentalsPage




function DeleteProperty({PropertyID}:{PropertyID:string}){
  const deleteProp = deleteProperty.bind(null,{PropertyID})
  return(
    <FormContainer action={deleteProp}>
      <IconButton actionType={'delete'} />
    </FormContainer>
  )
}