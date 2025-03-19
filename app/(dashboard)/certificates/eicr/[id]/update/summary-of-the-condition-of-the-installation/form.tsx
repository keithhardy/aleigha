"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { ArrowLeft, ArrowRight, List, MoveLeft, RotateCcw, Save, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Header, HeaderGroup, Heading } from "@/components/page-header";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

import { updateSummaryOfTheConditionOfTheInstallation } from "./action";
import { UpdateSummaryOfTheConditionOfTheInstallationSchema } from "./schema";
import { sections } from "../components/sections";

export function UpdateSummaryOfTheConditionOfTheInstallationForm({ certificate }: { certificate: ElectricalInstallationConditionReport }) {
  const { toast } = useToast();

  const router = useRouter();

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [unsavedChangesOpen, setUnsavedChangesOpen] = useState(false);
  const [nextUrl, setNextUrl] = useState("");

  const originalPush = useRef(router.push);

  const form = useForm<z.infer<typeof UpdateSummaryOfTheConditionOfTheInstallationSchema>>({
    resolver: zodResolver(UpdateSummaryOfTheConditionOfTheInstallationSchema),
    defaultValues: {
      id: certificate.id,
      generalCondition: certificate.generalCondition || "",
      estimatedAgeOfElectricalInstallation: certificate.estimatedAgeOfElectricalInstallation || "",
      evidenceOfAlterations: certificate.evidenceOfAlterations ?? false,
      estimatedAgeOfAlterations: certificate.estimatedAgeOfAlterations || "",
      overallAssessmentOfTheInstallation: certificate.overallAssessmentOfTheInstallation ?? true,
    },
  });

  useEffect(() => {
    originalPush.current = router.push;

    router.push = (url: string) => {
      if (form.formState.isDirty) {
        setUnsavedChangesOpen(true);
        setNextUrl(url);
        return;
      } else {
        originalPush.current.call(router, url);
      }
    };

    return () => {
      router.push = originalPush.current;
    };
  }, [form.formState.isDirty, router]);

  const onSubmit = async (data: z.infer<typeof UpdateSummaryOfTheConditionOfTheInstallationSchema>) => {
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col">
          <div className="container mx-auto max-w-screen-xl flex-grow p-6">
            <Header>
              <HeaderGroup>
                <Link href={"/certificates"} className="inline-flex items-center text-sm font-semibold">
                  <MoveLeft size={22} className="mr-2" />
                  <span>Back to Certificates</span>
                </Link>
                <Heading>Summary of the condition of the installation</Heading>
              </HeaderGroup>
            </Header>

            <div className="space-y-4">
              <Card className="rounded-md shadow-none">
                <CardHeader>
                  <CardTitle>Summary of the condition of the installation</CardTitle>
                  <CardDescription className="text-primary">Provide an overview of the electrical installation&apos;s condition, including age, alterations, and overall assessment.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="generalCondition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>General Condition</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="min-h-[100px]" placeholder="Describe the general condition of the installation, focusing on electrical safety and overall reliability." />
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
                              const value = Math.max(0, Math.floor(Number(e.target.value) || 0)).toString();
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
                                const value = Math.max(0, Math.floor(Number(e.target.value) || 0)).toString();
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
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                            <span className="text-sm font-medium">{field.value ? "Satisfactory" : "Unsatisfactory"}</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                  <p className="text-sm text-muted-foreground">Provide details about the condition of the installation and any alterations made.</p>
                  <Button variant="outline" type="submit" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Saving..." : "Save"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div className="sticky bottom-0 border-t bg-background">
            <div className="container mx-auto flex max-w-screen-xl justify-between px-6 py-4">
              <Link href={`/certificates/eicr/${certificate.id}/update/purpose-of-the-report`}>
                <Button variant="outline" size="icon">
                  <ArrowLeft />
                </Button>
              </Link>
              <div className="space-x-2">
                <ResponsiveDialog
                  sheetOpen={navigationOpen}
                  setSheetOpen={setNavigationOpen}
                  keyboardVisible={keyboardVisible}
                  setKeyboardVisible={setKeyboardVisible}
                  triggerButton={
                    <Button variant="outline" size="icon">
                      <List />
                    </Button>
                  }
                >
                  <Command>
                    <CommandInput placeholder="Search sections..." />
                    <CommandList className="scrollbar-hidden">
                      <CommandEmpty>No found.</CommandEmpty>
                      <CommandGroup>
                        {sections.map((section, index) => (
                          <CommandItem
                            key={index}
                            value={section.title}
                            onSelect={() => {
                              setNavigationOpen(false);
                              setKeyboardVisible(false);
                              router.push(`/certificates/eicr/${certificate.id}/update${section.url}`);
                            }}
                            className="truncate"
                          >
                            <p className="truncate">{section.title}</p>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </ResponsiveDialog>
                <Button variant="outline" size="icon" onClick={() => form.reset()} disabled={!form.formState.isDirty || form.formState.isSubmitting}>
                  <RotateCcw />
                </Button>
                <Button type="submit" variant="outline" size="icon" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
                  <Save />
                </Button>
                <Button variant="outline" size="icon" onClick={() => form.reset()}>
                  <Send />
                </Button>
              </div>
              <Link href={`/certificates/eicr/${certificate.id}/update/declaration`}>
                <Button variant="outline" size="icon">
                  <ArrowRight />
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </Form>

      <AlertDialog open={unsavedChangesOpen} onOpenChange={setUnsavedChangesOpen}>
        <AlertDialogContent className="w-[90%]">
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>You have unsaved changes. Leave without saving?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setUnsavedChangesOpen(false);
                setNextUrl("");
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setUnsavedChangesOpen(false);
                if (nextUrl) originalPush.current.call(router, nextUrl);
              }}
              className="mt-2 sm:mt-0"
            >
              Continue
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() => {
                form.handleSubmit(onSubmit)();
                setUnsavedChangesOpen(false);
              }}
            >
              Save then continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
