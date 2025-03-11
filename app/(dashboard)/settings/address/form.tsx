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

import { updateAddress } from "./action";
import { UpdateAddressSchema } from "./schema";

export function UpdateAddressForm({
  settings,
}: {
  settings: (Settings & { address: Address | null }) | null;
}) {
  const router = useRouter();

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(UpdateAddressSchema),
    defaultValues: {
      id: settings?.id,
      address: {
        id: settings?.address?.id || "",
        streetAddress: settings?.address?.streetAddress || "",
        city: settings?.address?.city || "",
        county: settings?.address?.county || "",
        postTown: settings?.address?.postTown || "",
        postCode: settings?.address?.postCode || "",
        country: settings?.address?.country || "",
      },
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof UpdateAddressSchema>) => {
    const response = await updateAddress(data);

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Business Address</CardTitle>
            <CardDescription className="text-primary">
              Enter the full address details of your business.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="address.streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Street Address"
                      className="lg:max-w-[50%]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="City"
                      className="lg:max-w-[50%]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.county"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      placeholder="County"
                      className="lg:max-w-[50%]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.postTown"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Post Town"
                      className="lg:max-w-[50%]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.postCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Postcode"
                      className="lg:max-w-[50%]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Country"
                      className="lg:max-w-[50%]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">
              Your business address.
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
