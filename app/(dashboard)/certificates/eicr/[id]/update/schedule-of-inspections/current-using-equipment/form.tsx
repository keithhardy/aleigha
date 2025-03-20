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
import { updateCurrentUsingEquipment } from "./action";
import { inspectionItems } from "./inspection-items";
import { UpdateCurrentUsingEquipmentSchema } from "./schema";

export function UpdateCurrentUsingEquipmentForm({
  certificate,
}: {
  certificate: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof UpdateCurrentUsingEquipmentSchema>>({
    resolver: zodResolver(UpdateCurrentUsingEquipmentSchema),
    defaultValues: {
      id: certificate.id,
      item_8_1: certificate.item_8_1 || "na",
      item_8_2: certificate.item_8_2 || "na",
      item_8_3: certificate.item_8_3 || "na",
      item_8_4: certificate.item_8_4 || "na",
      item_8_5: certificate.item_8_5 || "na",
      item_8_6: certificate.item_8_6 || "na",
      item_8_7A: certificate.item_8_7A || "na",
      item_8_7B: certificate.item_8_7B || "na",
      item_8_7C: certificate.item_8_7C || "na",
      item_8_7D: certificate.item_8_7D || "na",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof UpdateCurrentUsingEquipmentSchema>,
  ) => {
    const response = await updateCurrentUsingEquipment(data);

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
              <Heading>Current-using equipment (permanently connected)</Heading>
            </HeaderGroup>
          </Header>

          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <CardHeader>
                <CardTitle>
                  Current-using equipment (permanently connected)
                </CardTitle>
                <CardDescription className="text-primary">
                  This section evaluates the condition and safety of
                  current-using equipment that is permanently connected.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-sm text-muted-foreground">
                  Ensure the condition and safety of permanently connected
                  equipment is checked.
                </p>
                <Button
                  variant="outline"
                  type="submit"
                  disabled={
                    !form.formState.isDirty || form.formState.isSubmitting
                  }
                >
                  {form.formState.isSubmitting ? "Saving..." : "Save"}
                </Button>
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
