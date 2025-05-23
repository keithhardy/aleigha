"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Address, Client } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updateClient } from "@/app/(dashboard)/clients/[id]/update/action";
import { UpdateClientSchema } from "@/app/(dashboard)/clients/[id]/update/schema";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function UpdateClientForm({ client }: { client: Client & { address: Address | null } }) {
  const router = useRouter();

  const { toast } = useToast();

  const [imagePreview, setImagePreview] = useState(client.picture);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        form.setValue("picture", base64String);
        form.trigger("picture");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImagePreview(client?.picture || "");
    form.setValue("picture", "");
    form.trigger("picture");
  };

  const form = useForm<z.infer<typeof UpdateClientSchema>>({
    resolver: zodResolver(UpdateClientSchema),
    defaultValues: {
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      picture: "",
      appointedPerson: client.appointedPerson,
      address: {
        id: client.address?.id,
        city: client.address?.city || "",
        county: client.address?.county || "",
        postTown: client.address?.postTown || "",
        postCode: client.address?.postCode || "",
        streetAddress: client.address?.streetAddress || "",
        country: client.address?.country || "",
      },
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateClientSchema>) => {
    const response = await updateClient(data);

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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="appointedPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointed Person</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} autoComplete="appointed-person" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="picture"
                  render={() => (
                    <FormItem>
                      <FormLabel>Logo</FormLabel>
                      {imagePreview && (
                        <div className="mt-2">
                          <Image
                            src={imagePreview}
                            alt="Logo Preview"
                            width={200}
                            height={200}
                            className="rounded border"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                          />
                        </FormControl>
                        <Button variant="outline" type="button" onClick={handleClear}>
                          Clear
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.streetAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>County</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value ?? ""} />
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
                      <FormLabel>Post Town</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Postcode</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                disabled={!form.formState.isDirty || form.formState.isSubmitting}
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
