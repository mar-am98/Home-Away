import {  ReactNode } from 'react'
import { GiMushroomHouse, GiWoodCabin } from 'react-icons/gi'
import { GoContainer } from 'react-icons/go'
import { MdCabin, MdOutlineAirportShuttle } from 'react-icons/md'
import { PiLighthouse, PiWarehouse } from 'react-icons/pi'
import { TbBuildingCottage, TbCaravan, TbTent } from 'react-icons/tb'

interface Props {
    name: string,
    icon: ReactNode,
}


export const categoriesItem:Props[] = [
    {name: 'Cabin', icon: <MdCabin />},
    {name: 'Airstream', icon: <MdOutlineAirportShuttle />},
    {name: 'Tent', icon: <TbTent />},
    {name: 'Warehouse', icon: <PiWarehouse />},
    {name: 'Cottage', icon: <TbBuildingCottage />},
    {name: 'Magic', icon: <GiMushroomHouse />},
    {name: 'Container', icon: <GoContainer />},
    {name: 'Caravan', icon: <TbCaravan />},
    {name: 'Tiny', icon: <PiLighthouse />},
    {name: 'Lodge', icon: <GiWoodCabin />},
]