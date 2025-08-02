'use server';

import { redirect } from 'next/navigation';
import db from './db'
import { clerkClient, currentUser } from '@clerk/nextjs/server';
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
                clerkId: user.id,
                userName: user.firstName ?? 'guest',
                userImg: user.imageUrl ?? ''
            }
        })
        return {message:'Created Successfuly'}
    }

    catch(error){
        return renderError(error)
    }
    
    
}

export async function updateProperty(prevState:any,formData:FormData){
    const user = await getAuthUser();

    try{
        const propertyID = formData.get('id') as string;
        const amenities = formData.getAll("amenities") as string[];
        const allData = {...Object.fromEntries(formData), amenities}
        const validateData = validateSchema(rentalSchema,allData);
        

        await db.property.update({
            where:{
                id: propertyID,
                clerkId: user.id
            },
            data:{
                ...validateData,
                amenities
            }
        });

        return {message:'Property Updated'}
    }

    catch(e){
        return renderError(e)
    }
}

export async function deleteProperty(prevState:{PropertyID:string}) {
    const {PropertyID} = prevState;
    const user = await getAuthUser();
    try{
        await db.property.delete({
            where:{
                id: PropertyID,
                clerkId: user.id
            },
        })
        return {message:'Property Deleted!'}
    }
    catch(e){
        return renderError(e)
    }
}


export async function fetchPropertyByUser(){
    const user = await getAuthUser();

    const propertyUser = await db.property.findMany({
        where:{
            clerkId: user.id
        },
        include:{
            reservations:{
                select:{
                    nights: true,
                    total: true,
                    checkIn: true,
                    checkOut: true
                }
            }
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
    return propertyUser
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

export async function fetchReviewStats(propertyID: string) {
  if (!propertyID) {
    throw new Error('propertyID is required');
  }

  try {
    const stats = await db.review.aggregate({
      where: {
        propertyID,
      },
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
    });

    return {
      avg: stats._avg?.rating || 0,
      count: stats._count?.rating || 0,
    };
  } catch (error) {
    console.error('Error fetching review stats:', error);
    // Return default values if there's an error
    return {
      avg: 0,
      count: 0,
    };
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


export async function createResrvation(
    prevState:any,
    formData:FormData
): Promise<{ message: string }> {
    const user = await getAuthUser();

    try{
        const checkInStr = formData.get('checkIn') as string
        const checkOutStr = formData.get('checkOut') as string
        const propertyID = formData.get('propertyID') as string
        const total = Number(formData.get('total'))
        const nights = Number(formData.get('nights'))

        const checkIn = new Date(checkInStr);
        const checkOut = new Date(checkOutStr);
        await db.reservation.create({
            data:{
                clerkId: user.id,
                checkIn,
                checkOut,
                propertyID,
                total,
                nights
            }
        })

        return { message: "redirect" };
    }

    catch(e){
        return renderError(e)
    }
}

export async function fetchReservedDates(propertyID: string): Promise<Date[]> {
  const reserves = await db.reservation.findMany({
    where:{
        propertyID
    },
    select:{
        checkIn: true, 
        checkOut: true 
    }
  })

  const disabledDates: Date[] = []

  for (const reserve of reserves) {
    const start = new Date(reserve.checkIn)
    const end = new Date(reserve.checkOut)

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      disabledDates.push(new Date(d))
    }
  }

  return disabledDates
}


export async function fetchUserResrvation(){
    const user = await getAuthUser();
    const reserves = await db.reservation.findMany({
        where:{
            clerkId: user.id
        },
        select:{
            id: true,
            checkIn: true,
            checkOut: true,
            propertyID: true,
            nights: true,
            total: true,
            property:{
                select:{
                    id: true,
                    name: true,
                    location: true,
                }
            }
        },
        orderBy:{
            createdAt: 'desc'
        }
    })

    return reserves
}


export async function deleteResrvation(prevState:{reservationID:string}){
    const {reservationID} = prevState;

    try{
        await db.reservation.delete({
            where:{
                id: reservationID
            }
        })

        return {message: 'deleted!'}
    }

    catch(e){
        return renderError(e)
    }
}
