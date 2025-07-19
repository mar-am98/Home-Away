import React, { Suspense } from 'react'
import Container from '../global/Container'
import Logo from './Logo'
import SearchBar from './SearchBar'
import DarkMode from './DarkMode'
import DropDownMenu from './DropDownMenu'

function NavBar() {
  return (
    <nav className='border-b'>
          <Container className='flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-6 max-sm:mx-4'>
             <Logo />
             <Suspense>
               <SearchBar />
             </Suspense>
             
             <div className='flex gap-4 items-center'>
                <DarkMode />
                <DropDownMenu />
             </div>
          </Container>
     </nav>
  )
}

export default NavBar