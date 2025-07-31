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


export function AllLeading() {
    return (
        <div className='my-15'>
            <Skeleton className='w-full h-5 mb-4 bg-rose-200 dark:bg-muted'/>
            <Skeleton className='w-3/4 h-5 mb-4 bg-rose-200 dark:bg-muted'/>
            <Skeleton className='w-1/2 h-5 mb-4 bg-rose-200 dark:bg-muted'/>
        </div>
    )
}

export function ImgLoading() {
    return (
        <div className='my-15'>
            <Skeleton className='w-full h-150 mb-4 bg-rose-200 dark:bg-muted'/>
        </div>
    )
}

export function RevLoading() {
    const repeat = Array.from({length:2}, (_,i)=> i + 1)
    return (
        <div className='mt-15 gap-8 grid grid-cols-1 md:grid-cols-2'>
            {repeat.map((i)=>(
                <Card className='p-1 h-30' key={i}>
                    <CardContent className='w-full h-30 p-2 flex items-center justify-between'>
                        <Skeleton className='w-20 h-20 mb-4 bg-rose-200 dark:bg-muted rounded-full'/>
                        <div className='h-20 w-100 mt-4 '>
                            <Skeleton className='w-full h-4 mb-2 bg-rose-200 dark:bg-muted'/>
                            <Skeleton className='w-full h-4 mb-2 bg-rose-200 dark:bg-muted'/>
                        </div>
                    </CardContent>
                </Card>
                )
            )}
        </div>
    )
}