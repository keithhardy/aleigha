"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport, User } from "@prisma/client";
import { format } from "date-fns";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  ExternalLink,
  MoveLeft,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormBar } from "@/components/form-bar";
import { Header, HeaderGroup, Heading } from "@/components/page-header";
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
import { Textarea } from "@/components/ui/textarea";
import { UnsavedChangesDialog } from "@/components/unsaved-changes-dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { updateDeclaration } from "./action";
import { UpdateDeclarationSchema } from "./schema";
import { sections } from "../components/sections";

export function UpdateDeclarationForm({
  certificate,
  users,
}: {
  certificate: ElectricalInstallationConditionReport;
  users: User[];
}) {
  const { toast } = useToast();

  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [reviewerOpen, setReviewerOpen] = useState(false);

  const form = useForm<z.infer<typeof UpdateDeclarationSchema>>({
    resolver: zodResolver(UpdateDeclarationSchema),
    defaultValues: {
      id: certificate.id,
      recommendedRetestDate:
        certificate.recommendedRetestDate ||
        (certificate.endDate
          ? new Date(
              certificate.endDate.setFullYear(
                certificate.endDate.getFullYear() + 5,
              ) - 86400000,
            )
          : undefined),
      reasonForRecommendation: certificate.reasonForRecommendation || "",
      inspectorId: certificate.inspectorId || "",
      inspectionDate: certificate.inspectionDate || undefined,
      reviewerId: certificate.reviewerId || "",
      reviewDate: certificate.reviewDate || undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof UpdateDeclarationSchema>) => {
    const response = await updateDeclaration(data);

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
              <Heading>Declaration</Heading>
            </HeaderGroup>
          </Header>
          <div className="space-y-4">
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Retest Details</CardTitle>
                  <CardDescription className="text-balance">
                    Provide the recommended retest date and explain the reason
                    for recommending the retest, including any relevant details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="recommendedRetestDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <div>
                          <FormLabel>Retest Date</FormLabel>
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
                          <PopoverContent className="w-auto p-0" align="center">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reasonForRecommendation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason for Recommendation</FormLabel>
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
                  Not sure about the retest period? Check out our{" "}
                  <Link
                    href={"/guide"}
                    className="inline-flex items-center space-x-1 text-blue-500"
                  >
                    <span>guide</span>
                    <ExternalLink size={14} />
                  </Link>{" "}
                  for more details.
                </p>
              </CardFooter>
            </Card>
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Inspector</CardTitle>
                  <CardDescription className="text-balance">
                    The inspector&apos;s name and signature are required to
                    formally sign off on the report, confirming its accuracy and
                    completeness.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="inspectorId"
                    render={({ field }) => {
                      const selectedUser = users.find(
                        (user) => user.id === field.value,
                      );
                      return (
                        <FormItem>
                          <div>
                            <FormLabel>Name</FormLabel>
                          </div>
                          <Popover
                            open={inspectorOpen}
                            onOpenChange={setInspectorOpen}
                          >
                            <PopoverTrigger asChild className="w-full">
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={inspectorOpen ? "true" : "false"}
                                className="flex items-center justify-between"
                              >
                                <span>
                                  {selectedUser
                                    ? selectedUser.name
                                    : "Select inspector..."}
                                </span>
                                <ChevronsUpDown className="ml-2 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="min-w-[375px] p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search..."
                                  className="h-9"
                                />
                                <CommandList>
                                  <CommandEmpty>No results found.</CommandEmpty>
                                  <CommandGroup>
                                    {users.map((user) => (
                                      <CommandItem
                                        key={user.id}
                                        value={user.name}
                                        onSelect={() => {
                                          form.setValue(
                                            "inspectorId",
                                            user.id,
                                            {
                                              shouldDirty: true,
                                            },
                                          );
                                          form.setValue(
                                            "inspectionDate",
                                            new Date(),
                                            { shouldDirty: true },
                                          );
                                          setInspectorOpen(false);
                                        }}
                                      >
                                        {user.name}
                                        {user.id === field.value ? (
                                          <Check className="ml-auto" />
                                        ) : null}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="inspectionDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <div>
                          <FormLabel>Inspector&apos;s Signature Date</FormLabel>
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
                          <PopoverContent className="w-auto p-0" align="center">
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
                </CardContent>
              </div>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-balance text-sm text-muted-foreground">
                  Ensure all information is accurate and verified before
                  submitting.
                </p>
              </CardFooter>
            </Card>
            <Card className="rounded-md shadow-none">
              <div className="flex flex-col gap-4 p-6 lg:flex-row">
                <CardHeader className="w-full p-0">
                  <CardTitle>Reviewer</CardTitle>
                  <CardDescription className="text-balance">
                    The reviewer&apos;s name and signature are required to
                    confirm that the report has been thoroughly checked and
                    approved.
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-full space-y-4 p-0">
                  <FormField
                    control={form.control}
                    name="reviewerId"
                    render={({ field }) => {
                      const selectedUser = users.find(
                        (user) => user.id === field.value,
                      );
                      return (
                        <FormItem>
                          <div>
                            <FormLabel>Name</FormLabel>
                          </div>
                          <Popover
                            open={reviewerOpen}
                            onOpenChange={setReviewerOpen}
                          >
                            <PopoverTrigger asChild className="w-full">
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={inspectorOpen ? "true" : "false"}
                                className="flex items-center justify-between"
                              >
                                <span>
                                  {selectedUser
                                    ? selectedUser.name
                                    : "Select reviewer..."}
                                </span>
                                <ChevronsUpDown className="ml-2 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="min-w-[375px] p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search..."
                                  className="h-9"
                                />
                                <CommandList>
                                  <CommandEmpty>No results found.</CommandEmpty>
                                  <CommandGroup>
                                    {users.map((user) => (
                                      <CommandItem
                                        key={user.id}
                                        value={user.name}
                                        onSelect={() => {
                                          form.setValue("reviewerId", user.id, {
                                            shouldDirty: true,
                                          });
                                          form.setValue(
                                            "reviewDate",
                                            new Date(),
                                            {
                                              shouldDirty: true,
                                            },
                                          );
                                          setReviewerOpen(false);
                                        }}
                                      >
                                        {user.name}
                                        {user.id === field.value ? (
                                          <Check className="ml-auto" />
                                        ) : null}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="reviewDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <div>
                          <FormLabel>
                            Qualified Supervisor&apos;s Signature Date
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
                          <PopoverContent className="w-auto p-0" align="center">
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
                </CardContent>
              </div>
              <CardFooter className="flex justify-between space-x-4 rounded-b-md border-t bg-muted py-4">
                <p className="text-balance text-sm text-muted-foreground">
                  Ensure all findings are verified before signing off the
                  report. If unsure, consult with the inspector.
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
