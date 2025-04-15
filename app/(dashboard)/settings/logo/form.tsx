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

import { updateLogo } from "./action";
import { UpdateLogoSchema } from "./schema";

export function UpdatePictureForm({
  settings,
}: {
  settings: (Settings & { address: Address | null }) | null;
}) {
  const router = useRouter();

  const { toast } = useToast();

  const [imagePreview, setImagePreview] = useState(settings?.picture || "");

  const inputPictureRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    resolver: zodResolver(UpdateLogoSchema),
    defaultValues: {
      id: settings?.id,
      picture: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof UpdateLogoSchema>) => {
    const response = await updateLogo(data);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        form.setValue("picture", base64String, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    if (inputPictureRef.current) {
      inputPictureRef.current.value = "";
    }
    setImagePreview(settings?.picture || "");
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card className="rounded-md shadow-none">
          <div className="flex flex-col gap-4 p-6 lg:flex-row">
            <CardHeader className="w-full p-0">
              <CardTitle>Logo</CardTitle>
              <CardDescription className="text-primary">
                Add your organization’s logo.
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full space-y-4 p-0">
              <FormField
                control={form.control}
                name="picture"
                render={(field) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          className="h-[32px]"
                          ref={inputPictureRef}
                          onChange={handleFileChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {imagePreview && (
                <div className="w-[100px]">
                  <AspectRatio>
                    <Image src={imagePreview} alt="Logo Preview" fill />
                  </AspectRatio>
                </div>
              )}
            </CardContent>
          </div>
          <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
            <p className="text-sm text-muted-foreground">
              Logo must be less than 1 MB.
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                type="button"
                size="sm"
                onClick={handleClear}
                disabled={!form.formState.isDirty}
              >
                Clear
              </Button>
              <Button
                variant="outline"
                type="submit"
                size="sm"
                disabled={
                  !form.formState.isDirty || form.formState.isSubmitting
                }
              >
                {form.formState.isSubmitting ? "Saving..." : "Save"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
