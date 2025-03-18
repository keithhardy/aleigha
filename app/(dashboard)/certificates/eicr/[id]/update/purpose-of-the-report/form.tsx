"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport } from "@prisma/client";
import { format } from "date-fns";
import {
  ArrowLeft,
  ArrowRight,
  CalendarIcon,
  Ellipsis,
  MoveLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Header, HeaderGroup, Heading } from "@/components/page-header";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { updatePurposeOfTheReport } from "./action";
import { UpdatePurposeOfTheReportSchema } from "./schema";
import { sections } from "../components/sections";


export function UpdatePurposeOfTheReportForm({
  certificate,
}: {
  certificate: ElectricalInstallationConditionReport;
}) {
  const { toast } = useToast();

  const router = useRouter();

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [unsavedChangesOpen, setUnsavedChangesOpen] = useState(false);
  const [nextUrl, setNextUrl] = useState("");

  const originalPush = useRef(router.push);

  const form = useForm<z.infer<typeof UpdatePurposeOfTheReportSchema>>({
    resolver: zodResolver(UpdatePurposeOfTheReportSchema),
    defaultValues: {
      id: certificate.id,
      purpose: certificate.purpose || "",
      startDate: certificate.startDate || undefined,
      endDate: certificate.endDate || undefined,
      recordsAvailable: certificate.recordsAvailable ?? false,
      previousReportAvailable: certificate.previousReportAvailable ?? false,
      previousReportDate: certificate.previousReportDate || undefined,
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

  const onSubmit = async (
    data: z.infer<typeof UpdatePurposeOfTheReportSchema>,
  ) => {
    const response = await updatePurposeOfTheReport(data);

    if (response.status === "success") {
      form.reset(data);

      setTimeout(() => {
        if (nextUrl) {
          router.push(nextUrl);
        }
      }, 1000);
    }

    toast({
      title: response.heading,
      description: response.message,
      variant: response.status === "success" ? "default" : "destructive",
    });
  };

  return (
    <>
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
            <Heading>Purpose of the Report</Heading>
          </HeaderGroup>
        </Header>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="rounded-md shadow-none">
              <CardContent className="space-y-6 p-6">
                <div className="flex flex-col gap-4 lg:flex-row">
                  <div className="w-full space-y-2">
                    <CardTitle>Report Purpose Details</CardTitle>
                    <CardDescription>
                      Please describe the purpose of the inspection, including
                      the inspection dates and related information.
                    </CardDescription>
                  </div>
                  <div className="w-full space-y-2">
                    <FormField
                      control={form.control}
                      name="purpose"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            Purpose of the Report
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="min-h-[100px]"
                              placeholder="Describe the purpose of the inspection, e.g., condition assessment, fault detection, etc."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <div>
                            <FormLabel className="text-muted-foreground">
                              Start Date of Inspection
                            </FormLabel>
                          </div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <div>
                            <FormLabel className="text-muted-foreground">
                              End Date of Inspection
                            </FormLabel>
                          </div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="recordsAvailable"
                      render={({ field }) => (
                        <FormItem>
                          <div>
                            <FormLabel className="text-muted-foreground">
                              Are Inspection Records Available?
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="previousReportAvailable"
                      render={({ field }) => (
                        <FormItem>
                          <div>
                            <FormLabel className="text-muted-foreground">
                              Is Previous Report Available?
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("previousReportAvailable") && (
                      <FormField
                        control={form.control}
                        name="previousReportDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <div>
                              <FormLabel className="text-muted-foreground">
                                Date of Previous Report
                              </FormLabel>
                            </div>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-balance text-sm text-muted-foreground">
                  Details about the inspection purpose and relevant dates.
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
          </form>
        </Form>
      </div>

      <div className="sticky bottom-0 border-t bg-background">
        <div className="container mx-auto flex max-w-screen-xl justify-between px-6 py-4">
          <Link
            href={`/certificates/eicr/${certificate.id}/update/details-of-the-contractor-client-installation`}
          >
            <Button variant="outline">
              <ArrowLeft />
              Prev
            </Button>
          </Link>
          <ResponsiveDialog
            sheetOpen={navigationOpen}
            setSheetOpen={setNavigationOpen}
            keyboardVisible={keyboardVisible}
            setKeyboardVisible={setKeyboardVisible}
            triggerButton={
              <Button variant="outline">
                <Ellipsis />
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
                        router.push(
                          `/certificates/eicr/${certificate.id}/update${section.url}`,
                        );
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
          <Link
            href={`/certificates/eicr/${certificate.id}/update/summary-of-the-condition-of-the-installation`}
          >
            <Button variant="outline">
              Next
              <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>

      <AlertDialog
        open={unsavedChangesOpen}
        onOpenChange={setUnsavedChangesOpen}
      >
        <AlertDialogContent className="w-[90%]">
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Leave without saving?
            </AlertDialogDescription>
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
