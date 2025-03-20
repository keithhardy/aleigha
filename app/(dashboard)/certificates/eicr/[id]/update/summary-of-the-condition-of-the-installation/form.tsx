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
              <CardHeader>
                <CardTitle>
                  Summary of the condition of the installation
                </CardTitle>
                <CardDescription className="text-primary">
                  Provide an overview of the electrical installation&apos;s
                  condition, including age, alterations, and overall assessment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="generalCondition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>General Condition</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="min-h-[100px]"
                          placeholder="Describe the general condition of the installation, focusing on electrical safety and overall reliability."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estimatedAgeOfElectricalInstallation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Age of Installation</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="string"
                          placeholder="Estimated age of the installation."
                          onChange={(e) => {
                            const value = Math.max(
                              0,
                              Math.floor(Number(e.target.value) || 0),
                            ).toString();
                            field.onChange(value);
                          }}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="evidenceOfAlterations"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel>Evidence of Alterations</FormLabel>
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
                        <FormLabel>Estimated Age of Alterations</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="string"
                            placeholder="Estimated age of the alterations."
                            onChange={(e) => {
                              const value = Math.max(
                                0,
                                Math.floor(Number(e.target.value) || 0),
                              ).toString();
                              field.onChange(value);
                            }}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="overallAssessmentOfTheInstallation"
                  render={({ field }) => (
                    <FormItem>
                      <div>
                        <FormLabel>Overall Assessment</FormLabel>
                      </div>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <span className="text-sm font-medium">
                            {field.value ? "Satisfactory" : "Unsatisfactory"}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-sm text-muted-foreground">
                  Provide details about the condition of the installation and
                  any alterations made.
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
