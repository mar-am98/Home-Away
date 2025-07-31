import BookingTable from '@/components/booking/BookingTable'
import { AllLeading } from '@/components/global/LoadingContainer'
import React, { Suspense } from 'react'

function page() {
  return (
    <Suspense fallback={<AllLeading />}>
      <BookingTable />
    </Suspense>
  )
}

export default page