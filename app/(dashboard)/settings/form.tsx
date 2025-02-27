"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Address, Settings } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AspectRatio } from "@/components/ui/aspect-ratio";
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

import { updateSettings } from "./action";
import { UpdateSettingsSchema } from "./schema";

export function UpdateSettingsForm({
  settings,
}: {
  settings: (Settings & { address: Address | null }) | null;
}) {
  const router = useRouter();

  const { toast } = useToast();

  const [imagePreview, setImagePreview] = useState(settings?.picture || "");

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
    setImagePreview(settings?.picture || "");
    form.setValue("picture", "");
    form.trigger("picture");
  };

  const form = useForm({
    resolver: zodResolver(UpdateSettingsSchema),
    defaultValues: {
      id: settings?.id,
      name: settings?.name || "",
      email: settings?.email || "",
      phone: settings?.phone || "",
      picture: "",
      governingBody: settings?.governingBody || "",
      governingBodyNumber: settings?.governingBodyNumber || "",
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

  const onSubmit = async (data: z.infer<typeof UpdateSettingsSchema>) => {
    const response = await updateSettings(data);

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
            <CardTitle>Company Name</CardTitle>
            <CardDescription className="text-primary">
              Provide the trading name of your company.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Trading Name"
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
              Name can only contain letters, spaces, hyphens, or apostrophes.
            </p>
            <Button variant="outline">Save</Button>
          </CardFooter>
        </Card>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Email</CardTitle>
            <CardDescription className="text-primary">
              Provide the company email address for official communication.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                      className="lg:max-w-[50%]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end bg-muted py-4 border-t rounded-b-md">
            <Button variant="outline">Save</Button>
          </CardFooter>
        </Card>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Phone Number</CardTitle>
            <CardDescription className="text-primary">
              Provide the company phone number for contact purposes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Phone"
                      className="lg:max-w-[50%]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end bg-muted py-4 border-t rounded-b-md">
            <Button variant="outline">Save</Button>
          </CardFooter>
        </Card>
        <Card className="shadow-none rounded-md">
          <CardHeader className="flex flex-row justify-between">
            <div className="space-y-2">
              <CardTitle>Upload Logo</CardTitle>
              <CardDescription className="text-primary">
                Add or update your company logo.
              </CardDescription>
            </div>
            {imagePreview && (
              <div className="w-[100px]">
                <AspectRatio ratio={16 / 9}>
                  <Image src={imagePreview} alt="Logo Preview" fill />
                </AspectRatio>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="picture"
              render={() => (
                <FormItem className="space-y-4">
                  <div className="flex items-center gap-2 lg:max-w-[50%]">
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handleClear}
                    >
                      Clear
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end bg-muted py-4 border-t rounded-b-md">
            <Button variant="outline">Save</Button>
          </CardFooter>
        </Card>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Governing Body Details</CardTitle>
            <CardDescription className="text-primary">
              Provide details about your governing body registration.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="governingBody"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Governing Body"
                      className="lg:max-w-[50%]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="governingBodyNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Governing Body Number"
                      className="lg:max-w-[50%]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end bg-muted py-4 border-t rounded-b-md">
            <Button variant="outline">Save</Button>
          </CardFooter>
        </Card>
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
          <CardFooter className="flex justify-end bg-muted py-4 border-t rounded-b-md">
            <Button variant="outline">Save</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
