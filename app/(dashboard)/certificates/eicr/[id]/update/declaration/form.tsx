"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElectricalInstallationConditionReport, User } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { updateDeclaration } from "./action";
import { UpdateDeclarationSchema } from "./schema";

export function UpdateDeclarationForm({
  electricalInstallationConditionReport,
  users,
}: {
  electricalInstallationConditionReport: ElectricalInstallationConditionReport;
  users: User[];
}) {
  const { toast } = useToast();

  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [reviewerOpen, setReviewerOpen] = useState(false);

  const form = useForm<z.infer<typeof UpdateDeclarationSchema>>({
    resolver: zodResolver(UpdateDeclarationSchema),
    defaultValues: {
      id: electricalInstallationConditionReport.id,
      recommendedRetestDate:
        electricalInstallationConditionReport.recommendedRetestDate ||
        undefined,
      reasonForRecommendation:
        electricalInstallationConditionReport.reasonForRecommendation || "",
      inspectorId: electricalInstallationConditionReport.inspectorId || "",
      inspectionDate:
        electricalInstallationConditionReport.inspectionDate || undefined,
      reviewerId: electricalInstallationConditionReport.reviewerId || "",
      reviewDate: electricalInstallationConditionReport.reviewDate || undefined,
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="shadow-none rounded-md">
          <CardHeader>
            <CardTitle>Declaration</CardTitle>
            <CardDescription className="text-primary">
              Provide the necessary details for the retest, including the
              inspector and qualified supervisor&apos;s information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="recommendedRetestDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Retest Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "lg:max-w-[50%] pl-3 text-left font-normal",
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
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        defaultMonth={
                          new Date(
                            new Date().setFullYear(
                              new Date().getFullYear() + 5,
                            ),
                          )
                        }
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
                    <Textarea
                      {...field}
                      className="lg:max-w-[50%] min-h-[100px]"
                      placeholder="Provide the reason for recommending the retest."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inspectorId"
              render={({ field }) => {
                const selectedUser = users.find(
                  (user) => user.id === field.value,
                );
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Popover
                      open={inspectorOpen}
                      onOpenChange={setInspectorOpen}
                    >
                      <PopoverTrigger asChild className="w-full">
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={inspectorOpen ? "true" : "false"}
                          className="flex justify-between items-center lg:max-w-[50%]"
                        >
                          <span>
                            {selectedUser
                              ? selectedUser.name
                              : "Select inspector..."}
                          </span>
                          <ChevronsUpDown className="opacity-50 ml-2" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 min-w-[375px]">
                        <Command>
                          <CommandInput
                            placeholder="Search user..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No user found.</CommandEmpty>
                            <CommandGroup>
                              {users.map((user) => (
                                <CommandItem
                                  key={user.id}
                                  value={user.id}
                                  onSelect={(currentValue) => {
                                    form.setValue("inspectorId", currentValue, {
                                      shouldDirty: true,
                                    });
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
                  <FormLabel>Inspector&apos;s Signature Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "lg:max-w-[50%] pl-3 text-left font-normal",
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
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
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
              name="reviewerId"
              render={({ field }) => {
                const selectedUser = users.find(
                  (user) => user.id === field.value,
                );
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Popover open={reviewerOpen} onOpenChange={setReviewerOpen}>
                      <PopoverTrigger asChild className="w-full">
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={inspectorOpen ? "true" : "false"}
                          className="flex justify-between items-center lg:max-w-[50%]"
                        >
                          <span>
                            {selectedUser
                              ? selectedUser.name
                              : "Select reviewer..."}
                          </span>
                          <ChevronsUpDown className="opacity-50 ml-2" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 min-w-[375px]">
                        <Command>
                          <CommandInput
                            placeholder="Search user..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No user found.</CommandEmpty>
                            <CommandGroup>
                              {users.map((user) => (
                                <CommandItem
                                  key={user.id}
                                  value={user.id}
                                  onSelect={(currentValue) => {
                                    form.setValue("reviewerId", currentValue, {
                                      shouldDirty: true,
                                    });
                                    form.setValue("reviewDate", new Date(), {
                                      shouldDirty: true,
                                    });
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
              name="reviewDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Qualified Supervisor&apos;s Signature Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "lg:max-w-[50%] pl-3 text-left font-normal",
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
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
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
          <CardFooter className="flex justify-between bg-muted py-4 border-t rounded-b-md space-x-4">
            <p className="text-sm text-muted-foreground">
              Provide the details of the retest recommendation and signatories.
            </p>
            <Button
              variant="outline"
              type="submit"
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
