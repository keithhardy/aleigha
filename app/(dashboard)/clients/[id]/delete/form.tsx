"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Client } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { deleteClient } from "@/app/(dashboard)/clients/[id]/delete/action";
import { Schema } from "@/app/(dashboard)/clients/[id]/delete/schema";
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

export function ClientDeleteForm({ client }: { client: Client }) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      id: client.id,
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    try {
      await deleteClient(data);
      router.push("/clients");
      toast({
        title: "User Deleted",
        description: `${data.name} was successfully removed.`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete the user. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 pb-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground">
                  Enter <span className="text-foreground">{client.name}</span>{" "}
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
              form.watch("name") !== client.name || form.formState.isSubmitting
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
