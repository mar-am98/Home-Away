import React from 'react'
import Link from 'next/link';
import { categoriesItem } from '@/utils/categoriesItem';

function Categories({search,category}:{search:string,category:string}) {

  return (
    <div className='grid max-sm:flex md:grid-cols-5 lg:grid-cols-10 gap-6 max-sm:overflow-scroll py-8 mx-auto'>
      {
        categoriesItem.map((item)=>{
          const searchTerm = search ? `&search=${search}` : '';
          const categoryTerm = `/?category=${item.name}`;
          const isActive = category === item.name
          return(
            <Link href={`${categoryTerm}${searchTerm}`} key={item.name}>
              <div className={`flex flex-col justify-center items-center text-xl cursor-pointer 
                              ${isActive ? 'text-primary font-bold' : 'hover:text-primary active:text-primary'} transition-colors ease-in-out duration-200`}>
                <div className="text-3xl">
                  {item.icon}
                </div>
                <p className='text-sm mt-1 capitalize tracking-wide'>{item.name}</p>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}

export default Categories