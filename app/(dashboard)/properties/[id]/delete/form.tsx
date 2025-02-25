"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Property } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { deleteProperty } from "@/app/(dashboard)/properties/[id]/delete/action";
import { DeletePropertySchema } from "@/app/(dashboard)/properties/[id]/delete/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function DeletePropertyForm({ property }: { property: Property }) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof DeletePropertySchema>>({
    resolver: zodResolver(DeletePropertySchema),
    defaultValues: {
      id: property.id,
      uprn: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof DeletePropertySchema>) => {
    const response = await deleteProperty(data);

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });

    if (response.status === "success") {
      router.push("/properties");
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
                <FormLabel className="text-muted-foreground">
                  Enter <span className="text-foreground">{property.uprn}</span>{" "}
                  and press delete to remove.
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={
              form.watch("uprn") !== property.uprn ||
              form.formState.isSubmitting
            }
            variant="destructive"
          >
            {form.formState.isSubmitting ? "Deleting" : "Delete"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
