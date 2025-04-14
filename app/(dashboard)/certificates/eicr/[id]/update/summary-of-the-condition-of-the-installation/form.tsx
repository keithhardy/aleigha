"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { ExternalLink, MoveLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormBar } from "@/app/(dashboard)/certificates/components/form-bar";
import { UnsavedChangesDialog } from "@/app/(dashboard)/certificates/components/unsaved-changes-dialog";
import { Header, HeaderGroup, Heading } from "@/components/header";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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
      generalCondition: certificate.generalCondition || "",
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
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-6">
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
                        <FormLabel>Estimated age of installation</FormLabel>
                        <FormControl>
                          <div className="relative w-full">
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
                              className="pr-10"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                              Years
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="evidenceOfAlterations"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Alterations</FormLabel>
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
                          <FormLabel>Estimated age of alterations</FormLabel>
                          <FormControl>
                            <div className="relative w-full">
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
                                className="pr-10"
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                Years
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </div>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-6">
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
