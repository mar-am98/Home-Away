'use client'

import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Share2 } from 'lucide-react'
import {FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from "react-share";

function ShareButton({id,name}:{id:string,name:string}) {
    const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
    const shareLink = `${url}/properties/${id}`
  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button className='p-2 text-black' variant={'outline'} size={'icon'}>
                <Share2 />
            </Button>
        </PopoverTrigger>
        <PopoverContent side='top' align='center' sideOffset={10} className='flex items-center p-2 gap-2 justify-center w-full'>
            <TwitterShareButton url={shareLink} title={name}>
                <TwitterIcon size={30} round/>
            </TwitterShareButton>
            <LinkedinShareButton url={shareLink} title={name}>
                <LinkedinIcon size={30} round/>
            </LinkedinShareButton>
            <FacebookShareButton url={shareLink} title={name}>
                <FacebookIcon size={30} round/>
            </FacebookShareButton>
        </PopoverContent>
    </Popover>
  )
}

export default ShareButton