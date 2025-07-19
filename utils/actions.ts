'use server';

import { redirect } from 'next/navigation';
import db from './db'

export async function fetchProperty({search =''}:{search:string}){
    const property = await db.property.findMany({
        where: {
            OR:[
                {name: {contains:search, mode:'insensitive'}},
                {location: {contains:search, mode:'insensitive'}},
                {tagLine: {contains:search, mode:'insensitive'}},
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

    if(!propertyID){
        redirect('/');
    }

    return property;
}