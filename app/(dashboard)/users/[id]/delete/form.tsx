"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

import { deleteUser } from "./action";
import { DeleteUserSchema } from "./schema";

export function DeleteUserForm({ user }: { user: User }) {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm<User>({
    resolver: zodResolver(DeleteUserSchema),
    defaultValues: user,
  });

  const onSubmit = async (data: z.infer<typeof DeleteUserSchema>) => {
    const response = await deleteUser(data);

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });

    if (response.status === "success") {
      router.push("/users");
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
