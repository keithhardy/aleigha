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

  const onSubmit = async (
    data: z.infer<typeof UpdateMethodsOfProtectionSchema>,
  ) => {
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
              <Heading>Methods of protection</Heading>
            </HeaderGroup>
          </Header>

          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <CardHeader>
                <CardTitle>Methods of protection</CardTitle>
                <CardDescription className="text-primary">
                  This section assesses the condition and adequacy of earthing,
                  bonding, insulation, and safety provisions, including main
                  earthing, protective bonding, and equipotential bonding.
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
                  Ensure all earthing and bonding arrangements are inspected.
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
