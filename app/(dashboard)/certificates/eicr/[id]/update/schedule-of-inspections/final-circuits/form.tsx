"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormBar } from "@/components/form-bar";
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
import { UnsavedChangesDialog } from "@/components/unsaved-changes-dialog";
import { useToast } from "@/hooks/use-toast";

import { sections } from "../../components/sections";
import { RadioGroupComponent } from "../radio-group";
import { updateFinalCircuits } from "./action";
import { inspectionItems } from "./inspection-items";
import { UpdateFinalCircuitsSchema } from "./schema";

export function UpdateFinalCircuitsForm({
  certificate,
}: {
  certificate: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateFinalCircuitsSchema>>({
    resolver: zodResolver(UpdateFinalCircuitsSchema),
    defaultValues: {
      id: certificate.id,
      item_6_1: certificate.item_6_1 || "na",
      item_6_2: certificate.item_6_2 || "na",
      item_6_3: certificate.item_6_3 || "na",
      item_6_4: certificate.item_6_4 || "na",
      item_6_5: certificate.item_6_5 || "na",
      item_6_6: certificate.item_6_6 || "na",
      item_6_7: certificate.item_6_7 || "na",
      item_6_8: certificate.item_6_8 || "na",
      item_6_9: certificate.item_6_9 || "na",
      item_6_10: certificate.item_6_10 || "na",
      item_6_11: certificate.item_6_11 || "na",
      item_6_12A: certificate.item_6_12A || "na",
      item_6_12B: certificate.item_6_12B || "na",
      item_6_13A: certificate.item_6_13A || "na",
      item_6_13B: certificate.item_6_13B || "na",
      item_6_13C: certificate.item_6_13C || "na",
      item_6_13D: certificate.item_6_13D || "na",
      item_6_13E: certificate.item_6_13E || "na",
      item_6_14: certificate.item_6_14 || "na",
      item_6_15: certificate.item_6_15 || "na",
      item_6_16: certificate.item_6_16 || "na",
      item_6_17A: certificate.item_6_17A || "na",
      item_6_17B: certificate.item_6_17B || "na",
      item_6_17C: certificate.item_6_17C || "na",
      item_6_17D: certificate.item_6_17D || "na",
      item_6_18: certificate.item_6_18 || "na",
      item_6_19: certificate.item_6_19 || "na",
      item_6_20: certificate.item_6_20 || "na",
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateFinalCircuitsSchema>) => {
    const response = await updateFinalCircuits(data);

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
              <Heading>Final circuits</Heading>
            </HeaderGroup>
          </Header>
          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Final circuits</CardTitle>
                  <CardDescription className="text-balance">
                    This section covers the condition and performance of the
                    final circuits.
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
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-balance text-sm text-muted-foreground">
                  Ensure all final circuits are thoroughly inspected.
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
