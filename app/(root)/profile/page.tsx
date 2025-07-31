import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import React from 'react'

async function ProfilePage() {
  const user = await currentUser();

  if (!user) throw new Error("Not authenticated");

  const { imageUrl, firstName, lastName,username } = user;

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-semibold mb-6">User Profile</h1>

      <Card>
        <CardContent>
          <Image
            src={imageUrl}
            alt={`${firstName} ${lastName}'s profile picture`}
            height={150}
            width={150}
            quality={100}
            className="object-cover rounded-md"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className='mt-15 grid md:grid-cols-2 gap-10'>
            <div>
              <Label className='text-base font-medium mb-2'>First Name</Label>
              <Input name="firstName" type="text" value={firstName || 'guest'} />
            </div>
            <div>
              <Label className='text-base font-medium mb-2'>Last Name</Label>
              <Input name="lastName" type="text" value={lastName || 'guest'} />
            </div>
            <div>
              <Label className='text-base font-medium mb-2'>Username</Label>
              <Input  name="username" type="text" value={username || 'guest'} />
            </div>
          </div>

          <Button className='px-4 py-6 cursor-pointer mt-8'>Update Profile</Button>
        </CardContent>

      </Card>
    </div>
  )
}

export default ProfilePage;
