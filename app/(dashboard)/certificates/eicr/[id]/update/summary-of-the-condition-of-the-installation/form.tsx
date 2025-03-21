"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { ExternalLink, MoveLeft } from "lucide-react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UnsavedChangesDialog } from "@/components/unsaved-changes-dialog";
import { useToast } from "@/hooks/use-toast";

import { updateSummaryOfTheConditionOfTheInstallation } from "./action";
import { UpdateSummaryOfTheConditionOfTheInstallationSchema } from "./schema";
import { sections } from "../components/sections";

export function UpdateSummaryOfTheConditionOfTheInstallationForm({
  certificate,
}: {
  certificate: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const form = useForm<
    z.infer<typeof UpdateSummaryOfTheConditionOfTheInstallationSchema>
  >({
    resolver: zodResolver(UpdateSummaryOfTheConditionOfTheInstallationSchema),
    defaultValues: {
      id: certificate.id,
      generalCondition: certificate.generalCondition || "The electrical installation is in an acceptable condition and complies with the current version of BS 7671 with the exception of the non-rectified items recorded in the observations section of this report. Earthing and bonding is adequate. Accessories are suitable for continued use. Installation is satisfactory and safe for continued use. ",
      estimatedAgeOfElectricalInstallation:
        certificate.estimatedAgeOfElectricalInstallation || "",
      evidenceOfAlterations: certificate.evidenceOfAlterations ?? false,
      estimatedAgeOfAlterations: certificate.estimatedAgeOfAlterations || "",
      overallAssessmentOfTheInstallation:
        certificate.overallAssessmentOfTheInstallation ?? true,
    },
  });

  const onSubmit = async (
    data: z.infer<typeof UpdateSummaryOfTheConditionOfTheInstallationSchema>,
  ) => {
    const response = await updateSummaryOfTheConditionOfTheInstallation(data);

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
              <Heading>Summary of the condition of the installation</Heading>
            </HeaderGroup>
          </Header>

          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Condition</CardTitle>
                  <CardDescription className="text-balance">
                    Provide an overview of the electrical installation&apos;s
                    condition, including age, alterations, and overall
                    assessment.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="generalCondition"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea {...field} className="min-h-[200px]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </div>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-balance text-sm text-muted-foreground">
                  Provide details about the condition of the installation.
                </p>
              </CardFooter>
            </Card>

            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Age and Alterations</CardTitle>
                  <CardDescription className="text-balance">
                    Provide the estimated age of the installation and indicate
                    if any alterations or modifications have been made to it.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="estimatedAgeOfElectricalInstallation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Estimated age of installation (years)
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="string"
                            onChange={(e) => {
                              const rawValue = e.target.value;
                              if (rawValue === "") {
                                field.onChange("");
                              } else {
                                const value = Math.max(
                                  0,
                                  Math.floor(Number(rawValue) || 0),
                                ).toString();
                                field.onChange(value);
                              }
                            }}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="rounded-lg border p-4 shadow-sm space-y-4">
                    <FormField
                      control={form.control}
                      name="evidenceOfAlterations"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>Alterations</FormLabel>
                            <FormDescription>
                              Check if alterations have been made.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                                if (!checked) {
                                  form.setValue("estimatedAgeOfAlterations", "");
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {form.watch("evidenceOfAlterations") && (
                      <FormField
                        control={form.control}
                        name="estimatedAgeOfAlterations"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Estimated age of alterations (years)
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="string"
                                onChange={(e) => {
                                  const rawValue = e.target.value;
                                  if (rawValue === "") {
                                    field.onChange("");
                                  } else {
                                    const value = Math.max(
                                      0,
                                      Math.floor(Number(rawValue) || 0),
                                    ).toString();
                                    field.onChange(value);
                                  }
                                }}
                                value={field.value ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                  </div>
                </CardContent>
              </div>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-balance text-sm text-muted-foreground">
                  Not sure about the age? Check out our{" "}
                  <Link
                    href={"/settings"}
                    className="inline-flex items-center space-x-1 text-blue-500"
                  >
                    <span>guide</span>
                    <ExternalLink size={14} />
                  </Link>{" "}
                  for more details.
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
