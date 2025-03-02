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
    resolver: zodResolver(UpdateLogoSchema),
    defaultValues: {
      id: settings?.id,
      picture: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof UpdateLogoSchema>) => {
    const response = await updateLogo(data);

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
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">
              Logo must be less than 1 MB.
            </p>
            <Button variant="outline" type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
