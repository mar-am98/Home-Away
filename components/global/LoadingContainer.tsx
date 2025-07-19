import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export function HeroLoading() {
    const repeat = Array.from({length:6}, (_,i)=> i + 1)
    return (
        <div className='mt-15 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {repeat.map((i)=>(
                <Card className='p-1 h-80' key={i}>
                    <CardContent className='w-full h-full p-2'>
                        <Skeleton className='w-full h-3/4 mb-4 bg-rose-200 dark:bg-muted'/>
                        <Skeleton className='w-4/5 h-4 mb-2 bg-rose-200 dark:bg-muted'/>
                        <Skeleton className='w-3/4 h-4 mb-2 bg-rose-200 dark:bg-muted'/>
                    </CardContent>
                </Card>
                )
            )}
        </div>
    )
}
