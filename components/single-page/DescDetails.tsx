'use client'

import { property } from '@prisma/client';
import  { useState } from 'react'
import { Button } from '../ui/button';

function DescDetails({property}:{property:property}) {
  
    const [show,setShow] = useState(false);

    const hideText = property.description.length > 300;

    const showText = show || !hideText ? property.description : property.description.slice(0,300)+ '...'
  
    function handleShow(){
        setShow(show => !show);
    }

    return (
        <div>
            <h3 className='text-lg font-bold my-3'>Description</h3>
            <p className='text-muted-foreground text-lg leading-loose'>
                {showText}
            </p>
            {
                hideText && (
                    <Button onClick={handleShow} variant={'link'} className='px-0 text-primary/80' >
                        {show ? 'Show Less' : 'Show More'}
                    </Button>
                )
            }
        </div>
    )
}

export default DescDetails