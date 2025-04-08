"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Address, Settings } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import { updateEmail } from "./action";
import { UpdateEmailSchema } from "./schema";

export function UpdateEmailForm({
  settings,
}: {
  settings: (Settings & { address: Address | null }) | null;
}) {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(UpdateEmailSchema),
    defaultValues: {
      id: settings?.id,
      email: settings?.email || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof UpdateEmailSchema>) => {
    const response = await updateEmail(data);

    if (response.status === "success") {
      form.reset(data);
    }

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });

    if (response.status === "success") {
      router.push("/settings");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="rounded-md shadow-none">
          <div className="flex flex-col gap-4 p-6 lg:flex-row">
            <CardHeader className="w-full p-0">
              <CardTitle>Email</CardTitle>
              <CardDescription className="text-primary">
                Provide the company email address for official communication.
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full space-y-4 p-0">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </div>
          <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
            <p className="text-sm text-muted-foreground">
              Must be a valid email address.
            </p>
            <Button
              variant="outline"
              type="submit"
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
