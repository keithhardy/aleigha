"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormBar } from "@/app/(dashboard)/certificates/components/form-bar";
import { UnsavedChangesDialog } from "@/app/(dashboard)/certificates/components/unsaved-changes-dialog";
import { Header, HeaderGroup, HeaderTitle } from "@/components/page-header";
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
import { useToast } from "@/hooks/use-toast";

import { sections } from "../../components/sections";
import { RadioGroupComponent } from "../radio-group";
import { updateMethodsOfProtection } from "./action";
import { inspectionItems } from "./inspection-items";
import { UpdateMethodsOfProtectionSchema } from "./schema";

export function UpdateMethodsOfProtectionForm({
  certificate,
}: {
  certificate: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateMethodsOfProtectionSchema>>({
    resolver: zodResolver(UpdateMethodsOfProtectionSchema),
    defaultValues: {
      id: certificate.id,
      item_3_1A: certificate.item_3_1A || "na",
      item_3_1B: certificate.item_3_1B || "na",
      item_3_1C: certificate.item_3_1C || "na",
      item_3_1D: certificate.item_3_1D || "na",
      item_3_1E: certificate.item_3_1E || "na",
      item_3_1F: certificate.item_3_1F || "na",
      item_3_1G: certificate.item_3_1G || "na",
      item_3_1H: certificate.item_3_1H || "na",
      item_3_1I: certificate.item_3_1I || "na",
      item_3_2: certificate.item_3_2 || "na",
      item_3_3A: certificate.item_3_3A || "na",
      item_3_3B: certificate.item_3_3B || "na",
      item_3_3C: certificate.item_3_3C || "na",
      item_3_3D: certificate.item_3_3D || "na",
      item_3_3E: certificate.item_3_3E || "na",
      item_3_3F: certificate.item_3_3F || "na",
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateMethodsOfProtectionSchema>) => {
    const response = await updateMethodsOfProtection(data);

    if (response.status === "success") {
      form.reset(data);
    }

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col">
        <div className="container mx-auto p-6">
          <Header>
            <HeaderGroup>
              <Link
                href={"/certificates"}
                className="inline-flex items-center text-sm font-semibold"
              >
                <MoveLeft size={22} className="mr-2" />
                <span>Back to Certificates</span>
              </Link>
              <HeaderTitle>Methods of protection</HeaderTitle>
            </HeaderGroup>
          </Header>
          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Methods of protection</CardTitle>
                  <CardDescription className="text-balance">
                    This section assesses the condition and adequacy of earthing, bonding,
                    insulation, and safety provisions, including main earthing, protective bonding,
                    and equipotential bonding.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-8 p-0">
                  {inspectionItems.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      // @ts-expect-error Field value is an enum, Input expects string
                      name={item.id}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{item.item + " - " + item.label}</FormLabel>
                          <FormControl>
                            <RadioGroupComponent
                              onChange={field.onChange}
                              value={field.value || "na"}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </CardContent>
              </div>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-6">
                <p className="text-balance text-sm text-muted-foreground">
                  Ensure all earthing and bonding arrangements are inspected.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
        <FormBar form={form} sections={sections} baseUrl={"/certificates/eicr"} />
        <UnsavedChangesDialog
          condition={form.formState.isDirty}
          action={form.handleSubmit(onSubmit)}
        />
      </form>
    </Form>
  );
}
