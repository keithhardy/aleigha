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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UnsavedChangesDialog } from "@/components/unsaved-changes-dialog";
import { useToast } from "@/hooks/use-toast";

import { updateDetailsAndLimitationsOfTheInspectionAndTesting } from "./action";
import { UpdateDetailsAndLimitationsOfTheInspectionAndTestingSchema } from "./schema";
import { sections } from "../components/sections";

export function UpdateDetailsAndLimitationsOfTheInspectionAndTestingForm({
  certificate,
}: {
  certificate: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<
    z.infer<typeof UpdateDetailsAndLimitationsOfTheInspectionAndTestingSchema>
  >({
    resolver: zodResolver(
      UpdateDetailsAndLimitationsOfTheInspectionAndTestingSchema,
    ),
    defaultValues: {
      id: certificate.id,
      regulationAccordanceAsAmendedTo:
        certificate.regulationAccordanceAsAmendedTo || "",
      detailsOfTheElectricalInstallation:
        certificate.detailsOfTheElectricalInstallation || "",
      extentOfSampling: certificate.extentOfSampling || "",
      agreedLimitations: certificate.agreedLimitations || "",
      agreedLimitationsWith: certificate.agreedLimitationsWith || "",
      operationalLimitations: certificate.operationalLimitations || "",
    },
  });

  const onSubmit = async (
    data: z.infer<
      typeof UpdateDetailsAndLimitationsOfTheInspectionAndTestingSchema
    >,
  ) => {
    const response =
      await updateDetailsAndLimitationsOfTheInspectionAndTesting(data);

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
                Details and limitations of the inspection and testing
              </Heading>
            </HeaderGroup>
          </Header>

          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <CardHeader>
                <CardTitle>
                  Details and limitations of the inspection and testing
                </CardTitle>
                <CardDescription className="text-primary">
                  Provide details regarding the inspection, any regulatory
                  compliance, limitations of the testing, and the scope of the
                  report.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="regulationAccordanceAsAmendedTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regulation Compliance</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Specify the regulations the inspection follows, e.g., BS 7671."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="extentOfSampling"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Extent of Sampling</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="min-h-[100px]"
                          placeholder="Enter a detailed description of the electrical installation covered by this report, including components such as wiring, panels, and other relevant systems."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="detailsOfTheElectricalInstallation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Electrical Installation Covered by This Report
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="min-h-[100px]"
                          placeholder="Describe the electrical installation covered by this report, including components such as wiring, panels, etc."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="agreedLimitations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agreed Limitations</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="min-h-[100px]"
                          placeholder="Specify any agreed limitations for the inspection and testing process, such as restricted access or scope."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="agreedLimitationsWith"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agreed With</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Who the limitations were agreed with (e.g., property owner, client)."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="operationalLimitations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Operational Limitations</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="min-h-[100px]"
                          placeholder="Describe any operational limitations during testing, such as time constraints, system shutdowns, or other factors."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-sm text-muted-foreground">
                  Provide detailed information regarding the inspection process
                  and limitations.
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
