"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Property } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

import { deleteProperty } from "./action";
import { DeletePropertySchema } from "./schema";

export function DeletePropertyForm({ property }: { property: Property }) {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof DeletePropertySchema>>({
    resolver: zodResolver(DeletePropertySchema),
    defaultValues: property,
  });

  const onSubmit = async (data: z.infer<typeof DeletePropertySchema>) => {
    const response = await deleteProperty(data);

    if (response.status === "success") {
      form.reset(data);
    }

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
        <Button type="submit" variant="destructive">
          {form.formState.isSubmitting ? "Deleting" : "Delete"}
        </Button>
      </form>
    </Form>
  );
}
