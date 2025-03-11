"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Client } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

import { deleteClient } from "./action";
import { DeleteClientSchema } from "./schema";

export function DeleteClientForm({ client }: { client: Client }) {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof DeleteClientSchema>>({
    resolver: zodResolver(DeleteClientSchema),
    defaultValues: client,
  });

  const onSubmit = async (data: z.infer<typeof DeleteClientSchema>) => {
    const response = await deleteClient(data);

    if (response.status === "success") {
      form.reset(data);
    }

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });

    if (response.status === "success") {
      router.push("/clients");
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
