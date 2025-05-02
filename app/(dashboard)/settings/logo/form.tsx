"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Address, Settings } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

  const [picturePreviewUrl, setPicturePreviewUrl] = useState<string | null>(
    settings?.picture || null,
  );

  useEffect(() => {
    return () => {
      if (picturePreviewUrl) URL.revokeObjectURL(picturePreviewUrl);
    };
  }, [picturePreviewUrl]);

  const form = useForm<z.infer<typeof UpdateLogoSchema>>({
    resolver: zodResolver(UpdateLogoSchema),
    defaultValues: {
      id: settings?.id,
      picture: undefined,
    },
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
              <FormItem>
                <FormField
                  control={form.control}
                  name="picture"
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
                              setPicturePreviewUrl(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormMessage />
              </FormItem>
              {picturePreviewUrl && (
                <div className="w-[100px]">
                  <AspectRatio>
                    <Image src={picturePreviewUrl} alt="Logo Preview" fill />
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
