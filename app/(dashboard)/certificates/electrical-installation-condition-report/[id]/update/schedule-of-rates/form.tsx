'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { zodResolver } from '@hookform/resolvers/zod'

import { Schema } from './schema'
import { scheduleOfRates } from './rates'
import { Button } from '@/components/ui/button'

export function ScheduleOfRatesForm() {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      scheduleOfRates: [],
    },
  })

  const [searchQuery, setSearchQuery] = useState('')

  const selectedRates = (form.watch('scheduleOfRates') as z.infer<typeof Schema>['scheduleOfRates'][number][]) || []

  const handleQuantityChange = (id: number, name: string, quantity: string) => {
    const parsedQuantity = Number(quantity);

    if (parsedQuantity > 0) {
      const updatedRates = selectedRates.some((rate) => rate.id === id)
        ? selectedRates.map((rate) =>
          rate.id === id ? { id, name, quantity: parsedQuantity } : rate
        )
        : [...selectedRates, { id, name, quantity: parsedQuantity }];

      form.setValue('scheduleOfRates', updatedRates, { shouldDirty: true });
    } else {
      const updatedRates = selectedRates.filter((rate) => rate.id !== id);
      form.setValue('scheduleOfRates', updatedRates, { shouldDirty: true });

      const inputElement = document.getElementById(`rate-input-${id}`) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = '';
      }
    }
  };

  const filteredRates = scheduleOfRates.filter((rate) => rate.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data: z.infer<typeof Schema>) => console.log(data))}>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Schedule of Rates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="text" placeholder="Search rates..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="mb-4" />

            <div className="rounded-md border">
              <ScrollArea className="h-[350px]">
                <div className="space-y-4 p-4">
                  {filteredRates.length > 0 ? (
                    filteredRates.map((rate) => (
                      <div key={rate.id} className="flex items-center justify-between">
                        <span>{rate.name}</span>
                        <Input id={`rate-input-${rate.id}`} type="number" min="0" placeholder="Qty" className="ml-auto w-20" onChange={(e) => handleQuantityChange(rate.id, rate.name, e.target.value)} />
                      </div>
                    ))
                  ) : (
                    <p>No rates found.</p>
                  )}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">Purpose.</p>
            <Button variant="outline" type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
