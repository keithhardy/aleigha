'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { Schema } from './schema';
import { Address, Settings } from '@prisma/client';

export function SettingsForm({
  settings,
}: {
  settings: Settings & { address: Address | null } | null;
}) {
  const [imagePreview, setImagePreview] = useState('');

  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      id: settings?.id,
      name: settings?.name,
      email: settings?.email || '',
      phone: settings?.phone || '',
      picture: settings?.picture || '',
      governingBody: settings?.governingBody || '',
      governingBodyNumber: settings?.governingBodyNumber || '',
      address: {
        id: settings?.address?.id,
        streetAddress: settings?.address?.streetAddress || '',
        city: settings?.address?.city || '',
        county: settings?.address?.county || '',
        postTown: settings?.address?.postTown || '',
        postCode: settings?.address?.postCode || '',
        country: settings?.address?.country || '',
      },
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        form.setValue('picture', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}>
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4 pb-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='picture'
                render={() => (
                  <FormItem>
                    <FormLabel>Company Logo</FormLabel>
                    <FormControl>
                      <Input type='file' accept='image/*' onChange={handleFileChange} />
                    </FormControl>
                    <FormMessage />
                    {imagePreview && (
                      <div className='mt-2'>
                        <Image src={imagePreview} alt='Logo Preview' width={200} height={200} className='rounded border' />
                      </div>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='governingBody'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Governing Body</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='governingBodyNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Governing Body Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address.streetAddress'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address.city'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address.county'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>County</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address.postTown'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Town</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address.postCode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postcode</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address.country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter className='col-span-2'>
            <Button type='submit'>Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
