'use client'


import React, { useState } from 'react'
import { Input } from '../ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce';
import { pageLinks } from '@/utils/links';

function SearchBar() {
  
  const searchParams = useSearchParams();
  const [search,setSearch] = useState(
    searchParams.get('search')?.toString() || ''
  )

  const {replace} = useRouter();
  const handleSearch = useDebouncedCallback((value:string)=>{
    const params = new URLSearchParams(searchParams);

    if(value){
      params.set('search',value);
    } else{
      params.delete('search');
    }

    replace(`${pageLinks.HOME.href}?${params.toString()}`)
  },300)


  return (
    <Input 
      type='search' 
      placeholder='Find a Property...' 
      className='max-w-xs'
      value={search}
      onChange={(e)=>{
        setSearch(e.target.value);
        handleSearch(e.target.value)
      }} 
    />
  )
}

export default SearchBar