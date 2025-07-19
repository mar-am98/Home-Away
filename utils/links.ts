
interface LinksProp {
    name: string,
    href: string
}

export const dropDownMenuLinks:LinksProp[] = [
    {href: '/', name:'Home'},
    {href:'/favorites' , name:'Favorites'},
    {href:'/bookings' , name:'Bookings'},
    {href:'/reviews' , name:'Reviews'},
    {href:'/reservations' , name:'Reservations'},
    {href:'/createRental' , name:'Create Rental'},
    {href:'/myRentals' , name:'My Rentals'},
    {href:'/profile' , name:'Profile'}
]

export const pageLinks = {
    HOME: {href: '/', name:'Home'},
    PROPERTIES: {href: '/properties', name:'Properties'},
    FAVORITES: {href:'/favorites' , name:'Favorites'},
    BOOKINGS: {href:'/bookings' , name:'Bookings'},
    REVIEWS: {href:'/reviews' , name:'Reviews'},
    RESERVATIONS: {href:'/reservations' , name:'Reservations'},
    CREATRENTAL: {href:'/createRental' , name:'Create Rental'},
    MYRENTALS: {href:'/myRentals' , name:'My Rentals'},
    PROFILE: {href:'/profile' , name:'Profile'},
 } as const