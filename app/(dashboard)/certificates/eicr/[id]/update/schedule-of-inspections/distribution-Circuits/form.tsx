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
import { updateDistributionCircuits } from "./action";
import { inspectionItems } from "./inspection-items";
import { UpdateDistributionCircuitsSchema } from "./schema";

export function UpdateDistributionCircuitsForm({
  certificate,
}: {
  certificate: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateDistributionCircuitsSchema>>({
    resolver: zodResolver(UpdateDistributionCircuitsSchema),
    defaultValues: {
      id: certificate.id,
      item_5_1: certificate.item_5_1 || "na",
      item_5_2: certificate.item_5_2 || "na",
      item_5_3: certificate.item_5_3 || "na",
      item_5_4: certificate.item_5_4 || "na",
      item_5_5: certificate.item_5_5 || "na",
      item_5_6: certificate.item_5_6 || "na",
      item_5_7: certificate.item_5_7 || "na",
      item_5_8: certificate.item_5_8 || "na",
      item_5_9: certificate.item_5_9 || "na",
      item_5_10: certificate.item_5_10 || "na",
      item_5_11: certificate.item_5_11 || "na",
      item_5_12: certificate.item_5_12 || "na",
      item_5_13: certificate.item_5_13 || "na",
      item_5_14A: certificate.item_5_14A || "na",
      item_5_14B: certificate.item_5_14B || "na",
      item_5_15: certificate.item_5_15 || "na",
      item_5_16: certificate.item_5_16 || "na",
      item_5_17: certificate.item_5_17 || "na",
      item_5_18: certificate.item_5_18 || "na",
      item_5_19: certificate.item_5_19 || "na",
      item_5_20: certificate.item_5_20 || "na",
      item_5_21: certificate.item_5_21 || "na",
      item_5_22: certificate.item_5_22 || "na",
      item_5_23: certificate.item_5_23 || "na",
      item_5_24: certificate.item_5_24 || "na",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof UpdateDistributionCircuitsSchema>,
  ) => {
    const response = await updateDistributionCircuits(data);

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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col"
      >
        <div className="container mx-auto max-w-screen-xl flex-grow p-6">
          <Header>
            <HeaderGroup>
              <Link
                href={"/certificates"}
                className="inline-flex items-center text-sm font-semibold"
              >
                <MoveLeft size={22} className="mr-2" />
                <span>Back to Certificates</span>
              </Link>
              <Heading>Distribution circuits</Heading>
            </HeaderGroup>
          </Header>
          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Distribution circuits</CardTitle>
                  <CardDescription className="text-balance">
                    This section covers the condition and adequacy of the
                    distribution circuits in the system.
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
                          <FormLabel>
                            {item.item + " - " + item.label}
                          </FormLabel>
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
                  Ensure all distribution circuits are properly inspected.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
        <FormBar
          form={form}
          sections={sections}
          baseUrl={"/certificates/eicr"}
        />
        <UnsavedChangesDialog
          condition={form.formState.isDirty}
          action={form.handleSubmit(onSubmit)}
        />
      </form>
    </Form>
  );
}
