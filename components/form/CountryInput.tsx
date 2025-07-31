'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import countries from 'world-countries';
import ReactCountryFlag from 'react-country-flag';
import { useState } from 'react';


export default function CountryInput({defaultValue}:{defaultValue?:string}) {
  const [country,setCountry] = useState(defaultValue || '')
  return (
    <div className='mb-2'>
      <Label htmlFor="location" className='mb-2'>Country</Label>
      <input type='hidden' name='location' value={country} />
      <Select onValueChange={(value)=>setCountry(value)} defaultValue={defaultValue}>
        <SelectTrigger className="w-full" id='location'>
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          {countries
            .filter((country)=> country.cca2 !== 'IL')
            .sort((a, b) => a.name.common.localeCompare(b.name.common))
            .map((country) => (
              <SelectItem key={country.cca2} value={country.name.common}>
                <span className="flex items-center gap-2">
                  <ReactCountryFlag
                    countryCode={country.cca2}
                    svg
                    style={{ width: '1.5em', height: '1em', borderRadius: '2px' }}
                    title={country.name.common}
                  />
                  <span>{country.name.common}</span>
                </span>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
