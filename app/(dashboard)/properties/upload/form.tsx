"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Client } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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

import { uploadProperties } from "./action";
import { UploadPropertiesSchema } from "./schema";

export function CreatePropertyForm({ clients }: { clients: Client[] }) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UploadPropertiesSchema>>({
    resolver: zodResolver(UploadPropertiesSchema),
    defaultValues: {
      csv: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof UploadPropertiesSchema>) => {
    const response = await uploadProperties(data);

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
        <div className="space-y-4">
          <Card className="rounded-md shadow-none">
            <div className="flex flex-col gap-4 p-6 lg:flex-row">
              <CardHeader className="w-full p-0">
                <CardTitle>Client Details</CardTitle>
                <CardDescription className="text-balance">
                  Please make sure all values are correct.
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full space-y-4 p-0">
                <FormField
                  control={form.control}
                  name="csv"
                  render={({
                    field: { onChange, onBlur, name, ref, disabled },
                  }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="file"
                          className="h-[32px]"
                          name={name}
                          ref={ref}
                          onBlur={onBlur}
                          disabled={disabled}
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) {
                              onChange(file);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </div>
            <CardFooter className="justify-end space-x-4 rounded-b-md border-t bg-muted py-4">
              <Button
                variant="outline"
                size="sm"
                type="submit"
                disabled={
                  !form.formState.isDirty || form.formState.isSubmitting
                }
              >
                {form.formState.isSubmitting ? "Saving..." : "Save"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  );
}
