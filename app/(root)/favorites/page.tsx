import EmptyState from '@/components/global/EmptyState';
import PropertyCard from '@/components/home/PropertyCard';
import { fetchUserFav } from '@/utils/actions'
import React from 'react'

async function FavoritesPage() {
  const favorites = await fetchUserFav();

  if(favorites.length === 0 ) return(
    <div className='mt-15'>
      <EmptyState heading='No items in the list.' message='Keep exploring our properties' actionLabel='back home' />
    </div>
  )
  return (
    <section className="mt-15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12">
      {favorites.map((fav)=>(
        <PropertyCard property={fav.property}  key={fav.id}/>
      ))}
    </section>
  )
}

export default FavoritesPage