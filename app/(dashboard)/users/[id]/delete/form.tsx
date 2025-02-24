"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { deleteUser } from "./action";
import { Schema } from "./schema";

export function DeleteUserForm({ user }: { user: User }) {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<User>({
    defaultValues: {
      ...user,
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof Schema>) => {
    try {
      await deleteUser(data);
      router.back();
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
                  Enter <span className="text-foreground">{user.name}</span> and
                  press delete to remove.
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={
            form.watch("name") !== user.name || form.formState.isSubmitting
          }
          variant="destructive"
          size="sm"
        >
          {form.formState.isSubmitting ? "Deleting" : "Delete"}
        </Button>
      </form>
    </Form>
  );
}
