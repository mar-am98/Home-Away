import {z, ZodSchema} from 'zod';


export const rentalSchema = z.object({
    name: z.string().min(6,{
                        message: 'name must be at least 6 characters.'
                     })
                    .max(30,{
                        message: 'name must be less than 20 characters.'
                    }),
    tagLine: z.string().refine((tagLine)=>{
                        const words = tagLine.split(" ").length;
                        return words >= 6 && words <= 10
                    },{
                        message:'tagLine must be between 5 to 10 words.'
                    }),
    description: z.string().refine((description)=>{
                        const words = description.split(" ").length;
                        return words >= 30 && words<=200
                    },{
                        message:'description must be between 20 and 200 word.'
                    }),
    category: z.string().min(1,{
                        message:'category is required.'
                    }),
    price: z.coerce.number().int().min(0,{
                        message:"price must be a positive number."
                    }),
    guests: z.coerce.number().int().min(1,{
                        message:'guests is required.'
                    }),
    bedrooms: z.coerce.number().int().min(1,{
                        message:'bedrooms is required.'
                    }),
    beds: z.coerce.number().int().min(1,{
                        message:'beds is required.'
                    }),
    baths: z.coerce.number().int().min(1,{
                        message:'baths is required.'
                    }),
    location: z.string().min(1,{
                        message:'location is required.'
                    }),
    amenities: z.array(z.string()).min(1,{
                        message: 'At least one amenity is required.'
                    })
})

export function validateSchema<T>(
    schema: ZodSchema<T>,
    data: unknown
):T {
    const result = schema.safeParse(data);

    if(!result.success){
        const error = result.error.issues.map((e)=>e.message);
        throw new Error(error.join(','))
    }

    return result.data
}

export const imageSchema = z.object({
    image: validateImageFile()
});

function validateImageFile(){
    const imgSize = 1024 * 1024;
    const acceptedFile = ['image/']

    return z.instanceof(File).refine(file => !file || file.size <= imgSize, 'File must be less than 1MB')
                             .refine(file => !file || acceptedFile.some(type => file.type.startsWith(type)), 'File must be an image');
                            
}


export const reviewSchema = z.object({
        rating: z.coerce
            .number()
            .min(1,{message : "Rating must be at least 1"})
            .max(5,{message:"Rating must be at most 5"}),
        comment: z.string()
            .min(10,{message : "Comment must be at least 10 characters long"})
            .max(100,{message:"Comment must be at most 1000 characters long"}),  
        
        propertyID: z.string().refine((value)=> value !== '',{
            message: "property ID cannot be empty"
        }), 
        authorName: z.string().refine((value)=> value !== '',{
            message: "Author name cannot be empty"
        }), 
        authorImageUrl: z.string().refine((value)=> value !== '',{
            message: "Author image URL cannot be empty"
        }),    

});