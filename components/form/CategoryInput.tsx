'use client'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { categoriesItem } from '@/utils/categoriesItem'


function CategoryInput() {
    const [select, setSelect] = useState('');
  return (
    <div className="mb-2">
        <Label htmlFor='category' className='mb-2'>
            Categories
        </Label>
        <input type="hidden" name="category" value={select} />
        <Select onValueChange={(value)=>setSelect(value)}>
            <SelectTrigger className='w-full' id='category'>
                <SelectValue placeholder='Select a category' />
            </SelectTrigger>
            <SelectContent>
                    {
                        categoriesItem.map((category)=>(
                            <SelectItem key={category.name} value={category.name}>
                                <p className='flex items-center gap-2'><span>{category.icon}</span>{category.name}</p>
                            </SelectItem>
                        ))
                    }
                </SelectContent>
        </Select>
    </div>
  )
}

export default CategoryInput