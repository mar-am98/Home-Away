'use server';

import { redirect } from 'next/navigation';
import db from './db'
import { currentUser } from '@clerk/nextjs/server';
import { imageSchema, rentalSchema, reviewSchema, validateSchema } from './schema';
import { uploadImage } from './supabase';
import { revalidatePath } from 'next/cache';
import { pageLinks } from './links';

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


        const validateFields = validateSchema(rentalSchema,allData);
        const validateImage = validateSchema(imageSchema,{image:file});
        const imagePath = await uploadImage(validateImage.image)

        await db.property.create({
            data:{
                ...validateFields,
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



export async function fetchFavoriteID(propertyID:string){
    const user = await getAuthUser();
    const favorite = await db.favorite.findFirst({
        where:{
            propertyID: propertyID,
            clerkId: user.id
        },
        select:{
            id: true
        }
    })

    return favorite?.id || null
}

type toggleFavActionProps = {
    propertyID: string,
    favoriteID: string | null,
}
export async function toggleFavAction(prevState:toggleFavActionProps){
    const user = await getAuthUser();
    const {propertyID,favoriteID} = prevState;

    try{
        if(favoriteID){
            await db.favorite.delete({
                where: {
                    id: favoriteID
                }
            })
        }
        else {
            await db.favorite.create({
                data:{
                    propertyID:propertyID,
                    clerkId: user.id,
                }
            })
        }

        revalidatePath('')

        return {message: favoriteID ?  'Removed from Faves' : 'Added to Faves'}
    }
    
    catch(e){
        return renderError(e)
    }
}


export async function fetchUserFav(){
    const user = await getAuthUser();
    const favorite = await db.favorite.findMany({
        where:{
            clerkId: user.id
        },
        include:{
            property: true
        }
    })

    return favorite;
}



export async function createReviewAction(
    prevState:any,
    formData:FormData
){
    const user = await getAuthUser();
    try{
        const data = Object.fromEntries(formData);
        const validateFields = reviewSchema.safeParse(data)

        if(!validateFields.success){
            const errors = validateFields.error.issues.map((error)=>error.message);
            return {message: `Error: ${errors.join(',')}`}
        }

        await db.review.create({
            data: {
                ...validateFields.data,
                clerkId: user.id
            }
        })

        revalidatePath(`/${pageLinks.PROPERTIES.href}/${validateFields.data.propertyID}`)
    
        return{
            message:"Review Submitted!"
        }
    }


    catch(e){
        return renderError(e)
    }
}

export async function fetchPropertyReviews(propertyID:string){
    const review = await db.review.findMany({
        where:{
            propertyID,
        },
        include:{
            property:{
                select:{
                    image: true,
                    name: true
                }
            }
        },
        orderBy:{
            createdAt: 'desc'
        }
    })

    return review;
}

export async function fetchReviewStats(propertyID:string){
    const stats = await db.review.aggregate({
        where:{
            propertyID,
        },
        _avg:{
            rating: true
        },
        _count:{
            rating: true
        }
    });

    return{
        avg: stats._avg.rating || 0,
        count: stats._count.rating
    }
}


export async function fetchUserReviews(){
    const user = await getAuthUser();
    const reviews= await db.review.findMany({
        where:{
            clerkId: user.id,
        },
        include:{
            property:true
        },
        orderBy:{
            createdAt: 'desc'
        }
    })

    return reviews
}


export async function deleteActionReview(prevState:{reviewId:string}){

    const {reviewId} = prevState;
    try{
        await db.review.delete({
            where:{
                id: reviewId
            }
        });

        return{
            message: 'Review Removed'
        }
    }

    catch(e){
        return renderError(e)
    }

}