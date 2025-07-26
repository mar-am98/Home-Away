
import { createClient } from '@supabase/supabase-js'

const bucket = 'defaultbucket';

const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_KEY as string,
)

export const uploadImage = async (image:File)=>{
    const timestamp = Date.now();
    const cleanName = image.name.replace(/\s+/g, '-');
    const newName = `${timestamp}-${cleanName}`;

    const {data,error} = await supabase.storage.from(bucket)
                                        .upload(newName,image,{
                                            cacheControl:'3600'
                                        })
                        
    if(!data) throw new Error('Image Upload Failed');
    return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
}
