'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Address, Client, Property } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { updateProperty } from '@/app/(dashboard)/properties/[id]/update/action';
import { Schema } from '@/app/(dashboard)/properties/[id]/update/schema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function PropertyUpdateForm({
  property,
}: {
  property: Property & { address: Address | null };
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      id: property.id,
      uprn: property.uprn,
      occupier: property.occupier,
      address: {
        city: property.address?.city || '',
        county: property.address?.county || '',
        postTown: property.address?.postTown || '',
        postCode: property.address?.postCode || '',
        streetAddress: property.address?.streetAddress || '',
        country: property.address?.country || '',
      },
    },
  });

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    try {
      await updateProperty(data);
      toast({
        title: 'Client Updated',
        description: 'Property was successfully updated.',
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to update the Client. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 pb-4">
          <FormField
            control={form.control}
            name="uprn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UPRN</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="occupier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupier</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.streetAddress"
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
            name="address.city"
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
            name="address.county"
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
            name="address.postTown"
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
            name="address.postCode"
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
            name="address.country"
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

          <Button type="submit" disabled={form.formState.isSubmitting} variant="outline">
            {form.formState.isSubmitting ? 'Saving' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
