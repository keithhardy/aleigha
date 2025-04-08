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
              <div className="flex flex-col items-center gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Regulation</CardTitle>
                  <CardDescription className="text-balance">
                    Specify the regulations the inspection follows, e.g., BS
                    7671.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="regulationAccordanceAsAmendedTo"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </div>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-6">
                <p className="text-balance text-sm text-muted-foreground">
                  Provide detailed information regarding the inspection process
                  and limitations.
                </p>
              </CardFooter>
            </Card>
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Scope</CardTitle>
                  <CardDescription className="text-balance">
                    Provide details regarding the inspection, any regulatory
                    compliance, limitations of the testing, and the scope of the
                    report.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="detailsOfTheElectricalInstallation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Electrical Installation Covered by This Report
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} className="min-h-[200px]" />
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
                          <Textarea {...field} className="min-h-[200px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </div>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-6">
                <p className="text-balance text-sm text-muted-foreground">
                  Provide detailed information regarding the inspection process
                  and limitations.
                </p>
              </CardFooter>
            </Card>
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Limitations</CardTitle>
                  <CardDescription className="text-balance">
                    Provide details regarding the inspection, any regulatory
                    compliance, limitations of the testing, and the scope of the
                    report.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="agreedLimitations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agreed Limitations</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="min-h-[200px]" />
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
                          <Input {...field} />
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
                          <Textarea {...field} className="min-h-[200px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </div>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-6">
                <p className="text-balance text-sm text-muted-foreground">
                  Provide detailed information regarding the inspection process
                  and limitations.
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
