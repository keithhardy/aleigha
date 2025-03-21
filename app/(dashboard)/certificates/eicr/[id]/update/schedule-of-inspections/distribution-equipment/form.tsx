"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FormActions from "@/components/form-actions";
import { Header, HeaderGroup, Heading } from "@/components/page-header";
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
import { UnsavedChangesDialog } from "@/components/unsaved-changes-dialog";
import { useToast } from "@/hooks/use-toast";

import { sections } from "../../components/sections";
import { RadioGroupComponent } from "../radio-group";
import { updateContractorClientAndInstallation } from "./action";
import { inspectionItems } from "./inspection-items";
import { UpdateDistributionEquipmentSchema } from "./schema";

export function UpdateDistributionEquipmentForm({
  certificate,
}: {
  certificate: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateDistributionEquipmentSchema>>({
    resolver: zodResolver(UpdateDistributionEquipmentSchema),
    defaultValues: {
      id: certificate.id,
      item_4_1: certificate.item_4_1 || "na",
      item_4_2: certificate.item_4_2 || "na",
      item_4_3: certificate.item_4_3 || "na",
      item_4_4: certificate.item_4_4 || "na",
      item_4_5: certificate.item_4_5 || "na",
      item_4_6: certificate.item_4_6 || "na",
      item_4_7: certificate.item_4_7 || "na",
      item_4_8: certificate.item_4_8 || "na",
      item_4_9: certificate.item_4_9 || "na",
      item_4_10: certificate.item_4_10 || "na",
      item_4_11: certificate.item_4_11 || "na",
      item_4_12: certificate.item_4_12 || "na",
      item_4_13: certificate.item_4_13 || "na",
      item_4_14: certificate.item_4_14 || "na",
      item_4_15: certificate.item_4_15 || "na",
      item_4_16: certificate.item_4_16 || "na",
      item_4_17: certificate.item_4_17 || "na",
      item_4_18: certificate.item_4_18 || "na",
      item_4_19: certificate.item_4_19 || "na",
      item_4_20: certificate.item_4_20 || "na",
      item_4_21: certificate.item_4_21 || "na",
      item_4_22: certificate.item_4_22 || "na",
      item_4_23: certificate.item_4_23 || "na",
      item_4_24: certificate.item_4_24 || "na",
      item_4_25: certificate.item_4_25 || "na",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof UpdateDistributionEquipmentSchema>,
  ) => {
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
              <Heading>
                Distribution equipment, including consumer units and
                distribution boards
              </Heading>
            </HeaderGroup>
          </Header>

          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>
                    Distribution equipment, including consumer units and
                    distribution boards
                  </CardTitle>
                  <CardDescription className="text-balance">
                    This section covers the condition of distribution equipment,
                    including consumer units, circuit breakers, and distribution
                    boards.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
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
                  Ensure all distribution equipment and consumer units are
                  properly inspected.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>

        <FormActions
          form={form}
          sections={sections}
          baseUrl={"/certificates/eicr"}
        />
      </form>

      <UnsavedChangesDialog
        condition={form.formState.isDirty}
        action={form.handleSubmit(onSubmit)}
      />
    </Form>
  );
}
