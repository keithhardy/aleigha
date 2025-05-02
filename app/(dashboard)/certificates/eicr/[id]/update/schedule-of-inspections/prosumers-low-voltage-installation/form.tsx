"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormBar } from "@/app/(dashboard)/certificates/components/form-bar";
import { UnsavedChangesDialog } from "@/app/(dashboard)/certificates/components/unsaved-changes-dialog";
import { Header, HeaderGroup, Heading } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

import { sections } from "../../components/sections";
import { RadioGroupComponent } from "../radio-group";
import { updateContractorClientAndInstallation } from "./action";
import { inspectionItems } from "./inspection-items";
import { UpdateProsumersLowVoltageInstallationSchema } from "./schema";

export function UpdateProsumersLowVoltageInstallationForm({
  certificate,
}: {
  certificate: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateProsumersLowVoltageInstallationSchema>>({
    resolver: zodResolver(UpdateProsumersLowVoltageInstallationSchema),
    defaultValues: {
      id: certificate.id,
      item_10_0: certificate.item_10_0 || "na",
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateProsumersLowVoltageInstallationSchema>) => {
    const response = await updateContractorClientAndInstallation(data);

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
        <div className="container mx-auto max-w-screen-xl flex-grow p-6">
          <Header>
            <HeaderGroup>
              <Link href={"/certificates"} className="inline-flex items-center text-sm font-semibold">
                <MoveLeft size={22} className="mr-2" />
                <span>Back to Certificates</span>
              </Link>
              <Heading>Prosumer&apos;s low voltage installation</Heading>
            </HeaderGroup>
          </Header>
          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Prosumer&apos;s low voltage installation</CardTitle>
                  <CardDescription className="text-balance">
                    Observations regarding the condition of the prosumer&apos;s low voltage installation.
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
                            <RadioGroupComponent onChange={field.onChange} value={field.value || "na"} />
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
                  Ensure the prosumer’s low voltage installation is inspected for condition.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
        <FormBar form={form} sections={sections} baseUrl={"/certificates/eicr"} />
        <UnsavedChangesDialog condition={form.formState.isDirty} action={form.handleSubmit(onSubmit)} />
      </form>
    </Form>
  );
}
