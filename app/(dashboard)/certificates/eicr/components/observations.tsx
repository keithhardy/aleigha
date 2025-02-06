import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, useFieldArray } from "react-hook-form";

export default function Observations({ control }: { control: Control<any> }) {
  const observations = useFieldArray({
    control: control,
    name: `observations`,
  });

  return (
    <>
      <div className="grid grid-cols-9 gap-2">
        <FormLabel>Item Number</FormLabel>
        <FormLabel className="col-span-4">Details</FormLabel>
        <FormLabel>Code</FormLabel>
        <FormLabel className="col-span-2">Location</FormLabel>
      </div>

      {observations.fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-9 items-end gap-2">
          <FormField control={control} name={`observations.${index}.observationItemNumber`} render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name={`observations.${index}.observationDetails`} render={({ field }) => (
            <FormItem className="col-span-4">
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name={`observations.${index}.observationCode`} render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name={`observations.${index}.observationLocation`} render={({ field }) => (
            <FormItem className="col-span-2">
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="button" onClick={() => observations.remove(index)} className="ml-2">Delete</Button>
        </div>
      ))}

      <Button type="button" onClick={() => observations.append({
        observationItemNumber: '',
        observationDetails: '',
        observationCode: '',
        observationLocation: '',
      })}>
        Add
      </Button>
    </>
  )
}
