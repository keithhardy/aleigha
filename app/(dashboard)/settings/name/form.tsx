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

import { updateName } from "./action";
import { UpdateNameSchema } from "./schema";

export function UpdateNameForm({
  settings,
}: {
  settings: (Settings & { address: Address | null }) | null;
}) {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(UpdateNameSchema),
    defaultValues: {
      id: settings?.id,
      name: settings?.name || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof UpdateNameSchema>) => {
    const response = await updateName(data);

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
              <CardTitle>Company Name</CardTitle>
              <CardDescription className="text-primary">
                Provide the trading name of your company.
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full space-y-4 p-0">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Trading Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </div>
          <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
            <p className="text-balance text-sm text-muted-foreground">
              Name can only contain letters, spaces, hyphens, or apostrophes.
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
