'use server';

import { redirect } from 'next/navigation';
import db from './db'
import { currentUser } from '@clerk/nextjs/server';
import { imageSchema, rentalSchema, validateSchema } from './schema';
import { uploadImage } from './supabase';

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


export async function getAuthUser (){
    const user = await currentUser();

    if(!user){
        return redirect('/')
    }
    return user
}

const renderError = (error:unknown):{message:string}=>{
    return{
        message: error instanceof Error ? error.message : 'Unknown Error'
    }
}


export async function createRentalForm(prevState:any,formData: FormData):Promise<{message:string}>{
    
    const user = await getAuthUser();
    try{
        const amenities = formData.getAll("amenities") as string[];
        const file = formData.get('image') as File;
        const allData = {...Object.fromEntries(formData), amenities}


        const validateData = validateSchema(rentalSchema,allData);
        const validateImage = validateSchema(imageSchema,{image:file});
        const imagePath = await uploadImage(validateImage.image)

        await db.property.create({
            data:{
                ...validateData,
                amenities,
                image: imagePath,
                clerkId: user.id
            }
        })
        return {message:'Created Successfuly'}
    }

    catch(error){
        return renderError(error)
    }
    
    
}