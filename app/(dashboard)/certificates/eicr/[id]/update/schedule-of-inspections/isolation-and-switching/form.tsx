"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormBar } from "@/app/(dashboard)/certificates/components/form-bar";
import { UnsavedChangesDialog } from "@/app/(dashboard)/certificates/components/unsaved-changes-dialog";
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
import { Header, HeaderGroup, HeaderTitle } from "@/components/ui/page-header";
import { useToast } from "@/hooks/use-toast";

import { sections } from "../../components/sections";
import { RadioGroupComponent } from "../radio-group";
import { updateIsolationAndSwitching } from "./action";
import { inspectionItems } from "./inspection-items";
import { UpdateIsolationAndSwitchingSchema } from "./schema";

export function UpdateIsolationAndSwitchingForm({
  certificate,
}: {
  certificate: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateIsolationAndSwitchingSchema>>({
    resolver: zodResolver(UpdateIsolationAndSwitchingSchema),
    defaultValues: {
      id: certificate.id,
      item_7_1A: certificate.item_7_1A || "na",
      item_7_1B: certificate.item_7_1B || "na",
      item_7_1C: certificate.item_7_1C || "na",
      item_7_1D: certificate.item_7_1D || "na",
      item_7_1E: certificate.item_7_1E || "na",
      item_7_1F: certificate.item_7_1F || "na",
      item_7_2A: certificate.item_7_2A || "na",
      item_7_2B: certificate.item_7_2B || "na",
      item_7_2C: certificate.item_7_2C || "na",
      item_7_2D: certificate.item_7_2D || "na",
      item_7_3A: certificate.item_7_3A || "na",
      item_7_3B: certificate.item_7_3B || "na",
      item_7_3C: certificate.item_7_3C || "na",
      item_7_3D: certificate.item_7_3D || "na",
      item_7_4A: certificate.item_7_4A || "na",
      item_7_4B: certificate.item_7_4B || "na",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof UpdateIsolationAndSwitchingSchema>,
  ) => {
    const response = await updateIsolationAndSwitching(data);

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
              <HeaderTitle>Isolation and switching</HeaderTitle>
            </HeaderGroup>
          </Header>
          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Isolation and switching</CardTitle>
                  <CardDescription className="text-balance">
                    This section evaluates the isolation and switching
                    arrangements for safety and compliance.
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
                  Ensure all isolation and switching mechanisms are inspected.
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
