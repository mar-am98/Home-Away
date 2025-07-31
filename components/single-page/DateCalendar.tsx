'use client'
import React from 'react'
import { Calendar } from '../ui/calendar'
import { DateRange } from 'react-day-picker'
import { Card, CardContent, CardHeader } from '../ui/card'
import ReserveCard from './ReserveCard'

interface dateProps{
  propertyID: string,
  rereservedDate: Date[],
  price: number
}

function countNights(startDate: Date, endDate: Date):number{
  const StartDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
  const endDay = new Date(endDate.getFullYear(), endDate.getMonth(),endDate.getDate())

  const different = endDay.getTime() - StartDay.getTime()
  const days = different / (1000 * 60 * 60 * 24);

  return days;
}

function DateCalendar({propertyID,rereservedDate,price}:dateProps) {

  const [date, setDate] = React.useState<DateRange | undefined>(undefined)
  const SelectedRange = !!(date?.from && date?.to && date.from.getTime() !== date.to.getTime())
  const nights = SelectedRange ? countNights(date!.from!, date!.to!) : 0
  const startDate = date?.from
  const endDate = date?.to


return (
  <div>
    <Calendar
      mode='range'
      selected={date}
      onSelect={setDate}
      disabled={(date)=>(
                          date < new Date() || 
                          rereservedDate.some((d) => d.toDateString() === date.toDateString())
                        )}

      className="rounded-lg border mx-auto mt-15"
    />

    { SelectedRange && (
        <div className="mt-8 p-4">
          <Card>
            <CardHeader className='font-bold'>Summary</CardHeader>
            <CardContent>
              <ReserveCard 
                nights={nights}
                price={price}
                checkIn = {startDate!}
                checkOut = {endDate!}
                propertyID = {propertyID}
              />
            </CardContent>
          </Card>
        </div>
      )}
  </div>
)
}

export default DateCalendar