'use server';

import { redirect } from 'next/navigation';
import db from './db'

export async function fetchProperty({search ='',category}:{search:string,category:string}){
    const property = await db.property.findMany({
        where: {
            AND: [
                {
                    OR:[
                        {name: {contains:search, mode:'insensitive'}},
                        {location: {contains:search, mode:'insensitive'}},
                        {tagLine: {contains:search, mode:'insensitive'}},
                    ]
                },
                category ? {category: {equals: category, mode: 'insensitive'}} : {}
            ]
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return property;
}  

export async function fetchSingleProperty(propertyID:string){
    const property = await db.property.findUnique({
        where: {
            id: propertyID
        }
    })

    if(!property){
        redirect('/');
    }

    return property;
}